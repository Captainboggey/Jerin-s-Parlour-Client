import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_PK)
const Payment = () => {
    const userData = useLoaderData()
    const { user } = useAuth()
   

    

    return (
        <div>
<Elements  stripe={stripePromise}>
    <PaymentForm item={userData}></PaymentForm>
</Elements>
        </div>
    );
};

export default Payment;