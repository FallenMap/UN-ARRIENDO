import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export function HoverRating(props) {
  const [value, setValue] = React.useState(props.value);

  return (
    <Box
      sx={{
        "& .MuiRating-iconFilled": {
          color: "gold",
        },
      }}
    >
      {props.auth?.user?.type==='Landlord'? <Rating
        name="simple-controlled"
        value={value}
        size= {props?.size}
        onChange={(event, newValue) => {
          setValue(newValue);
        }} readOnly/> :  <Rating
      name="simple-controlled"
      value={value}
      size= {props?.size}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    /> }
    </Box>
  );
}
