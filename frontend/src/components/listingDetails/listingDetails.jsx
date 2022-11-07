import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { Button, Grid, Typography, Paper, Avatar, Divider, CircularProgress } from '@mui/material'
import Item from './item';
import Navbar from '../navbar/navbar';
import "../../css/ListingDetail.css";
import { Box, Container } from '@mui/system';
import { changeBackground } from '../../utilities/changeBackground';
import useAuth from '../../auth/useAuth';
import { getListing } from '../../controllers/listingActionsController';
import { Maping } from './maping';
import { capitalize } from '../../utilities/normalizeString';
import Image from 'mui-image';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../../controllers/userActionsController';
import ErrorProfile from './errorProfile';
import { changeTitle } from '../../utilities/changeTitle';
import { HoverRating } from '../inside/rating';
import { formAllListings } from '../../adapters/formAdapters';
import Comment from '../profile/comment';
import { AddRoad, Bathtub, Bed, Chair, CropSquare, HolidayVillage, Inventory, Layers, LocalParking, More, PedalBike, Villa, } from '@mui/icons-material';
import CommentForm from '../profile/commentForm';


export function ListingDetails() {
  changeTitle("Detalles de la publicacion");
  changeBackground('none');

  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const idListing = useParams();
  const [user, setUser] = useState([]);
  const [listing, setlisting] = useState(undefined);
  const auth = useAuth();

  useEffect(() => {
    getListing(auth, idListing).then(listingResp => setlisting(listingResp));
  }, [auth, idListing]);

  let idUser = listing?.landlord

  useEffect(() => {
    getUser(auth, idUser).then(userResp => setUser(userResp));
    window.scroll(0, 0)
  }, [auth, idUser]);

  const carouselRef = useRef(null);
  let resetTimeout;

  const handleWidthScreenChange = (e) => {
    setWidthScreen(window.innerWidth);
  }

  const onNextStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      // we hit the last item, go to first item
      carouselRef.current.goTo(0);
    }
  };


  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 3 },
    { width: 1150, itemsToShow: 3, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 3 },
    { width: 1750, itemsToShow: 3 },
  ];



  const onPrevStart = (currentItem, nextItem) => {
    if (currentItem.index === nextItem.index) {
      // we hit the first item, go to last item
      carouselRef.current.goTo(listing[0]['photos'].length);
    }
  };

  let phoneMessage = user?.phoneNumber
  if (phoneMessage === undefined) phoneMessage = 'No disponible'

  window.addEventListener('resize', handleWidthScreenChange);

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "20px", marginBottom: "50px" }}>
        <Paper sx={{ padding: "10px" }}>
          {listing ? (
            <>
              <Container sx={{ padding: "10px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Container>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={2} md={2}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ verticalAlign: "middle", height: "100%" }}
                          >
                            <Link to={`/profile/${idUser}`} style={{ color: "black" }}>
                              <Avatar
                                src={"http://localhost:5000/images/profile/" + user?.photo}
                                sx={{
                                  height: 100,
                                  width: 100
                                }}
                              />
                            </Link>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={5} md={5}>
                          <Link to={`/profile/${idUser}`} style={{ textDecoration: "none" }}>
                            <Typography
                              component="h5"
                              variant="h5"
                              align={widthScreen < 600 ? ("center") : ("left")}
                              fontFamily='Noto Sans'
                              color="text.primary"
                              gutterBottom
                            >
                              {capitalize(user?.firstName + " " + user?.lastName)}
                            </Typography>
                          </Link>
                          <Typography
                            component="h6"
                            variant="h6"
                            align={widthScreen < 600 ? ("center") : ("left")}
                            fontFamily='Raleway'
                            color="text.primary"
                            gutterBottom
                          >
                            {phoneMessage}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={5} md={5}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography
                                component="h5"
                                variant="h5"
                                align={widthScreen < 600 ? ("center") : ("right")}
                                fontFamily="Noto Sans"
                                color="text.primary"
                                gutterBottom
                              >
                                {listing?.title}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography
                                component="h5"
                                variant="h5"
                                align={widthScreen < 600 ? ("center") : ("right")}
                                fontFamily="Noto Sans"
                                color="text.primary"
                                gutterBottom
                              >
                                ${listing?.price}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Box display="flex"
                                justifyContent={widthScreen < 600 ? ("center") : ("right")}
                                alignItems={widthScreen < 600 ? ("center") : ("right")}>
                                {
                                  listing ? (<HoverRating idListing={listing[formAllListings.idlisting]} reviewedByTenants={listing[formAllListings.valoradoEstudiantes]} value={listing[formAllListings.valoracion] || 0} size="large" />) : (<></>)
                                }
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Container>
                  </Grid>
                  <Divider sx={{
                    width: "100%",
                    margin: "20px 0px"
                  }} />
                  {listing?.photos?.length > 0 ? (
                    <Grid item xs={12}>
                      <Carousel
                        focusOnSelect={true}
                        breakPoints={breakPoints}
                        itemPadding={[10, 10]}
                        itemsToShow={3}
                        outerSpacing={1}
                        ref={carouselRef}
                        position='CENTER'
                        enableAutoPlay
                        autoPlaySpeed={6000}
                        onNextStart={onNextStart}
                        onPrevStart={onPrevStart}
                        onNextEnd={({ index }) => {

                          clearTimeout(resetTimeout)
                          if (index + 1 === listing?.photos.length) {
                            resetTimeout = setTimeout(() => {
                              carouselRef.current.goTo(0)
                            }, 6000)
                          }
                        }}

                        disableArrowsOnEnd={false}>

                        {
                          listing?.photos?.map((item, i) =>
                            <Item key={i} item={item} index={i} />
                          )
                        }

                      </Carousel>
                    </Grid>
                  ) : (
                    <></>
                  )
                  }
                </Grid>
              </Container>
              <Container>
                <Divider sx={{
                  width: "100%",
                  margin: "20px 0px"
                }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={8} md={8} >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sx={{ padding: "0px 10px" }}>
                        <Container sx={{ borderBottom: '3px solid #D5CDCD' }}>
                          <Typography
                            variant="h5"
                            align="left"
                            fontFamily="Josefin Sans"
                            color="text.primary"
                            gutterBottom
                          >
                            Descripción general
                          </Typography>
                          <Typography
                            variant="overline"
                            align="left"
                            fontFamily="Josefin Sans"
                            fontSize={15}
                            color="text.primary"
                            gutterBottom
                          >
                            {listing?.description}
                          </Typography>
                        </Container>
                      </Grid>

                      <Grid item sx={12}>
                        <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                          {widthScreen < 900 ? (<></>) : (
                            <Grid item sm={4} md={4}>
                              <Image src='https://cdn-icons-png.flaticon.com/512/24/24810.png'></Image>
                            </Grid>
                          )}
                          <Grid item xs={12} sm={widthScreen < 900 ? (12) : (8)} md={8}>
                            <Grid container spacing={2} sx={{ border: '1px solid #D5CDCD', marginTop: '10px' }}>
                              <Grid item xs={12} >
                                <Box sx={{ marginTop: '10px', pl: 2 }}>
                                  <Typography
                                    variant="h5"
                                    align="left"
                                    fontFamily="Josefin Sans"
                                    color="text.primary"
                                    gutterBottom
                                  >
                                    Características
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Grid container>
                                  <Maping xs={6} listing={listing?.characteristics} icon={<Chair />} type='furnished' name='Amoblado' align='center' />
                                  <Maping xs={6} listing={listing?.characteristics} icon={<Layers />} type='stratum' name='Estrato' align='center' />
                                  <Maping xs={6} listing={listing?.characteristics} icon={<LocalParking />} type='carParking' name='Parqueadero' align='center' />
                                  <Maping xs={6} listing={listing?.characteristics} icon={<CropSquare />} type='privateArea' name='Area Privada' align='center' />
                                  <Maping xs={6} listing={listing?.characteristics} icon={<Bed />} type='rooms' name='Habitaciones' align='center' />
                                  <Maping xs={6} listing={listing?.characteristics} icon={<Bathtub />} type='privateBathrooms' name='Baños privados' align='center"' />
                                  <Maping xs={6} listing={listing?.characteristics} icon={<PedalBike />} type='bicycleParking' name='Bicicletero' align='center' />
                                  <Maping xs={6} listing={listing?.characteristics} icon={<Inventory />} type='storage' name='Almacén' align='center' />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={widthScreen < 900 ? (12) : (4)} md={4} sx={{ border: '1px solid #D5CDCD', marginTop: '10px' }}>

                    <Grid container spacing={2}>

                      <Grid item xs={12}>

                        <Box pl='6%' pt=' 3%'>
                          <Typography
                            variant="h5"
                            align="left"
                            fontFamily="Josefin Sans"
                            color="text.primary"
                            gutterBottom
                          >
                            Información Adicional

                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Maping listing={listing} icon={<HolidayVillage />} type='type' name='Tipo' xs={12} align='left' />
                        <Maping listing={listing} icon={<AddRoad />} type='address' name='Dirección' xs={12} align='left' />
                        <Maping listing={listing} icon={<More />} type='address2' name='Complemento' xs={12} align='left' />
                        <Maping listing={listing} icon={<Villa />} type='neighborhood' name='Barrio' xs={12} align='left' />
                      </Grid>

                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ border: '1px solid #D5CDCD', marginTop: '15px' }} style={{ padding: "0px" }}>
                    <Grid container sx={{ padding: "0px" }}>
                      <Grid item xs={12}>
                        <Container>
                          <Box pl='6%' pt=' 3%'>
                            <Typography
                              variant="h5"
                              align="left"
                              fontFamily="Josefin Sans"
                              color="text.primary"
                              gutterBottom
                            >
                              Opiniones

                            </Typography>
                          </Box>
                        </Container>
                      </Grid>
                      <Grid item xs={12}>
                        <Container>
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <Divider sx={{ width: "95%", mb: "20px" }} />
                          </Box>
                          <Box>
                            <form>
                              <CommentForm />
                            </form>
                          </Box>
                        </Container>

                      </Grid>
                      <Grid item xs={12} sx={{ marginLeft: '15px', marginRight: '15px', marginBottom: '15px' }}>
                        <Grid container>
                          {listing?.comments?.map((item, i) =>
                            <Grid item xs={12} sm={6} md={6}>
                              <Box sx={{ marginTop: '30px', padding: "5px 25px" }}>
                                <Comment text={item.content} userName={item.firstNameUser} lastName={item.lastNameUser} date={item.date} />
                              </Box>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </>
          ) : (<>
            <Box display="flex" alignItems="center" justifyContent="center" sx={{
              margin: "20px 0px"
            }}>
              <CircularProgress />

              <Typography variant='h5'>
                &nbsp;&nbsp;&nbsp;&nbsp;Cargando...
              </Typography>
            </Box>
          </>)}
        </Paper>
      </Container >
    </>
  )
}
