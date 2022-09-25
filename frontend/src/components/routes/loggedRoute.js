import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";

export default function LoggedRoute({component}){
    const auth = useAuth();
    return auth.isLogged() ? component : <Navigate to="/" />;
}