import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import ResponseGQL from './ResponseGQL'; // Убедитесь, что путь правильный

const mockState = {
  main: {
    searchResults: {
      result: '{"key": "value"}',
      code: 200,
      from: true,
    },
    documentation: true,
    languageData: {
      responseHeader: 'Response Header',
      status: 'Status',
      body: 'Body',
    },
  },
};

const createMockStore = (initialState: unknown) => {
  return createStore((state = initialState) => state);
};

describe('ResponseGQL Component', () => {
  test('renders response correctly when code is 200', () => {
    const store = createMockStore(mockState);

    render(
      <Provider store={store}>
        <ResponseGQL />
      </Provider>
    );

    expect(screen.getByText(mockState.main.languageData.responseHeader)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockState.main.languageData.status}: ${mockState.main.searchResults.code}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`${mockState.main.languageData.body}:`)).toBeInTheDocument();
    expect(screen.getByText('Response Header')).toBeInTheDocument();
  });

  test('renders error message when code is not 200', () => {
    const errorState = {
      ...mockState,
      main: {
        ...mockState.main,
        searchResults: {
          ...mockState.main.searchResults,
          code: 404,
          message: 'Not Found',
        },
      },
    };

    const store = createMockStore(errorState);

    render(
      <Provider store={store}>
        <ResponseGQL />
      </Provider>
    );

    expect(screen.getByText(`{"key": "value"}`)).toBeInTheDocument();
  });
});
