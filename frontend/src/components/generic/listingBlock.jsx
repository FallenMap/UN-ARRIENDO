import React from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CustomizedDialogs from "../inside/contact";
import { HoverRating } from "../inside/rating";
import { formAllListings } from '../../adapters/formAdapters';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ListingBlock(props) {
    return (
        <>
            <Card
                elevation={1}
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
                key={props.listing?.[formAllListings.idlisting]}
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
                    src={props.listing[formAllListings.imagenes][0] ? "http://localhost:5000/images/listing/" + props.listing[formAllListings.imagenes][0] : "https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png"}
                    alt="first image"
                    onError={(e) => {
                        if (e.target.src === `http://localhost:5000/images/listing/${props.listing[formAllListings.imagenes][0]}`) {
                            e.target.src = "https://programacion.net/files/article/20161110041116_image-not-found.png";
                        }
                    }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {props.listing[formAllListings.titulo]}
                    </Typography>
                    <Typography>{props.listing[formAllListings.descripcion]}</Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ padding: "0" }}>
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <Box display="flex"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Link to={`/listing/details/${props.listing[formAllListings.idlisting]}`} style={{ textDecoration: "none" }}>
                                        <Button size="small">Ver más detalles</Button>
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs>
                                <Box display="flex"
                                    justifyContent="center"
                                    alignItems="center">
                                    <CustomizedDialogs listing={props.listing} />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex"
                                    justifyContent="center"
                                    alignItems="center">
                                    <HoverRating idListing={props.listing[formAllListings.idlisting]} reviewedByTenants={props.listing[formAllListings.valoradoEstudiantes]} value={props.listing[formAllListings.valoracion] || 0} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </CardActions>
            </Card>
        </>
    )
}
