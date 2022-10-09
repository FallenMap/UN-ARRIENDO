import React, { useRef } from 'react';
import Carousel from 'react-elastic-carousel';
import { Grid, Typography} from '@mui/material'
import Item from './item';
import Navbar from '../navbar/navbar';
import  "../../css/ListingDetail.css";
import {  Box, Container } from '@mui/system';
import imagen from "../../Images/Logo.png";
import { changeBackground } from '../../utilities/changeBackground';



 export function ListingDetails(){

    changeBackground('none');
    var publication = {title: "Apartamento en Teusaquillo",name:"Bryan Smith Colorado Lopez", numberOfContact:"3217342313",description: "I don't know what i should say", photos: [{url: "https://s1.eestatic.com/2020/05/18/como/gatos-mascotas-trucos_490961518_152142875_1706x960.jpg"}, {url: "https://www.tiendanimal.es/articulos/wp-content/uploads/2018/01/que-necesita-un-gato-1200x675.jpg"},{url: "https://estaticos.muyinteresante.es/uploads/images/gallery/60dd8da05bafe884f4c6c56c/gato-slide.jpg"}, {url: "https://estaticos.muyinteresante.es/uploads/images/gallery/60dd8da05bafe884f4c6c56c/gato-slide.jpg"}, {url: "https://estaticos.muyinteresante.es/uploads/images/gallery/60dd8da05bafe884f4c6c56c/gato-slide.jpg"} ], valoracion: '5 estrellas pa'}

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
          carouselRef.current.goTo(publication['photos'].length);
        }
      };

      
    return (
        <>

        <div className="container">
          <Navbar />
        </div>

        <Grid container spacing={2} alignItems="center"  justifyContent="center" backgroundColor="rgba(34, 40, 49, .4)" >

            <Grid item xs={12}>
                <Grid container spacing={1} backgroundColor="rgba(89, 82, 96, .3)" justifyContent='flex-end'>
                    <Grid item xs={12}>
                    <Box
                    sx={{
                        bgcolor: "background.paper",
                        pt: 1,
                        pb: 1,
                        pr: 10
                    }}
                    >
                        <Container maxWidth='sm'>
                          <Grid container spacing={1} justifyContent='center'>
                            <Grid item xs align='center'>
                              <img src={imagen} alt="Logo" style={{maxHeight: '170px', maxWidth: '170px'}}/>
                            </Grid>
                            <Grid item xs>
                            <Typography
                                component="h1"
                                variant="h1"
                                align="center"
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
                    itemPosition='CENTER' 
                    enableAutoPlay 
                    autoPlaySpeed={6000} 
                    onNextStart={onNextStart} 
                    onPrevStart={onPrevStart}
                    onNextEnd={({ index }) => {

                        clearTimeout(resetTimeout)
                        if (index + 1 === publication['photos'].length) {
                        resetTimeout = setTimeout(() => {
                            carouselRef.current.goTo(0)
                        }, 6000) 
                        }
                    }}

                    disableArrowsOnEnd={false}>

                    {
                        publication?.photos.map( (item, i) => 
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
                     {publication['title']}
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
                      AAAAAAAAAAAA AAAAAAAAA AAAAAAAAAA AAAAAAAA AAAAAAAAAAAA AAAAAAAAAAAA AAA AAAAAAA AAAAAAAAAAA AAAA AAAAAAAA AAAAAA AAA AAAAAA AAAAAAAAA AAAAA AAAAAAA AAAAA AAAAAAAAAAAAA
                      </Typography>   

                  </Container>
                </Box>

              </Grid>
                <Grid container spacing={1} sx={{border:'1px solid', marginTop: '10px'}}>

                  <Grid item xs={12} >
                    <Box pl='6%' sx={{marginTop:'10px'}}>
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

                  <Grid item xs>
                    <Box  sx={{marginTop:'10px'}}>
                      <Typography
                        component="h3"
                        align='left'
                        variant="h3"
                        color="text.primary"
                        gutterBottom
                        >
                      Pedro
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs>
                    <Box  sx={{marginTop:'10px'}}>
                      <Typography
                        component="h3"
                        align='left'
                        variant="h3"
                        color="text.primary"
                        gutterBottom
                        >
                      Federico
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs>
                    <Box sx={{marginTop:'10px'}}>
                      <Typography
                        component="h3"
                        align='left'
                        variant="h3"
                        color="text.primary"
                        gutterBottom
                        >
                      Alfredo:
                      </Typography>
                    </Box>
                  </Grid>
                  
                </Grid>
            </Grid>
          </Grid>
          <Grid item xs sx={{border: '1px solid'}}>

            <Grid container> 

              <Grid item xs={12}>

                <Box pl='8%' pt=' 1%'>
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
              <Grid item xs>
               <h1> Alejandro</h1> 
              </Grid>
              <Grid item xs>
                <h1> Alejandro</h1> 
              </Grid>
              <Grid item xs>
                <h1> Alejandro</h1> 
              </Grid>

            </Grid>
            
                
          </Grid>
        </Grid>
        
        
        </>
    )
 }
