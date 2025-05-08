import React from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Appointment = () => {
    const axiosPublic = useAxiosPublic()

    const {data: services=[]}=useQuery({
        queryKey:['services'],
        queryFn:async()=>{
            const result = await axiosPublic.get('/services')
            return result.data
        }
    })
    return (
        <div>
            <div className="hero bg-[#FFF8F5] h-[450px]">
                <div className="hero-content ">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Appointment </h1>
                        
                    </div>
                </div>
            </div>
            <h2 className="text-center text-3xl font-bold my-10">Our Beloved <span className='text-[#F63E7B]'>Services </span></h2>
<div className='grid  md:grid-cols-3 mt-10 my-10'>
{
    services.map(service=><div key={service._id} className="card text-center card-compact bg-base-100 hover:shadow-lg">
        <figure>
          <img
            src={service.image}
            alt="Shoes" className='w-16'/>
        </figure>
        <div className="card-body">
          <h2 className="text-2xl font-bold">{service.title}</h2>
          <p className='text-xl text-[#F63E7B] font-bold'>${service.price}</p>
          <p>{service.description}</p>
          <div className="card-actions justify-center my-10">
           <Link to={`/dashboard/payment/${service._id}`}> <button className='btn bg-[#F63E7B] text-white'>Book Now</button></Link>
          </div>
        </div>
      </div>)
}

</div>
        </div>
    );
};

export default Appointment;