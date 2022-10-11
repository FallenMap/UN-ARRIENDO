import Navbar from "../navbar/navbar";
import { changeTitle } from "../../utilities/changeTitle";
import { changeBackground } from "../../utilities/changeBackground.js";
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { HoverRating } from "./rating";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import { getAllListings } from "../../controllers/listingActionsController";
import { useState } from "react";
import { useEffect } from "react";
import { formAllListings } from "../../adapters/formAdapters";



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
    buttonMessage='Realizar publicación';
  } else{
    message= '¡Busca tu arriendo soñado!'
    buttonMessage = 'Actualiza tus datos'
  } 

  return (
    <>
      <Box>
        <div className="container">
          <Navbar />
        </div>

        <Grid container spacing={3} justifyContent="space-around">
          <Grid item rowGap={10}>
            <Container sx={{
              marginTop: "10px",
              padding: '10px'
            }}>
              <Box
                justifyItems="center"
                component="img"
                alt="The house from the offer."
                src="https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/kraken_generic_max_width_960/public/01_%C2%BFQu%C3%A9-puedo-hacer-si-mi-gato-est%C3%A1-triste-.png?itok=cOA5aYW-"
              />
            </Container>
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
                  <Link to="/ListingRegister" style={{textDecoration:"none"}}>
                    <Button variant="contained">{buttonMessage}</Button>
                  </Link>
                  <Button variant="outlined">Ver perfil</Button>
                </Stack>
              </Container>
            </Box>
          </Grid>

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
                    {listings.map((listing) => {
                      if (listing[formAllListings.activo]) {
                        return (<Grid item xs={6}>
                          <Card
                            elevation={1}
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
                              src={listing[formAllListings.imagenes][0] ? "http://localhost:5000/images/listing/" + listing[formAllListings.imagenes][0] : "https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png"}
                              alt="first image"
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
                                      alignItems="center">
                                      <HoverRating value={listing[formAllListings.valoracion] || 0} />
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
        </Grid>
      </Box>
    </>
  );
}
