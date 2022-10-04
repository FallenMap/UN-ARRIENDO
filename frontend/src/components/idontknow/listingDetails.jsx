import React, { useRef } from 'react';
import Carousel from 'react-elastic-carousel';
import {Grid} from '@mui/material'
import Item from './item';
import Navbar from '../navbar/navbar';
import "../../css/ListingDetail.css";


 export function ListingDetails(){

    

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            url: "https://s1.eestatic.com/2020/05/18/como/gatos-mascotas-trucos_490961518_152142875_1706x960.jpg"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            url: "https://www.tiendanimal.es/articulos/wp-content/uploads/2018/01/que-necesita-un-gato-1200x675.jpg"
        },
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            url: "https://estaticos.muyinteresante.es/uploads/images/gallery/60dd8da05bafe884f4c6c56c/gato-slide.jpg"
        }
    ]

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
          carouselRef.current.goTo(items.length);
        }
      };
      
    return (
        <>
        

        <div className="container">
          <Navbar />
        </div>

        <Grid container spacing={2} alignItems="center"  justifyContent="center" >

            <Grid item xs sx={{backgroundColor: 'rgba(0, 0, 0, 0.514)'}}>
                <div>

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
                        if (index + 1 === items.length) {
                        resetTimeout = setTimeout(() => {
                            carouselRef.current.goTo(0)
                        }, 6000) 
                        }
                    }}

                    disableArrowsOnEnd={false}>

                    {
                        items.map( (item, i) => 
                        <Item key={i} item={item}/> 
                        )
                    }

                </Carousel>

                </div>
                

            </Grid>

        </Grid>
        </>
    )
 }
