import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Home/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Appointment from "../Pages/Appointment/Appointment";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Payment from "../Pages/Dashboard/Payment/Payment";
import BookingList from "../Pages/Dashboard/BookingList/BookingList";
import OrderList from "../Pages/Dashboard/OrderList/OrderList";
import AddService from "../Pages/Dashboard/AddService/AddService";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminRoute from "./AdminRoute";
import ManageServices from "../Pages/Dashboard/ManageServices/ManageServices";

const router= createBrowserRouter([{
    path: '/',
    element:<Main></Main>,
    children:[{
        path:'/',
        element:<Home></Home>
    },{
        path:'/login',
        element:<Login></Login>
    },{
        path:'/signup',
        element:<SignUp></SignUp>
    },{
        path:'/appointment',
        element:<PrivateRoute><Appointment></Appointment></PrivateRoute>
    }]
},{
    path:'/dashboard',
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[{
        path: '/dashboard/payment/:id' || '/dashboard/payment/null',
        element:<Payment></Payment>,
        loader:({params})=>fetch(`http://localhost:5000/services/${params.id}`)
    },{
        path: '/dashboard/bookingList',
        element:<BookingList></BookingList>
    },
    // admin
    
    {
        path:'/dashboard/orderList',
        element:<AdminRoute><OrderList></OrderList></AdminRoute>


    },{
        path:'/dashboard/addService',
        element:<AdminRoute><AddService></AddService></AdminRoute>
    },{
        path:'/dashboard/makeAdmin',
        element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
    },{
        path:'/dashboard/manageService',
        element:<ManageServices></ManageServices>
    }]
}])




export default router