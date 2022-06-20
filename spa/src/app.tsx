import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { TopNavigationBar } from './components/top-navigation-bar';

export const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <TopNavigationBar />
        <Outlet />
      </Container>
    </React.Fragment>
  );
};
