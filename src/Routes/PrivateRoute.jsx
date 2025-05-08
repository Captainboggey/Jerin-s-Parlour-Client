import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user,loading}=useAuth()
    const location =useLocation()
    if(loading){
        return <progress className="progress w-full"></progress>
    }

    if(user){
        return children
    }
    return <Navigate state={{from:location.pathname}} to={'/login'} replace></Navigate>
};

export default PrivateRoute;