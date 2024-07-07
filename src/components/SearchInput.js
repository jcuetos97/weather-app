import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCity, fetchWeather, resetResultMessage } from '../store/weather';
import { Autocomplete, TextField, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../assets/css/components/SearchInput.module.css';
import mostSearchedCities from '../constant';

const SearchInput = () => {
  const [typedCity, setTypedCity] = useState('');
  const [selectedCities, setSelectedCities] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleFocus = () => {
    dispatch(resetResultMessage());
    setError(false);
    setErrorMessage('');
  };

  const handleSearch = () => {
    if (selectedCities.length === 0 && !typedCity) {
      setError(true);
      setErrorMessage('Please select at least one city');
      return;
    }

    if (selectedCities.length > 0) {
      selectedCities.forEach((city) => {
        dispatch(fetchWeather(city.trim()));
      });
    }

    if (typedCity) {
      dispatch(fetchWeather(typedCity.trim()));
    }

    setTypedCity('');
    setSelectedCities([]);
    setError(false);
    setErrorMessage('');
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
        value={selectedCities}
        onChange={(event, newValue) => {
          setSelectedCities(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search City"
            value={typedCity}
            onChange={(e) => setTypedCity(e.target.value)}
            onKeyDown={handleKeyPress}
            onFocus={handleFocus}
            error={error}
            helperText={error ? errorMessage : ''}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              className: error ? styles.error__input : '',
            }}
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
