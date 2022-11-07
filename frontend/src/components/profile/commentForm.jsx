import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

export default function CommentForm(props) {

    return (
        <>
            <TextField onChange={(e) => {props.onChange(e)}} name={props.name} multiline fullWidth label={props.label} disabled={props.commentExist || props.sameProfile || props.sameRole} />
            {!(props.commentExist || props.sameProfile) && props.control.errors.content ? (
                <Typography color='red'>{props.control.errors.content}</Typography>
            ) : (
                <></>
            )}
            {props.sameProfile ? (<Typography color='red'>
                {props.msgYourSelf}
            </Typography>) : props.sameRole ? (<Typography color='red'>
                {props.msgLandlord}
            </Typography>) : props.commentExist ? (<Typography color='red'>
                {props.msgOnce}
            </Typography>) : (<></>)}
            <Box sx={{
                float: "right",
                margin: "20px 0px"
            }} >
                <Button variant="outlined" type='submit' disabled={props.commentExist || props.sameProfile || props.sameRole}>Comentar</Button>
            </Box>
        </>
    )
}
