import { createSlice } from '@reduxjs/toolkit';

const initialWeatherState = {
  weatherTemperature: '',
  weatherHumidity: '',
  weatherWindSpeed: '',
  weatherIcon: '',
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState: initialWeatherState,
  reducers: {
    setWeatherData(state, action) {
      state.weatherTemperature = action.payload.weatherTemperature;
      state.weatherHumidity = action.payload.weatherHumidity;
      state.weatherWindSpeed = action.payload.weatherWindSpeed;
      state.weatherIcon = action.payload.weatherIcon;
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
