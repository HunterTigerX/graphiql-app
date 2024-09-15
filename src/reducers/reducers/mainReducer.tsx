import { IStateMain, IHeaders, IErrors, IResults, IPostData, ILanguage } from '@/interfaces/interfaces';
import { enLanguage } from '@/languages/languages';
import { dataFromUrl } from '@/methods/graphql/urlConverter';

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

const mainReducer = (
  state = initialState,
  action: { type: string; payload: boolean | ILanguage | string | string[] | IHeaders[] | IErrors }
) => {
  switch (action.type) {
    case 'UPDATE_HEADERS': {
      const newHeaders = action.payload as IHeaders[];
      return {
        ...state,
        headersKeys: JSON.stringify([...newHeaders]),
      };
    }
    case 'SAVE_HISTORY_DATA': {
      const mergedArray = [action.payload].concat(state.data);
      return { ...state, data: mergedArray };
    }
    case 'UPDATE_ENDPOINT': {
      return { ...state, endpointUrlInput: action.payload };
    }
    case 'UPDATE_SDL': {
      return { ...state, sdlUrlInput: action.payload };
    }
    case 'UPDATE_QUERY': {
      return { ...state, queryInput: action.payload };
    }
    case 'UPDATE_VARIABLES': {
      return { ...state, variablesInput: action.payload };
    }
    case 'SAVE_RESPONSE': {
      return { ...state, searchResults: action.payload };
    }
    case 'SAVE_DOCUMENTATION': {
      return { ...state, documentation: action.payload };
    }
    case 'CHANGE_LANGUAGE': {
      return { ...state, languageData: action.payload };
    }
    case 'SHOW_ALERT': {
      return { ...state, error: action.payload };
    }
    case 'UPDATE_ALL_DATA_FROM_URL': {
      const partialData: IResults | boolean = dataFromUrl(action.payload as string);
      const submitData: IPostData = {
        endpointUrl: '',
        sdlUrl: '',
        headers: [],
        query: '',
        variables: '',
      };
      if (partialData) {
        submitData.headers = partialData.headers;
        if (partialData.query !== '') {
          submitData.query = partialData.query;
        }
        submitData.endpointUrl = partialData.endpointUrl;
        submitData.variables = partialData.variables;
        submitData.sdlUrl = `${partialData.endpointUrl}?sdl`;
      }
      return {
        ...state,
        endpointUrlInput: submitData.endpointUrl,
        sdlUrlInput:
          state.sdlUrlInput === '' && state.endpointUrlInput !== ''
            ? `${state.endpointUrlInput}?sdl`
            : state.sdlUrlInput,
        queryInput: submitData.query,
        headersKeys: JSON.stringify([...submitData.headers]),
        variablesInput: submitData.variables,
      };
    }
    default:
      return state;
  }
};

export default mainReducer;
