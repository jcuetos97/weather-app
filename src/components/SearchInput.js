import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  search__container,
  search__input,
  search__button,
  error__input,
} from '../assets/css/components/SearchInput.module.css';
import mostSearchedCities from '../constant';
import { fetchWeather, resetResultMessage } from '../store/weather';

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

    const citiesToFetch = [];

    if (selectedCities.length > 0) {
      citiesToFetch.push(...selectedCities.map((city) => city.trim()));
    }

    if (typedCity) {
      citiesToFetch.push(typedCity.trim());
    }

    if (citiesToFetch.length > 0) {
      dispatch(fetchWeather(citiesToFetch));
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
    <div className={search__container}>
      <Autocomplete
        multiple
        className={search__input}
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
              className: error ? error__input : '',
            }}
          />
        )}
      />
      <Button onClick={handleSearch} className={search__button}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchInput;
