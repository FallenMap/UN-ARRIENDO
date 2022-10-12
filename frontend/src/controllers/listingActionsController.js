import { createListingAPI, getAllListingsAPI, getHistoryListingsAPI, getListingApi, updateListingAPI, deleteListingAPI } from "../api/listingAPI";
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

export const getListing = async (auth, ID) => {
    let listing;
    try{
       let res = await getListingApi(ID);
       listing = res.data.listing;
    }catch(err){
        if(err.response.data.isNotLogged){
            auth.logOut();
        }
        
        console.log('Get listing error: '+err.response.data.error);
    }
    
    return listing;
} 

export const getHistoryListings = async (auth) => {
    let listings;
    try{
       let res = await getHistoryListingsAPI();
       listings = res.data.listings;
    }catch(err){
        if(err.response.data.isNotLogged){
            auth.logOut();
        }
        
        console.log('Listing get all error: '+err.response.data.error);
    }
    
    return listings;
}  

export const updateListing = async (auth, listing) => {
    try{
        await updateListingAPI(listing);
        return true;
     }catch(err){
         if(err.response?.data.isNotLogged){
             auth.logOut();
         }
         console.log('Listing update error: '+err.response?.data.error);
     }
     
     return false;
}

export const deleteListing = async (auth, listingID) => {
    try{
        // console.log(listingID)
        await deleteListingAPI(listingID);
        return true;
     }catch(err){
         if(err.response?.data.isNotLogged){
             auth.logOut();
         }
         console.log('Listing delete error: '+err.response?.data.error);
     }
     
     return false;
}