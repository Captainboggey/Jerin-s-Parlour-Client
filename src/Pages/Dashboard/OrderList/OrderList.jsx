import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';

const OrderList = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: orders = [], refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const result = await axiosSecure.get('/order')
            return result.data
        }
    })
    const handleUpdate =(id)=>{
        axiosSecure.patch(`/order/${id}`)
        .then(res=>{
            refetch()
            console.log(res.data)
        })
    }
    return (
        <div className='mx-5 mt-5'>
            <h2 className='text-2xl font-bold flex justify-between'>Order List <span>{user.displayName}</span></h2>
            <div className='mt-10'>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                
                                <th>Name</th>
                                <th>Email</th>
                                <th>Service</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                           
                          {
                            orders.map(order=> <tr key={order._id}>
                                <th>{order.name}</th>
                                <td>{order.email}</td>
                                <td>{order.itemName}</td>
                                <td>${order.price}</td>
                                <td><button onClick={()=>handleUpdate(order._id)} className={order.status?'btn btn-ghost text-black bg-green-400':'btn btn-ghost text-black bg-red-400'}> {order.status || 'pending'}</button></td>
                            </tr>)
                          }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default OrderList;