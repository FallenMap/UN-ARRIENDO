import { Container, Typography, MenuItem, Select, FormControl, InputLabel, Box, Grid, Divider, TextField } from '@mui/material'
import BinaryRadio from './binaryRadio';
import { React, useState } from 'react'
import { formAllListings } from '../../../adapters/formAdapters';



export default function SpecificForm(props) {

    const [stratum, setStratum] = useState(undefined);
    /*
    const [cleaningArea, setCleaningArea] = useState(undefined);
    const [kitchen, setKitchen] = useState(undefined);
    */

    const handleChangeStratum = (event,name) => {
        setStratum(event.target.value);
    };

    /*const handleChangeCleaningArea = (event) => {
        setCleaningArea(event.target.value)
    };

    const handleChangeKitchen = (event) => {
        setKitchen(event.target.value)
    };*/

    /* Switch set fields according to the list type */

    function getAdditionalInformation(type) {
        if(type==="Room"){
            type="3";
        }else if(type==="StudioApartment"){
            type="1";
        }else if(type==="Apartment"){
            type="2";
        }

        switch (type) {
            case "1":
                return (
                <>{/*<Box sx={{ minWidth: 120, marginTop:"15px" }}>
                    <FormControl fullWidth required>
                        <InputLabel id="cleaning-simple-select-label">Area de limpieza</InputLabel>
                        <Select
                            labelId="cleaning-simple-select-label"
                            id="cleaning-simple-select"
                            value={cleaningArea || props.data.get(formAllListings.areaLimpieza) === "Private" ? 1 : props.data.get(formAllListings.areaLimpieza) === "Communal" ? 2 : undefined || ''}
                            label="Area de limpieza"
                            onChange={handleChangeCleaningArea}
                            name={formAllListings.areaLimpieza}
                        >
                            <MenuItem value={1}>Privada</MenuItem>
                            <MenuItem value={2}>Comunal</MenuItem>
                        </Select>
                    </FormControl>
                </Box>*/}
                <Box sx={{ minWidth: 120, marginTop:"15px" }}>
                    <FormControl fullWidth required>
                        <TextField name={formAllListings.habitaciones} defaultValue={props.data.get(formAllListings.habitaciones) || ""} label="Numero de habitaciones" type="number" inputProps={{ min: 1, max: 5 }} />
                    </FormControl>
                </Box></>
            );
            case "2":
                return (<>{/*<Box sx={{ minWidth: 120, marginTop:"15px" }}>
                    <FormControl fullWidth required>
                    <InputLabel id="cleaning-simple-select-label">Cocina</InputLabel>
                        <Select
                            labelId="cleaning-simple-select-label"
                            id="cleaning-simple-select"
                            value={kitchen || props.data.get(formAllListings.cocina)==="Open" ? 1 : props.data.get(formAllListings.cocina)==="Closed" ? 2 : undefined || ''}
                            label="Area de limpieza"
                            onChange={handleChangeKitchen}
                            name={formAllListings.cocina}
                        >
                            <MenuItem value={1}>Abierta</MenuItem>
                            <MenuItem value={2}>Cerrada</MenuItem>
                        </Select>
                    </FormControl>
                </Box>*/}
                <Box sx={{ minWidth: 120, marginTop:"15px" }}>
                    <FormControl fullWidth required>
                        <TextField name={formAllListings.habitaciones} defaultValue={props.data.get(formAllListings.habitaciones) || ""} label="Numero de habitaciones" type="number" inputProps={{ min: 1, max: 5 }} />
                    </FormControl>
                </Box></>);
            case "3":
                return (<></>);
            default:
                throw new Error('Unknown step');
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
                <BinaryRadio name={formAllListings.amoblado} startValue={props.data.get(formAllListings.amoblado) || ''}  />
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                        ¿Tiene parqueadero?
                    </Typography>
                </Grid>
                <BinaryRadio name={formAllListings.parqueadero} startValue={props.data.get(formAllListings.parqueadero) || ''}  />
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                        ¿Es Pet-Friendly?
                    </Typography>
                </Grid>
                <BinaryRadio name={formAllListings.bicicletero} startValue={props.data.get(formAllListings.bicicletero) || ''} />
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                        ¿Tiene bicicletero?
                    </Typography>
                </Grid>
                <BinaryRadio name={formAllListings.mascotas} startValue={props.data.get(formAllListings.mascotas) || ''} />
            
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
                        value={stratum || props.data.get(formAllListings.estrato) || ''}
                        label="Estrato"
                        onChange={handleChangeStratum}
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
            </Box>
            <Box sx={{ minWidth: 120, marginTop:"15px" }}>
                <FormControl fullWidth required>
                    <TextField name={formAllListings.numeroBanos} defaultValue={props.data.get(formAllListings.numeroBanos) || ""} label="Numero de baños" type="number" inputProps={{ min: 1, max: 5 }} />
                </FormControl>
            </Box>
            {
                /*getAdditionalInformation(props.data.get(formAllListings.tipo))*/
            }
        </Container>
        
    )
}
