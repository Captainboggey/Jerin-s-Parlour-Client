import React from 'react';
import i1 from "../../../../assets/images/beautiful-young-asian-woman-touching-her-clean-face-with-fresh-healthy-skin-isolated-white-wall-beauty-cosmetics-facial-treatment-concept 1.png"
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="hero bg-[#FFF8F5] h-[700px]">
            <div className="hero-content  flex-col lg:gap-36 lg:flex-row-reverse">
                <img
                    src={i1}
                    className="max-w-sm rounded-lg shadow-2xl" />
                <div className='space-y-2'>
                    <h1 className="text-5xl font-bold ">BEAUTY SALON 
                    
                    
                  
                    </h1>
                    <h1 className='text-5xl font-bold mt-2'>FOR EVERY WOMEN</h1>
                    <p className="lg:py-6">
                    Lorem ipsum dolor sit amet, consectetur <br />
                     adipiscing elit. Purus commodo ipsum duis <br />
                      laoreet maecenas. Feugiat 
                    </p>
                   <Link to={'/appointment'}><button className="btn text-white rounded-md bg-[#F63E7B]">Get an Appointment</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;