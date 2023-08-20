import { combineReducers } from 'redux';
import rotateReducer from "./rotateReducer";
import colorChangeReducer from './colorChangeReducer';
import thunkReducer from './thunkReducer';

export default combineReducers({
    rotateReducer,
    colorChangeReducer,
    thunkReducer
})
