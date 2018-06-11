import { TICK, BACK, SET_RANDOM, SET_PATTERN, TOGGLE_CELL, CLEAR } from '../actions/types';
import { getInitialState, getRandomState, getPatternState, toggleCell, getNextState, resetState } from '../helpers';

const numRows = 30;
const numCols = 50;
const initialBoard = getInitialState(numRows, numCols);
const initialState = {
  current: initialBoard,
  history: []
}

const boardReducer = (state = initialState, action) => {
  let newHistory;
  switch (action.type) {
    case TICK:
      newHistory = [...state.history, state.current];
      return {
        current: getNextState(state.current),
        history: newHistory
      }
    case BACK:
      if (state.history.length === 0) {
        return state;
      }
      return {
        current: state.history[state.history.length-1],
        history: state.history.slice(0, state.history.length-1)
      }
    case SET_RANDOM:
      return {
        current: getRandomState(state.current),
        history: []
      }
    case SET_PATTERN:
      return {
        current: getPatternState(state.current, action.pattern),
        history: []
      }
    case TOGGLE_CELL:
      newHistory = [...state.history, state.current];
      return {
        current: toggleCell(state.current, action.cell),
        history: newHistory
      }
    case CLEAR:
      return {
        current: resetState(state.current),
        history: []
      }
    default:
      return state;
  }
}

export default boardReducer;
