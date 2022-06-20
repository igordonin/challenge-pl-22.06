import * as React from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';

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
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: Implement validation
    if (password !== confirmPassword) {
      return;
    }

    // dispatch(signIn({ email, password }));
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
          <SignUpButton />
          <BottomMenu />
        </Box>
      </Box>
    </Container>
  );
};
