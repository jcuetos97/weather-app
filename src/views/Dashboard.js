import React from 'react';
import { Container, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import WeatherCard from '../components/WeatherCard';
import SearchInput from '../components/SearchInput';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { cities, weatherData, loading } = useSelector(
    (state) => state.weather,
  );

  return (
    <Container maxWidth="md">
      <h1>Weather App Dashboard</h1>
      <SearchInput />
      {loading && <LoadingSpinner />}
      <Grid container spacing={3}>
        {cities.map((city) => (
          <Grid item xs={12} sm={6} md={4} key={city}>
            <WeatherCard city={city} weather={weatherData[city]} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
