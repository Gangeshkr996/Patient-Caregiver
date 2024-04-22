import {createBrowserRouter } from "react-router-dom";
import Login from "../features/AuthStack/Login/Login";
import OtpScreen from "../features/AuthStack/OtpScreen/OtpScreen";
import ResetPassword from "../features/AuthStack/ResetPassword/ResetPassword";
import PatientWelcomeScreen from "../features/WelcomeStack/Patient/WelcomeScreen";
import PatientConfirmScreen from "../features/WelcomeStack/Patient/ConfirmScreen";
import InviteCaregiver from "../features/WelcomeStack/Patient/InviteCaregiver";
import CompleteScreen from "../features/WelcomeStack/Patient/CompleteScreen";
import Home from "../features/AppStack/Home/Home";
import Assessments from "../features/AppStack/Assessments/Assessments";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Login/>,
        errorElement: <h1>Page Not Found</h1>
    },
    {
        path:'/otp',
        element: <OtpScreen/>,
        errorElement: <h1>Page Not Found</h1>
    },
    {
        path:'/ResetPassword',
        element: <ResetPassword/>,
        errorElement: <h1>Page Not Found</h1>
    },
    {
        path:'/welcomePatient',
        element:<PatientWelcomeScreen/>,
        errorElement: <h1>Page Not Found</h1>
    },
    {
        path:'/confirmPatient',
        element:<PatientConfirmScreen/>,
        errorElement: <h1>Page Not Found</h1>
    },
    {
        path:'/inviteCaregiver',
        element:<InviteCaregiver/>,
        errorElement: <h1>Page Not Found</h1>
    },
    {
        path:'/completePatient',
        element:<CompleteScreen/>,
        errorElement: <h1>Page Not Found</h1>
    },
    {
        path:'/home',
        element:<Home/>,
        errorElement: <h1>Page Not Found</h1>
    },
    {
        path:'/assessments',
        element:<Assessments/>,
        errorElement: <h1>Page Not Found</h1>
    },
    
])
// ResetPassword