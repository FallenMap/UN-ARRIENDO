import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";

export default function TenantRoute({component}){
    const auth = useAuth();
    return auth.user?.type==="Tenant" && auth.isLogged() ? component : <Navigate to="/MainScreen" /> ;
}