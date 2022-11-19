import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { Checkbox, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

    
export  function ListingsFilter() {
    
    const [values, setValues] = React.useState({
        lowAmount: "",
        upperAmount:"",
        rooms:"",
        bathrooms:"",
        room: "",
        apartment: "",
        studioApartment:"",
        });


    const handleChangeAmount = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button color='primary' variant="contained" size='medium' onClick={handleClickOpen}>Filtrar</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Filtrar publicaciones por:</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
           
            <FormControl sx={{ m:1, width: '25ch' }}>
            
                <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
                    <OutlinedInput
                        id="lowAmount"
                        value={values.lowAmount}
                        onChange={handleChangeAmount('lowAmount')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                        />
            </FormControl>
            
            <Typography sx={{  margin:"auto" }} >
                a 
            </Typography>
            
            <FormControl sx={{ m:1, width: '25ch' }}>
            
            <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
                <OutlinedInput
                    id="upperAmount"
                    value={values.upperAmount}
                    onChange={handleChangeAmount('upperAmount')}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                    />
            </FormControl>

            <FormControl sx={{  width: '25ch', m:1 }}>
                <TextField
                        id="rooms"
                        value={values.rooms}
                        onChange={handleChangeAmount('rooms')}
                        label="Habitaciones"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
            </FormControl>
            <Typography sx={{  margin:"auto" }} >
          
            </Typography>
            <FormControl sx={{ m:1, width: '25ch' }}>
                <TextField
                        id="bathrooms"
                        value={values.bathrooms}
                        onChange={handleChangeAmount('bathrooms')}
                        label="Baños"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
            </FormControl>

            <FormControl fullWidth sx={{ m:1 }}>
                <FormLabel id="title" sx={{ fontSize:"90%", mb:-1 }}>Tipo inmueble</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value={values.room} onChange={handleChangeAmount('room')} control={<Checkbox />} label="Habitación" sx={{ color: 'black' }}   />
                    <FormControlLabel value={values.studioApartment} onChange={handleChangeAmount('studioApartment')} control={<Checkbox />} label="Apartaestudio" sx={{ color: 'black' }} />
                    <FormControlLabel value={values.apartment} onChange={handleChangeAmount('apartment')} control={<Checkbox />} label="Apartamento" sx={{ color: 'black' }} />
                </RadioGroup>
            </FormControl>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}