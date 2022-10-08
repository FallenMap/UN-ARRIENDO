import { createListingAPI } from "../api/listingAPI";
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