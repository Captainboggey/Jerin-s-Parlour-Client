import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';

import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const BookingList = () => {
    const {user}=useAuth()
    
    const axiosSecure =useAxiosSecure()
    const {data: books=[]}=useQuery({
        queryKey:['books',user?.email],
        queryFn:async()=>{
            const result = await axiosSecure.get(`/order/${user.email}`)
            return result.data
        }
    })
    return (
        <div className='mt-5 ml-5 grid gap-4 md:grid-cols-4'>
            {
                books.map(book=><div key={book._id}  className=" w-96 border-2 rounded-lg p-2 card-compact bg-base-100 hover:shadow-lg">
                    <figure className='flex justify-between mx-2'>
                      <img
                        src={book.itemImage}
                        alt="Shoes" className='w-16'/>
                        <button className={book.status?'btn bg-green-400 text-black':'btn bg-[#FFE3E3] text-red-500'}>{book.status||'Pending'}</button>
                    </figure>
                    <div className="card-body">
                      <h2 className="text-2xl  font-bold">{book.itemName}</h2>
                      
                      <p>{book.description}</p>
                      <div className="card-actions justify-end">
                        
                      </div>
                    </div>
                  </div>)
            }
            
            
        </div>
    );
};

export default BookingList;