import { Box } from '@mui/material';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Dashboard from '../../views/Dashboard';

const ClientLayout = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="search" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="search" replace />} />
      </Routes>
    </>
  );
};

export default ClientLayout;
