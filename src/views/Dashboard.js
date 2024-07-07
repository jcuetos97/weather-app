import React, { useEffect } from 'react';
import { Container, Chip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import WeatherCard from '../components/WeatherCard';
import SearchInput from '../components/SearchInput';
import LoadingSpinner from '../components/LoadingSpinner';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/slider.css';
import { resetResultMessageAsync } from '../store/weather';
import classes from '../assets/css/views/Dashboard.module.css';

const Dashboard = () => {
  const { cities, weatherData, loading, resultMessage } = useSelector(
    (state) => state.weather,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (resultMessage) {
      dispatch(resetResultMessageAsync());
    }
  }, [resultMessage, dispatch]);

  // Settings for the Slick slider
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <Container className={classes.dashboard__main__container} maxWidth="md">
      <h1>Weather App Dashboard</h1>
      <SearchInput />
      <h2>Your cities</h2>
      {resultMessage.state === 'success' && (
        <div className={classes.dashboard__message__item}>
          <Chip label={resultMessage.msg} color="success" variant="outlined" />
        </div>
      )}
      {resultMessage.state === 'error' && (
        <div className={classes.dashboard__message__item}>
          <Chip label={resultMessage.msg} color="error" variant="outlined" />
        </div>
      )}
      {resultMessage.state === 'pending' && (
        <div className={classes.dashboard__message__item}>
          <Chip label={resultMessage.msg} color="primary" variant="outlined" />
        </div>
      )}

      {loading && <LoadingSpinner />}
      {!loading && cities?.length > 0 && (
        <Container className="slider-container">
          <Slider {...settings}>
            {cities.map((city) => (
              <div key={city}>
                <WeatherCard city={city} weather={weatherData[city]} />
              </div>
            ))}
          </Slider>
        </Container>
      )}
    </Container>
  );
};

export default Dashboard;
