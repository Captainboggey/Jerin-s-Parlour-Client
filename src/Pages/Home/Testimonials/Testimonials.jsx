import React from 'react';


// import { Pagination } from 'swiper/modules';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
// import { Rating } from '@smastrom/react-rating';
// import { Rating } from '@smastrom/react-rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const axiosPublic = useAxiosPublic();
    const { data: review = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const result = await axiosPublic.get('/reviews')
            return result.data
        }
    })
    return (
        <div className='mt-10'>
            <h2 className="text-center text-2xl font-bold my-10">Testimonials</h2>
            <div>
                <Swiper
                     cssMode={true}
                     navigation={true}
                     pagination={true}
                     mousewheel={true}
                     keyboard={true}
                     modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                     className="mySwiper"
                   >
                    {
                        review.map(aData => <SwiperSlide key={aData._id}><div className=" lg:my-0 card bg-base-100 w-96  mx-auto">
                            <div className="card-body">
                                <div className='flex gap-2'>
                                    <img src={aData.image} className='w-12' alt="" />
                                <h2 className="text-2xl font-bold">{aData.name} <br /> <span className='text-sm'>{aData.designation}</span> </h2>
                                </div>
                                
                                <div>{aData.review}</div>
                               <div>
                               <Rating className='mb-10'
                                    style={{ maxWidth:'180px' }}
                                    value={aData.rating}
                                    readOnly
                                />
                               </div>
                            </div>
                        </div></SwiperSlide>)
                    }
                </Swiper>
            </div>

        </div>
    );
};

export default Testimonials;