import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from '../components/CheckoutForm'
const stripePromise = await loadStripe(
  "pk_test_51R9nY0Iq9lvI0tLBtlgfx8uJ4XMmCA1Fpo3aLn0dYHs8DPNTRebUNbIbLez90rKomkXWsFBQFFuSW8G4bg0LbtUE005iBH0eWO"
  );

  const curruntUser = JSON.parse(localStorage.getItem("currentUser"))
  console.log(curruntUser);
  

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`,curruntUser
        );
        console.log(res.data.clientSecret);
        
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  },[id]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (<div className="w-full">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>)
};

export default Pay;