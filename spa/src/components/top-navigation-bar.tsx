import * as ReactRedux from 'react-redux';
import { AppBar, Button, Grid, Stack, Toolbar } from '@mui/material';
import { StoreState } from '../root-reducer';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signOut } from '../modules/auth/auth.state';
import useRequest from '../hooks/use-request';

const AuthenticatedButtons = () => {
  const dispatch = ReactRedux.useDispatch();
  const navigate = useNavigate();

  const { doRequest, errors } = useRequest({
    url: '/auth/signout',
    method: 'post',
    onSuccess: () => {
      dispatch(signOut());
      navigate('/');
    },
  });

  const onClickHandler = async () => {
    await doRequest();
  };

  return <Button onClick={() => onClickHandler()}>Sign Out</Button>;
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

export const TopNavigationBar = () => {
  const auth = ReactRedux.useSelector((state: StoreState) => state.auth);

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
