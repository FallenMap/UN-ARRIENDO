import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import {Button, Grid, Typography} from '@mui/material'
import Item from './item';
import Navbar from '../navbar/navbar';
import  "../../css/ListingDetail.css";
import {  Box, Container } from '@mui/system';
import { changeBackground } from '../../utilities/changeBackground';
import useAuth from '../../auth/useAuth';
import { getListing } from '../../controllers/listingActionsController';
import { Maping } from './maping';
import Image from 'mui-image';
import { Link, useParams } from 'react-router-dom';
import { getUser } from '../../controllers/userActionsController';
import ErrorProfile from './errorProfile';
import { changeTitle } from '../../utilities/changeTitle';
import { HoverRating } from '../inside/rating';
import { formAllListings } from '../../adapters/formAdapters';
import Comment from '../profile/comment';
import {Chair} from '@mui/icons-material';




 export function ListingDetails(){

  changeTitle("Detalles de la publicacion");
  changeBackground('none');

    const idListing = useParams();
    
    
    
    const [listing, setlisting] = useState(undefined);
  
  
    const auth = useAuth();
    useEffect(()=>{
      getListing(auth, idListing).then(listingResp => setlisting(listingResp));
    },[auth, idListing]);

    const [user,setUser] = useState([]);

    const idUser = listing?.landlord

    useEffect(()=>{
      getUser(auth, idUser).then(userResp => setUser(userResp));
      window.scroll(0,0)
      },[auth, idUser]);
    
    const carouselRef = useRef(null);
    let resetTimeout;

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
      if (phoneMessage===undefined) phoneMessage='No disponible'
      
    return (
        <>
        <Container maxWidth="false " sx={{ maxWidth:'3000px'  }}>
        <div className="container">
          <Navbar />
        </div>

        <Grid container spacing={2} backgroundColor="rgba(34, 40, 49, .4)" >

            <Grid item xs={12}>
              <Grid container backgroundColor="rgba(89, 82, 96, .3)">
                <Grid item xs={5}>
                  <Container>
                  <Grid container>
                    <Grid item xs={4} sx={{marginTop:'10px'}}>
                      <Box sx={{pl:4, pb:2}}>
                          <Link to={`/profile/${idUser}`} style={{ color: "black" }}>
                              <Image src={"http://localhost:5000/images/profile/"+ user?.photo} alt="Logo" errorIcon={<ErrorProfile/>} style={{maxHeight: '170px', maxWidth: '170px'}}/>
                          </Link>
                      </Box>
                    </Grid>
                    <Grid item xs container direction="column" sx={{marginTop: '40px'}}>
                         <Typography
                                  component="h3"
                                  variant="h3"
                                  align="left"
                                  fontFamily='Noto Sans'
                                  color="text.primary"
                                  gutterBottom
                                  >
                                  {user?.firstName} {user?.lastName} {user?.idUser}
                          </Typography>
                          <Typography
                                    component="h3"
                                    variant="h3"
                                    align="left"
                                    fontFamily='Raleway'
                                    color="text.primary"
                                    gutterBottom
                                    >
                                  {phoneMessage}
                          </Typography>
                    </Grid>

                  </Grid>
                  
                  </Container>
                </Grid>
                <Grid item xs container sx={{marginRight:'50px',marginTop:'40px'}}>
                    <Container>

                      
                      <Grid item xs = {12} sx={{marginRight: '20px'}}>
                        <Typography
                          component="h3"
                          variant="h3"
                          align="right"
                          fontFamily="Noto Sans"
                          color="text.primary"
                          gutterBottom
                          >
                          ${listing?.price}
                        </Typography>
                      </Grid>
                      <Grid item xs = {12}>
                      <Box display="flex"
                           justifyContent="right"
                           alignItems="right">
                            {
                             listing ? (<HoverRating idListing={listing[formAllListings.idlisting]} reviewedByTenants={listing[formAllListings.valoradoEstudiantes]} value={listing[formAllListings.valoracion] || 0} size="large"/>):(<></>)
                            }         
                      </Box>

                      </Grid>

                    </Container>
                </Grid>


              </Grid>
            </Grid>
               
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
                        listing?.photos?.map( (item, i) => 
                        <Item item={item} index={i}/> 
                        )
                    }

                </Carousel>

            </Grid>



        </Grid>
        <Grid container justifyContent='"left"'>
          <Grid item xs={8} position='relative' sx={{margin: '20px'}}>
            <Grid item xs={12}   >
                <Box pl='8%' pt=' 1%' >
                  <Typography
                      component="h3"
                      align="left"
                      variant="h3"
                      fontFamily='Alkalami'
                      color="text.primary"
                      sx={{borderBottom: '3px solid #D5CDCD'}}
                      gutterBottom
                      
                      >
                      {listing?.title}
                  </Typography>
                </Box>
            </Grid>
            <Grid item xs>
              <Grid container>

              <Box  pl='8%' pt='1%'>
                  <Container sx={{borderBottom:'3px solid #D5CDCD'}}>
                    
                  <Typography
                      component="h5"
                      variant="h5"
                      align="left"
                      fontFamily="Josefin Sans"
                      fontSize= {20}
                      color="text.primary"
                      gutterBottom
                      > 
                      {listing?.description}
                      </Typography>   

                  </Container>
                </Box>

              </Grid>

              <Grid container spacing={1} sx={{marginTop: '10px'}}>
                <Grid item xs={3}>
                  <Image src='https://cdn-icons-png.flaticon.com/512/24/24810.png'></Image>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={2} sx={{border:'1px solid #D5CDCD', marginTop: '10px'}}>
                      
                    <Grid item xs={12} >
                      <Box  sx={{marginTop:'10px', pl:2}}>
                        <Typography
                            component="h3"
                            align="left"
                            fontFamily="Alkalami"
                            variant="h3"
                            color="text.primary"
                            gutterBottom
                            >
                            Características:
                        </Typography>
                      </Box>
                    </Grid>
                    <Maping listing={listing?.characteristics} icon={<Chair/>} type='furnished' name='Amoblado' align='center'/>
                    <Maping listing={listing?.characteristics} type='stratum' name='Estrato'  align='center' />
                    <Maping listing={listing?.characteristics} type='carParking' name='Parqueadero'  align='center'/>
                    <Maping listing={listing?.characteristics} type='privateArea' name='Area Privada'  align='center'/>
                    <Maping listing={listing?.characteristics} type='rooms' name='Habitaciones'  align='center'/>
                    <Maping listing={listing?.characteristics} type='privateBathrooms' name='Baños privados'  align='center"'/>
                    <Maping listing={listing?.characteristics} type='bicycleParking' name='Bicicletero'  align='center'/>
                    <Maping listing={listing?.characteristics} type='storage' name='Almacén'  align='center'/>


                  </Grid>


                </Grid>
                
                  
                  
              </Grid>
            </Grid>
        </Grid>
          <Grid item xs sx={{border: '1px solid #D5CDCD', marginTop:'10px'}}>

            <Grid container spacing={2}> 

              <Grid item xs={12}>

                <Box pl='6%' pt=' 3%'>
                  <Typography
                      component="h3"
                      align="left"
                      variant="h3"
                      fontFamily="Alkalami"
                      color="text.primary"
                      gutterBottom
                      >
                        Información Adicional:
                  
                  </Typography>
                </Box>
              </Grid>
              <Maping listing={listing} type='type' name='Tipo' xs={12} align='left'/>
              <Maping listing={listing} type='address' name='Dirección' xs={12} align='left'/>
              <Maping listing={listing} type='address2' name='Complemento' xs={12} align='left'/>
              <Maping listing={listing} type='neighborhood' name='Barrio' xs={12} align='left' />
      
            </Grid>
            
                
          </Grid>
          <Grid item xs={12} sx={{border: '1px solid #D5CDCD', marginTop:'15px'}}>
            <Grid container>
              <Grid item xs={6}>
                <Container>
                  <Box pl='6%' pt=' 3%'>
                      <Typography
                          component="h3"
                          align="left"
                          variant="h3"
                          fontFamily="Alkalami"
                          color="text.primary"
                          gutterBottom
                          >
                            Reseñas de la publicación:
                      
                      </Typography>
                  </Box>
                </Container>
              </Grid>
              <Grid item xs={6} >
                <Container>
                <Box pr='3%' pt=' 3%' display="flex" justifyContent="flex-end">
                      <Link to="/StudentUpdate" style={{ textDecoration: "none" }}>
                        <Button variant="contained">Realizar comentario</Button>
                      </Link>
                </Box>
                </Container>
              </Grid>
              <Grid item xs={12} sx={{border: '1px solid #D5CDCD', marginLeft: '15px', marginRight:'15px', marginBottom:'15px'}}>
                <Grid container>

                  {listing?.comments?.map( (item, i) => 
                        <Grid item xs={6}>
                        <Box sx={{ marginTop: '30px', padding: "5px 25px" }}>
                          <Comment text={item.content} userName = {item.firstNameUser} lastName= {item.lastNameUser} date={item.date} />
                        </Box>
                        </Grid>
                        ) }
                
                
                  




                </Grid>

                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Container>
        
        </>
    )
 }