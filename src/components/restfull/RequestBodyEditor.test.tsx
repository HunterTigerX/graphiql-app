import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import RequestBodyEditor from './RequestBodyEditor';
import { ILanguage } from '@/interfaces/interfaces';

const mockLanguageData: ILanguage = {
  json: 'JSON Body',
};

it('renders RequestBodyEditor', () => {
  render(
    <RequestBodyEditor
      requestBody=""
      onChangeRequestBody={vi.fn()}
      updateUrl={vi.fn()}
      languageData={mockLanguageData}
    />
  );

  expect(screen.getByText('JSON Body')).toBeInTheDocument();
});

it('calls onChangeRequestBody when the text area value changes', () => {
  const handleChange = vi.fn();
  render(
    <RequestBodyEditor
      requestBody="initial body"
      onChangeRequestBody={handleChange}
      updateUrl={vi.fn()}
      languageData={mockLanguageData}
    />
  );

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new body' } });

  expect(handleChange).toHaveBeenCalled();
});

it('calls updateUrl when the text area loses focus', () => {
  const handleUpdateUrl = vi.fn();
  render(
    <RequestBodyEditor
      requestBody="body"
      onChangeRequestBody={vi.fn()}
      updateUrl={handleUpdateUrl}
      languageData={mockLanguageData}
    />
  );

  fireEvent.blur(screen.getByRole('textbox'));

  expect(handleUpdateUrl).toHaveBeenCalled();
});
