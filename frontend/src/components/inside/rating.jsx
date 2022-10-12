import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import useAuth from "../../auth/useAuth";
import { updateRatingListing } from "../../controllers/listingActionsController";

export function HoverRating(props) {
  const [value, setValue] = React.useState(props.value);
  const auth = useAuth();

  const handlerSubmitRatingUpdate = (value) => {
    updateRatingListing(auth, value, props.idListing, props.reviewedByTenants)
    .then(average => {
      if(average){
        setValue(average);
      }else{
        //Show an error message
      }
      
    })
    .catch(err => {
      console.log("Rating component error "+err);
    });
  }

  return (
    <Box
      sx={{
        "& .MuiRating-iconFilled": {
          color: "gold",
        },
      }}
    >
      {auth.user?.type==='Landlord'? <Rating
        name="simple-controlled"
        value={value}
        size= {props?.size}
        readOnly/> :  <Rating
      name="simple-controlled"
      value={value}
      size= {props?.size}
      onChange={(event, newValue) => {
        handlerSubmitRatingUpdate(newValue);
      }}
    /> }
    </Box>
  );
}
