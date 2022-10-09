import { logInAPI, registerUser, updateUser } from "../api/userAPI";
import { formLogin } from "../adapters/formAdapters";
import { redirect } from 'react-router-dom';


export const userLoginHandlerOnSubmit = (event, auth, navigate) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    document.getElementsByName(formLogin.user)[0].value = "";
    document.getElementsByName(formLogin.password)[0].value = "";

    let body = {};
    for (const pair of formData.entries()) {
        body[pair[0]] = pair[1];
    }

    logInAPI(body).then(res => {
        console.log(res);
        document.getElementById("error-text-login").innerText = "";

        /* the first data is property of axios response, the second is property of backend response*/
        auth.logIn(res.data.data);
        
        redirect("/MainScreen");
    }).catch(err => {
        document.getElementById("error-text-login").innerText = err.response.data.error;
        console.log("Something bad happened...\n" + err);
    });
}

export const userRegisterHandlerOnSubmit = (event, auth, navigate, role) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    formData.append("role", role);

    registerUser(formData).then(res => {
        auth.logIn(res.data.data);
        navigate("/MainScreen");
    }).catch(err => console.log(err));
}

export const userUpdateHandlerOnSubmit = (event, auth) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let body = {};
    for (const pair of formData.entries()) {
        if(pair[1]){
            body[pair[0]] = pair[1];
        }
    }

    updateUser(body).then(res => {
        auth.updateData(body);
        window.alert("Datos Actualizados!!");
    }).catch(err => {
        if(err.response.data.isNotLogged){
            auth.logOut();
        }
        console.log(err)
    
    });
}