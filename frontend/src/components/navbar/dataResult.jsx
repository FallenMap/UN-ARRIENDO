import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import styles from "../../css/renterRegister.module.css";
import Card from "@mui/material/Card";


export function UserResult(props) {

    return (
       <div> {props.data?.firstName}</div>
    )
}

export function ListingResult(props) {

    return (
       <div> {props.data?.title}</div>
    )
}