import React from 'react';

const HomeForm = () => {
    return (
        <div className="hero bg-[#FFF8F5] h-[614px]">
  <div className="hero-content text-center ">
    <div className="max-w-sm lg:max-w-xl">
      <h1 className="text-4xl font-bold">Let us handle your  project,professionally</h1>
      <div className="card mt-10 bg-transparent  w-full max-w-xl shrink-0 ">
      <form className="card-body">
        <div className="form-control space-y-2 lg:space-y-0 md:flex gap-4">
          
          <input type="text" placeholder="Full Name" className="input input-bordered w-full" required />
          <input type="text" placeholder="Last Name" className="input input-bordered w-full" required />
        </div>
        <div className="form-control">
          
        <div className="form-control md:flex space-y-2 lg:space-y-0 gap-4">
          
          <input type="email" placeholder="Email Address" className="input input-bordered w-full" required />
          <input type="text" placeholder="Phone Number" className="input input-bordered w-full" required />
        </div>
        <div>
        <textarea className="textarea w-full mt-2 textarea-bordered" placeholder="Bio"></textarea>
        </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn px-6 rounded-md bg-[#F63E7B] text-white">Send Message</button>
        </div>
      </form>
      </div>
      
    </div>
  </div>
</div>
    );
};

export default HomeForm;