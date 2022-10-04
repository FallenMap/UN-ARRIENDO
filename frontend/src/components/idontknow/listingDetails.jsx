import React, { useRef } from 'react';
import Carousel from 'react-elastic-carousel';
import {Button, Grid, Typography} from '@mui/material'
import Item from './item';
import Navbar from '../navbar/navbar';
import "../../css/ListingDetail.css";
import { Box, Container, Stack } from '@mui/system';


 export function ListingDetails(){

    var publication = [{title: "Apartamento en Teusaquillo",name:"Bryan Smith Colorado Lopez", numberOfContact:"3217342313",description: "I don't know what i should say", photos: [{url: "https://s1.eestatic.com/2020/05/18/como/gatos-mascotas-trucos_490961518_152142875_1706x960.jpg"}, {url: "https://www.tiendanimal.es/articulos/wp-content/uploads/2018/01/que-necesita-un-gato-1200x675.jpg"},{url: "https://estaticos.muyinteresante.es/uploads/images/gallery/60dd8da05bafe884f4c6c56c/gato-slide.jpg"} ]}]

    const carouselRef = useRef(null);
    let resetTimeout;

    const onNextStart = (currentItem, nextItem) => {
        if (currentItem.index === nextItem.index) {
          // we hit the last item, go to first item
          carouselRef.current.goTo(0);
        }
      };

    const onPrevStart = (currentItem, nextItem) => {
        if (currentItem.index === nextItem.index) {
          // we hit the first item, go to last item
          carouselRef.current.goTo(publication[0]['photos'].length);
        }
      };

      
    return (
        <>
        

        <div className="container">
          <Navbar />
        </div>

        <Grid container spacing={2} alignItems="center"  justifyContent="center" backgroundColor="rgba(34, 40, 49, .4)" >

            <Grid item xs={12}>
                <Grid container spacing={1} backgroundColor="rgba(89, 82, 96, .3)">
                    <Grid item xs>
                    <Box
                    sx={{
                        bgcolor: "background.paper",
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
                                ¿Eres nuevo en la página? ¡Realiza tu primera publicación!
                                </Typography>
                                <Stack
                                sx={{ pt: 4 }}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                                >
                                <Button variant="contained">Realizar publicación</Button>
                                <Button variant="outlined">Ver perfil</Button>
                                </Stack>
                        </Container>
                    </Box>

                </Grid>

                    <Grid item xs>
                        
                    <Box
              sx={{
                bgcolor: "background.paper",
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
                  ¿Eres nuevo en la página? ¡Realiza tu primera publicación!
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  <Button variant="contained">Realizar publicación</Button>
                  <Button variant="outlined">Ver perfil</Button>
                </Stack>
              </Container>
            </Box>

                    </Grid>
                </Grid>
                

            </Grid>

            <Grid item xs={12}>


                <Carousel 
                    ref={carouselRef} 
                    itemsToShow={1} 
                    itemPosition='CENTER' 
                    enableAutoPlay 
                    autoPlaySpeed={6000} 
                    onNextStart={onNextStart} 
                    onPrevStart={onPrevStart}
                    onNextEnd={({ index }) => {

                        clearTimeout(resetTimeout)
                        if (index + 1 === publication[0]['photos'].length) {
                        resetTimeout = setTimeout(() => {
                            carouselRef.current.goTo(0)
                        }, 6000) 
                        }
                    }}

                    disableArrowsOnEnd={false}>

                    {
                        publication[0]['photos'].map( (item, i) => 
                        <Item item={item}/> 
                        )
                    }

                </Carousel>

            </Grid>


        </Grid>
        </>
    )
 }
