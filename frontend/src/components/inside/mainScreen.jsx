import Navbar from "../navbar/navbar";
import { changeTitle } from "../../utilities/changeTitle";
import { changeBackground } from "../../utilities/changeBackground.js";
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { HoverRating } from "./rating";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";


const jsonprov = [
  { concepto: "mac", importe: 1000, url: "https://s1.eestatic.com/2020/05/18/como/gatos-mascotas-trucos_490961518_152142875_1706x960.jpg" },
  { concepto: "android", importe: 500, url: "https://www.tiendanimal.es/articulos/wp-content/uploads/2018/01/que-necesita-un-gato-1200x675.jpg" },
  { concepto: "IOS", importe: 0, url: "https://estaticos.muyinteresante.es/uploads/images/gallery/60dd8da05bafe884f4c6c56c/gato-slide.jpg" },
  { concepto: "Ruby", importe: 5000, url: "https://www.fundacion-affinity.org/sites/default/files/el-gato-necesita-tener-acceso-al-exterior.jpg" },
];

const cards = jsonprov;

const theme = createTheme();

export function MainScreen() {
  changeTitle("Main page");
  changeBackground('none');
  return (
    <>
      <Box>
        <div className="container">
          <Navbar />
        </div>

        <Grid container spacing={3} justifyContent="space-around" backgroundColor="rgba(89, 82, 96, .3)">
          <Grid item rowGap={10}>
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
            {" "}
            {/* tarjetas */}
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <main>
                {/* Hero unit */}
                <Container sx={{ py: 8 }} maxWidth="md">
                  {/* End hero unit */}
                  <Grid container spacing={3}>
                    {cards.map((card) => (
                      <Grid item xs={6}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
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
                            image= {card.url}
                            alt="random"
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {card.concepto}
                            </Typography>
                            <Typography>{card.importe}</Typography>
                          </CardContent>
                          <CardActions>
                            <Link to='/pepe'>
                            <Button size="small">Ver más detalles</Button>
                            </Link>
                           
                            <Button size="small">Contactar</Button>
                            <HoverRating />
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
