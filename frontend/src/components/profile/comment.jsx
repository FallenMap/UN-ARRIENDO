import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

export default function Comment() {
  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ padding: "5px 25px" }}>
                <Grid container>
                  <Grid item xs={1}>
                    <Avatar sx={{ width: "50px", height: "50px" }}></Avatar>
                  </Grid>
                  <Grid item xs={11}>
                    <Typography>Miguel Angel Puentes</Typography>
                    <Typography variant='body2'>11/10/2022</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ padding: "5px 25px", paddingBottom: "20px"}}>
                <Typography variant='inherit'>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
