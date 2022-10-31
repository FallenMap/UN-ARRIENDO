import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

export default function CommentForm(props) {

    return (
        <>
            <TextField name={props.name} multiline fullWidth label={props.label} disabled={props.commentExist || props.sameProfile} />
            {props.sameProfile ? (<Typography color='red'>
                {props.msgYourSelf}
            </Typography>) : props.commentExist ? (<Typography color='red'>
                {props.msgOnce}
            </Typography>) : (<></>)}
            <Box sx={{
                float: "right",
                margin: "20px 0px"
            }} >
                <Button variant="outlined" type='submit' disabled={props.commentExist || props.sameProfile}>Comentar</Button>
            </Box>
        </>
    )
}
