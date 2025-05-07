import React from 'react';
import l1 from "../../../assets/jerin.png"
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { googleLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const handleGoogle = () => {
        googleLogin()
            .then(res => {
                if (res.user) {
                    const loggedInfo = {
                        email: res.user?.email,
                        name: res.user?.displayName || 'anonymous'
                    }
                    axiosPublic.post('/users', loggedInfo)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.insertedId) {
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.onmouseenter = Swal.stopTimer;
                                        toast.onmouseleave = Swal.resumeTimer;
                                    }
                                });
                                Toast.fire({
                                    icon: "success",
                                    title: "Signed in successfully"
                                });
                                navigate('/')
                            }


                        })
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.onmouseenter = Swal.stopTimer;
                              toast.onmouseleave = Swal.resumeTimer;
                            }
                          });
                          Toast.fire({
                            icon: "success",
                            title: "Signed in successfully"
                          });
                        navigate('/')
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <img src={l1} alt="" />
            <h2 className='mt-10 text-3xl font-bold'>Login With</h2>
            <button onClick={handleGoogle} className="btn mt-20 px-24 rounded-xl hover:bg-pink-500 hover:text-white bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
            <h2 className='mt-4'>Don't have an account? <Link to={'/signup'}><span className='underline font-semibold text-[#F63E7B]'>Create an account</span></Link></h2>
        </div>
    );
};

export default Login;