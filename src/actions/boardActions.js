import { TICK, BACK, SET_RANDOM, SET_PATTERN, CLEAR, TOGGLE_CELL } from './types';

export const tick = () => ({
  type: TICK
});

export const back = () => ({
  type: BACK
});

export const setRandom = () => ({
  type: SET_RANDOM
});

export const setPattern = pattern => ({
  type: SET_PATTERN,
  pattern
});

export const toggleCell = cell => ({
  type: TOGGLE_CELL,
  cell
});

export const clearBoard = () => ({
  type: CLEAR
});
