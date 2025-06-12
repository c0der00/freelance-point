import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import '../styles/spinner.css'

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    console.log(clientSecret);
    

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
    variables: { colorPrimaryText: '#262626' },
    defaultCollapsed: false,
  };

  return (
    <div className="checkout-form flex justify-center items-center min-h-screen px-4 py-4">
  <form
    id="payment-form"
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg"
  >
    <PaymentElement id="payment-element" options={paymentElementOptions} />

    <button
      disabled={isLoading || !stripe || !elements}
      id="submit"
      className="bg-blue-600 text-white font-semibold py-3 px-4 rounded-md shadow-md mt-4 w-full transition duration-200 ease-in-out hover:contrast-110 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span id="button-text">
        {isLoading ? (
          <div className="spinner" />
        ) : (
          "Pay now"
        )}
      </span>
    </button>

    {message && (
      <div id="payment-message" className="mt-4 text-center text-red-600">
        {message}
      </div>
    )}
  </form>
</div>

  );
};

export default CheckoutForm;
