import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useForm } from "react-hook-form";

const SignUp = () => {
    const {googleLogin,signUp,updateUser}=useAuth();
    const axiosPublic =useAxiosPublic();
    const navigate=useNavigate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const signUpData ={
            firstName: data.first,
            lastName: data.last,
            email: data.email,
            password: data.password
        }
        signUp(data.email,data.password)
        .then(res=>{
            updateUser(data.first)
            if(res.user){
                axiosPublic.post('/users',signUpData)
                .then(res=>{
                    console.log(res.data)
                    if(res.data.insertedId){
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
    }


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
        <div className='min-h-screen flex items-center justify-center'>
 <div className="card bg-base-100 w-full p-8 border border-black max-w-lg shrink-0 ">
         
        <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-4">
        <p className='text-2xl font-bold'>Create an account</p>
          <div className="form-control ">
            
            <input {...register('first')} type="text" placeholder="First Name" className="font-bold border-black rounded-none text-pink-400 input input-bordered border w-full  border-t-0 border-x-0" required />
          </div>
          <div className="form-control">
            
            <input {...register('last')} type="text" placeholder="Last Name" className="font-bold border-black rounded-none text-pink-400 input input-bordered border w-full border-t-0 border-x-0" required />
            
          </div>
          <div className="form-control">
            
            <input {...register('email')} type="email" placeholder="Email" className="font-bold border-black rounded-none text-pink-400 input input-bordered border w-full border-t-0 border-x-0" required />
            
          </div>
          <div className="form-control">
            
            <input {...register('password')} type="password" placeholder="Password" className="font-bold border-black rounded-none text-pink-400 input input-bordered border w-full border-t-0 border-x-0" required />
            
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-[#F63E7B] text-white w-full ">Create an account</button>
          </div>
        </form>
        <p className='text-center font-semibold'>
            Already have an account? <Link to={'/login'}><span className='underline font-semibold text-[#F63E7B]'>Login</span></Link>
        </p>
        <div className="divider">Or</div>
        <button onClick={handleGoogle} className="btn  px-24 rounded-xl hover:bg-pink-500 hover:text-white bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
      </div>


        </div>
       
    );
};

export default SignUp;