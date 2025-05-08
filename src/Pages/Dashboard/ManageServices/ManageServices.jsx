import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageServices = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data: services = [], refetch } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const result = await axiosPublic.get('/services')
            return result.data
        }
    })
    const handleDelete =(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/services/${id}`)
                .then(res=>{
                    if(res.data.deletedCount>0){
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })
           
            }
          });
    }
    return (
        <div className='mx-5 mt-5'>
            <h2 className="text-2xl font-bold">Manage Services</h2>
            <div className='mt-20'>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Service Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                           
                          {
                            services.map((service,i)=> <tr key={service._id}>
                            <th>{i+1}</th>
                            <td>{service.title}</td>
                            <td>{service.price}</td>
                            <td>{service.category}</td>
                            <td><button onClick={()=>handleDelete(service._id)} className='btn bg-red-600 text-white'>Delete</button></td>
                        </tr>)
                          }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageServices;