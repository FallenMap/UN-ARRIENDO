import axios from 'axios';
axios.defaults.withCredentials = true;

const URL = "http://localhost:5000";

/*
    Description
        -
    Parameters
        -
    What the function returns
        -
*/
export const logInAPI = async (userData) => {
    return axios.post(URL+"/user/login", userData);
}

export const logOutAPI = async () => {
    return axios.post(URL+"/user/logout");

}

export const registerUser = async (userData) => {
    return axios.post(URL+"/user/register", userData);
};

export const updateUser = async (userData) => {
    return axios.put(URL+"/user/update", userData);
}
