import { Avatar, Box, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Comment(props) {
  return (
    <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ padding: "5px 25px" }}>
                <Grid container>
                  <Grid item xs>
                    <Avatar sx={{ width: "50px", height: "50px" }}></Avatar>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography>{props.userName} {props.lastName} </Typography>
                    <Typography variant='body2'>{props.date}</Typography>                    
                  </Grid>
                  <Grid item xs={2}>  
                    <Tooltip title="Edit" placement="right">
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="right">
                      <IconButton>
                          <DeleteIcon />
                      </IconButton>
                    </Tooltip> 
                  </Grid>
                </Grid>
                
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ padding: "5px 25px", paddingBottom: "20px"}}>
                <Typography variant='inherit'>
                    {props?.text}
                </Typography>
              </Box>
            </Grid>
            
          </Grid>
    </>
  )
}
