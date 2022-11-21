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
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { filterAPI } from "../../api/userAPI";
import { Radio, Switch, MenuItem, Select } from '@mui/material';


export function ListingsFilter({ setListings }) {

  const [state, setState] = React.useState({
    petFriendly: false,
    furnished: false,
    carParking: false,
    bicycleParking: false
  });

  const handleChangeSwitch = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };


  const [value, setValue] = React.useState("All");


  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };



  const [values, setValues] = React.useState({
    priceMin: "",
    priceMax: "",
    roomsMin: "",
    bathroomsMin: "",
    stratum: "Todos"

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

  const applyFilter = (event, reason) => {
    let props = {};
    if (values.priceMin !== "") { props.priceMin = values.priceMin }
    if (values.priceMax !== "") { props.priceMax = values.priceMax }
    if (values.roomsMin !== "") { props.roomsMin = values.roomsMin }
    if (values.bathroomsMin !== "") { props.bathroomsMin = values.bathroomsMin }
    if (values.stratum !== "Todos") { props.stratum = values.stratum }
    if (state.petFriendly !== false) { props.petFriendly = state.petFriendly }
    if (state.furnished !== false) { props.furnished = state.furnished }
    if (state.carParking !== false) { props.carParking = state.carParking }
    if (state.bicycleParking !== false) { props.bicycleParking = state.bicycleParking }
    if (value !== "All") { props.type = value }
    filterAPI(props).then(res => {
      setListings(res.data.listings)
    }).catch(e => {
      console.log("Something bad happened while search" + e);
    });

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

            <FormControl sx={{ m: 1, width: '25ch' }}>

              <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
              <OutlinedInput
                id="priceMin"
                value={values.priceMin}
                onChange={handleChangeAmount('priceMin')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
              />
            </FormControl>

            <Typography sx={{ margin: "auto" }} >
              a
            </Typography>

            <FormControl sx={{ m: 1, width: '25ch' }}>

              <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
              <OutlinedInput
                id="priceMax"
                value={values.priceMax}
                onChange={handleChangeAmount('priceMax')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
              />
            </FormControl>

            <FormControl sx={{ width: '25ch', m: 1 }}>
              <TextField
                id="roomsMin"
                value={values.roomsMin}
                onChange={handleChangeAmount('roomsMin')}
                label="Habitaciones"
                type="number"
                inputProps={{ min: 1, max: 10 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <Typography sx={{ margin: "auto" }} >

            </Typography>
            <FormControl sx={{ m: 1, width: '25ch' }}>
              <TextField
                id="bathroomsMin"
                value={values.bathroomsMin}
                onChange={handleChangeAmount('bathroomsMin')}
                label="Baños"
                type="number"
                inputProps={{ min: 1, max: 5 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }}>
              <FormLabel id="title" sx={{ fontSize: "90%", mb: -1 }}>Tipo inmueble</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChangeRadio}
                defaultValue="all"
              >
                <FormControlLabel value="Room" control={<Radio />} label="Habitación" sx={{ color: 'black' }} />
                <FormControlLabel value="StudioApartment" control={<Radio />} label="Apartaestudio" sx={{ color: 'black' }} />
                <FormControlLabel value="Apartment" control={<Radio />} label="Apartamento" sx={{ color: 'black' }} />
                <FormControlLabel value="All" control={<Radio />} label="Todos" sx={{ color: 'black' }} />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel id="petFriendlyTitle" sx={{ fontSize: "90%", mb: 1 }}>Pet Friendly</FormLabel>
              <Switch checked={state.petFriendly}
                onChange={handleChangeSwitch}
                name="petFriendly"
                inputProps={{ 'aria-label': 'controlled' }} />
            </FormControl>
            <Typography sx={{ margin: "auto" }} >

            </Typography>

            <FormControl>
              <FormLabel id="furnishedTitle" sx={{ fontSize: "90%", mb: 1 }}>Amoblado</FormLabel>
              <Switch checked={state.furnished}
                onChange={handleChangeSwitch}
                name="furnished"
                inputProps={{ 'aria-label': 'controlled' }} />
            </FormControl>
            <Typography sx={{ margin: "auto" }} >

            </Typography>

            <FormControl>
              <FormLabel id="petTitle" sx={{ fontSize: "90%", mb: 1 }}>Parqueadero</FormLabel>
              <Switch checked={state.carParking}
                onChange={handleChangeSwitch}
                name="carParking"
                inputProps={{ 'aria-label': 'controlled' }} />
            </FormControl>

            <Typography sx={{ margin: "auto" }} >

            </Typography>

            <FormControl>
              <FormLabel id="petTitle" sx={{ fontSize: "90%", mb: 1 }}>Bicicletero</FormLabel>
              <Switch checked={state.bicycleParking}
                onChange={handleChangeSwitch}
                name="bicycleParking"
                inputProps={{ 'aria-label': 'controlled' }} />
            </FormControl>

            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="stratum-simple-select-label">Estrato</InputLabel>
              <Select
                labelId="stratum-simple-select-label"
                id="stratum"
                value={values.stratum}
                label="Estrato"
                name="stratum"
                onChange={handleChangeAmount('stratum')}
              >
                <MenuItem value={"Todos"}>Todos</MenuItem>
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
          <Button onClick={applyFilter}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}