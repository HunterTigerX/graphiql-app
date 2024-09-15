import { IHeaders, ILanguage, IResponse } from '@/interfaces/interfaces';

export const saveHistoryData = (action: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'SAVE_HISTORY_DATA',
      payload: action,
    });
  };
};

export const updateEndpoint = (action: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'UPDATE_ENDPOINT',
      payload: action,
    });
  };
};
export const updateSDL = (action: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'UPDATE_SDL',
      payload: action,
    });
  };
};
export const updateQuery = (action: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'UPDATE_QUERY',
      payload: action,
    });
  };
};
export const updateHeaders = (action: IHeaders[]) => {
  return (dispatch: (arg0: { type: string; payload: IHeaders[] }) => void) => {
    dispatch({
      type: 'UPDATE_HEADERS',
      payload: action,
    });
  };
};

export const updateVariables = (action: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'UPDATE_VARIABLES',
      payload: action,
    });
  };
};

export const updateAllDataWhenPageLoads = (action: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'UPDATE_ALL_DATA_FROM_URL',
      payload: action,
    });
  };
};

export const saveResponse = (result: string | false, code: number, from: boolean) => {
  return (dispatch: (arg0: { type: string; payload: IResponse }) => void) => {
    dispatch({
      type: 'SAVE_RESPONSE',
      payload: { result, code, from },
    });
  };
};

export const changeLanguage = (languageDb: ILanguage) => {
  return (dispatch: (arg0: { type: string; payload: ILanguage }) => void) => {
    dispatch({
      type: 'CHANGE_LANGUAGE',
      payload: languageDb,
    });
  };
};

export const setAlertMessage = (error: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'SHOW_ALERT',
      payload: error,
    });
  };
};

export const saveDocumentation = (error: string) => {
  return (dispatch: (arg0: { type: string; payload: string }) => void) => {
    dispatch({
      type: 'SAVE_DOCUMENTATION',
      payload: error,
    });
  };
};

export const addToHistory = (request: {
  method: string;
  url: string;
  body: string;
  headers: { [key: string]: string };
}) => ({
  type: 'ADD_TO_HISTORY',
  payload: request,
});
