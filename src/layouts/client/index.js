import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../views/Dashboard';
import Navbar from '../../components/Navbar';

const ClientLayout = () => {
  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
      >
        <Routes>
          <Route path="search" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="search" replace />} />
        </Routes>
      </Box>
    </>
  );
};

export default ClientLayout;
