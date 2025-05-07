import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AwesomeServices = () => {
    const axiosPublic = useAxiosPublic()

    const{data=[]}=useQuery({
        queryKey:['data'],
        queryFn:async()=>{
            const result = await axiosPublic.get('/services/home')
            return result.data
        }
    })
    return (
        <div className='my-10'>
            <h2 className="text-center text-3xl font-bold my-10">Our Awesome <span className='text-[#F63E7B]'>Services </span></h2>
            <div className='grid md:grid-cols-3 my-20'>
                {
                    data.map(service=><div key={service._id} className="card text-center card-compact bg-base-100 ">
                        <figure>
                          <img
                            src={service.image}
                            alt="Shoes" />
                        </figure>
                        <div className="card-body">
                          <h2 className="text-2xl font-bold">{service.title}</h2>
                          <p className='text-xl text-[#F63E7B] font-bold'>{service.price}</p>
                          <p>{service.description}</p>
                          <div className="card-actions justify-end">
                            
                          </div>
                        </div>
                      </div>)
                }

                
            </div>
            <div className='text-center my-10'>
                    <button className='btn bg-[#F63E7B] text-white'>Explore More</button>
                </div>
        </div>
    );
};

export default AwesomeServices;