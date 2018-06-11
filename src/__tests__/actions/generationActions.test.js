import * as generationActions from '../../actions/generationActions';

describe('generationActions', () => {
  describe('incrementGeneration', () => {
    it('should have a type of INCREMENT_GENERATION', () => {
      const expectation = {
        type: 'INCREMENT_GENERATION'
      }
      const result = generationActions.incrementGeneration();
      expect(result).toEqual(expectation);
    });
  });

  describe('decrementGeneration', () => {
    it('should have a type of DECREMENT_GENERATION', () => {
      const expectation = {
        type: 'DECREMENT_GENERATION'
      }
      const result = generationActions.decrementGeneration();
      expect(result).toEqual(expectation);
    });
  });

  describe('resetGeneration', () => {
    it('should have a type of RESET_GENERATION', () => {
      const expectation = {
        type: 'RESET_GENERATION'
      }
      const result = generationActions.resetGeneration();
      expect(result).toEqual(expectation);
    });
  });
});