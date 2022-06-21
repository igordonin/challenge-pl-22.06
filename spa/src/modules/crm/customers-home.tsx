import * as React from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Button, CssBaseline, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../root-reducer';
import { fetchCustomers } from './customers.state';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/use-request';
import {
  loadCustomerUpdateSteps,
  resetSteps,
} from './create-update/create-update.state';

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

  const { doRequest } = useRequest({
    url: '/customers',
    method: 'get',
    onSuccess: (data: any) => {
      dispatch(fetchCustomers(data));
    },
  });

  React.useEffect(() => {
    doRequest();
  }, []);

  const navigate = useNavigate();

  const handleDoubleClick = (
    params: GridRowParams,
    event: React.MouseEvent<HTMLElement>
  ) => {
    const selectedCustomer = customers.find((c) => c._id === params.id);
    dispatch(loadCustomerUpdateSteps(selectedCustomer!));
    navigate(`/customers/${params.id}`);
  };

  const handleNewCustomer = () => {
    dispatch(resetSteps());
    navigate('/customers/new');
  };

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
            <Button onClick={() => handleNewCustomer()} variant="contained">
              New Customer
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={customers}
              columns={columns}
              getRowId={(row) => row._id}
              onRowDoubleClick={handleDoubleClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};
