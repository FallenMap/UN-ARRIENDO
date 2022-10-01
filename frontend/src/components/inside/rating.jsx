import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export function HoverRating() {
  const [value, setValue] = React.useState(2);

  return (
    <Box
      sx={{
        "& .MuiRating-iconFilled": {
          color: "gold",
        },
      }}
    >
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
}
