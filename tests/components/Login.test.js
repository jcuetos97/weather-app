import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Login } from '../../src/components/Login';

const mockStore = configureStore([]);

describe('Login', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        loggedIn: false,
      },
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId('Login-header')).toBeInTheDocument();
  });

  it('navigates to dashboard on login', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: 'user' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByTestId('Login-button'));

    expect(store.getActions()).toEqual([
      { type: 'user/setUsername', payload: 'user' },
    ]);
  });
});
