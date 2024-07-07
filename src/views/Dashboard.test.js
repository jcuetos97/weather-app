// src/pages/Dashboard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Dashboard from './Dashboard';
import { fetchWeather } from '../store/weather';
import { configureStore } from '@reduxjs/toolkit';

describe('Dashboard', () => {
  let store;

  beforeEach(() => {
    // Configure store with redux-thunk middleware
    store = configureStore({
      reducer: {
        weather: {
          cities: [],
          weatherData: {},
          loading: false,
          error: null,
          resultMessage: '',
        },
      },
      middleware: [thunk],
    });

    // Replace store.dispatch with a jest mock function
    store.dispatch = jest.fn();
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    );

    expect(screen.getByText('Weather App Dashboard')).toBeInTheDocument();
  });

  it('displays loading spinner when loading', () => {
    // Update the state to simulate loading
    store.getState().weather.loading = true;

    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('dispatches fetchWeather when a city is added', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    );

    // Simulate adding a city
    fireEvent.change(screen.getByLabelText('Search City'), {
      target: { value: 'New York' },
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    // Check if fetchWeather action is dispatched with correct payload
    expect(store.dispatch).toHaveBeenCalledWith(fetchWeather('New York'));
  });
});
