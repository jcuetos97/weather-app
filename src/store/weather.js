import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cities: [],
  weatherData: {},
  loading: false,
  error: null,
  resultMessage: '',
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
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=55a50bb805cfa7df500aab386e6d7afd`,
      );
      return { data: response.data, city };
    } catch (error) {
      return { error: error.message, city };
    }
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
    removeCity: (state, action) => {
      state.cities = state.cities.filter((city) => city !== action.payload);
      state.resultMessage = `${action.payload} has been removed successfully.`;
      delete state.weatherData[action.payload];
    },
    resetResultMessage: (state) => {
      state.resultMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.resultMessage = 'Searching...';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        const { data, city, alreadySearched, error } = action.payload;

        if (alreadySearched) {
          state.resultMessage = `${city} is already in the list.`;
        } else if (error) {
          state.resultMessage = `An error occurred while fetching weather for ${city}: ${error}`;
        } else {
          state.weatherData[city] = data;
          state.cities.push(city);
          state.resultMessage = `Successfully added ${city}.`;
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.resultMessage = 'An error occurred.';
      });
  },
});

export const resetResultMessageAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(resetResultMessage());
  }, 3000);
};

export const { addCity, removeCity, resetResultMessage } = weatherSlice.actions;
export default weatherSlice.reducer;
