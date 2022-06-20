import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from '@mui/material';
import { PersonalInfo } from './personal-info';
import { CompanyInfo } from './company-info';
import { KpisInfo } from './kpis-info';

const steps = ['Personal Info', 'Company Info', 'KPIs'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <PersonalInfo />;
    case 1:
      return <CompanyInfo />;
    case 2:
      return <KpisInfo />;
    default:
      throw new Error('Unknown step');
  }
}

export const CustomersCreateUpdate = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Create Customer
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
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    component={Link}
                    to="/"
                    sx={{ mt: 3, ml: 1 }}
                    color={'secondary'}
                  >
                    Cancel
                  </Button>

                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Save Customer' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </>
  );
};
