import { Box } from '@mui/material';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Dashboard from '../../views/Dashboard';

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
