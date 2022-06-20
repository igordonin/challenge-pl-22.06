import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Customer } from './customer';
import { Button, Stack } from '@mui/material';

interface CustomersHomeProps {
  customers: Customer[];
}

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

export const CustomersHome = ({ customers }: CustomersHomeProps) => {
  return (
    <div>
      <h1>Customers Home</h1>

      <Stack direction="row-reverse" spacing={2}>
        <Button variant="contained">New Customer</Button>
      </Stack>

      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid rows={customers} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};
