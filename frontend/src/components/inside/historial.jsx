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
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import { deleteListing } from "../../controllers/listingActionsController";
import CustomizedDialogs from "./contact";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { URL_BACKEND } from "../../constantes";
const theme = createTheme();

export function Historial() {

  const [listings, setListings] = useState([]);
  changeTitle("Historial");

  const auth = useAuth();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getHistoryListings(auth).then((listingsResp) => setListings(listingsResp));
  }, [auth]);

  const handleDelete = (action, idlisting) => {
    if (action) {
      deleteListing(auth, idlisting);
      getHistoryListings(auth).then((listingsResp) =>
        setListings(listingsResp)
      );
    }
    setOpen(false);
  };

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
                      return (
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
                                height: "300px",
                              }}
                              image={
                                `${URL_BACKEND}/images/listing/` +
                                listing[formAllListings.imagenes][0]
                              }
                              alt="random"
                              onError={(e) => {
                                if (
                                  e.target.src ===
                                  `${URL_BACKEND}/images/listing/${
                                    listing[formAllListings.imagenes][0]
                                  }`
                                ) {
                                  e.target.src =
                                    "https://programacion.net/files/article/20161110041116_image-not-found.png";
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
                              <Typography>
                                {listing[formAllListings.descripcion]}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Box sx={{ padding: "0" }}>
                                <Grid container spacing={2}>
                                  <Grid item xs>
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                    >
                                      <Link
                                        to={`/listing/details/${
                                          listing[formAllListings.idlisting]
                                        }`}
                                        style={{ textDecoration: "none" }}
                                      >
                                        <Button size="small">
                                          Ver más detalles
                                        </Button>
                                      </Link>
                                    </Box>
                                  </Grid>
                                  <Grid item xs>
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                    >
                                      <CustomizedDialogs listing={listing} />
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="right"
                                    >
                                      <HoverRating
                                        idListing={
                                          listing[formAllListings.idlisting]
                                        }
                                        reviewedByTenants={
                                          listing[
                                            formAllListings.valoradoEstudiantes
                                          ]
                                        }
                                        value={
                                          listing[formAllListings.valoracion] ||
                                          0
                                        }
                                      />
                                    </Box>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                    >
                                      <Tooltip title="Delete" placement="right">
                                        <IconButton onClick={(e) => { e.preventDefault(); setOpen(true);}}>
                                          <DeleteIcon />
                                        </IconButton>
                                      </Tooltip>
                                      <Dialog
                                        open={open}
                                        onClose={() => {handleDelete(false, listing[formAllListings.idlisting]);}}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                      >
                                        <DialogTitle id="alert-dialog-title">
                                          {
                                            "¿Estás seguro de que quieres eliminar esta publicación?"
                                          }
                                        </DialogTitle>
                                        <DialogContent>
                                          <DialogContentText id="alert-dialog-description">
                                            Ten en cuenta que no podrás recuperar esta información después.
                                          </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                          <Button variant="outlined" onClick={() => { handleDelete(false, listing[formAllListings.idlisting]); }}>
                                            Cancelar
                                          </Button>
                                          <Button
                                            onClick={() => {handleDelete(true, listing[formAllListings.idlisting]);}}
                                            style={{backgroundColor: "red",color: "white",}}
                                            autoFocus
                                          >
                                            Eliminar
                                          </Button>
                                        </DialogActions>
                                      </Dialog>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                    >
                                      <Tooltip title="Editar" placement="right">
                                        <Link
                                          to={`/listing/update/${
                                            listing[formAllListings.idlisting]
                                          }`}
                                          style={{ textDecoration: "none" }}
                                        >
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
                        </Grid>
                      );
                    } else {
                      return <></>;
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
