// src/store/weatherSlice.test.js
import weatherReducer, {
  addCity,
  removeCity,
  resetResultMessage,
  fetchWeather,
} from './weather';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

jest.mock('axios');

const initialState = {
  cities: [],
  weatherData: {},
  loading: false,
  error: null,
  resultMessage: '',
};

describe('weatherSlice', () => {
  it('should handle initial state', () => {
    expect(weatherReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle addCity', () => {
    const previousState = { ...initialState };
    expect(weatherReducer(previousState, addCity('New York'))).toEqual({
      ...initialState,
      cities: ['New York'],
    });
  });

  it('should handle removeCity', () => {
    const previousState = { ...initialState, cities: ['New York'] };
    expect(weatherReducer(previousState, removeCity('New York'))).toEqual({
      ...initialState,
      resultMessage: 'New York has been removed successfully.',
    });
  });

  it('should handle resetResultMessage', () => {
    const previousState = { ...initialState, resultMessage: 'Some message' };
    expect(weatherReducer(previousState, resetResultMessage())).toEqual(
      initialState,
    );
  });
});
