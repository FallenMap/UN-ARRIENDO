import Navbar from "../navbar/navbar";
import { changeTitle } from "../../utilities/changeTitle";
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { HoverRating } from "./rating";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import { getHistoryListings } from "../../controllers/listingActionsController";
import { useState } from "react";
import { useEffect } from "react";
import { formAllListings } from "../../adapters/formAdapters";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { deleteListing } from "../../controllers/listingActionsController";
const theme = createTheme();

export function Historial() {
  /*cons eliminado; 
  setListings(eliminado);*/

  const [listings, setListings] = useState([]);
  changeTitle("Historial");

  const auth = useAuth();

  useEffect(() => {
    getHistoryListings(auth).then(listingsResp => setListings(listingsResp));
  }, [auth]);

  const handleDelete=(idlisting) =>{
     // console.log("Funciona")
     // console.log(idlisting)
     deleteListing(auth,idlisting);
     getHistoryListings(auth).then(listingsResp => setListings(listingsResp));
    }

  return (
    <>
      <Box>
        <div className="container">
          <Navbar />
        </div>

        <Grid item xs>
          {" "}
          {/* tarjetas */}
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
              {/* Hero unit */}
              <Container sx={{ py: 8 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={3}>
                  {listings?.map((listing) => { 
                    if (listing[formAllListings.activo]) {
                    return (<Grid item xs={6}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            // 16:9
                            pt: "2%",
                            pl: "2%",
                            pr: "2%",
                            height: '300px'
                          }}
                          image={"http://localhost:5000/images/listing/" + listing[formAllListings.imagenes][0]}
                          alt="random"
                          onError={(e)=>{
                            if(e.target.src===`http://localhost:5000/images/listing/${listing[formAllListings.imagenes][0]}`){
                              e.target.src="https://programacion.net/files/article/20161110041116_image-not-found.png";
                            }
                          }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                          >
                            {listing[formAllListings.titulo]}
                          </Typography>
                          <Typography>{listing[formAllListings.descripcion]}</Typography>
                        </CardContent>
                        <CardActions>
                          <Box sx={{ padding: "0" }}>
                            <Grid container spacing={2}>
                              <Grid item xs>
                                <Box display="flex"
                                  justifyContent="center"
                                  alignItems="center">
                                  <Link to={`/listing/details/${listing[formAllListings.idlisting]}`} style={{ textDecoration: "none" }}>
                                    <Button size="small">Ver más detalles</Button>
                                  </Link>
                                </Box>
                              </Grid>
                              <Grid item xs>
                                <Box display="flex"
                                  justifyContent="center"
                                  alignItems="center">
                                  <Button size="small">Contactar</Button>
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Box display="flex"
                                  justifyContent="center"
                                  alignItems="right">
                                  <HoverRating idListing={listing[formAllListings.idlisting]} reviewedByTenants={listing[formAllListings.valoradoEstudiantes]} value={listing[formAllListings.valoracion] || 0} />
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box display="flex"
                                  justifyContent="center"
                                  alignItems="center">
                                  <Tooltip title="Delete" placement="right">
                                    <Link to="/Historial" replace>
                                    <IconButton onClick={() => handleDelete(listing[formAllListings.idlisting])} >
                                      <DeleteIcon />
                                    </IconButton>
                                    </Link>
                                  </Tooltip>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box display="flex"
                                  justifyContent="center"
                                  alignItems="center">
                                  <Tooltip title="Editar" placement="right">
                                    <Link to={`/listing/update/${listing[formAllListings.idlisting]}`} style={{textDecoration:"none"}}>
                                    <IconButton>
                                      <EditIcon />
                                    </IconButton>
                                    </Link>
                                  </Tooltip>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </CardActions>
                      </Card>
                    </Grid>)
                    }else{
                      return(<></>)
                    }
                  })}
                </Grid>
              </Container>
            </main>
          </ThemeProvider>
        </Grid>
      </Box>
    </>
  );
}
