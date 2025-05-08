import React from 'react';
import j1 from "../../../src/assets/jerin.png"
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
    const {logOut,user}=useAuth()

   
    const navOptions=<>
        <Link to={'/'}><li><button className='hover:bg-[#F63E7B]'>Home</button></li></Link>
        <Link to={'/appointment'}><li><button className='hover:bg-[#F63E7B]'>Appointment</button></li></Link>
        <Link to={'/'}><li><button className='hover:bg-[#F63E7B]'>Our Team</button></li></Link>
        <Link to={'/'}><li><button className='hover:bg-[#F63E7B]'>Contact Us</button></li></Link>

        {
            user&&<Link to={'/dashboard'}><li><button className='hover:bg-[#F63E7B]'>Dashboard</button></li></Link>
        }

        {
            user?<li><button onClick={()=>logOut()} className='bg-black text-white px-8  '>Logout</button></li>:<Link to={'/login'}><li><button className='hover:bg-[#F63E7B] text-black px-8  '>Login</button></li></Link>
        }
        
    </>
    return (
        <div className="navbar fixed bg-transparent z-10 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navOptions}
                       
                    </ul>
                </div>
               <Link to={'/'}> <button className="btn  btn-ghost text-xl"><img className='w-24 p-2' src={j1} alt="" /></button></Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal gap-6  px-1">
                    {navOptions}
                </ul>
            </div>
            
        </div>
    );
};

export default Navbar;