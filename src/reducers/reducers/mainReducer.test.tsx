import { IStateMain } from '@/interfaces/interfaces';
import { describe, it, expect } from 'vitest';
import mainReducer from './mainReducer';
import { enLanguage } from '@/languages/languages';

describe('mainReducer', () => {
  const initialState: IStateMain = {
    data: [],
    endpointUrlInput: '',
    sdlUrlInput: '',
    headersKeys: '',
    queryInput: '',
    variablesInput: '',
    searchResults: {
      result: false,
      code: 0,
      from: false,
    },
    error: '',
    documentation: '',
    languageData: enLanguage,
  };

  it('should return the initial state when no action is passed', () => {
    const newState = mainReducer(undefined, { type: '', payload: '' });
    expect(newState).toEqual(initialState);
  });

  it('should update headers', () => {
    const newHeaders = [{ key: 'Authorization', value: 'Bearer token' }];
    const action = { type: 'UPDATE_HEADERS', payload: newHeaders };
    const newState = mainReducer(initialState, action);
    expect(newState.headersKeys).toEqual(JSON.stringify(newHeaders));
  });

  it('should save history data', () => {
    const action = { type: 'SAVE_HISTORY_DATA', payload: '1' };
    const newState = mainReducer(initialState, action);
    expect(newState.data).toEqual(['1']);
  });

  it('should update endpoint URL', () => {
    const action = { type: 'UPDATE_ENDPOINT', payload: 'http://new-endpoint.com' };
    const newState = mainReducer(initialState, action);
    expect(newState.endpointUrlInput).toEqual('http://new-endpoint.com');
  });

  it('should update SDL URL', () => {
    const action = { type: 'UPDATE_SDL', payload: 'http://new-sdl.com' };
    const newState = mainReducer(initialState, action);
    expect(newState.sdlUrlInput).toEqual('http://new-sdl.com');
  });

  it('should update query input', () => {
    const action = { type: 'UPDATE_QUERY', payload: '{ users { id name } }' };
    const newState = mainReducer(initialState, action);
    expect(newState.queryInput).toEqual('{ users { id name } }');
  });

  it('should update variables input', () => {
    const action = { type: 'UPDATE_VARIABLES', payload: '{ "id": 1 }' };
    const newState = mainReducer(initialState, action);
    expect(newState.variablesInput).toEqual('{ "id": 1 }');
  });

  it('should save response', () => {
    const action = { type: 'SAVE_RESPONSE', payload: '12' };
    const newState = mainReducer(initialState, action);
    expect(newState.searchResults).toEqual(action.payload);
  });

  it('should save documentation', () => {
    const action = { type: 'SAVE_DOCUMENTATION', payload: 'Documentation content' };
    const newState = mainReducer(initialState, action);
    expect(newState.documentation).toEqual('Documentation content');
  });

  it('should change language', () => {
    const newLanguageData = { lang: 'fr' };
    const action = { type: 'CHANGE_LANGUAGE', payload: newLanguageData };
    const newState = mainReducer(initialState, action);
    expect(newState.languageData).toEqual(newLanguageData);
  });

  it('should show alert', () => {
    const action = { type: 'SHOW_ALERT', payload: 'Error occurred' };
    const newState = mainReducer(initialState, action);
    expect(newState.error).toEqual('Error occurred');
  });

  it('should update all data from URL', () => {
    const action = { type: 'UPDATE_ALL_DATA_FROM_URL', payload: 'http://example.com/graphql' };
    const newState = mainReducer(initialState, action);
    expect(newState.endpointUrlInput).toEqual('');
    expect(newState.headersKeys).toEqual('[]');
    expect(newState.queryInput).toEqual('');
    expect(newState.variablesInput).toEqual('');
    expect(newState.sdlUrlInput).toEqual('');
  });

  it('should handle invalid action type gracefully', () => {
    const action = { type: 'INVALID_ACTION', payload: {} };
    const newState = mainReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
