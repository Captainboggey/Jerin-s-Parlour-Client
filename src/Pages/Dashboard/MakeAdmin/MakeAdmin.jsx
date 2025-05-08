import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MakeAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: siteUsers = [], refetch } = useQuery({
        queryKey: ['siteUsers'],
        queryFn: async () => {
            const result = await axiosSecure('/users')
            return result.data
        }
    })

    const handleAdmin = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${id}`)
                    .then(res => {
                        console.log(res.data)
                        refetch()
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Done!",
                                text: "Admin Created",
                                icon: "success"
                            });
                        }
                    });
            }

        })

    }

    const handleDelete =(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        console.log(res.data)
                        refetch()
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Delete!",
                                text: "User Deleted",
                                icon: "success"
                            });
                        }
                    });
            }

        })
    }
    return (
        <div className='mx-5 mt-5'>
            <h2 className='text-2xl font-semibold flex justify-between'>Make Admin <span>{user.displayName}</span></h2>
            <div className='mt-10'>
                <div className="overflow-x-auto w-full">
                    <table className="table table-zebra ">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}

                            {
                                siteUsers.map((siteUser, i) => <tr key={siteUser._id}>
                                    <th>{i + 1}</th>
                                    <td>{siteUser.name}</td>
                                    <td>{siteUser.email}</td>
                                    <td className='text-left'>
                                        {
                                                siteUser.role==='admin'?<button className='btn text-red-600'>Admin User</button>:<h2 onClick={() => handleAdmin(siteUser._id)} className='btn text-green-500'>Make Admin</h2>
                                        }
                                        </td>
                                    <td><button onClick={()=>handleDelete(siteUser._id)} className='btn '>Delete</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;