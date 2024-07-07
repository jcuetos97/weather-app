import React, { useEffect } from 'react';
import { Container, Chip, Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import WeatherCard from '../components/WeatherCard';
import SearchInput from '../components/SearchInput';
import LoadingSpinner from '../components/LoadingSpinner';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/slider.css';
import { resetResultMessageAsync } from '../store/weather';
import {
  dashboard__message__item,
  dashboard__no__cities__container,
  dashboard__main__container,
} from '../assets/css/views/Dashboard.module.css';
import AddLocationIcon from '@mui/icons-material/AddLocation';

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

  const renderMessage = () => {
    if (!resultMessage.state) return null;

    const messageTypes = {
      success: { color: 'success', msg: resultMessage.msg },
      error: { color: 'error', msg: resultMessage.msg },
      pending: { color: 'primary', msg: resultMessage.msg },
    };

    return (
      <div className={dashboard__message__item}>
        <Chip
          label={messageTypes[resultMessage.state]?.msg}
          color={messageTypes[resultMessage.state]?.color}
          variant="outlined"
        />
      </div>
    );
  };

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
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
    <Container className={dashboard__main__container} maxWidth="md">
      <h1>Weather App Dashboard</h1>
      <SearchInput />
      <h2>Your cities</h2>
      {renderMessage()}
      {loading && <LoadingSpinner />}
      {!loading && cities?.length === 0 && (
        <Box className={dashboard__no__cities__container}>
          <AddLocationIcon fontSize="large" />
          <Typography fontSize="1rem" variant="h5">
            No cities added yet. Please search and add a city.
          </Typography>
        </Box>
      )}
      {!loading && cities?.length > 0 && (
        <Container className="slider-container">
          <Slider {...settings}>
            {[...cities].reverse().map((city) => (
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
