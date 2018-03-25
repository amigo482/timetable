import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import timetable from './timetable';
import login from './login';
import libraries from './libraries';
import modal from './modal';
import tables from './tables';

const rootReducer = combineReducers({
  form: formReducer,
  timetable,
  login,
  libraries,
  tables,
  modal,
});

export default rootReducer;
