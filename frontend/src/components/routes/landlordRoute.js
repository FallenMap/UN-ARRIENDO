import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";

export default function LandlordRoute({component}){
    const auth = useAuth();
    return auth.user?.type==="Landlord" && auth.isLogged() ? component : <Navigate to="/MainScreen" /> ;
}