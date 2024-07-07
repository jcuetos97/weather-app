import {
  Air,
  DeleteOutline,
  Opacity,
  Thermostat,
  WindPower,
} from '@mui/icons-material';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import classes from '../assets/css/components/WeatherCard.module.css';
import { removeCity } from '../store/weather';

// Function to format climate values
const formatData = (value, type, unit) => {
  if (type === 'temperature') {
    return `${value}° ${unit === 'imperial' ? 'F' : 'C'}`;
  }
  if (type === 'wind') {
    return `${value} ${unit === 'imperial' ? 'mph' : 'm/s'}`;
  }
  return value;
};

const WeatherCard = ({ city, weather, unit = 'imperial' }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeCity(city));
  };

  // Extract icon code and construct the icon URL
  const iconCode = weather?.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <Card className={classes.card__weather__container}>
      <CardContent>
        <Typography
          variant="h5"
          mb={2}
          className={classes.card__weather__header}
        >
          {weather?.name || city}
        </Typography>
        {weather?.weather[0].description && (
          <div className={classes.card__weather__icon}>
            <img src={iconUrl} alt={weather?.weather[0].description} />
          </div>
        )}
        <Grid container rowSpacing={2} className={classes.card__weather__grid}>
          <Grid item>
            <Typography
              variant="body2"
              fontSize="medium"
              className={classes.card__weather__item}
            >
              <Thermostat fontSize="small" />
              Temperature: {formatData(weather?.main.temp, 'temperature', unit)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              fontSize="medium"
              className={classes.card__weather__item}
            >
              <Opacity fontSize="small" /> Humidity:{' '}
              {weather?.main.humidity || '-'}%
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              fontSize="medium"
              className={classes.card__weather__item}
            >
              <Air fontSize="medium" /> Wind Speed:{' '}
              {formatData(weather?.wind.speed, 'wind', unit)}
            </Typography>
          </Grid>
        </Grid>
        <Button
          fontSize="small"
          onClick={handleRemove}
          className={classes.card__weather__button}
        >
          <DeleteOutline fontSize="small" /> Remove
        </Button>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
