import { logInAPI, registerUser, updateUser } from "../api/userAPI";
import { formLogin } from "../adapters/formAdapters";


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
        document.getElementById("error-text-login").innerText = "";
        auth.logIn(res.data.data);
        /* the first data is property of axios response, the second is property of backend response*/
        navigate("/MainScreen");
    }).catch(e => {
        document.getElementById("error-text-login").innerText = e.response.data.error;
        console.log("Something bad happened...\n" + e);
    });
}

export const userRegisterHandlerOnSubmit = (event, auth, navigate, role) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("role", role);
    registerUser(formData).then(res => {
        auth.logIn(res.data.data);
        navigate("/MainScreen");
    }).catch(e => console.log(e));
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
    }).catch(e => console.log(e));
}