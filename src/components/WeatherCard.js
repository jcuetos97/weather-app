import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCity } from '../features/weather/weatherSlice';
import { Card, CardContent, Typography, Button } from '@mui/material';

const WeatherCard = ({ city, weather }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeCity(city));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{city}</Typography>
        <Typography variant="body2">
          Temperature: {weather.main.temp}
        </Typography>
        <Typography variant="body2">
          Humidity: {weather.main.humidity}
        </Typography>
        <Typography variant="body2">
          Wind Speed: {weather.wind.speed}
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleRemove}>
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
