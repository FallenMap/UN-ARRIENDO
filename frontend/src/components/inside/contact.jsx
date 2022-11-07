import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useState } from 'react';
import { getUser } from '../../controllers/userActionsController';
import useAuth from '../../auth/useAuth';
import Image from 'mui-image';
import ErrorProfile from '../listingDetails/errorProfile';
import { Box } from '@mui/system';
import { Link } from "react-router-dom";
import { URL_BACKEND } from '../../constantes';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const [user,setUser] = useState([]);
  const auth = useAuth();

  const idUser = props?.listing?.landlord

  useEffect(()=>{
    getUser(auth, idUser).then(userResp => setUser(userResp));
    },[auth, idUser]);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Box display = "flex" justifyContent='center' alignItems='center' sx={{pl:5}}>
      <Button size="small" onClick={handleClickOpen}>
        Contactar
      </Button>
      </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Datos del usuario:
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{pl:4, pb:2}}>
          <Link to={`/profile/${idUser}`} style={{ color: "black" }}>
          <Image src={`${URL_BACKEND}/images/profile/`+ user?.photo} alt="Logo" errorIcon={<ErrorProfile/>} style={{maxHeight: '170px', maxWidth: '170px'}}/>
          </Link>
          </Box>
                    <Typography gutterBottom>
            Nombre: {user?.firstName} {user?.lastName}
          </Typography>
          <Typography gutterBottom>
            Correo: {user?.email}
          </Typography>
          <Typography gutterBottom>
            Número de telefono: {user?.phoneNumber}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
