import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Stack,
  Toolbar,
} from '@mui/material';
import { StoreState } from './root-reducer';

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

const TopNavigationBar = () => {
  const auth = useSelector((state: StoreState) => state.auth);

  return (
    <div>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

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
