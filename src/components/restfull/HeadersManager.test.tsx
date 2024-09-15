import { act, fireEvent, render, screen } from '@testing-library/react';
import HeadersManager from './HeadersManager';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { enLanguage } from '@/languages/languages';

describe('HeadersManager', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      const headers: {
        [key: string]: string;
      }[] = [];
      const setHeaders = vi.fn();
      render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);
    });
  });

  it('render', () => {
    const headers: {
      [key: string]: string;
    }[] = [];
    const setHeaders = vi.fn();

    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);

    expect(screen.getByLabelText('Header Key')).toBeInTheDocument();
    expect(screen.getByLabelText('Header Value')).toBeInTheDocument();
    expect(screen.getByText('ADD HEADER')).toBeInTheDocument();
  });

  it('adds a new header', () => {
    const headers: {
      [key: string]: string;
    }[] = [{ key: '', value: '' }];
    const setHeaders = vi.fn();

    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);

    fireEvent.change(screen.getByLabelText('Header Key'), { target: { value: 'Authorization' } });
    fireEvent.change(screen.getByLabelText('Header Value'), { target: { value: 'Bearer token' } });
    fireEvent.click(screen.getByText('ADD HEADER'));

    expect(setHeaders).toHaveBeenCalled();
  });

  it('delete header', () => {
    const headers: {
      [key: string]: string;
    }[] = [{ key: 'Authorization', value: 'Bearer token' }];
    const setHeaders = vi.fn();

    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);

    fireEvent.click(screen.getByText('Delete'));

    expect(setHeaders).toHaveBeenCalled();
  });
});

describe('HeadersManager Component', () => {
  let headers: {
    [key: string]: string;
  }[] = [];
  let setHeaders = vi.fn((newHeaders) => {
    headers = newHeaders;
  });

  beforeEach(() => {
    headers = [];
    setHeaders = vi.fn((newHeaders) => {
      headers = newHeaders;
    });
  });

  test('renders correctly with initial state', () => {
    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);
    expect(screen.getByLabelText(enLanguage.headerKey)).toBeInTheDocument();
    expect(screen.getByLabelText(enLanguage.headerValue)).toBeInTheDocument();
  });

  test('adds a new header successfully', () => {
    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);

    fireEvent.change(screen.getByLabelText(enLanguage.headerKey), { target: { value: 'Content-Type' } });
    fireEvent.change(screen.getByLabelText(enLanguage.headerValue), { target: { value: 'application/json' } });
    fireEvent.click(screen.getByText(enLanguage.addHeader.toUpperCase()));
    expect(setHeaders).toHaveBeenCalledWith(expect.any(Function));
  });

  test('does not add a header with empty key or value', () => {
    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);

    fireEvent.change(screen.getByLabelText(enLanguage.headerKey), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(enLanguage.headerValue), { target: { value: '' } });
    fireEvent.click(screen.getByText(enLanguage.addHeader.toUpperCase()));

    expect(setHeaders).not.toHaveBeenCalled();
  });

  test('edits an existing header', () => {
    headers = [{ key: 'Content-Type', value: 'application/json' }];
    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);

    fireEvent.click(screen.getByText(enLanguage.edit));

    fireEvent.change(screen.getByLabelText(enLanguage.headerKey), { target: { value: 'Content-Type' } });
    fireEvent.change(screen.getByLabelText(enLanguage.headerValue), { target: { value: 'text/html' } });
    fireEvent.click(screen.getByText('Save'));
    expect(setHeaders).toHaveBeenCalledWith(expect.any(Function));
  });

  test('does not save header with empty value during edit', () => {
    headers = [{ key: 'Content-Type', value: 'application/json' }];
    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);

    fireEvent.click(screen.getByText(enLanguage.edit));

    fireEvent.change(screen.getByLabelText(enLanguage.headerValue), { target: { value: '' } });
    fireEvent.click(screen.getByText('Save'));

    expect(setHeaders).not.toHaveBeenCalled();
  });

  test('deletes a header successfully', () => {
    headers = [{ key: 'Content-Type', value: 'application/json' }];
    render(<HeadersManager headers={headers} setHeaders={setHeaders} languageData={enLanguage} />);

    fireEvent.click(screen.getByText(enLanguage.delete));
    expect(setHeaders).toHaveBeenCalledWith(expect.any(Function));
  });

  test('does not crash when no headers are present', () => {
    render(<HeadersManager headers={[]} setHeaders={setHeaders} languageData={enLanguage} />);
    expect(screen.getByText('ADD HEADER')).toBeInTheDocument();
  });
});
