import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCity, fetchWeather } from '../store/weather';
import { Autocomplete } from '@mui/material';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../assets/css/components/SearchInput.module.css';
import mostSearchedCities from '../constant';

const SearchInput = () => {
  const [typedCity, setTypedCity] = useState('');
  const [selectedCities, setSelectedCities] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (selectedCities.length > 0) {
      selectedCities.forEach((city) => {
        dispatch(addCity(city.trim()));
        dispatch(fetchWeather(city.trim()));
      });
      setSelectedCities([]);
    }

    if (typedCity) {
      dispatch(addCity(typedCity.trim()));
      dispatch(fetchWeather(typedCity.trim()));
      setTypedCity('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.search__container}>
      <Autocomplete
        multiple
        className={styles.search__input}
        options={mostSearchedCities}
        onChange={(event, newValue) => {
          setSelectedCities(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search City"
            onChange={(e) => setTypedCity(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        )}
      />
      <Button onClick={handleSearch} className={styles.search__button}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchInput;
