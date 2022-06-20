import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Button,
  CssBaseline,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../root-reducer';
import { fetchCustomers } from './customers.state';
import { Link } from 'react-router-dom';

const columns: GridColDef[] = [
  {
    field: 'fullName',
    headerName: 'Full Name',
    flex: 1,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    flex: 1,
    sortable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
  },
];

export const CustomersHome = () => {
  const customers = useSelector((state: StoreState) => state.customers);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCustomers());
  }, [customers]);

  return (
    <>
      <CssBaseline />

      <Grid container spacing={3} sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={6}>
          <Typography component="h1" variant="h4">
            Customers
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Stack direction="row-reverse" spacing={2}>
            <Button component={Link} to="/customers/new" variant="contained">
              New Customer
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid rows={customers} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};
