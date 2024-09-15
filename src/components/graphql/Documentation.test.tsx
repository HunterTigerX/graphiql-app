import { describe, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import DocumentationGQL from './Documentation';
import { legacy_createStore as createStore } from 'redux';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const MockDocumentationGQL = () => {
  return (
    <Provider store={store}>
      <DocumentationGQL />
    </Provider>
  );
};

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<MockDocumentationGQL />);
  });

  test('renders documentation header when documentation is provided', async () => {
    const mockStore = (initialState: unknown) => {
      return createStore((state = initialState) => state);
    };
    const initialState = {
      main: {
        documentation: 'Sample documentation content',
        languageData: {
          documentationHeader: 'Documentation Header',
        },
      },
    };
    const store = mockStore(initialState);
    const MockDock = () => {
      return (
        <Provider store={store}>
          <DocumentationGQL />
        </Provider>
      );
    };
    await act(async () => {
      render(<MockDock />);
    });
    expect(screen.getByText('Documentation Header')).toBeInTheDocument();
    expect(screen.getByText('Sample documentation content')).toBeInTheDocument();
  });

  test('does not render documentation when documentation is empty', async () => {
    const mockStore = (initialState: unknown) => {
      return createStore((state = initialState) => state);
    };
    const initialState = {
      main: {
        documentation: '',
        languageData: {
          documentationHeader: '',
        },
      },
    };
    const store = mockStore(initialState);
    const MockDock = () => {
      return (
        <Provider store={store}>
          <DocumentationGQL />
        </Provider>
      );
    };
    await act(async () => {
      render(<MockDock />);
    });
    expect(screen.queryByText('Documentation Header')).not.toBeInTheDocument();
    expect(screen.queryByText('Sample documentation content')).not.toBeInTheDocument();
  });

  test('does not render documentation when there is no language data', async () => {
    const mockStore = (initialState: unknown) => {
      return createStore((state = initialState) => state);
    };
    const initialState = {
      main: {
        documentation: 'Sample documentation content',
        languageData: {},
      },
    };
    const store = mockStore(initialState);
    const MockDock = () => {
      return (
        <Provider store={store}>
          <DocumentationGQL />
        </Provider>
      );
    };
    await act(async () => {
      render(<MockDock />);
    });
    expect(screen.queryByText('Documentation Header')).not.toBeInTheDocument();
    expect(screen.getByText('Sample documentation content')).toBeInTheDocument();
  });

  test('handles undefined documentation gracefully', async () => {
    const mockStore = (initialState: unknown) => {
      return createStore((state = initialState) => state);
    };
    const initialState = {
      main: {
        documentation: undefined,
        languageData: {
          documentationHeader: 'Documentation Header',
        },
      },
    };
    const store = mockStore(initialState);
    const MockDock = () => {
      return (
        <Provider store={store}>
          <DocumentationGQL />
        </Provider>
      );
    };
    await act(async () => {
      render(<MockDock />);
    });

    expect(screen.queryByText('Documentation Header')).not.toBeInTheDocument();
    expect(screen.queryByText('Sample documentation content')).not.toBeInTheDocument();
  });

  test('renders correctly with different language data', async () => {
    const mockStore = (initialState: unknown) => {
      return createStore((state = initialState) => state);
    };
    const initialState = {
      main: {
        documentation: 'Another sample documentation content',
        languageData: {
          documentationHeader: 'Another Documentation Header',
        },
      },
    };
    const store = mockStore(initialState);
    const MockDock = () => {
      return (
        <Provider store={store}>
          <DocumentationGQL />
        </Provider>
      );
    };
    await act(async () => {
      render(<MockDock />);
    });

    expect(screen.getByText('Another Documentation Header')).toBeInTheDocument();
    expect(screen.getByText('Another sample documentation content')).toBeInTheDocument();
  });
});
