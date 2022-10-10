import { KeyboardBackspace } from '@mui/icons-material';
import { Button, Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

const theme = createTheme();

export default function ListingUpdate() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 4 }}>
                <Link to='/MainScreen' style={{ textDecoration: "none" }}>
                    <Button variant="contained"><KeyboardBackspace />&nbsp;Regresar</Button>
                </Link>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Actualizacion de datos
                    </Typography><br/>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            asdas
                        </Grid>
                        <Grid item xs>
                            asdad
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant='outlined'>Actualizar</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}
