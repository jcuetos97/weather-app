import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCity, fetchWeather } from '../store/weather';
import { TextField, Button } from '@mui/material';
import styles from '../assets/css/components/SearchInput.module.css';

const SearchInput = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(addCity(city));
    dispatch(fetchWeather(city));
    setCity('');
  };

  return (
    <div className={styles.search__container}>
      <TextField
        label="Search City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchInput;
