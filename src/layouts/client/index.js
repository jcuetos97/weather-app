import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../views/Dashboard';

const ClientLayout = () => {
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
          My Weather App
        </Typography>
        <Routes>
          <Route path="search" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="search" replace />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default ClientLayout;
