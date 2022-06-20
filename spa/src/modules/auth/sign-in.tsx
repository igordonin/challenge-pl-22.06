import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
  Stack,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signIn } from './auth.state';
import useRequest from '../../hooks/use-request';

interface ControlledFieldsProps {
  value: string;
  onChange: any;
}

const EmailField = ({ value, onChange }: ControlledFieldsProps) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      required
      margin="normal"
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
    />
  );
};

const PasswordField = ({ value, onChange }: ControlledFieldsProps) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      required
      margin="normal"
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
    />
  );
};

const RememberMe = () => {
  return (
    <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
    />
  );
};

const SignInButton = () => {
  return (
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
      Sign In
    </Button>
  );
};

const BottomMenu = () => {
  return (
    <Stack>
      <Button component={Link} to="/">
        Forgot password?
      </Button>

      <Button component={Link} to="/sign-up">
        {"Don't have an account? Sign Up"}
      </Button>
    </Stack>
  );
};

export const SignIn = (): JSX.Element => {
  const dispatch = ReactRedux.useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { doRequest, errors } = useRequest({
    url: 'http://localhost:3000/api/auth/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => {
      dispatch(signIn({ email, password }));
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <EmailField
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <PasswordField
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          {errors && <Alert severity="error">Invalid credentials</Alert>}
          <RememberMe />
          <SignInButton />
          <BottomMenu />
        </Box>
      </Box>
    </Container>
  );
};
