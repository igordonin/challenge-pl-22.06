import * as React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { Button, Container, CssBaseline, Grid, Stack } from '@mui/material';
import { Customer } from './modules/crm/customer';

interface AppProps {
  customers?: Customer[]; //fix optional
}

const TopNavigationBar = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Button component={RouterLink} to="/">
            Home
          </Button>
        </Grid>

        <Grid item xs={8}>
          <Stack direction={'row-reverse'}>
            <Button component={RouterLink} to="/sign-out">
              Sign Out
            </Button>
            <Button component={RouterLink} to="/sign-up">
              Sign Up
            </Button>
            <Button component={RouterLink} to="/sign-in">
              Sign In
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

const _App = (props: AppProps) => {
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

interface AppStateToProps {}

const mapStateToProps = ({}: StoreState): AppStateToProps => {
  return {};
};

export const App = connect(mapStateToProps)(_App);
