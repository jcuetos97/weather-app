import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../../src/views/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../../src/store/weather';

// Mock the react-redux hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock the fetchWeather action
jest.mock('../../src/store/weather', () => ({
  ...jest.requireActual('../../src/store/weather'),
  fetchWeather: jest.fn(),
}));

describe('Dashboard', () => {
  const mockDispatch = jest.fn();
  const originalError = console.error;
  const originalLog = console.log;

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selectorFn) => {
      return selectorFn({
        weather: {
          cities: [],
          weatherData: {},
          loading: false,
          error: null,
          resultMessages: [],
        },
      });
    });

    // Suppress console errors and logs
    console.error = jest.fn();
    console.log = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();

    // Restore original console methods
    console.error = originalError;
    console.log = originalLog;
  });

  it('renders without crashing', () => {
    render(<Dashboard />);
    expect(screen.getByText('Weather App Dashboard')).toBeInTheDocument();
  });

  it('displays loading spinner when loading', () => {
    useSelector.mockImplementation((selectorFn) => {
      return selectorFn({
        weather: {
          cities: [],
          weatherData: {},
          loading: true,
          error: null,
          resultMessages: [],
        },
      });
    });

    render(<Dashboard />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('dispatches fetchWeather when a city is added', () => {
    render(<Dashboard />);

    // Simulate adding a city
    fireEvent.change(screen.getByLabelText('Search City'), {
      target: { value: 'New York' },
    });

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    // Check if fetchWeather action is dispatched with correct payload
    expect(mockDispatch).toHaveBeenCalledWith(fetchWeather(['New York']));
  });
});
