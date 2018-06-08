import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import generationReducer from './generationReducer';

const rootReducer = combineReducers({
  board: boardReducer, 
  generation: generationReducer
});

export default rootReducer;