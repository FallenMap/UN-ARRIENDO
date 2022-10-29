import React, { useEffect, useState } from 'react';
import { Avatar, Box, CircularProgress, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import Navbar from '../navbar/navbar';
import Comment from './comment';
import { formAllListings, formAllDataUser } from '../../adapters/formAdapters';
import ListingBlock from '../generic/listingBlock';
import useAuth from '../../auth/useAuth';
import { changeBackground } from '../../utilities/changeBackground';
import { changeTitle } from '../../utilities/changeTitle';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../../controllers/userActionsController';
import { capitalize } from '../../utilities/normalizeString';
import { calculateAge } from '../../utilities/generalTools';
import CommentForm from './commentForm';
import Image from 'mui-image';




export default function Profile() {
    const [profile, setProfile] = useState(undefined);
    const { id } = useParams();

    changeBackground('none');

    const auth = useAuth();

    useEffect(() => {
        getUserProfile(auth, id)
            .then(userProfile => {
                changeTitle(`Perfil - ${userProfile[formAllDataUser.username]}`)
                setProfile(userProfile);
            });
    }, [id, auth]);

    console.log(profile)

    const test = [{}, {}]
    return (
        <><Navbar />
            <Container maxWidth="md" sx={{ marginTop: "20px", marginBottom: "50px" }}>
                <Paper sx={{ padding: "10px" }}>
                    <Box sx={{ marginTop: "20px" }}>
                        {!!profile ? (
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <Avatar sx={{
                                            width: "150px",
                                            height: "150px"
                                        }}
                                            onError={() => { return }} // to fix
                                            src={`http://localhost:5000/images/profile/${profile?.[formAllDataUser.link]}`}
                                        ></Avatar>
                                    </Box>
                                </Grid>
                                <Grid item xs>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography variant='h6'>
                                            {profile?.[formAllDataUser.name] && profile?.[formAllDataUser.lastName] ? `${capitalize(profile[formAllDataUser.name])} ${capitalize(profile[formAllDataUser.lastName])}` : "Sin nombre"}
                                        </Typography>
                                        <Typography variant='inherit'>
                                            {profile?.[formAllDataUser.tipo] === "Landlord" ? "Arrendador" : "Estudiante"}
                                        </Typography>
                                        <Typography variant='inherit'>
                                            {profile?.[formAllDataUser.birthDate] ? `${calculateAge(profile[formAllDataUser.birthDate])} años` : "?? Años"}
                                        </Typography>
                                        <Typography variant='inherit'>
                                            {profile?.[formAllDataUser.tipo] === "Landlord" ? profile?.listings.length+" publicaciones" : "Estudiante sin publicaciones"}
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
                                            {profile?.[formAllDataUser.description] ? profile[formAllDataUser.description] : "Vaya... Parece que no hay nada por aqui :("}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{ margin: "20px 0px" }}>
                                        <Divider sx={{ width: "100%" }} />
                                    </Box>
                                </Grid>

                                {
                                    profile?.[formAllDataUser.tipo] === "Landlord" ?
                                        (<>
                                            <Grid item xs={12}>
                                                <Box sx={{
                                                    padding: "0px 20px"
                                                }}>
                                                    {profile?.listings.length > 0 ? (
                                                        <>
                                                            <Typography variant='h5'>
                                                                Actividad reciente
                                                            </Typography>
                                                            <Grid container spacing={3}>
                                                                {profile?.listings.map((listing) => {
                                                                    if (listing[formAllListings.activo]) {
                                                                        return (
                                                                            <Grid item xs={6}>
                                                                                <ListingBlock listing={listing} />
                                                                            </Grid>
                                                                        )
                                                                    } else {
                                                                        return (<></>)
                                                                    }
                                                                })}
                                                            </Grid>
                                                        </>) : (<>
                                                            
                                                                <Grid container spacing={3}>
                                                                    <Grid item xs={12}>
                                                                        <Box display="flex" alignItems="center" justifyContent="center">
                                                                            <Image 
                                                                                src='https://cdn-icons-png.flaticon.com/512/1058/1058677.png?w=360'
                                                                                height="30%"
                                                                                width="30%"
                                                                                fit='cover'    
                                                                            />
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Box display="flex" alignItems="center" justifyContent="center">
                                                                        <Typography variant='h5'>
                                                                            El usuario no tiene publicaciones recientes
                                                                        </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                            
                                                        </>)}
                                                </Box>
                                            </Grid>


                                            <Grid item xs={12}>
                                                <Box sx={{ margin: "30px 0px" }}>
                                                    <Divider sx={{ width: "100%" }} />
                                                </Box>
                                            </Grid>
                                        </>) : (<></>)

                                }

                                <Grid item xs={12}>
                                    <Grid container spacing={5} sx={{ marginBottom: "20px" }}>
                                        <Grid item xs={12}>
                                            <Box sx={{
                                                padding: "20px",
                                            }}>
                                                <CommentForm />
                                                <Typography>
                                                    Aun no funciona, está en progreso :v
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        {
                                            profile?.reviews.map(elem => {
                                                return (
                                                    <Grid item xs={12}>
                                                              <Container maxWidth="md">
                                                                <Paper elevation={2}>
                                                                <Comment></Comment>
                                                                </Paper>
                                                                </Container>
                                                        
                                                    </Grid>)
                                            })
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : (
                            <>
                                <Box display="flex" alignItems="center" justifyContent="center" sx={{
                                    margin: "20px 0px"
                                }}>
                                    <CircularProgress />

                                    <Typography variant='h5'>
                                        &nbsp;&nbsp;&nbsp;&nbsp;Cargando...
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>
                </Paper>
            </Container>
        </>
    )
}
