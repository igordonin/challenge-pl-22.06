import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

/**
 * 
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  jobTitle: string;
  lastContactUtcDate: string;
 */

export default function AddressForm() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField required label="First Name" fullWidth variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label="Last Name" fullWidth variant="standard" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="E-mail Address"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Phone Number"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required label="Job Title" fullWidth variant="standard" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Last Contact Date"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
