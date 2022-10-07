import { Container, Typography, MenuItem, Select, FormControl, InputLabel, Box, Grid, Divider } from '@mui/material'
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
            <Typography variant="h5" gutterBottom>
                Menciona algunas caracteristicas del inmueble:
            </Typography>
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
            </Grid>
            <br></br>
            <Divider>Otras cosas</Divider>
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
        </Container>
    )
}
