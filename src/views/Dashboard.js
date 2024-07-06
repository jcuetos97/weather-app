import React from 'react';
import { Container } from '@mui/material';
import WeatherCard from '../components/WeatherCard';

const Dashboard = () => {
  return (
    <Container maxWidth="sm">
      <WeatherCard />
    </Container>
  );
};

export default Dashboard;
