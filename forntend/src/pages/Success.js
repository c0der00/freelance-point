import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import newRequest from '../utils/newRequest';

const Success = () => {
    const { search } = useLocation();
    const [login,setLogin] = useState(false);
    const navigate = useNavigate();
    const params = new URLSearchParams(search);
    const payment_intent = params.get('payment_intent');
    console.log(payment_intent);
    

    useEffect(() => {
        const makeRequest = async () => {
            try {
                setLogin(await newRequest.put('/orders', { payment_intent }));
                setTimeout(() => {
                    navigate("/orders/:id");
                }, 4000);
            } catch (error) {
                console.log(error);
            }
        }
        makeRequest();
    }, [payment_intent, navigate]);

    return (
        <>
            <div className="cm flex justify-center items-center mb-4">
                <img src="images/successfully-done.gif" alt="success" className="w-72 h-72" />
            </div>
            {   login ? <div className="success text-green-500 text-lg flex justify-center items-center mb-4">
                Payment successful. You are being redirected to the order page.
            </div> : <div>in precess...</div>
            } 
            <span className="close text-red-500 text-center">
                Please do not close the page.
            </span>
        </>
    );
}

export default Success;
