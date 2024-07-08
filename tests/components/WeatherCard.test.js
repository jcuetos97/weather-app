import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WeatherCard from '../../src/components/WeatherCard';

const mockStore = configureStore([]);

describe('WeatherCard', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  const weatherData = {
    name: 'New York',
    main: {
      temp: 72,
      humidity: 50,
    },
    weather: [{ icon: '04d', description: 'cloudy' }],
    wind: { speed: 10 },
  };

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <WeatherCard city="New York" weather={weatherData} />
      </Provider>,
    );
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('dispatches removeCity when remove button is clicked', () => {
    render(
      <Provider store={store}>
        <WeatherCard city="New York" weather={weatherData} />
      </Provider>,
    );

    fireEvent.click(screen.getByText(/Remove/i));
    expect(store.getActions()).toEqual([
      { type: 'weather/removeCity', payload: 'New York' },
    ]);
  });
});
