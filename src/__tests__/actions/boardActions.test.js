import * as boardActions from '../../actions/boardActions';

describe('boardActions', () => {
  describe('tick', () => {
    it('should have a type of TICK', () => {
      const expectation = {
        type: 'TICK'
      }
      const result = boardActions.tick();
      expect(result).toEqual(expectation);
    });
  });

  describe('setRandom', () => {
    it('should have a type of SET_RANDOM', () => {
      const expectation = {
        type: 'SET_RANDOM'
      }
      const result = boardActions.setRandom();
      expect(result).toEqual(expectation);
    });
  });

  describe('setPattern', () => {
    it('should have a type of SET_PATTERN and the pattern as payload', () => {
      const pattern = [
        [1, 0]
      ]
      const expectation = {
        type: 'SET_PATTERN',
        pattern
      }
      const result = boardActions.setPattern(pattern);
      expect(result).toEqual(expectation);
    });
  });

  describe('toggleCell', () => {
    it('should have a type of TOGGLE_CELL and the pattern as payload', () => {
      const cell = [1, 0];
      const expectation = {
        type: 'TOGGLE_CELL',
        cell
      }
      const result = boardActions.toggleCell(cell);
      expect(result).toEqual(expectation);
    });
  });

  describe('clearBoard', () => {
    it('should have a type of CLEAR', () => {
      const expectation = {
        type: 'CLEAR'
      }
      const result = boardActions.clearBoard();
      expect(result).toEqual(expectation);
    });
  });
});