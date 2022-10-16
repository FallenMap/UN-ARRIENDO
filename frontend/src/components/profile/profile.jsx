import React from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import Navbar from '../navbar/navbar';
import Comment from './comment';

export default function Profile() {
    const test = [{}, {}];
    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ marginTop: "20px" }}>
                <Paper sx={{ padding: "10px"}}>
                    <Box sx={{ marginTop: "20px" }}>
                        <Grid container spacing={1}>

                            <Grid item xs={6}>
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <Avatar sx={{
                                        width: "150px",
                                        height: "150px"
                                    }}></Avatar>
                                </Box>
                            </Grid>
                            <Grid item xs>
                                <Box sx={{ marginTop: "20px" }}>
                                    <Typography variant='h6'>
                                        Jhonatan Steven Rodriguez Ibañez
                                    </Typography>
                                    <Typography variant='inherit'>
                                        Arrendador
                                    </Typography>
                                    <Typography variant='inherit'>
                                        19 años
                                    </Typography>
                                    <Typography variant='inherit'>
                                        666 publicaciones :o
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ marginTop: "20px" }}>
                                    <Divider sx={{ width: "100%" }} />
                                </Box>
                            </Grid>


                            <Grid item xs={12}>

                                <Box sx={{
                                    marginTop: "15px",
                                    padding: "20px"
                                }}>
                                    <Typography variant='overline'>
                                        But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ margin: "20px 0px" }}>
                                    <Divider sx={{ width: "100%" }} />
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Container maxWidth="md">
                                    <Grid container spacing={4}>

                                        <Grid item key={1} xs={12} sm={6} md={4}>

                                            <Card
                                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        // 16:9
                                                        pt: '56.25%',
                                                    }}
                                                    image="https://source.unsplash.com/random"
                                                    alt="random"
                                                />
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Heading
                                                    </Typography>
                                                    <Typography>
                                                        This is a media card. You can use this section to describe the
                                                        content.
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">View</Button>
                                                    <Button size="small">Edit</Button>
                                                </CardActions>
                                            </Card>

                                        </Grid>
                                        <Grid item key={1} xs={12} sm={6} md={4}>

                                            <Card
                                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        // 16:9
                                                        pt: '56.25%',
                                                    }}
                                                    image="https://source.unsplash.com/random"
                                                    alt="random"
                                                />
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Heading
                                                    </Typography>
                                                    <Typography>
                                                        This is a media card. You can use this section to describe the
                                                        content.
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">View</Button>
                                                    <Button size="small">Edit</Button>
                                                </CardActions>
                                            </Card>

                                        </Grid>
                                        <Grid item key={1} xs={12} sm={6} md={4}>

                                            <Card
                                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        // 16:9
                                                        pt: '56.25%',
                                                    }}
                                                    image="https://source.unsplash.com/random"
                                                    alt="random"
                                                />
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Heading
                                                    </Typography>
                                                    <Typography>
                                                        This is a media card. You can use this section to describe the
                                                        content.
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">View</Button>
                                                    <Button size="small">Edit</Button>
                                                </CardActions>
                                            </Card>

                                        </Grid>

                                    </Grid>
                                </Container>
                            </Grid>


                            <Grid item xs={12}>
                                <Box sx={{ margin: "30px 0px" }}>
                                    <Divider sx={{ width: "100%" }} />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={5}>
                                    {
                                        test.map(elem => {
                                            return (<Grid item xs={12}><Comment></Comment></Grid>)
                                        })
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}
