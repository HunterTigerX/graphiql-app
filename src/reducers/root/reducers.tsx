import { combineReducers } from 'redux';
import mainReducer from '../reducers/mainReducer';
import userReducer from '../reducers/userSlice';
import restfullReducer from '../reducers/restfullReducer';

const rootReducer = combineReducers({
  main: mainReducer,
  user: userReducer,
  restFull: restfullReducer,
});

export default rootReducer;
