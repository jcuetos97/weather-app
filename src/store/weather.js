import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cities: [],
  weatherData: {},
  loading: false,
  error: null,
  resultMessage: { state: '', msg: '' },
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city, { getState }) => {
    const { cities } = getState().weather;
    if (cities.includes(city)) {
      return { alreadySearched: true, city };
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`,
      );
      return { data: response.data, city };
    } catch (error) {
      return { error: error.message, city };
    }
  },
);

export const resetResultMessageAsync = createAsyncThunk(
  'weather/resetResultMessageAsync',
  async (_, { dispatch }) => {
    setTimeout(() => {
      dispatch(resetResultMessage());
    }, 30000);
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addCity: (state, action) => {
      const city = action.payload;
      if (!state.cities.includes(city)) {
        return {
          ...state,
          cities: [...state.cities, city],
        };
      }
    },
    removeCity: (state, action) => {
      const city = action.payload;
      const newCities = state.cities.filter((c) => c !== city);
      const newWeatherData = { ...state.weatherData };
      delete newWeatherData[city];
      return {
        ...state,
        cities: newCities,
        weatherData: newWeatherData,
        resultMessage: {
          state: 'success',
          msg: `${city} has been removed successfully.`,
        },
      };
    },
    resetResultMessage: (state) => {
      return {
        ...state,
        resultMessage: { state: '', msg: '' },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        return {
          ...state,
          loading: true,
          resultMessage: { state: 'pending', msg: 'Searching...' },
        };
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const { data, city, alreadySearched, error } = action.payload;
        if (alreadySearched) {
          return {
            ...state,
            loading: false,
            resultMessage: {
              state: 'error',
              msg: `${city} is already in the list.`,
            },
          };
        } else if (error) {
          return {
            ...state,
            loading: false,
            resultMessage: {
              state: 'error',
              msg: `An error occurred while fetching weather for ${city}: ${error}`,
            },
          };
        } else {
          return {
            ...state,
            loading: false,
            cities: [...state.cities, city],
            weatherData: { ...state.weatherData, [city]: data },
            resultMessage: {
              state: 'success',
              msg: `Successfully added ${city}.`,
            },
          };
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
          resultMessage: { state: 'error', msg: 'An error occurred.' },
        };
      });
  },
});

export const { addCity, removeCity, resetResultMessage } = weatherSlice.actions;
export default weatherSlice.reducer;
