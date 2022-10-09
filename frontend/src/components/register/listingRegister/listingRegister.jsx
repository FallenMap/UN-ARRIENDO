import { useState} from 'react';
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
import Navbar from "../../navbar/navbar";

import { redirect } from 'react-router-dom';
import { listingCreateHandlerOnSubmit } from '../../../controllers/listingActionsController';
import { formAllListings } from '../../../adapters/formAdapters';
import { normalize } from '../../../utilities/normalizeString';
import useAuth from '../../../auth/useAuth';

const steps = ['Datos basicos', 'Datos especificos', 'Fotos'];
const theme = createTheme();

const translateType = {
    "Apartamento": "Apartment",
    "Apartaestudio":"StudioApartment",
    "Habitacion":"Room"
}

function getStepContent(step, formData) {
    switch (step) {
        case 0:
            return <BasicForm data={formData}/>;
        case 1:
            return <SpecificForm data={formData}/>;
        case 2:
            return <PhotosForm data={formData}/>;
        default:
            throw new Error('Unknown step');
    }
}

export default function ListingRegister() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState(new FormData());

    const auth = useAuth();

    const handleAnotherRegister = () => {
        setFormData(new FormData());
        setActiveStep(0);
    }

    let showSuccessText = true;

    const handleNext = () => {
        let tempFormData = new FormData(document.querySelector('form'));
        
        for (const pair of tempFormData.entries()) {
            if([...formData.keys()].indexOf(pair[0])===-1){
                formData.append(pair[0], pair[1]);
            }else if(pair[0]!=="files"){
                formData.set(pair[0], pair[1]);
            }
        }
        
        if(steps.length - 1 === activeStep){
            let newType = translateType[normalize(formData.get(formAllListings.tipo))];
            formData.set(formAllListings.tipo, newType);
            showSuccessText = listingCreateHandlerOnSubmit(auth, formData);
        }

        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar></Navbar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
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
                            <Box justifyContent="center" style={{textAlign:"center"}}>
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
                                <Button onClick={()=>{redirect('/MainScreen')}} variant='outlined'>
                                    Regresar al inicio
                                </Button>
                            </Box>
                        ) : (
                            <form>
                                {getStepContent(activeStep, formData)}
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
