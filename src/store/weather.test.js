// src/store/weatherSlice.test.js
import weatherReducer, {
  addCity,
  removeCity,
  resetResultMessage,
} from './weather';

jest.mock('axios');

const initialState = {
  cities: [],
  weatherData: {},
  loading: false,
  error: null,
  resultMessages: [],
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
      resultMessages: [
        {
          msg: 'New York has been removed successfully.',
          state: 'success',
        },
      ],
    });
  });

  it('should handle resetResultMessage', () => {
    const previousState = {
      ...initialState,
      resultMessages: [],
    };
    expect(weatherReducer(previousState, resetResultMessage())).toEqual(
      initialState,
    );
  });
});
