export type RequestHistoryItem = {
  method: string;
  url: string;
  body: string;
  headers: { [key: string]: string };
};

type Action<T> = {
  type: string;
  payload: T;
};

const initialState = {
  data: null,
  history: [] as RequestHistoryItem[],
};

const restfullReducer = (
  state = initialState,
  action: { type: string; payload: null | RequestHistoryItem | Action<RequestHistoryItem | null> }
) => {
  switch (action.type) {
    case 'UPDATE_INPUT': {
      return { ...state, data: action.payload };
    }
    case 'ADD_TO_HISTORY': {
      return {
        ...state,
        history: [...state.history, action.payload as unknown as RequestHistoryItem],
      };
    }
    case 'CLEAR_HISTORY': {
      return { ...state, history: [] };
    }
    default:
      return state;
  }
};

export default restfullReducer;
