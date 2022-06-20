import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signUp } from './auth.state';
import useRequest from '../../hooks/use-request';

interface ControlledFieldProps {
  value: string;
  onChange: any;
}

const EmailField = ({ value, onChange }: ControlledFieldProps) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      required
      margin="normal"
      fullWidth
      label="Email Address"
      name="email"
      autoFocus
    />
  );
};

interface PasswordFieldProps extends ControlledFieldProps {
  name: string;
  label: string;
}

const PasswordField = ({
  value,
  onChange,
  name,
  label,
}: PasswordFieldProps) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      required
      margin="normal"
      fullWidth
      name={name}
      label={label}
      type="password"
    />
  );
};

const SignUpButton = () => {
  return (
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
      Sign Up
    </Button>
  );
};

const BottomMenu = () => {
  return (
    <Grid container>
      <Grid item>
        <Button component={RouterLink} to="/">
          {'Already have an account? Sign In'}
        </Button>
      </Grid>
    </Grid>
  );
};

export const SignUp = (): JSX.Element => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordMismatch, setPasswordMismatch] = React.useState(false);

  const dispatch = ReactRedux.useDispatch();
  const navigate = useNavigate();

  const { doRequest, errors } = useRequest({
    url: 'http://localhost:3000/api/auth/signup',
    method: 'post',
    body: { email, password },
    onSuccess: () => {
      dispatch(signUp({ email, password }));
      navigate('/');
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    doRequest();
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <EmailField
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <PasswordField
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            name={'password'}
            label={'Password'}
          />
          <PasswordField
            value={confirmPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
            name={'confirm-password'}
            label={'Confirm Password'}
          />
          {errors && (
            <Alert severity="error">
              {errors.message || 'Invalid e-mail and/or password'}
            </Alert>
          )}
          {passwordMismatch && (
            <Alert severity="error">Passwords do not match</Alert>
          )}
          <SignUpButton />
          <BottomMenu />
        </Box>
      </Box>
    </Container>
  );
};
