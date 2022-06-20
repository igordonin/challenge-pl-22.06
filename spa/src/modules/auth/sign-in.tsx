import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signIn } from './auth.state';
import { Stack } from '@mui/material';

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
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signIn({ email, password }));
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
          <RememberMe />
          <SignInButton />
          <BottomMenu />
        </Box>
      </Box>
    </Container>
  );
};
