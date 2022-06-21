import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  CircularProgress,
  Alert,
} from '@mui/material';
import { PersonalInfo } from './personal-info';
import { CompanyInfo } from './company-info';
import { KpisInfo } from './kpis-info';
import useRequest from '../../../hooks/use-request';
import { createCustomer } from '../customers.state';
import { StoreState } from '../../../root-reducer';
import { resetSteps } from './create-update.state';

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
  const dispatch = ReactRedux.useDispatch();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);

  const { _id, personalInfo, companyInfo, kpis } = ReactRedux.useSelector(
    (state: StoreState) => {
      return state.createUpdateCustomer;
    }
  );

  const { doRequest, errors } = useRequest({
    url: _id
      ? `http://localhost:3000/api/customers/${_id}`
      : 'http://localhost:3000/api/customers',
    method: _id ? 'put' : 'post',
    body: {
      ...personalInfo,
      fullName: `${personalInfo.firstName} ${personalInfo.lastName}`,
      company: companyInfo,
      kpis,
    },
    // TODO fix this any
    onSuccess: (data: any) => {
      dispatch(resetSteps());
      dispatch(createCustomer(data));
      navigate('/');
    },
  });

  const handleNext = async () => {
    setActiveStep(activeStep + 1);

    if (activeStep === steps.length - 1) {
      await doRequest();
      setActiveStep(0);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCancel = () => {
    navigate('/');
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
            {_id ? 'Update Customer' : 'Create Customer'}
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
                <Box sx={{ display: 'flex' }} justifyContent={'center'}>
                  <CircularProgress sx={{ marginRight: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Please wait...
                  </Typography>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                {errors && (
                  <Alert sx={{ marginTop: 2 }} severity="error">
                    {errors.message
                      ? errors.message
                          .toString()
                          .split(',')
                          .map((error) => {
                            return <div>{error}</div>;
                          })
                      : 'Something went wrong'}
                  </Alert>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    onClick={() => handleCancel()}
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
