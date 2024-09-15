import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/reducers/root/rootReduces';
import { Footer } from './Footer';
import { vi } from 'vitest';

vi.mock('react-redux', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useSelector: vi.fn().mockReturnValue({
      ourTeam: 'Our Team',
    }),
  };
});

describe('Footer Component', () => {
  test('renders team section', () => {
    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(screen.getByText(/Our Team/i)).toBeInTheDocument();
  });

  test('renders GitHub links', () => {
    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(screen.getByText('HunterTigerX')).toHaveAttribute('href', 'https://github.com/huntertigerx');
    expect(screen.getByText('c00b3r')).toHaveAttribute('href', 'https://github.com/c00b3r');
    expect(screen.getByText('LaraNU')).toHaveAttribute('href', 'https://github.com/LaraNU');
  });

  test('renders year and logo', () => {
    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(screen.getByText(/2024/i)).toBeInTheDocument();

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/public/rss-logo.svg');
  });
});
