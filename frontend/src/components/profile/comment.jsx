import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import { deleteComment, updateComment } from '../../controllers/commentController';
import useAuth from '../../auth/useAuth';
import { capitalize } from '../../utilities/normalizeString';
import { Link } from 'react-router-dom';

const validate = (data) => {
  const errors = {};
  if (!data.content) {
    errors.content = "Este campo no puede estar vacio"
  }

  return errors;
}

export default function Comment(props) {
  const [editMode, setEditMode] = useState(false);
  const [control, setControl] = useState({ errors: {} });
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const auth = useAuth();

  const handleClose = (action, idComment) => {
    if (action) {
      let body;
      if (props.isProfile) {
        body = { idProfile: id };
      } else {
        body = { idListing: id };
      }
      deleteComment(auth, body, props.isProfile)
        .then(msg => {
          const filteredComments = props.comments.filter(comment => comment._id !== idComment);
          props.setComments(filteredComments)
          //console temp
          console.log(msg)
          setOpen(false);
        });

    }else{
      setOpen(false);
    }

  };

  const handleSubmitUpdateComment = (event, idComment) => {
    event.preventDefault();
    const { errors, ...data } = control;
    const result = validate(data);
    if (Object.keys(result).length > 0) {
      return setControl({ ...control, errors: result });
    }
    let body;
    if (props.isProfile) {
      let review = {
        _id: idComment,
        content: control.content,
        firstNameUser: props.firstName,
        lastNameUser: props.lastName
      };
      body = {
        idProfile: id,
        reviews: review
      };
    } else {
      let comment = {
        _id: idComment,
        content: control.content,
        firstNameUser: props.firstName,
        lastNameUser: props.lastName
      };
      body = {
        idListing: id,
        comments: comment
      };
    }
    updateComment(auth, body, props.isProfile)
      .then(msg => {
        const copyComments = [];
        for (let i = 0; i < props.comments.length; i++) {
          if (props.comments[i]._id === idComment) {
            props.comments[i].content = control.content;
            props.comments[i].date = new Date();
          }
          copyComments.push(props.comments[i]);
        }
        window.alert(msg);
        props.setComments(copyComments);
        setEditMode(false);
      });

  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setControl({ ...control, [name]: value });
  }


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ padding: "5px 25px" }}>
            <Grid container>
              <Grid item xs={1}>
                <Link to={'/profile/' + props.idUser} style={{ textDecoration: "none" }}>
                  <Avatar src={"http://localhost:5000/images/profile/id/" + props.idUser} sx={{ width: "50px", height: "50px" }}></Avatar>
                </Link>
              </Grid>
              <Grid item xs={9}>
                <Link to={'/profile/' + props.idUser} style={{ textDecoration: "none", color:"black"}}>
                  <Typography>{capitalize(`${props.firstName} ${props.lastName}`)}</Typography>
                </Link>
                <Typography variant='body2'>{props.date}</Typography>
              </Grid>
              {props.showTools ? (<Grid item xs={2}>
                <Tooltip title="Edit" placement="right">
                  <IconButton onClick={(e) => {
                    e.preventDefault();
                    setEditMode(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="right">
                  <IconButton onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Dialog
                  open={open}
                  onClose={() => { handleClose(false, props.id) }}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"¿Estás seguro de que quieres eliminar este comentario?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Ten en cuenta que no podras recuperar esta información despues.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button variant="outlined" onClick={() => { handleClose(false, props.id) }}>Cancelar</Button>
                    <Button onClick={() => { handleClose(true, props.id) }} style={{ backgroundColor: "red", color: "white" }} autoFocus>
                      Eliminar
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>) : (<></>)}

            </Grid>

          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ padding: "5px 25px", paddingBottom: "20px" }}>
            {
              editMode ? (
                <>
                  <TextField onChange={(e) => handleChange(e)} name="content" defaultValue={props.content} fullWidth />
                  {control.errors.content && <p style={{ color: "red" }}>{`*${control.errors.content}`}</p>}
                  <Box sx={{
                    float: "right",
                    margin: "20px 0px"
                  }} >
                    <Button onClick={(e) => { handleSubmitUpdateComment(e, props.id) }} variant="outlined" type='submit'>Actualizar</Button>
                  </Box>
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
