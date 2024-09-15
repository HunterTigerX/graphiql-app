import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import UrlInput from './UrlInput';
import { ILanguage } from '@/interfaces/interfaces';

const mockLanguageData: ILanguage = {
  enterUrl: 'Enter URL',
  send: 'Send',
};

it('renders UrlInput with correct placeholder and button text', () => {
  render(<UrlInput urlToSend="" onChangeEndpointHandler={vi.fn()} languageData={mockLanguageData} />);

  expect(screen.getByPlaceholderText('Enter URL')).toBeInTheDocument();

  expect(screen.getByText('Send')).toBeInTheDocument();
});

it('calls onChangeEndpointHandler when the input value changes', () => {
  const handleChange = vi.fn();
  render(
    <UrlInput urlToSend="http://example.com" onChangeEndpointHandler={handleChange} languageData={mockLanguageData} />
  );

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'http://newurl.com' } });

  expect(handleChange).toHaveBeenCalled();
});
