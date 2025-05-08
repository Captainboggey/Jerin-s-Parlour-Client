import React from 'react';
import { FaBagShopping, FaCartPlus } from 'react-icons/fa6';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';


const Dashboard = () => {
    const {user}=useAuth()

    const navLinks = <>
        <Link to={'/'}> <li ><h2>Home</h2></li></Link>
        <Link to={`/dashboard/payment/null`}> <li ><h2><FaCartPlus></FaCartPlus> Book</h2></li></Link>
        <Link to={`/dashboard/bookingList`}> <li ><h2><FaBagShopping></FaBagShopping> Booking List</h2></li></Link>
    </>

    return (
        <div className='lg:flex'>

            <div className='lg:w-64   bg-blue-400'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                            {navLinks}
                        </ul>
                    </div>
                    <div className='text-center mx-auto'>
                        <a className="btn btn-ghost text-xl text-center">Dashboard</a>
                    </div>

                </div>
                <div className=" hidden lg:flex">
                    <ul className="menu menu-vertical  px-1 text-center font-bold bg-blue-400 lg:w-64 min-h-screen">
                        {navLinks}
                    </ul>
                </div>
            </div>



            <div className='flex-1'>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;