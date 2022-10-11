import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { formAllListings } from '../../../adapters/formAdapters';
import { InputLabel, MenuItem, Select, FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import { useState } from 'react';


export default function BasicForm(props) {
    const [postType, setPostType] = useState(undefined);

    const handlerChangeType = (e) => {
        setPostType(e.target.value)
    }

    return (
        <Container>
            {
                props.showTitle ? (
                    <Typography variant="h5" gutterBottom>
                        ¿Qué vas a publicar?
                    </Typography>
                ) : (<></>)
            }
            <Grid container spacing={4}>
                {
                    props.showSelectType ? (
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="standard">
                                <InputLabel>Elige un tipo de inmueble:</InputLabel>
                                <Select name={formAllListings.tipo} onChange={handlerChangeType} value={postType || props.data.get(formAllListings.tipo) || ''}>
                                    <MenuItem value="Apartaestudio">Apartaestudio</MenuItem>
                                    <MenuItem value="Apartamento">Apartamento</MenuItem>
                                    <MenuItem value="Habitación">Habitación</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    ) : (
                        <></>
                    )
                }

                <Grid item xs={12}>
                    <TextField
                        required
                        id="title-pub"
                        name={formAllListings.titulo}
                        label="Titulo"
                        fullWidth
                        variant="standard"
                        defaultValue={props.data.get(formAllListings.titulo) || ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="description-pub"
                        name={formAllListings.descripcion}
                        label="Descripcion"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        multiline
                        defaultValue={props.data.get(formAllListings.descripcion) || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="address1-pub"
                        name={formAllListings.direccion}
                        label="Dirección"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        defaultValue={props.data.get(formAllListings.direccion) || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="address2-pub"
                        name={formAllListings.complemento}
                        label="Complemento de la dirección"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        defaultValue={props.data.get(formAllListings.complemento) || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="neighborhood-pub"
                        name={formAllListings.barrio}
                        label="Barrio"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        defaultValue={props.data.get(formAllListings.barrio) || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl>
                        <InputLabel htmlFor='outlined-adorment-amount'>Precio</InputLabel>
                        <OutlinedInput
                            id='outlined-adorment-amount'
                            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
                            label="Precio"
                            type="number"
                            name={formAllListings.precio}
                            defaultValue={props.data.get(formAllListings.precio) || ""}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Container>
    )
}


