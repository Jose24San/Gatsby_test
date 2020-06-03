import { combineReducers } from 'redux';
import { nutritionReducer } from './nutrition';
import { dialogReducer } from './dialogs'
import { notificationReducer } from './notification'

export default combineReducers( {
  dialogs: dialogReducer,
  notification: notificationReducer,
  nutrition: nutritionReducer,
} );
