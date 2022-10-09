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
export const createListingAPI = (listing) => {
    return axios.post(URL+"/listing/create", listing);
}

export const getAllListingsAPI = () => {
    return axios.get(URL+"/listing/get");
}


