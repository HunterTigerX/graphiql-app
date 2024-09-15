import { describe, beforeEach, afterAll, test, expect, vi } from 'vitest';
import { saveHistory } from './saveHistoryData';

describe('saveHistory', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test('should save new history data when localStorage is empty', () => {
    saveHistory('http://example.com', 'client1', 'http://sdl.example.com');
    const savedDataUnchecked = localStorage.getItem('history_data');
    let savedData;
    try {
      if (savedDataUnchecked) savedData = JSON.parse(savedDataUnchecked);
    } catch {
      savedData = '';
    }
    expect(savedData).toEqual([{ url: 'http://example.com', client: 'client1', sdlUrl: 'http://sdl.example.com' }]);
  });

  test('should append new history data when localStorage has existing data', () => {
    localStorage.setItem('history_data', JSON.stringify([{ url: 'http://old-url.com', client: 'old-client' }]));

    saveHistory('http://example.com', 'client1', 'http://sdl.example.com');
    const savedDataUnchecked = localStorage.getItem('history_data');
    let savedData;
    try {
      if (savedDataUnchecked) savedData = JSON.parse(savedDataUnchecked);
    } catch {
      savedData = '';
    }
    expect(savedData).toEqual([
      { url: 'http://example.com', client: 'client1', sdlUrl: 'http://sdl.example.com' },
      { url: 'http://old-url.com', client: 'old-client' },
    ]);
  });

  test('should handle invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('history_data', 'invalid-json');
    saveHistory('http://example.com', 'client1', 'http://sdl.example.com');
    const savedDataUnchecked = localStorage.getItem('history_data');
    let savedData;
    try {
      if (savedDataUnchecked) savedData = JSON.parse(savedDataUnchecked);
    } catch {
      savedData = null;
    }
    expect(savedData).toBeNull();
  });

  test('should handle edge cases with empty input', () => {
    saveHistory('', '', '');
    const savedDataUnchecked = localStorage.getItem('history_data');
    let savedData;
    try {
      if (savedDataUnchecked) savedData = JSON.parse(savedDataUnchecked);
    } catch {
      savedData = '';
    }
    expect(JSON.stringify(savedData)).toEqual(JSON.stringify([{ url: '', client: '', sdlUrl: '' }]));
  });

  test('should handle multiple consecutive calls', () => {
    saveHistory('http://example.com', 'client1', 'http://sdl.example.com');
    const savedDataUnchecked = localStorage.getItem('history_data');
    let savedData;
    try {
      if (savedDataUnchecked) savedData = JSON.parse(savedDataUnchecked);
    } catch {
      savedData = '';
    }
    expect(JSON.stringify(savedData[0])).toEqual(
      JSON.stringify({ url: 'http://example.com', client: 'client1', sdlUrl: 'http://sdl.example.com' })
    );
    saveHistory('http://example2.com', 'client2', 'http://sdl.example2.com');
    expect(JSON.stringify(savedData[0])).toEqual(
      JSON.stringify({ url: 'http://example.com', client: 'client1', sdlUrl: 'http://sdl.example.com' })
    );
  });
});
