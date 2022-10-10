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


const changeImage = () => {
  document.body.style.backgroundImage =
    "url('https://caracoltv.brightspotcdn.com/dims4/default/a881810/2147483647/strip/true/crop/889x500+220+0/resize/1200x675!/quality/90/?url=http%3A%2F%2Fcaracol-brightspot.s3.amazonaws.com%2Ff1%2F0c%2Fe81ace1d411bb8b27f96bd7fcc7c%2Fviejito-01.png')";
};

/*const jsonprov = [
  { concepto: "mac", importe: 1000 },
  { concepto: "android", importe: 500 },
  { concepto: "IOS", importe: 0 },
  { concepto: "Ruby", importe: 5000 },
];
const results = jsonprov.map(function (elemento) {
  return {
    concepto: elemento.concepto.toUpperCase(),
    importe: elemento.importe,
    importeIva: elemento.importe * 1.21,
  };
});
const cards = results;*/

const theme = createTheme();

export function Historial() {
  /*cons eliminado; 
  setListings(eliminado);*/
  const [listings, setListings] = useState([]);
  changeTitle("Historial");
  changeImage();
  const auth = useAuth();

  useEffect(() => {
    getHistoryListings(auth).then(listingsResp => setListings(listingsResp));
  }, [auth]);

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
                    {listings.map((listing) => (
                      <Grid item xs={6}>
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
                                    <Link to={`/listing/details?id=${listing[formAllListings.idlisting]}`} style={{textDecoration:"none"}}>
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
                                    <HoverRating value={listing[formAllListings.valoracion] || 0} />
                                    <Tooltip title="Delete" placement="right">
                                     <IconButton>
                                       <DeleteIcon />
                                      </IconButton>
                                    </Tooltip>                                    
                                  </Box>
                                  
                                </Grid>
                              </Grid>
                            </Box>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </main>
            </ThemeProvider>
          </Grid>
      </Box>
    </>
  );
}
