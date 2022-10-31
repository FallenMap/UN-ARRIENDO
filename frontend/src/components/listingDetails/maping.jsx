import { Box, Grid, Typography } from "@mui/material";

export function Maping(props){
    let temp = props.listing?.[props.type];

    if (temp===true) temp= 'Sí'
        else if (temp===false) temp= 'No'

    if (props.type==='storage'){
      if (temp==='true') temp= 'Sí'
        else if (temp==='false') temp= 'No'
    }

    if (temp===undefined) temp= 'No disponible'

    if (temp==='') temp= 'No aplica.'
    
    if (temp==="Apartment") temp= 'Apartamento'
        else if (temp==="StudioApartment") temp= 'Apartaestudio' 
        else if (temp==='Room') temp= 'Habitación'
        

    return(
        <Grid item xs ={props.xs} >
            <Box pl='6%' sx={{marginTop:'10px'}}>
            
            <Typography
                  component="h6"
                  variant="h6"
                  fontFamily='Raleway'
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  {props.icon}&nbsp;&nbsp;{props?.name}
                </Typography>
                <Typography
                  variant="subtitle"
                  align="center"
                  fontFamily='Josefin Sans'
                  color="text.secondary"
                  paragraph
                >
                  {temp}
                </Typography>
            </Box>
         </Grid>

    )
}