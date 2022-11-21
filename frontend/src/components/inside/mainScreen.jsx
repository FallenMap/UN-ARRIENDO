import Navbar from "../navbar/navbar";
import { changeTitle } from "../../utilities/changeTitle";
import { changeBackground } from "../../utilities/changeBackground.js";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import { getAllListings } from "../../controllers/listingActionsController";
import { useState } from "react";
import { useEffect } from "react";
import { formAllListings } from "../../adapters/formAdapters";
import ListingBlock from "../generic/listingBlock";
import MapView from "../map/mapView";
import { Fragment } from "react";
import { ListingsFilter } from "./listingsFilter";



const theme = createTheme();

export function MainScreen() {
  const [listings, setListings] = useState([]);

  changeTitle("Pagina principal");
  changeBackground('none');

  const auth = useAuth();




  useEffect(() => {
    getAllListings(auth).then(listingsResp => setListings(listingsResp));
  }, [auth]);



  let message
  let buttonMessage
  if (auth.user?.type === "Landlord") {
    message = '¿Listo para publicar?';
    buttonMessage = 'Realizar publicación';
  } else {
    message = '¡Busca tu arriendo soñado!'
    buttonMessage = 'Actualiza tus datos'
  }

  return (
    <>
      <Box>
        <div className="container">
          <Navbar />
        </div>

        <Grid container spacing={3} justifyContent="space-around">
          <Grid item xs={12}>
            <Box display='flex'
              justifyContent='center'
              alignItems='center'
              sx={{
                marginTop: "10px",
                padding: '10px',
                height:"400px",
              }}>
              <Container style={{
                height:"100%",
                minHeight:"200px", 
                maxHeight:"400px", 
                minWidth:"200px", 
                maxWidth:"600px",
                }}>
                <MapView listings={listings} />
              </Container>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: "white",
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  BIENVENIDO
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  {message}
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >

                  {
                    auth?.user?.type === 'Landlord' ? <Link to="/ListingRegister" style={{ textDecoration: "none" }}>
                      <Button variant="contained">{buttonMessage}</Button>
                    </Link>
                      :
                      <Link to="/StudentUpdate" style={{ textDecoration: "none" }}>
                        <Button variant="contained">{buttonMessage}</Button>
                      </Link>
                  }
                  <Link to={`/profile/${auth?.user?._id}`} style={{ textDecoration: "none" }}>
                    <Button variant="outlined">Ver perfil</Button>
                  </Link>


                </Stack>
              </Container>
            </Box>

            {
              listings.length>0 ? 
              (<Container sx={{ pt: 8 }} maxWidth="md">
                <ListingsFilter setListings = {setListings}/>
              </Container>) : (<Container sx={{ mt: 8 }} maxWidth="md">
                <center>
                <Typography variant="h5">
                  No hay publicaciones en este momento :{'('}
                </Typography>
                </center>
                </Container>)
            } 
          </Grid>
          

          <Grid item xs>
            {" "}
            {/* tarjetas */}
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <main>
                {/* Hero unit */}
                <Container sx={{ pt: 0, pb: 8 }} maxWidth="md">
                  {/* End hero unit */}
                  <Grid container spacing={3}>
                    {listings.map((listing) => {
                      if (listing[formAllListings.activo]) {
                        return (
                          <Grid key={listing._id} item xs={6}>
                            <ListingBlock listing={listing} />
                          </Grid>
                        )
                      } else {
                        return (<Fragment key={listing._id}></Fragment>)
                      }
                    })}
                  </Grid>
                </Container>
              </main>
            </ThemeProvider>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}