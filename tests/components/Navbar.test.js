import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Navbar from '../../src/components/Navbar';

const mockStore = configureStore([]);

describe('Navbar', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        username: 'testuser',
      },
    });
  });

  it('renders without crashing and displays username', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Weather App')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('handles logout', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByText(/Logout/i));
    expect(store.getActions()).toEqual([{ type: 'user/logout' }]);
  });
});
