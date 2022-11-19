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
import {  Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { Radio, Switch,MenuItem, Select } from '@mui/material';

    
export  function ListingsFilter() {

  const [state, setState] = React.useState({
    pet: false,
    furniture: false,
    park: false,
    bici: false
  });

  const handleChangeSwitch = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };


    const [value, setValue] = React.useState('apartment',"room","studioApartment");
   

    const handleChangeRadio = (event) => {
      setValue(event.target.value);
    };
    


    const [values, setValues] = React.useState({
        lowAmount: "",
        upperAmount:"",
        rooms:"",
        bathrooms:"",
        stratum:""

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
                        inputProps={{ min: 1, max: 10 }}
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
                        inputProps={{ min: 1, max: 5 }}
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
                    value={value}
                    onChange={handleChangeRadio}
                    defaultValue="null"
                >
                    <FormControlLabel value="room"  control={<Radio />} label="Habitación" sx={{ color: 'black' }}   />
                    <FormControlLabel value="studioApartment"  control={<Radio />} label="Apartaestudio" sx={{ color: 'black' }} />
                    <FormControlLabel value="apartment"  control={<Radio />} label="Apartamento" sx={{ color: 'black' }} />
                </RadioGroup>
            </FormControl>

            <FormControl>
            <FormLabel id="petTitle" sx={{ fontSize:"90%", mb:1 }}>Pet Friendly</FormLabel>
              <Switch   checked={state.pet}
              onChange={handleChangeSwitch}
              name="pet"
              inputProps={{ 'aria-label': 'controlled' }}/>
            </FormControl>
            <Typography sx={{  margin:"auto" }} >
          
          </Typography>

            <FormControl>
            <FormLabel id="petTitle" sx={{ fontSize:"90%", mb:1 }}>Amoblado</FormLabel>
              <Switch   checked={state.furniture}
              onChange={handleChangeSwitch}
              name="furniture"
              inputProps={{ 'aria-label': 'controlled' }}/>
            </FormControl>
            <Typography sx={{  margin:"auto" }} >
          
          </Typography>

            <FormControl>
            <FormLabel id="petTitle" sx={{ fontSize:"90%", mb:1 }}>Parqueadero</FormLabel>
              <Switch   checked={state.park}
              onChange={handleChangeSwitch}
              name="park"
              inputProps={{ 'aria-label': 'controlled' }}/>
            </FormControl>

            <Typography sx={{  margin:"auto" }} >
          
          </Typography>

            <FormControl>
            <FormLabel id="petTitle" sx={{ fontSize:"90%", mb:1 }}>Bicicletero</FormLabel>
              <Switch   checked={state.bici}
              onChange={handleChangeSwitch}
              name="bici"
              inputProps={{ 'aria-label': 'controlled' }}/>
            </FormControl>

            <FormControl fullWidth sx={{m:2}}>
                    <InputLabel id="stratum-simple-select-label">Estrato</InputLabel>
                    <Select
                        labelId="stratum-simple-select-label"
                        id="stratum"
                        value={values.stratum}
                        label="Estrato"
                        name="stratum"
                        onChange={handleChangeAmount('stratum')}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                    </Select>
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