import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCity } from '../store/weather';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { DeleteOutline, Opacity, AcUnit, Cloud } from '@mui/icons-material';
import classes from '../assets/css/components/WeatherCard.module.css';

const WeatherCard = ({ city, weather }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeCity(city));
  };

  return (
    <Card className={classes.card__weather__container}>
      <CardContent>
        <Typography variant="h5" mb={2}>
          {weather?.name || city}
        </Typography>
        <Grid container rowSpacing={2} className={classes.card__weather__grid}>
          <Grid item>
            <Typography
              variant="body2"
              fontSize="medium"
              className={classes.card__weather__item}
            >
              <AcUnit fontSize="small" />
              Temperature: {weather?.main.temp || '-'}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              fontSize="medium"
              className={classes.card__weather__item}
            >
              <Opacity fontSize="small" /> Humidity:{' '}
              {weather?.main.humidity || '-'}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              fontSize="medium"
              className={classes.card__weather__item}
            >
              <Cloud fontSize="medium" /> Wind Speed:{' '}
              {weather?.wind.speed || '-'}
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
