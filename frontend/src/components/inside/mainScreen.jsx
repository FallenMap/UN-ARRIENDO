
import Navbar from "../navbar/navbar";
import { changeTitle } from "../../utilities/changeTitle";
import { Grid } from "@mui/material";

export function MainScreen() {
    changeTitle("Main page");
  return (
    <>
      <div className="container">
          <Navbar/>              
          </div>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}  backgroundColor='red' >
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            <h1>1</h1>
            
          </Grid>
          <Grid item xs={6} backgroundColor='purple'>
           <h1>2</h1>
          </Grid>
</Grid>
    </>
      
  );
}
  