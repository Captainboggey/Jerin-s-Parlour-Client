import React from 'react';
import { useForm } from "react-hook-form"
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const imageApi = import.meta.env.VITE_BB
const uploadImage =`https://api.imgbb.com/1/upload?key=${imageApi}`
const AddService = () => {
    const axiosPublic =useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit =async (data) => {
        const imageFile = {image: data.image[0]}
        const imageBB =await axiosPublic.post(uploadImage,imageFile,{
            headers:{
                'content-type': 'multipart/form-data'
            }
        })
        console.log(imageBB.data.data.display_url)
       if(imageBB.data.success){
        const itemInfo ={
            title: data.title,
            price: data.price,
            description: data.description,
            image: imageBB.data.data.display_url
        }
        const result = await axiosSecure.post('/services',itemInfo)
        console.log(result.data)
        if(result.data.insertedId){
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
                title: "Item added successfully"
              });
        }
       }
    }

    return (
        <div className='mx-5 mt-5'>
            <h2 className='my-10 text-3xl font-bold'>Add a service</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='grid justify-start lg:grid-cols-2'>

                <div className='form-control flex flex-col gap-2'>
                    <label className='font-semibold '>
                        Service Title
                    </label>
                    <input {...register("title")} type="text"  id="" className='input input-bordered' />
                </div>
                <div className='form-control flex flex-col gap-2'>
                    <label className='font-semibold '>
                        Price
                    </label>
                    <input {...register("price")} type="text"  id="" className='input input-bordered' />
                </div>
                <div className='form-control flex flex-col gap-2'>
                    <label className='font-semibold '>
                        Image
                    </label>
                    <input {...register("image")} type="file" className="file-input file-input-error" />
                </div>
                <div className='form-control flex mt-2 flex-col gap-2'>
                    <label className='font-semibold '>
                        Description
                    </label>
                    <fieldset className="fieldset">

                        <textarea {...register("description")} className="textarea h-24" placeholder="Bio"></textarea>

                    </fieldset>
                </div>
        <div className='form-control'>
            <button className='btn bg-pink-500 text-white'>Submit</button>
        </div>

            </form>


        </div>
    );
};

export default AddService;