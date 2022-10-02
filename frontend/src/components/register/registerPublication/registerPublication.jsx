import React from 'react'
import {useState} from 'react';
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

const steps = ['Datos basicos', 'Datos especificos', 'Fotos'];
const theme = createTheme();

function getStepContent(step) {
    switch (step) {
        case 0:
            return <BasicForm />;
        case 1:
            return <Container />;
        case 2:
            return <Container />;
        default:
            throw new Error('Unknown step');
    }
}

export default function RegisterPublication() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
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
                                <Typography variant="h5" gutterBottom>
                                    ¡Se ha realizado la publicación!
                                </Typography>
                                <Typography variant="subtitle1">
                                    Esperamos puedas encontrar a la persona indicada:{")"}
                                </Typography>
                            </Box>
                        ) : (
                            <form>
                                {getStepContent(activeStep)}
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
