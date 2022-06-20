import * as React from 'react';
import * as ReactRedux from 'react-redux';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { StoreState } from '../../../root-reducer';
import { CompanyInfoModel } from './create-update.types';
import { saveCompanyInfoStep } from './create-update.state';

export const CompanyInfo = () => {
  const initialValue = ReactRedux.useSelector((state: StoreState) => {
    return state.createUpdateCustomer.companyInfo;
  });

  const [companyInfo, setCompanyInfo] =
    React.useState<CompanyInfoModel>(initialValue);

  const setProperty = (name: string, value: string | null | undefined) => {
    setCompanyInfo({
      ...companyInfo,
      [name]: value,
    });
  };

  const dispatch = ReactRedux.useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(saveCompanyInfoStep(companyInfo));
    };
  }, [companyInfo]);

  const { companyName, companyCountry, companyWebsite } = companyInfo;

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            value={companyName}
            onChange={(e) => {
              setProperty('companyName', e.target.value);
            }}
            required
            label="Company Name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={companyCountry}
            onChange={(e) => {
              setProperty('companyCountry', e.target.value);
            }}
            required
            label="Country"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={companyWebsite}
            onChange={(e) => {
              setProperty('companyWebsite', e.target.value);
            }}
            required
            label="Website"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
