import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername } from '../features/user/userSlice';
import { TextField, Button, Container } from '@mui/material';

const Login = () => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const handleLogin = () => {
    if (username && password) {
      dispatch(setUsername(username));
    }
  };

  if (loggedIn) {
    return <div>Welcome, {username}</div>;
  }

  return (
    <Container>
      <h2>Login</h2>
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
