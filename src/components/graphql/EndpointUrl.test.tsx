import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import EndpointUrlInput from './EndpointUrl';
import { Mock, vi } from 'vitest';
import { Store, UnknownAction } from 'redux';

const mockStore = configureStore([]);

describe('EndpointUrlInput', () => {
  let store: MockStoreEnhanced<unknown, object> | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({
      main: {
        endpointUrlInput: '',
        headersKeys: '',
        queryInput: '',
        variablesInput: '',
        languageData: { graphQlHeader: 'GraphiQL Client', endpointUrlHeader: 'Endpoint URL' },
        sdlUrlInput: '',
      },
    });

    store.dispatch = vi.fn();
    window.history.pushState = vi.fn();
  });

  test('renders correctly', () => {
    render(
      <Provider store={store}>
        <EndpointUrlInput />
      </Provider>
    );

    expect(screen.getByText('Endpoint URL')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('updates endpoint URL on change', () => {
    render(
      <Provider store={store}>
        <EndpointUrlInput />
      </Provider>
    );
    window.history.pushState = vi.fn();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'http://example.com' } });
    expect(store.dispatch).toHaveBeenCalled();
    const calls = (store.dispatch as Mock).mock.calls;
    const lastCall = calls[calls.length - 1][0];
    expect(typeof lastCall).toBe('function');
  });

  test('changes URL on blur', async () => {
    render(
      <Provider store={store}>
        <EndpointUrlInput />
      </Provider>
    );
    window.history.pushState = vi.fn();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'http://example.com' } });
    fireEvent.blur(input);
    const pushStateCalls = (window.history.pushState as Mock).mock.calls;

    expect(pushStateCalls.length).toBe(1);

    expect(pushStateCalls[0][0]).toEqual({});
    expect(pushStateCalls[0][2]).toMatch('http://localhost:3000/GRAPHQL/');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
