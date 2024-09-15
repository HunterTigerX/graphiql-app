import { describe, it, expect, vi } from 'vitest';
import {
  saveHistoryData,
  updateEndpoint,
  updateSDL,
  updateQuery,
  updateHeaders,
  updateVariables,
  updateAllDataWhenPageLoads,
  saveResponse,
  changeLanguage,
  setAlertMessage,
  saveDocumentation,
  addToHistory,
} from './actions';
import { IHeaders } from '@/interfaces/interfaces';

describe('Action Creators', () => {
  let dispatch = vi.fn();

  describe('saveHistoryData', () => {
    it('should dispatch SAVE_HISTORY_DATA with the correct payload', () => {
      const action = 'someAction';
      saveHistoryData(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_HISTORY_DATA',
        payload: action,
      });
    });

    it('should handle empty action', () => {
      const action = '';
      saveHistoryData(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_HISTORY_DATA',
        payload: action,
      });
    });
  });

  describe('updateEndpoint', () => {
    it('should dispatch UPDATE_ENDPOINT with the correct payload', () => {
      const action = 'http://new.endpoint';
      updateEndpoint(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_ENDPOINT',
        payload: action,
      });
    });

    it('should handle empty endpoint', () => {
      const action = '';
      updateEndpoint(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_ENDPOINT',
        payload: action,
      });
    });
  });

  describe('updateSDL', () => {
    it('should dispatch UPDATE_SDL with the correct payload', () => {
      const action = 'newSDL';
      updateSDL(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_SDL',
        payload: action,
      });
    });

    it('should handle empty SDL', () => {
      const action = '';
      updateSDL(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_SDL',
        payload: action,
      });
    });
  });

  describe('updateQuery', () => {
    it('should dispatch UPDATE_QUERY with the correct payload', () => {
      const action = 'queryString';
      updateQuery(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_QUERY',
        payload: action,
      });
    });

    it('should handle empty query', () => {
      const action = '';
      updateQuery(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_QUERY',
        payload: action,
      });
    });
  });

  describe('updateHeaders', () => {
    it('should dispatch UPDATE_HEADERS with the correct payload', () => {
      const action = [{ key: 'Authorization', value: 'Bearer token' }];
      updateHeaders(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_HEADERS',
        payload: action,
      });
    });

    it('should handle empty headers array', () => {
      const action: IHeaders[] = [];
      updateHeaders(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_HEADERS',
        payload: action,
      });
    });
  });

  describe('updateVariables', () => {
    it('should dispatch UPDATE_VARIABLES with the correct payload', () => {
      const action = 'someVariable';
      updateVariables(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_VARIABLES',
        payload: action,
      });
    });

    it('should handle empty variable', () => {
      const action = '';
      updateVariables(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_VARIABLES',
        payload: action,
      });
    });
  });

  describe('updateAllDataWhenPageLoads', () => {
    it('should dispatch UPDATE_ALL_DATA_FROM_URL with the correct payload', () => {
      const action = 'initialData';
      updateAllDataWhenPageLoads(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_ALL_DATA_FROM_URL',
        payload: action,
      });
    });

    it('should handle empty action', () => {
      const action = '';
      updateAllDataWhenPageLoads(action)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_ALL_DATA_FROM_URL',
        payload: action,
      });
    });
  });

  describe('saveResponse', () => {
    it('should dispatch SAVE_RESPONSE with the correct payload', () => {
      const result = 'response data';
      const code = 200;
      const from = true;
      saveResponse(result, code, from)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_RESPONSE',
        payload: { result, code, from },
      });
    });

    it('should handle false result', () => {
      const result = false;
      const code = 404;
      const from = false;
      saveResponse(result, code, from)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_RESPONSE',
        payload: { result, code, from },
      });
    });
  });

  describe('changeLanguage', () => {
    it('should dispatch CHANGE_LANGUAGE with the correct payload', () => {
      const languageDb = { lang: 'en' };
      changeLanguage(languageDb)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CHANGE_LANGUAGE',
        payload: languageDb,
      });
    });

    it('should handle empty language object', () => {
      const languageDb = {};
      changeLanguage(languageDb)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'CHANGE_LANGUAGE',
        payload: languageDb,
      });
    });
  });

  describe('setAlertMessage', () => {
    it('should dispatch SHOW_ALERT with the correct payload', () => {
      const error = 'An error occurred';
      setAlertMessage(error)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SHOW_ALERT',
        payload: error,
      });
    });

    it('should handle empty error message', () => {
      const error = '';
      setAlertMessage(error)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SHOW_ALERT',
        payload: error,
      });
    });
  });

  describe('saveDocumentation', () => {
    it('should dispatch SAVE_DOCUMENTATION with the correct payload', () => {
      const error = 'Documentation saved';
      saveDocumentation(error)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_DOCUMENTATION',
        payload: error,
      });
    });

    it('should handle empty documentation message', () => {
      const error = '';
      saveDocumentation(error)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'SAVE_DOCUMENTATION',
        payload: error,
      });
    });
  });

  describe('addToHistory', () => {
    it('should return ADD_TO_HISTORY action with the correct payload', () => {
      const request = {
        method: 'GET',
        url: 'http://example.com',
        body: 'request body',
        headers: { 'Content-Type': 'application/json' },
      };
      const action = addToHistory(request);
      expect(action).toEqual({
        type: 'ADD_TO_HISTORY',
        payload: request,
      });
    });

    it('should handle empty request object', () => {
      const request = { method: '', url: '', body: '', headers: {} };
      const action = addToHistory(request);
      expect(action).toEqual({
        type: 'ADD_TO_HISTORY',
        payload: request,
      });
    });
  });
});
