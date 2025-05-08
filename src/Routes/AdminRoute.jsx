import React from 'react';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user,loading}=useAuth();
    const location =useLocation()
    const [isAdmin,adminLoading]=useAdmin();
   if(loading || adminLoading){
    return <progress className="progress w-full"></progress>
   }
   if(user&& isAdmin){
    return children
   }

   return <Navigate state={{from:location.pathname}} to={'/login'} replace></Navigate>
};

export default AdminRoute;