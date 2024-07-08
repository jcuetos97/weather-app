import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cities: [],
  weatherData: {},
  loading: false,
  error: null,
  resultMessages: [],
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (cities, { getState, dispatch }) => {
    const { weather } = getState();
    const { cities: currentCities } = weather;

    const successMessages = [];
    const alreadyIncludedMessages = [];
    const otherErrorMessages = [];

    for (let city of cities) {
      if (currentCities.includes(city)) {
        alreadyIncludedMessages.push(city);
      } else {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`,
          );
          dispatch(addCity(city));
          dispatch(updateWeatherData({ city, data: response.data }));
          successMessages.push(city);
        } catch (error) {
          otherErrorMessages.push(city);
        }
      }
    }

    // Consolidate messages
    const resultMessages = [];
    if (successMessages.length > 0) {
      resultMessages.push({
        state: 'success',
        msg: `Successfully added ${successMessages.join(', ')}.`,
      });
    }
    if (alreadyIncludedMessages.length > 0) {
      resultMessages.push({
        state: 'error',
        msg: `${alreadyIncludedMessages.join(', ')} ${
          alreadyIncludedMessages.length > 1 ? 'are' : 'is'
        } already in the list.`,
      });
    }
    if (otherErrorMessages.length > 0) {
      resultMessages.push({
        state: 'error',
        msg: `Failed to fetch weather for ${otherErrorMessages.join(', ')}`,
      });
    }

    return resultMessages;
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
        state.cities.push(city);
      }
    },
    updateWeatherData: (state, action) => {
      const { city, data } = action.payload;
      state.weatherData[city] = data;
    },
    removeCity: (state, action) => {
      const city = action.payload;
      state.cities = state.cities.filter((c) => c !== city);
      delete state.weatherData[city];
      state.resultMessages = [
        {
          state: 'success',
          msg: `${city} has been removed successfully.`,
        },
      ];
    },
    resetResultMessage: (state) => {
      state.resultMessages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.resultMessages = [{ state: 'primary', msg: 'Searching...' }];
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.resultMessages = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.resultMessages.push({
          state: 'error',
          msg: 'An error occurred.',
        });
      });
  },
});

export const { addCity, updateWeatherData, removeCity, resetResultMessage } =
  weatherSlice.actions;
export default weatherSlice.reducer;
