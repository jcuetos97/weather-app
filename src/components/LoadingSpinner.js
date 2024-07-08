import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingSpinner = () => (
  <div
    data-testid="loading-spinner"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40vh',
    }}
  >
    <CircularProgress />
  </div>
);

export default LoadingSpinner;
