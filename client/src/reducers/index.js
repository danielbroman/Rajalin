import { combineReducers } from 'redux';
import authReducer from './authReducer';
import contractReducer from './contractReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  contract: contractReducer,
  errors: errorReducer
});
