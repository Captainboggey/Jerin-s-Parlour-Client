import React, { useEffect, useState } from 'react';

// import { CardElement, useElements, useStripe } from '../../src';
import useAuth from '../../../Hooks/useAuth';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
const PaymentForm = ({ item }) => {
    const { user } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const [transaction, setTransaction] = useState('')
    const { title, price, _id, category, image,description } = item
    
    const axiosSecure =useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    const itemPrice = { price: price }

    useEffect(() => {
{
    stripe &&   axiosSecure.post('create-payment-intent', itemPrice)
    .then(res => {

        setClientSecret(res.data.clientSecret)

    })
}
 



        


    }, [axiosSecure, price])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            setError('Stripe Not Found')
            return
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            setError('Card Not Found')
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError('Error: ', error)
            console.log('error', error)
        } else {
            console.log('[PaymentMethod]', paymentMethod)
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user.displayName,
                    email: user.email
                }
            }
        })
        if (confirmError) {
            setError('Error: ', confirmError)
        }
        if (paymentIntent.status === 'succeeded') {
            setTransaction("Transaction: ",paymentIntent.id)
            const orderDetails = {
                itemName: title,
                itemId: _id,
                price: price,
                itemImage: image,
                email: user.email,
                name: user.displayName,
                transaction: paymentIntent.id,
                description: description

            }
            axiosPublic.post('/order', orderDetails)
                .then(res => {
                    if (res.data.insertedId) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            title: "Order Placed successfully"
                        });
                    }
                })

        }
    }
    return (
        <div className='lg:ml-5 lg:mt-5  '>
            <h2 className='text-2xl font-semibold '>Book</h2>
            <div className='mt-20    '>
                <div className=" bg-base-100     max-w-lg shrink-0">
                    <form onSubmit={handleSubmit} className="card-body space-y-4">
                        <div className="form-control">

                            <input type="text" placeholder="name" defaultValue={user.displayName} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control">

                            <input type="email" placeholder="email" defaultValue={user.email} className="w-full input input-bordered" required />

                        </div>
                        <div className="form-control">

                            <input type="text" placeholder="item" defaultValue={title || 'please select item from appointment'} className="w-full font-bold input input-bordered" required />

                        </div>
                        <p className='font-bold mt-10'>Price: <span className='text-pink-500'>${price}</span></p>

                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                        <p className='text-xl text-green-700 my-5'>{transaction}</p>
                        <p className='text-xl text-red-700 my-5'>{error}</p>
                        <button className='btn text-white w-full bg-pink-600' type="submit" disabled={!stripe}>
                            Pay
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;