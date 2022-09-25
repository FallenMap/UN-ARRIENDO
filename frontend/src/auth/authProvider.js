import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    let initialState;
    try{
        initialState = JSON.parse(localStorage.getItem("user"));
    }catch{
        initialState = null;
    }
    const [user, setUser] = useState(initialState);

    useEffect(() => {
        try{
            localStorage.setItem("user", JSON.stringify(user));
        }catch (error){
            localStorage.removeItem("user");
        }
    }, [user]);


    const contextValue = {
        user,

        logIn(userData){
            setUser(userData);
            
        },

        logOut(){
            setUser(null);
        },
        
        isLogged(){
            return !!user;
        },

        updateData(userData){
            setUser(user => ({...user, ...userData}));
        }
    }

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider;