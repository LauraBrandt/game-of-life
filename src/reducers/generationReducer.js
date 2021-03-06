import { INCREMENT_GENERATION, DECREMENT_GENERATION, RESET_GENERATION } from '../actions/types';

const initialState = 0

const generationReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_GENERATION:
      return state + 1;
    case DECREMENT_GENERATION:
      return state > 0 ? state - 1 : state; // can't go below zero
    case RESET_GENERATION:
      return 0;
    default:
      return state;
  }
}

export default generationReducer;
