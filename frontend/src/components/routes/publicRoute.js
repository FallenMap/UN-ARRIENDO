import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";

export default function PublicRoute({component}){
    const auth = useAuth();
    return auth.isLogged() ? <Navigate to="/MainScreen" /> : component;
}