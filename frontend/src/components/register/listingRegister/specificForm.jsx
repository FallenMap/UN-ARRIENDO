import { Container, Typography, MenuItem, Select, FormControl, InputLabel, Box, Grid, Divider, TextField } from '@mui/material'
import BinaryRadio from './binaryRadio';
import { React, useState } from 'react'
import { formAllListings } from '../../../adapters/formAdapters';

export default function SpecificForm(props) {
    const [stratum, setStratum] = useState(undefined);

    const handleChange = (event) => {
        setStratum(event.target.value);
    };


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
                <BinaryRadio name={formAllListings.mascotas} startValue={props.data.get(formAllListings.mascotas) || ''} />
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                        ¿Es Compartido?
                    </Typography>
                </Grid>
                <BinaryRadio name={formAllListings.compartido} startValue={props.data.get(formAllListings.compartido) || ''} />
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                        ¿Tiene bicicletero?
                    </Typography>
                </Grid>
                <BinaryRadio name={formAllListings.bicicletero} startValue={props.data.get(formAllListings.bicicletero) || ''} />
                <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                        ¿Tiene almacén?
                    </Typography>
                </Grid>
                <BinaryRadio name={formAllListings.almacen} startValue={props.data.get(formAllListings.almacen) || ''} />

                <Grid item xs={12}>
                    <TextField
                        required
                        id="privateArea-pub"
                        name={formAllListings.areaPrivada}
                        label="Area Privada"
                        type="number"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        multiline
                        defaultValue={props.data.get(formAllListings.areaPrivada) || ""}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="communalAreas-pub"
                        name={formAllListings.areasComunitarias}
                        label="Areas comunitarias"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        multiline
                        defaultValue={props.data.get(formAllListings.areasComunitarias) || ""}
                    />
                </Grid>

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
                        onChange={handleChange}
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
                    <InputLabel id="bathrooms-simple-select-label">Número de baños privados</InputLabel>
                    <Select
                        labelId="bathrooms-simple-select-label"
                        id="bathrooms-simple-select"
                        value={props.data.get(formAllListings.banoPrivado)}
                        label="Numero de baños privados"
                        onChange={handleChange}
                        name={formAllListings.banoPrivado}
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
                    <InputLabel id="rooms-simple-select-label">Número de habitaciones</InputLabel>
                    <Select
                        labelId="rooms-simple-select-label"
                        id="rooms-simple-select"
                        value={ props.data.get(formAllListings.habitaciones) || ''}
                        label="Número de habitaciones"
                        onChange={handleChange}
                        name={formAllListings.habitacion}
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
        </Container>
        
    )
}
