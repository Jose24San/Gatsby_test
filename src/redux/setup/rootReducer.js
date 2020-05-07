import { combineReducers } from 'redux';
import { nutritionReducer } from '../reducers/nutrition';

export default combineReducers( {
  nutrition: nutritionReducer,
} );
