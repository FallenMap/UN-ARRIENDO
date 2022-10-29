import { Avatar, Box, Button, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Comment(props) {
  const [editMode, setEditMode] = useState(false);

  const handleEditButton = (idComment) => {
    setEditMode(true);
  }

  const handleDeleteButton = (idComment) => {
    //event.preventDefault();
    console.log(idComment);
  }


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ padding: "5px 25px" }}>
            <Grid container>
              <Grid item xs={1}>
                <Avatar sx={{ width: "50px", height: "50px" }}></Avatar>
              </Grid>
              <Grid item xs={9}>
                <Typography>{props.user}</Typography>
                <Typography variant='body2'>{props.date}</Typography>
              </Grid>
              {props.showTools ? (<Grid item xs={2}>
                <Tooltip title="Edit" placement="right">
                  <IconButton onClick={(e) => {
                    e.preventDefault();
                    handleEditButton(props.id)
                  }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="right">
                  <IconButton onClick={(e) => {
                    e.preventDefault();
                    handleDeleteButton(props.id);
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Grid>) : (<></>)}

            </Grid>

          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ padding: "5px 25px", paddingBottom: "20px" }}>
            {
              editMode ? (
                <>
                  <TextField defaultValue={props.content}/>
                  <Button>Confirm</Button>
                </>
              ) : (
                <Typography variant='inherit'>
                  {props.content}
                </Typography>
              )
            }

          </Box>
        </Grid>

      </Grid>
    </>
  )
}
