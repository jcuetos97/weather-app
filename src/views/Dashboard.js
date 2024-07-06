import React, { useRef, useEffect } from 'react';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import WeatherCard from '../components/WeatherCard';
import SearchInput from '../components/SearchInput';
import LoadingSpinner from '../components/LoadingSpinner';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/slider.css';

const Dashboard = () => {
  const { cities, weatherData, loading } = useSelector(
    (state) => state.weather,
  );
  const sliderRef = useRef(null);
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0); // Navigate to the first slide whenever cities array changes
    }
  }, [cities]);

  // Settings for the Slick slider
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
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <Container maxWidth="md">
      <h1>Weather App Dashboard</h1>
      <SearchInput />
      {loading && <LoadingSpinner />}
      {cities?.length > 0 && (
        <Slider ref={sliderRef} {...settings}>
          {cities.map((city) => (
            <div key={city}>
              <WeatherCard city={city} weather={weatherData[city]} />
            </div>
          ))}
        </Slider>
      )}
    </Container>
  );
};

export default Dashboard;
