import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername } from '../store/user';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const handleLogin = () => {
    if (username && password) {
      dispatch(setUsername(username));
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/dashboard');
    }
  }, [loggedIn, navigate]);

  return (
    <Container>
      <h2 data-testid="Login-header">Login</h2>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsernameInput(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        style={{ marginTop: '1em' }}
      />
      <Button
        data-testid="Login-button"
        variant="contained"
        color="primary"
        onClick={handleLogin}
        style={{ marginTop: '1em' }}
      >
        Login
      </Button>
    </Container>
  );
};
