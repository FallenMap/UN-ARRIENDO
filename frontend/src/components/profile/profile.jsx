import React, { useEffect, useState } from 'react';
import { Avatar, Box, CircularProgress, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import Navbar from '../navbar/navbar';
import Comment from './comment';
import useAuth from '../../auth/useAuth';
import { formAllListings, formAllDataUser } from '../../adapters/formAdapters';
import ListingBlock from '../generic/listingBlock';
import { changeBackground } from '../../utilities/changeBackground';
import { changeTitle } from '../../utilities/changeTitle';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../../controllers/userActionsController';
import { capitalize } from '../../utilities/normalizeString';
import { calculateAge, findUserInReviews, sortCommentsProfileByDate, localDate } from '../../utilities/generalTools';
import CommentForm from './commentForm';
import Image from 'mui-image';
import { createComment } from '../../controllers/commentController';




export default function Profile() {
    const [profile, setProfile] = useState(undefined);
    const [comments, setComments] = useState(undefined);
    const { id } = useParams();
    const auth = useAuth();

    // Send comment logic -----
    const handleOnSubmitComment = (event) => {
        event.preventDefault();
        let formData = new FormData(document.querySelector('form')), review = {}, body = {};
        review['content'] = formData.get('content');
        review["firstNameUser"] = auth.user?.[formAllDataUser.name];
        review["lastNameUser"] = auth.user?.[formAllDataUser.lastName];
        body['reviews'] = { ...review };
        body['idProfile'] = id;

        createComment(auth, body)
            .then(res => {
                if (res.comment) {
                    document.querySelector('form').reset();
                    setComments([...comments, res.comment]);
                } else {
                    console.log(res.msg);
                }

            })
    }

    changeBackground('none');
    useEffect(() => {
        window.scroll(0, 0);
        getUserProfile(auth, id)
            .then(userProfile => {
                changeTitle(`Perfil - ${userProfile[formAllDataUser.username]}`);
                setProfile(userProfile);
                setComments(userProfile.reviews);
            });
    }, [id, auth]);

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
                                            {profile?.[formAllDataUser.tipo] === "Landlord" ? profile?.listingAmount + " publicaciones" : ""}
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
                                                                Ultimas publicaciones
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
                                                <form onSubmit={(e) => { handleOnSubmitComment(e) }}>
                                                    <CommentForm 
                                                        name="content" 
                                                        label="Hazle saber a esta persona lo que opinas" 
                                                        commentExist= {comments.length > 0 ? 
                                                            (findUserInReviews(comments, auth.user?.[formAllDataUser.id])) : (false)
                                                        } 
                                                        sameProfile={id === auth.user?.[formAllDataUser.id]}
                                                        msgOnce="Solo puedes comentar el perfil una vez."
                                                        msgYourSelf="No puedes comentar tu propio perfil." />
                                                </form>
                                            </Box>
                                        </Grid>
                                        {
                                            comments && comments.length > 0 ? (
                                                sortCommentsProfileByDate(comments, auth.user?.[formAllDataUser.id]).map(review => {
                                                    return (
                                                        <Grid item xs={12} key={review._id}>
                                                            <Container maxWidth="md">
                                                                <Paper elevation={2}>

                                                                    <Comment isProfile={true} id={review._id} idUser={review.idUser} date={localDate(review.date)} comments={comments} setComments={setComments} content={review.content} firstName={review.firstNameUser} lastName={review.lastNameUser} showTools={review.idUser === auth.user?.[formAllDataUser.id]} />
                                                                </Paper>
                                                            </Container>
                                                        </Grid>)
                                                })) : (
                                                <>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Box display="flex" alignItems="center" justifyContent="center">
                                                                <Image
                                                                    src='https://cdn-icons-png.flaticon.com/512/35/35816.png'
                                                                    height="30%"
                                                                    width="30%"
                                                                    fit='cover'
                                                                />
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Box display="flex" alignItems="center" justifyContent="center">
                                                                <Typography variant='h5'>
                                                                    Este usuario no tiene comentarios aun.
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            )
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
