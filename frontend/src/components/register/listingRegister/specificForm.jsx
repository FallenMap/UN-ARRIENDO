import { Container, Typography, MenuItem, Select, FormControl, InputLabel, Box, Grid, Divider, TextField } from '@mui/material'
import BinaryRadio from './binaryRadio';
import { React, useState } from 'react'
import { formAllListings } from '../../../adapters/formAdapters';
import { normalize } from '../../../utilities/normalizeString';



export default function SpecificForm(props) {

    const [stratum, setStratum] = useState(props.data.get(formAllListings.estrato));
    const [cleaningArea, setCleaningArea] = useState(undefined);
    const [kitchen, setKitchen] = useState(undefined);

    const handleChangeStratum = (event, name) => {
        setStratum(event.target.value);
    };

    const handleChangeCleaningArea = (event) => {
        setCleaningArea(event.target.value)
    };

    const handleChangeKitchen = (event) => {
        setKitchen(event.target.value)
    };

    /* Switch set fields according to the list type */

    function getAdditionalInformation(type) {
        type=normalize(type);
        if(type==="Room" || type==="Habitacion"){
            type="3";
        }else if(type==="StudioApartment" || type==="Apartaestudio"){
            type="1";
        }else if(type==="Apartment" || type==="Apartamento"){
            type="2";
        }

        switch (type) {
            case "1":
                return (
                <><Box sx={{ minWidth: 120, marginTop:"15px" }}>
                    <FormControl fullWidth required>
                        <InputLabel id="cleaning-simple-select-label">Area de limpieza</InputLabel>
                        <Select
                            labelId="cleaning-simple-select-label"
                            id="cleaning-simple-select"
                            value={cleaningArea || props.data.get(formAllListings.areaLimpieza) || ''}
                            label="Area de limpieza"
                            onChange={(e) => {
                                handleChangeCleaningArea(e);
                                props.handleChange(e);
                            }}
                            name={formAllListings.areaLimpieza}
                        >
                            <MenuItem value={1}>Privada</MenuItem>
                            <MenuItem value={2}>Comunal</MenuItem>
                        </Select>
                    </FormControl>
                    {props.control?.errors?.[formAllListings.areaLimpieza] && <p style={{ color: "red" }}>{`${props.control.errors?.[formAllListings.areaLimpieza]}`}</p>}
                </Box>
                <Box sx={{ minWidth: 120, marginTop:"15px" }}>
                    <FormControl fullWidth required>
                        <TextField onChange={props.handleChange} name={formAllListings.habitaciones} defaultValue={props.data.get(formAllListings.habitaciones) || ""} label="Numero de habitaciones" type="number" inputProps={{ min: 1, max: 5 }} />
                        {props.control?.errors?.[formAllListings.habitaciones] && <p style={{ color: "red" }}>{`${props.control.errors?.[formAllListings.habitaciones]}`}</p>}
                    </FormControl>
                </Box></>
            );
            case "2":
                return (<><Box sx={{ minWidth: 120, marginTop:"15px" }}>
                    <FormControl fullWidth required>
                    <InputLabel id="kitchen-simple-select-label">Cocina</InputLabel>
                        <Select
                            labelId="kitchen-simple-select-label"
                            id="kitchen-simple-select"
                            value={kitchen || props.data.get(formAllListings.cocina) || ''}
                            label="Cocina"
                            onChange={(e)=>{
                                handleChangeKitchen(e)
                                props.handleChange(e);
                            }}
                            name={formAllListings.cocina}
                        >
                            <MenuItem value={1}>Abierta</MenuItem>
                            <MenuItem value={2}>Cerrada</MenuItem>
                        </Select>
                    </FormControl>
                    {props.control?.errors?.[formAllListings.cocina] && <p style={{ color: "red" }}>{`${props.control.errors?.[formAllListings.cocina]}`}</p>}
                </Box>
                <Box sx={{ minWidth: 120, marginTop:"15px" }}>
                    <FormControl fullWidth required>
                        <TextField onChange={props.handleChange} name={formAllListings.habitaciones} defaultValue={props.data.get(formAllListings.habitaciones) || ""} label="Numero de habitaciones" type="number" inputProps={{ min: 1, max: 5 }} />
                        {props.control?.errors?.[formAllListings.habitaciones] && <p style={{ color: "red" }}>{`${props.control.errors?.[formAllListings.habitaciones]}`}</p>}
                    </FormControl>
                </Box></>);
            case "3":
                return (<></>);
            default:
                console.log('Unknown step');
        }
    }


    return (
        <Container>
            {
                props.showTitle ? (
                    <Typography variant="h5" gutterBottom>
                        Menciona algunas caracteristicas del inmueble:
                    </Typography>
                ) : (<></>)
            }
            <Grid container spacing={2}>
                <Grid item xs={6} />
                <Grid item xs={3}>
                    <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                        Sí
                    </Box>
                </Grid>
                <Grid item xs={3}>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                        No
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                        ¿Está amoblado?
                    </Typography>
                </Grid>
                <BinaryRadio handleChange={props.handleChange} name={formAllListings.amoblado} startValue={props.data.get(formAllListings.amoblado) || ''}  />
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                        ¿Tiene parqueadero?
                    </Typography>
                </Grid>
                <BinaryRadio handleChange={props.handleChange} name={formAllListings.parqueadero} startValue={props.data.get(formAllListings.parqueadero) || ''}  />
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                        ¿Es Pet-Friendly?
                    </Typography>
                </Grid>
                <BinaryRadio handleChange={props.handleChange} name={formAllListings.mascotas} startValue={props.data.get(formAllListings.mascotas) || ''} />
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                        ¿Tiene bicicletero?
                    </Typography>
                </Grid>
                <BinaryRadio handleChange={props.handleChange} name={formAllListings.bicicletero} startValue={props.data.get(formAllListings.bicicletero) || ''} />
                {props.control?.errors?.['binaryOptionsError'] && <p style={{ color: "red" }}>{`${props.control.errors?.['binaryOptionsError']}`}</p>}
            </Grid>
            <br></br>
            <Divider>Otros detalles</Divider>
            <br></br>
            <Box sx={{ minWidth: 120, marginTop:"15px" }}>
                <FormControl fullWidth required>
                    <InputLabel id="stratum-simple-select-label">Estrato</InputLabel>
                    <Select
                        labelId="stratum-simple-select-label"
                        id="stratum-simple-select"
                        value={stratum || ''}
                        label="Estrato"
                        onChange={(e)=>{
                            handleChangeStratum(e);
                            props.handleChange(e);
                        }}
                        name={formAllListings.estrato}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                    </Select>
                </FormControl>
                {props.control?.errors?.[formAllListings.estrato] && <p style={{ color: "red" }}>{`${props.control.errors?.[formAllListings.estrato]}`}</p>}
            </Box>
            <Box sx={{ minWidth: 120, marginTop:"15px" }}>
                <FormControl fullWidth required>
                    <TextField onChange={props.handleChange} name={formAllListings.numeroBanos} defaultValue={props.data.get(formAllListings.numeroBanos) || ""} label="Numero de baños" type="number" inputProps={{ min: 1, max: 5 }} />
                    {props.control?.errors?.[formAllListings.numeroBanos] && <p style={{ color: "red" }}>{`${props.control.errors?.[formAllListings.numeroBanos]}`}</p>}
                </FormControl>
            </Box>
            {
                getAdditionalInformation(props.data.get(formAllListings.tipo))
            }
        </Container>
        
    )
}
