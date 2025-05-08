import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const {user}=useAuth()
    const{data: isAdmin,isPending:adminLoading}=useQuery({
        queryKey:['isAdmin',user?.email],
        queryFn:async()=>{
            const result = await axiosSecure.get(`/user/admin/${user.email}`)
            // console.log(result.data.admin)
            return result.data.admin
        }
    })
    return [isAdmin,adminLoading]
};

export default useAdmin;