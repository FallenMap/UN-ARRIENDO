import Navbar from "../navbar/navbar";
import { changeTitle } from "../../utilities/changeTitle";
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const changeImage= () => {
  document.body.style.backgroundImage = "url('https://caracoltv.brightspotcdn.com/dims4/default/a881810/2147483647/strip/true/crop/889x500+220+0/resize/1200x675!/quality/90/?url=http%3A%2F%2Fcaracol-brightspot.s3.amazonaws.com%2Ff1%2F0c%2Fe81ace1d411bb8b27f96bd7fcc7c%2Fviejito-01.png')";
}


const jsonprov = [{"concepto":"mac","importe":1000},{"concepto":"android","importe":500}]
    const results = jsonprov.map(function(elemento) {
 
  return {
   
  concepto:elemento.concepto.toUpperCase(),
  importe:elemento.importe,
  importeIva:elemento.importe*1.21
  }
   
  });
  const cards = results;

const theme = createTheme();

export function MainScreen() {
    changeTitle("Main page");
    changeImage();
  return (
    <>
    <Box >
      <div className="container">
          <Navbar/>              
          </div>

          <Grid container spacing={3} justifyContent="space-around">
          <Grid item  rowGap={10}>
            <Box
              justifItems="center"
              component="img"
              alt="The house from the offer."
              src="https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/kraken_generic_max_width_960/public/01_%C2%BFQu%C3%A9-puedo-hacer-si-mi-gato-est%C3%A1-triste-.png?itok=cOA5aYW-"
            />

            </Grid>
            
            <Grid item xs={12}>
            <Box
                    sx={{
                      bgcolor: 'background.paper',
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
                      <Typography variant="h5" align="center" color="text.secondary" paragraph>
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
            
            <Grid item xs >
                    <ThemeProvider theme={theme}>
                <CssBaseline />
                <main>
                  {/* Hero unit */}
                  <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={3}>


                    {cards.map((card) => (
            <Grid item xs={6} >
        
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    pt: '5%',
                  }}
                  image="https://source.unsplash.com/random"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                   {card.concepto}
                  </Typography>
                  <Typography>
                  {card.importe}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Ver más detalles</Button>
                  <Button size="small">Contactar</Button>
                </CardActions>
              </Card>
            </Grid>
        
        
          ))}

                    </Grid>
                  </Container>
                </main>
              </ThemeProvider>
                      
            </Grid>
          </Grid>
    </Box>
    </>
      
  );
}
  