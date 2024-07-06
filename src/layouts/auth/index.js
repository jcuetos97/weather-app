import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../../components/Login';

const AuthLayout = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Welcome to My Weather App
        </Typography>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Navigate to="login" replace />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default AuthLayout;
