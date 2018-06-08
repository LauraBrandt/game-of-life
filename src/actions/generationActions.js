import { INCREMENT_GENERATION, RESET_GENERATION } from './types';

export const incrementGeneration = () => ({
  type: INCREMENT_GENERATION
});

export const resetGeneration = () => ({
  type: RESET_GENERATION
});