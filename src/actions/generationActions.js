import { INCREMENT_GENERATION, DECREMENT_GENERATION, RESET_GENERATION } from './types';

export const incrementGeneration = () => ({
  type: INCREMENT_GENERATION
});

export const decrementGeneration = () => ({
  type: DECREMENT_GENERATION
});

export const resetGeneration = () => ({
  type: RESET_GENERATION
});