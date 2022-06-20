import * as React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { Button, Container, CssBaseline, Grid, Stack } from '@mui/material';
import { Customer } from './modules/crm/customer';
import { StoreState } from './reducers';
import { User } from './modules/auth/user';

interface AppProps {
  customers?: Customer[]; //fix optional
}

interface TopNavigationBarProps {
  auth: User | null;
}

const AuthenticatedButtons = () => {
  return (
    <Button component={RouterLink} to="/sign-out">
      Sign Out
    </Button>
  );
};

const NotAuthenticatedButtons = () => {
  return (
    <>
      <Button component={RouterLink} to="/sign-up">
        Sign Up
      </Button>
    </>
  );
};

const TopNavigationBar = ({ auth }: TopNavigationBarProps) => {
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
            {auth && <AuthenticatedButtons />}
            {!auth && <NotAuthenticatedButtons />}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

interface AppProps {
  customers?: Customer[]; //fix optional
  auth: User | null;
}

const _App = (props: AppProps): JSX.Element => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <TopNavigationBar auth={props.auth} />
        <Outlet />
      </Container>
    </React.Fragment>
  );
};

interface AppStateToProps {
  auth: User | null;
}

const mapStateToProps = ({ auth }: StoreState): AppStateToProps => {
  return {
    auth: null,
  };
};

export const App = connect(mapStateToProps)(_App);
