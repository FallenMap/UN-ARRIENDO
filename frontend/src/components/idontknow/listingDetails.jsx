import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import { Grid, Typography} from '@mui/material'
import Item from './item';
import Navbar from '../navbar/navbar';
import  "../../css/ListingDetail.css";
import {  Box, Container } from '@mui/system';
import imagen from "../../Images/Logo.png";
import { changeBackground } from '../../utilities/changeBackground';
import useAuth from '../../auth/useAuth';
import { getListing } from '../../controllers/listingActionsController';
import { Maping } from './maping';
import Image from 'mui-image';
import { useParams } from 'react-router-dom';



 export function ListingDetails(){

    changeBackground('none');

    const id = useParams();
    
    
    
    const [listing, setlisting] = useState([]);
    const auth = useAuth();
    useEffect(()=>{
    getListing(auth,id).then(listingResp => setlisting(listingResp));
    },[auth,id]);

   

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

      
    return (
        <>

        <div className="container">
          <Navbar />
        </div>

        <Grid container spacing={2} alignItems="center"  justifyContent="center" backgroundColor="rgba(34, 40, 49, .4)" >

            <Grid item xs={12}>
              
                <Grid container spacing={1} backgroundColor="rgba(89, 82, 96, .3)" justifyContent='right'>
                    <Grid item xs={6}>
                    <Box
                    sx={{
                        bgcolor: "background.paper",
                        pt: 1,
                        pb: 1,
                        pr: 10
                    }}
                    >
                        <Container maxWidth='sm'>
                          <Grid container spacing={1}>
                            <Grid item xs>
                              <img src={imagen} alt="Logo" style={{maxHeight: '170px', maxWidth: '170px'}}/>
                            </Grid>
                            <Grid item xs>
                            <Typography
                                component="h1"
                                variant="h1"
                                align="left"
                                color="text.primary"
                                gutterBottom
                                >
                                UN
                                ARRIENDO
                                </Typography>
                            </Grid>
                          </Grid>
                        
                                
                               
                                  

                        </Container>
                    </Box>


                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                        component="h1"
                        variant="h1"
                        align="right"
                        color="text.primary"
                        gutterBottom
                        >
                        UN
                        ARRIENDO
                      </Typography>
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
                        if (index + 1 === listing[0].photos.length) {
                        resetTimeout = setTimeout(() => {
                            carouselRef.current.goTo(0)
                        }, 6000) 
                        }
                    }}

                    disableArrowsOnEnd={false}>

                    {
                        listing?.photos?.map( (item, i) => 
                        <Item item={item}/> 
                        )
                    }

                </Carousel>

            </Grid>



        </Grid>
        <Grid container justifyContent='left'>
          <Grid item xs={8} position='relative' sx={{margin: '20px'}}>
            <Grid item xs={12}   >
                <Box pl='8%' pt=' 1%' >
                  <Typography
                      component="h3"
                      align='left'
                      variant="h3"
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
                      component="body1"
                      variant="body1"
                      align='left'
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
                <Grid item xs={2}>
                  <Image src='https://cdn-icons-png.flaticon.com/512/24/24810.png'></Image>
                </Grid>
                <Grid item xs={10}>
                  <Grid container spacing={2} sx={{border:'1px solid #D5CDCD', marginTop: '10px'}}>
                      
                    <Grid item xs={12} >
                      <Box pl='3%' sx={{marginTop:'10px'}}>
                        <Typography
                            component="h3"
                            align='left'
                            variant="h3"
                            color="text.primary"
                            gutterBottom
                            >
                            Características:
                        </Typography>
                      </Box>
                    </Grid>
                    <Maping listing={listing?.characteristics} type='furnished' name='Amoblado' align='center'/>
                    <Maping listing={listing?.characteristics} type='stratum' name='Estrato'  align='center' />
                    <Maping listing={listing?.characteristics} type='carParking' name='Parqueadero'  align='center'/>
                    <Maping listing={listing?.characteristics} type='privateArea' name='Area Privada'  align='center'/>
                    <Maping listing={listing?.characteristics} type='rooms' name='Habitaciones'  align='center'/>
                    <Maping listing={listing?.characteristics} type='privateBathrooms' name='Baños privados'  align='center'/>
                    <Maping listing={listing?.characteristics} type='bicycleParking' name='Bicicletero'  align='center'/>
                    <Maping listing={listing?.characteristics} type='storage' name='Almacén'  align='center'/>
                    <Maping listing={listing?.characteristics} type='privateBathrooms' name='Baños privados'  align='center'/>


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
                      align='left'
                      variant="h3"
                      color="text.primary"
                      gutterBottom
                      >
                        Información Adicional:
                  
                  </Typography>
                </Box>
              </Grid>
              <Maping listing={listing} type='type' name='Tipo' xs={12} align='left'/>
              <Maping listing={listing} type='address' name='Dirección' xs={12} align='left'/>
              <Maping listing={listing} type='address2' name='Dirección 2' xs={12} align='left'/>
              <Maping listing={listing} type='price' name='Precio' xs={12} align='left'/>
              <Maping listing={listing} type='neighborhood' name='Barrio' xs={12} align='left ' />
      
            </Grid>
            
                
          </Grid>
        </Grid>
        
        
        </>
    )
 }
