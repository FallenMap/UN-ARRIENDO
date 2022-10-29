import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

export default function CommentForm(props) {

    return (
        <>
            <TextField name={props.name} multiline fullWidth label={props.label} disabled={props.commentExist || props.sameProfile} />
            {props.sameProfile ? (<Typography color='red'>
                No puedes comentar tu propio perfil.
            </Typography>) : props.commentExist ? (<Typography color='red'>
                Solo puedes comentar el perfil una vez.
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
