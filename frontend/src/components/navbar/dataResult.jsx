import { Typography, Stack } from '@mui/material'
import React from 'react'
import { Link } from "react-router-dom";
import { URL_BACKEND } from '../../constantes';
import { Avatar } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';


export function UserResult(props) {

    return (
        <Link to={`/profile/${props.data._id}`} style={{ color: "black" }}>
            <Stack direction="row" spacing={1} maxWidth={300}>
                <Avatar sx={{ width: "35px", height: "35px" }} src={`${URL_BACKEND}/images/profile/` + props.data?.photo}></Avatar>
                <Typography noWrap pl="10px" maxWidth={200}>
                    {props.data?.firstName} {props.data?.lastName}
                </Typography>
            </Stack>
            {/* <Image src={`${URL_BACKEND}/images/profile/`+ props.data?.photo} alt="Logo" errorIcon={<ErrorProfile/>} style={{maxHeight: '-30%', maxWidth: '-30%'}}/> */}
        </Link>
    )
}

export function ListingResult(props) {

    return (
        <Link to={`/listing/details/${props.data._id}`} style={{ color: "black" }}>
            {/* <Avatar sx={{ width: "35px",height: "35px" }} variant="rounded"><AssignmentIcon /></Avatar> */}
            <Stack direction="row" spacing={1} maxWidth={300}>
            <Avatar sx={{ width: "35px", height: "35px" }} variant="square" src={`${URL_BACKEND}/images/listing/` + props.data?.photos[0]}><AssignmentIcon /></Avatar>
            <Typography noWrap pl="10px" maxWidth={200}>
                {props.data?.title}
            </Typography>
            </Stack>
        </Link>
    )
}