import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { formAllPublication } from '../../../adapters/formAdapters';
import { InputLabel, MenuItem, Select, FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import { useState } from 'react';

export default function BasicForm() {
    const [postType, setPostType] = useState('');

    const handlerChangeType = (e) => {
        setPostType(e.target.value)
    }

    return (
        <Container>
            <Typography variant="h6" gutterBottom>
                ¿Qué vas a publicar?
            </Typography>
            <Grid container spacing={4} style={{
                marginTop: "7px"
            }}>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="standard">
                        <InputLabel>Elige un tipo de inmueble:</InputLabel>
                        <Select name={formAllPublication.tipo} onChange={handlerChangeType} value={postType}>
                            <MenuItem value="Apartaestudio">Apartaestudio</MenuItem>
                            <MenuItem value="Apartamento">Apartamento</MenuItem>
                            <MenuItem value="Habitación">Habitación</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="title-pub"
                        name={formAllPublication.titulo}
                        label="Titulo"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="description-pub"
                        name={formAllPublication.descripcion}
                        label="Descripcion"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        multiline
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="address1-pub"
                        name={formAllPublication.direccion}
                        label="Dirección"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="address2-pub"
                        name={formAllPublication.complemento}
                        label="Complemento de la dirección"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="neighborhood-pub"
                        name={formAllPublication.barrio}
                        label="Barrio"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl>
                        <InputLabel htmlFor='outlined-adorment-amount'>Precio</InputLabel>
                        <OutlinedInput
                            id='outlined-adorment-amount'
                            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                            label="Precio"
                            name={formAllPublication.precio}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    )
}


