import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { PersonalInfoModel } from './create-update.types';
import { savePersonalInfoStep } from './create-update.state';
import { StoreState } from '../../../root-reducer';

export const PersonalInfo = () => {
  const initialValue = useSelector((state: StoreState) => {
    return state.createUpdateCustomer.personalInfo;
  });

  const [personalInfo, setPersonalInfo] =
    React.useState<PersonalInfoModel>(initialValue);

  const setProperty = (name: string, value: string | null | undefined) => {
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(savePersonalInfoStep(personalInfo));
    };
  }, [personalInfo]);

  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    jobTitle,
    lastContactUtcDate,
  } = personalInfo;

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={firstName}
            onChange={(e) => {
              setProperty('firstName', e.target.value);
            }}
            required
            label="First Name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={lastName}
            onChange={(e) => {
              setProperty('lastName', e.target.value);
            }}
            required
            label="Last Name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={email}
            onChange={(e) => {
              setProperty('email', e.target.value);
            }}
            required
            label="E-mail Address"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={phoneNumber}
            onChange={(e) => {
              setProperty('phoneNumber', e.target.value);
            }}
            required
            label="Phone Number"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={jobTitle}
            onChange={(e) => {
              setProperty('jobTitle', e.target.value);
            }}
            required
            label="Job Title"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={DateFnsUtils}>
            <DatePicker
              label="Last Contact Date"
              value={lastContactUtcDate}
              onChange={(newValue) => {
                setProperty('lastContactUtcDate', newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} required variant="standard" />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
