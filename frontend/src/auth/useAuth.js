import { useContext } from "react";
import { AuthContext } from "./authProvider";

export default function useAuth(){
    return useContext(AuthContext);
}