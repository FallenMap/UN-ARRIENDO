import { Box, Button, TextField } from '@mui/material'
import React from 'react'

export default function CommentForm() {
    const handleSubmitComment = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <form onSubmit={handleSubmitComment}>
                <TextField multiline fullWidth label="Hazle saber a esta persona lo que opinas" />
                <Box sx={{
                    float: "right",
                    margin: "20px 0px"
                }} >
                    <Button variant="outlined" type='submit'>Comentar</Button>
                </Box>
            </form>
        </>
    )
}
