import { useState } from 'react';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicForm from './basicForm';
import PhotosForm from './photosForm';
import SpecificForm from './specificForm';

import { Link } from 'react-router-dom';
import { listingCreateHandlerOnSubmit } from '../../../controllers/listingActionsController';
import { formAllListings } from '../../../adapters/formAdapters';
import useAuth from '../../../auth/useAuth';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const steps = ['Datos basicos', 'Datos especificos', 'Fotos'];
const theme = createTheme();

const translateType = {
    2: "Apartment",
    1: "StudioApartment",
    3: "Room"
}

const translateCleaning = {
    1: "Private",
    2: "Communal"
}

const translateKitchen = {
    1: "Open",
    2: "Closed"
}


const validate = (data, activeStep) => {
    const errors = {};
    if (!data[formAllListings.tipo]) {
        errors[formAllListings.tipo] = "*Tienes que seleccionar una opcion"
    } else {
        delete errors[formAllListings.tipo];
    }

    if (!data[formAllListings.titulo]) {
        errors[formAllListings.titulo] = "*Este campo no puede estar vacio"
    } else {
        delete errors[formAllListings.titulo];
    }

    if (!data[formAllListings.descripcion]) {
        errors[formAllListings.descripcion] = "*Este campo no puede estar vacio"
    } else {
        delete errors[formAllListings.descripcion];
    }

    let addressArray = data[formAllListings.direccion].toLowerCase().split(' ');

    if (!data[formAllListings.direccion]) {
        errors[formAllListings.direccion] = "*Este campo no puede estar vacio"
    } else if (!((addressArray.includes('avenida') || 
                addressArray.includes('calle') ||
                addressArray.includes('carrera') ||
                addressArray.includes('transversal') ||
                addressArray.includes('diagonal')) &&
               /[0-9]+/.test(data[formAllListings.direccion]))){
        errors[formAllListings.direccion] = "*Revisa la dirección que ingresaste, no parece tener las caracteristicas de una dirección."

    }else{
        delete errors[formAllListings.direccion];
    }

    if (!data[formAllListings.barrio]) {
        errors[formAllListings.barrio] = "*Este campo no puede estar vacio"
    } else {
        delete errors[formAllListings.barrio];
    }

    if (!data[formAllListings.precio]) {
        errors[formAllListings.precio] = "*Este campo no puede estar vacio"
    } else {
        delete errors[formAllListings.precio];
    }

    if (activeStep === 1) {
        if (data[formAllListings.tipo] === 1) {
            if (!data[formAllListings.areaLimpieza]) {
                errors[formAllListings.areaLimpieza] = "*Debes seleccionar una opción"
            } else {
                delete errors[formAllListings.areaLimpieza];
            }

            if (!data[formAllListings.habitaciones]) {
                errors[formAllListings.habitaciones] = "*Debes indicar el numero de habitaciones."
            } else {
                delete errors[formAllListings.habitaciones];
            }
        }

        if (data[formAllListings.tipo] === 2) {

            if (!data[formAllListings.cocina]) {
                errors[formAllListings.cocina] = "*Debes seleccionar una opción"
            } else {
                delete errors[formAllListings.cocina];
            }


            if (!data[formAllListings.habitaciones]) {
                errors[formAllListings.habitaciones] = "*Debes indicar el numero de habitaciones."
            } else {
                delete errors[formAllListings.habitaciones];
            }
        }

        if (!data[formAllListings.amoblado] || !data[formAllListings.parqueadero] || !data[formAllListings.mascotas] || !data[formAllListings.bicicletero]) {
            errors['binaryOptionsError'] = "*Debes seleccionar una opción en cada pregunta."
        } else {
            delete errors['binaryOptionsError'];
        }

        if (!data[formAllListings.estrato]) {
            errors[formAllListings.estrato] = "*Debes seleccionar una opción"
        } else {
            delete errors[formAllListings.estrato];
        }

        if (!data[formAllListings.numeroBanos]) {
            errors[formAllListings.numeroBanos] = "*Este campo no puede estar vacio"
        } else {
            delete errors[formAllListings.numeroBanos];
        }
    } else {
        delete errors[formAllListings.numeroBanos];
        delete errors[formAllListings.estrato];
        delete errors['binaryOptionsError'];
        delete errors[formAllListings.cocina];
        delete errors[formAllListings.habitaciones];
        delete errors[formAllListings.areaLimpieza];
    }


    return errors;
}

function getStepContent(step, formData, handleChange, control) {
    switch (step) {
        case 0:
            return <BasicForm control={control} handleChange={handleChange} data={formData} showTitle showSelectType />;
        case 1:
            return <SpecificForm control={control} handleChange={handleChange} data={formData} showTitle />;
        case 2:
            return <PhotosForm control={control} handleChange={handleChange} data={formData} />;
        default:
            throw new Error('Unknown step');
    }
}

export default function ListingRegister() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState(new FormData());
    const [control, setControl] = useState({ errors: {} })
    const auth = useAuth();

    const handleAnotherRegister = () => {
        setFormData(new FormData());
        setActiveStep(0);
    }

    let showSuccessText = true;

    const handleNext = () => {
        const { errors, ...data } = control;
        const result = validate(data, activeStep);
        if (Object.keys(result).length > 0) {
            return setControl({ ...control, errors: result });
        } else {
            setControl({ ...control, errors: result });
            let tempFormData = new FormData(document.querySelector('form'));

            for (const pair of tempFormData.entries()) {
                if ([...formData.keys()].indexOf(pair[0]) === -1) {
                    formData.append(pair[0], pair[1]);
                } else if (pair[0] !== "files") {
                    formData.set(pair[0], pair[1]);
                }
            }

            if (steps.length - 1 === activeStep) {
                formData.set(formAllListings.tipo, translateType[formData.get(formAllListings.tipo)]);
                formData.set(formAllListings.cocina, translateKitchen[formData.get(formAllListings.cocina)]);
                formData.set(formAllListings.areaLimpieza, translateCleaning[formData.get(formAllListings.areaLimpieza)]);
                showSuccessText = listingCreateHandlerOnSubmit(auth, formData);
            }

            setActiveStep(activeStep + 1);
        }
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setControl({ ...control, [name]: value });
    }


    const handleBack = () => {
        let tempFormData = new FormData(document.querySelector('form'));
        console.log([...tempFormData]);
        for (const pair of tempFormData.entries()) {
            if ([...formData.keys()].indexOf(pair[0]) === -1) {
                if(pair[0]==="files"){
                    if(pair[1].name){
                        formData.append(pair[0], pair[1]);
                    }
                }else{
                    formData.append(pair[0], pair[1]);
                }
                
            } else if (pair[0] !== "files") {
                formData.set(pair[0], pair[1]);
            }
        }
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 4 }}>
                <Link to='/MainScreen' style={{ textDecoration: "none" }}>
                    <Button variant="contained"><KeyboardBackspaceIcon />&nbsp;Regresar</Button>
                </Link>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Publicación
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <Box justifyContent="center" style={{ textAlign: "center" }}>
                                {showSuccessText ? (
                                    <><Typography variant="h5" gutterBottom>
                                        ¡Se ha realizado la publicación!
                                    </Typography>
                                        <Typography variant="subtitle1">
                                            Esperamos puedas encontrar a la persona indicada:{")"}
                                        </Typography>
                                        <br></br>
                                        <Button onClick={handleAnotherRegister} variant='contained'>
                                            Hacer otra publicacion
                                        </Button></>) : (<><Typography variant="h5" gutterBottom>
                                            Algo malo pasó...
                                        </Typography>
                                            <Typography variant="subtitle1">
                                                No se pudo crear la publicacion, intentalo nuevamente.
                                            </Typography>
                                            <br></br>
                                            <Button onClick={handleAnotherRegister} variant='contained'>
                                                Crear publicación
                                            </Button>
                                        </>)
                                }

                                <br></br>
                                <br></br>
                                <Link to='/MainScreen' style={{ textDecoration: "none" }}>
                                    <Button variant='outlined'>
                                        Regresar al inicio
                                    </Button>
                                </Link>
                            </Box>
                        ) : (
                            <form>
                                {getStepContent(activeStep, formData, handleChange, control)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Regresar
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </React.Fragment>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}
