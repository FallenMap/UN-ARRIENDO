import { Typography } from '@mui/material'
import React from 'react'
import styles from "../../css/renterRegister.module.css";
import { Link } from "react-router-dom";
import { URL_BACKEND } from '../../constantes';
import { Avatar } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

export function UserResult(props) {

    return (
       <Link to={`/profile/${props.data._id}`} style={{ color: "black" }}>
       <div className={styles.dataItem}> 
            {/* <Image src={`${URL_BACKEND}/images/profile/`+ props.data?.photo} alt="Logo" errorIcon={<ErrorProfile/>} style={{maxHeight: '-30%', maxWidth: '-30%'}}/> */}
            <Avatar sx={{width: "35px",height: "35px"}} src={`${URL_BACKEND}/images/profile/`+ props.data?.photo}></Avatar>
            <Typography pl="10px">
            {props.data?.firstName} {props.data?.lastName}
            </Typography>
       </div>
       </Link>
    )
}

export function ListingResult(props) {

    return (
       <Link to={`/listing/details/${props.data._id}`} style={{ color: "black" }}>
       <div className={styles.dataItem}> 
       {/* <Avatar sx={{ width: "35px",height: "35px" }} variant="rounded"><AssignmentIcon /></Avatar> */}
       <Avatar sx={{width: "35px",height: "35px"}} variant="square" src={`${URL_BACKEND}/images/listing/`+ props.data?.photos[0]}><AssignmentIcon /></Avatar>
       <Typography pl="10px">
        {props.data?.title}
       </Typography>
       </div>
       </Link>
    )
}