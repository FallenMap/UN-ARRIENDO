import { KeyboardBackspace } from '@mui/icons-material';
import { Alert, Box, Button, Chip, CircularProgress, Collapse, Container, createTheme, CssBaseline, Divider, Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formAllDataUser, formAllListings } from '../../../adapters/formAdapters';
import useAuth from '../../../auth/useAuth';
import { getListing, updateListing } from '../../../controllers/listingActionsController';
import { changeBackground } from '../../../utilities/changeBackground';
import { changeTitle } from '../../../utilities/changeTitle';
import BasicForm from '../../register/listingRegister/basicForm';
import SpecificForm from '../../register/listingRegister/specificForm';

const theme = createTheme();

const translateCleaning = {
    1: "Private",
    2: "Communal",
    "Private" : 1,
    "Communal" : 2
}

const translateKitchen = {
    1: "Open",
    2: "Closed",
    "Open": 1,
    "Closed":2
}


export default function ListingUpdate() {

    changeTitle("Actualizacion de la publicación");
    changeBackground('none');

    const [listing, setListing] = useState(undefined);
    const [sent, setSent] = useState(false);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams()
    const auth = useAuth();

    const handlerSubmitUpdate = (event) => {
        let listingJSON = {};
        let tempFormData = new FormData(document.querySelector('form'));

        for (let entry of tempFormData.entries()) {
            listing.set(entry[0], entry[1]);
        }

        listing.set(formAllListings.cocina, translateKitchen[listing.get(formAllListings.cocina)]);
        listing.set(formAllListings.areaLimpieza, translateCleaning[listing.get(formAllListings.areaLimpieza)]);

        for (let entry of listing.entries()) {
            listingJSON[entry[0]] = entry[1];
        }

        updateListing(auth, listingJSON)
            .then(success => {
                setSent(success);
                setOpen(!success)
                if (!success) {
                    window.scroll(0, 0);
                }
            }).catch((e) => {console.log("Un error ha ocurrido al actulizar los datos de la publicacion")});

    }
    let idTimeout;

    const redirectWithTime = () => {
        if (!idTimeout) {
            idTimeout = setTimeout(() => {
                navigate(-2)
                idTimeout=undefined;
            }, 5000);
        }
        return "";
    }


    if (!(auth.user?.[formAllDataUser.id] === listing?.get([formAllListings.iduser]))) {
        navigate(-1);
    }

    useEffect(() => {
        getListing(auth, id)
            .then(listing => {

                /* Se mapea los datos de la publicacion en un 
                formdata para reutilizar los componentes del registro */

                let formData = new FormData();
                Object.keys(listing).forEach(key => {
                    if (key === formAllListings.caracteristicas) {
                        Object.keys(listing[key]).forEach(caract => {
                            if(caract===formAllListings.areaLimpieza){
                                formData.append(caract, translateCleaning[listing[key][caract]]);
                            }else if(caract===formAllListings.cocina){
                                formData.append(caract, translateKitchen[listing[key][caract]]);
                            }else{
                                formData.append(caract, listing[key][caract]);
                            }
                        });
                    } else if (key !== formAllListings.imagenes) {
                        formData.append(key, listing[key])
                    }

                });
                setListing(formData)
            })
            .catch(err => console.log("An error ocurred in listingUpdate" + err));
    }, [auth, id]);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm">
                <Collapse in={open}>
                    <Alert severity="error" onClose={() => { setOpen(false) }}>
                        No se ha podido actualizar esta publicacion :{"("}
                    </Alert>
                </Collapse>
            </Container>
            <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 4 }}>

                {
                    !sent ? (
                        <Button variant="contained" onClick={(e) => { navigate(-1); }}><KeyboardBackspace />&nbsp;Regresar</Button>
                    ) : (<></>)
                }
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <form>
                        {
                            !sent ? (
                                <Typography component="h1" variant="h4" align="center">
                                    Actualizacion de datos
                                </Typography>
                            ) : (<></>)
                        }
                        <br />
                        <Grid container spacing={6}>
                            {listing ?
                                !sent ? (<><Grid item xs={12}>
                                    <BasicForm data={listing} />
                                </Grid>
                                    <Grid item xs={12}>
                                        <Divider>
                                            <Chip label="Datos especificos" />
                                        </Divider>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SpecificForm data={listing} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth variant='outlined' onClick={handlerSubmitUpdate}>Actualizar</Button>
                                    </Grid></>) : (
                                    <Grid item xs={12}>
                                        <Box justifyContent="center" style={{ textAlign: "center" }}>
                                            <Typography variant="h5" gutterBottom>
                                                ¡Se ha actualizado la publicacion!
                                            </Typography>
                                            <Typography variant="subtitle1" style={{ marginTop: "20px" }}>
                                                {redirectWithTime()}
                                                Serás redirigido en 5 segundos.
                                            </Typography>
                                        </Box>
                                    </Grid>) : (

                                    <>
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <CircularProgress />
                                            </Box>
                                        </Grid>
                                    </>)}
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}
