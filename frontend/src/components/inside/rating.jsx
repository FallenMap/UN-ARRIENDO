import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import useAuth from "../../auth/useAuth";
import { getListing, updateRatingListing } from "../../controllers/listingActionsController";




export function HoverRating(props) {
  const auth = useAuth();
  const [ value, setValue ] = React.useState(props.reviewedByTenants[auth.user?._id] || 0);
  const[ average, setAverage ] = React.useState(0)

  
  React.useEffect(()=>{
    getListing(auth, props?.idListing).then(listingResp => setAverage(listingResp?.rating));
  },[auth, props?.idListing]);


  const handlerSubmitRatingUpdate = (value) => {
    updateRatingListing(auth, value, props.idListing, props.reviewedByTenants)
    .then(average => {
      if(average){
        setAverage(average);
      }else{
        //Show an error message
      }
      
    })
    .catch(err => {
      console.log("Rating component error "+err);
    });
  } 
    const labels = average

  return (
    <Box
      sx={{
        "& .MuiRating-iconFilled": {
          color: "gold",
        },
      }}
    >
      {auth.user?.type==='Landlord'?<Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center',
          pl:4
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          readOnly
        />
        {value !== null && (
          <Box sx={{ ml: 2}}>({labels})</Box>
        )}
      </Box>  :  
        <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center',
          pl: 4
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
            handlerSubmitRatingUpdate(newValue)
          }}
        />
        {value !== null && (
          <Box sx={{ ml: 2, pb:1.8}}>({labels})</Box>
        )}
      </Box> }

    </Box>
  );
}
