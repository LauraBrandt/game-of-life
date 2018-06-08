import { TICK, SET_RANDOM, SET_PATTERN, TOGGLE_CELL, CLEAR } from '../actions/types';
import { getInitialState, getRandomState, getPatternState, getNextState, resetState } from '../helpers';

const initialState = getInitialState();

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICK:
      return getNextState(state);
    case SET_RANDOM:
      return getRandomState(state);
    case SET_PATTERN:
      return getPatternState(state, action.pattern);
    case TOGGLE_CELL:
      const newState = [...state];
      const [y, x] = action.cell;
      newState[y][x] = (newState[y][x] + 1) % 2;
      return newState;
    case CLEAR:
      return resetState(state);
    default:
      return state;
  }
}

export default boardReducer;
