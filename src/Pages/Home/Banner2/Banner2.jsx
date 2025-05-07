import React from 'react';
import b2 from "../../../assets/images/engin-akyurt-g-m8EDc4X6Q-unsplash 1.png"

const Banner2 = () => {
    return (
        <div className="hero bg-[#FFF8F5] h-[614px]">
  <div className="hero-content lg:gap-28 flex-col lg:flex-row">
    <img
      src={b2}
      className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-3xl font-bold">Let us handle your <br /> screen <span className='text-[#F63E7B]'>Professionally</span></h1>
      <p className="lg:py-6">
      With well written codes, we build amazing apps for all <br /> platforms, mobile and web apps in general ipsum. <br />Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit. Purus commodo ipsum.
      </p>
     <div className='lg:mt-10 flex  lg:gap-10 flex-col lg:flex-row '>
        <div >
        <p className='text-4xl text-[#F63E7B] font-bold '>500+</p>
        <p>Happy Customer</p>
        </div>
        <div>
        <p className='text-4xl text-[#F63E7B] font-bold '>16+</p>
        <p>Total Service</p>

        </div>
     </div>
    </div>
  </div>
</div>
    );
};

export default Banner2;