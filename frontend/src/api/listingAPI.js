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

export const getHistoryListingsAPI = () => {
    return axios.get(URL+"/listing/listingHistory");
}

export const getListingApi = (listingID) => {
    if(typeof listingID==='object'){
        const id = listingID['id']
        return axios.get(URL+"/listing/get/"+id);
    }else{
        return axios.get(URL+"/listing/get/"+listingID);
    }
}

export const updateListingAPI = (listing) => {
    return axios.post(URL+"/listing/update", listing);
}

export const deleteListingAPI = (listingID) => {
    // console.log(listingID)
    return axios.post(URL+"/listing/delete/"+listingID);
}

export const updateRatingListingAPI = (ratingBody) => {
    // console.log(listingID)
    return axios.post(URL+"/listing/rating/", ratingBody);
}

export const setCommentListingAPI = (body) => {
    return axios.post(URL+"/listing/comment/", body);
}

export const deleteCommentListingAPI = (body) => {
    return axios.post(URL+"/listing/commentDelete/", body);
}

export const updateCommentListingAPI = (body) => {
    return axios.put(URL+"/listing/commentUpdate/", body);
}