import { createListingAPI, getAllListingsAPI, getHistoryListingsAPI } from "../api/listingAPI";
//import { formAllListings } from "../adapters/formAdapters";

export const listingCreateHandlerOnSubmit = (auth, listing) => {
    createListingAPI(listing)
    .then(res => {
        console.log('Listing creation completed: '+res.data);
        return true;
    })
    .catch(err => {
        if(err.response.data.isNotLogged){
            auth.logOut();
        }
        
        console.log('Listing create error: '+err.response.data.error);
        return false;
    });
}   

export const getAllListings = async (auth) => {
    let listings;
    try{
       let res = await getAllListingsAPI();
       listings = res.data.listings;
    }catch(err){
        if(err.response.data.isNotLogged){
            auth.logOut();
        }
        
        console.log('Listing get all error: '+err.response.data.error);
    }
    
    return listings;
}  

export const getHistoryListings = async (auth) => {
    let listings;
    try{
       let res = await getHistoryListingsAPI();
       listings = res.data.listings;
       console.log(res.data);
    }catch(err){
        if(err.response.data.isNotLogged){
            auth.logOut();
        }
        
        console.log('Listing get all error: '+err.response.data.error);
    }
    
    return listings;
}  