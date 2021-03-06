import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { Grid, TextField } from '@mui/material';
import { StoreState } from '../../../root-reducer';
import { KpisModel } from './create-update.types';
import { saveKpisStep } from './create-update.state';

export const KpisInfo = () => {
  const initialValue = ReactRedux.useSelector((state: StoreState) => {
    return state.createUpdateCustomer.kpis;
  });

  const [model, setModel] = React.useState<KpisModel>(initialValue);

  const setProperty = (name: string, value: string | null | undefined) => {
    setModel({
      ...model,
      [name]: value,
    });
  };

  const dispatch = ReactRedux.useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(saveKpisStep(model));
    };
  }, [model]);

  const {
    customerEffortScore,
    customerSatisfactionScore,
    leadScore,
    netPromoterScore,
  } = model;

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            value={customerEffortScore}
            onChange={(e) => {
              setProperty('customerEffortScore', e.target.value);
            }}
            label="Customer Effort Score"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={customerSatisfactionScore}
            onChange={(e) => {
              setProperty('customerSatisfactionScore', e.target.value);
            }}
            label="Customer Satisfaction Score"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={leadScore}
            onChange={(e) => {
              setProperty('leadScore', e.target.value);
            }}
            label="Lead Score"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={netPromoterScore}
            onChange={(e) => {
              setProperty('netPromoterScore', e.target.value);
            }}
            label="Net Promoter Score"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
