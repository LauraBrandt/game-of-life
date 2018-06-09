import * as helpers from '../helpers';

describe('helpers', () => {
  describe('getInitialState', () => {
    it('returns a zero-filled array with the given number of columns and rows', () => {
      // given
      const numRows = 5;
      const numCols = 3;
      // when
      const board = helpers.getInitialState(numRows,numCols);
      // then
      expect(board).toEqual([
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ]);
    });
  });

  describe('resetState', () => {
    it('returns a zero-filled array of the same size as the input', () => {
      // given
      const initialState = [
        [1, 0, 0, 1],
        [1, 1, 1, 0],
        [0, 1, 0, 1]
      ];
      // when
      const newState = helpers.resetState(initialState);
      //then
      expect(newState).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);
    });
  });

  describe('getRandomState', () => {
    it('returns an array the same size as the input', () => {
      // given
      const initialState = [
        [1, 0, 0, 1],
        [1, 1, 1, 0],
        [0, 1, 0, 1]
      ];
      // when
      const newState = helpers.getRandomState(initialState);
      //then
      expect(newState.length).toBe(3);
      for (let i=0; i<newState.length; i++) {
        expect(newState[i].length).toBe(4);
      }
    });

    it('return an array filled with only zeros and ones', () => {
      // given
      const initialState = [
        [1, 0, 0, 1],
        [1, 1, 1, 0],
        [0, 1, 0, 1]
      ];
      // when
      const newState = helpers.getRandomState(initialState);
      //then
      for (let i=0; i<newState.length; i++) {
        for (let j=0; j<newState[i].length; j++) {
          expect(newState[i][j]).toBeLessThanOrEqual(1);
          expect(newState[i][j]).toBeGreaterThanOrEqual(0);
        }
      }
    });

    it('return an array with at least 1 zero and 1 one', () => {
      // given
      const initialState = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      // when
      const newState = helpers.getRandomState(initialState);
      let ones = 0;
      let zeros = 0;
      for (let i=0; i<newState.length; i++) {
        for (let j=0; j<newState[i].length; j++) {
          if (newState[i][j]) {
            ones++;
          } else {
            zeros++;
          }
        }
      }
      //then
      expect(ones).toBeGreaterThan(0);
      expect(zeros).toBeGreaterThan(0);
      expect(ones + zeros).toBe(12);
    });
  });

  describe('getPatternState', () => {
    it('returns an array with 1s in cells specified by the given pattern, and 0s elsewhere', () => {
      // given
      const initialState = [
        [1, 0, 0, 1],
        [1, 1, 1, 0],
        [0, 1, 0, 1]
      ];
      const pattern = [
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 1 ],
        [ 1, 2 ]
      ]
      // when
      const newState = helpers.getPatternState(initialState, pattern);
      //then
      expect(newState).toEqual([
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ]);
    });
  });

  describe('toggleCell', () => {
    it('returns the intial array with the given cell changed from 1 to 0', () => {
      // given
      const initialState = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      const cell = [ 0, 0 ];
      // when
      const newState = helpers.toggleCell(initialState, cell);
      //then
      expect(newState).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);
    });

    it('returns the intial array with the given cell changed from 0 to 1', () => {
      // given
      const initialState = [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [0, 1, 1, 1]
      ];
      const cell = [ 2, 0 ];
      // when
      const newState = helpers.toggleCell(initialState, cell);
      //then
      expect(newState).toEqual([
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
      ]);
    });
  });

  describe('getNumNeighbors', () => {
    it('calculates the correct number of neighbors for the top left corner cell', () => {
      // given
      const initialState = [
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ];
      const cell = [ 0, 0 ];
      // when
      const numNeighbors = helpers.getNumNeighbors(cell, initialState);
      //then
      expect(numNeighbors).toBe(2);
    });

    it('calculates the correct number of neighbors for the bottom right corner cell', () => {
      // given
      const initialState = [
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 1, 1]
      ];
      const cell = [ 2, 3 ];
      // when
      const numNeighbors = helpers.getNumNeighbors(cell, initialState);
      //then
      expect(numNeighbors).toBe(3);
    });
    
    it('calculates the correct number of neighbors for a cell on the top edge', () => {
      // given
      const initialState = [
        [0, 1, 1, 0],
        [1, 0, 1, 0],
        [0, 0, 0, 0]
      ];
      const cell = [ 0, 1 ];
      // when
      const numNeighbors = helpers.getNumNeighbors(cell, initialState);
      //then
      expect(numNeighbors).toBe(3);
    });
    
    it('calculates the correct number of neighbors for a cell on the left edge', () => {
      // given
      const initialState = [
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      const cell = [ 1, 0 ];
      // when
      const numNeighbors = helpers.getNumNeighbors(cell, initialState);
      //then
      expect(numNeighbors).toBe(2);
    });
    
    it('calculates the correct number of neighbors for a cell on the right edge', () => {
      // given
      const initialState = [
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0]
      ];
      const cell = [ 1, 3 ];
      // when
      const numNeighbors = helpers.getNumNeighbors(cell, initialState);
      //then
      expect(numNeighbors).toBe(0);
    });
    
    it('calculates the correct number of neighbors for a cell on the bottom edge', () => {
      // given
      const initialState = [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0]
      ];
      const cell = [ 2, 1 ];
      // when
      const numNeighbors = helpers.getNumNeighbors(cell, initialState);
      //then
      expect(numNeighbors).toBe(3);
    });

    it('calculates the correct number of neighbors for a central cell', () => {
      // given
      const initialState = [
        [1, 0, 1, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0]
      ];
      const cell = [ 1, 1 ];
      // when
      const numNeighbors = helpers.getNumNeighbors(cell, initialState);
      //then
      expect(numNeighbors).toBe(5);
    });
  });

  describe('getNextState', () => {
    it('changes a live cell to a dead cell if the cell has 0 neighbors', () => {
      // given
      const initialState = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    it('changes a live cell to a dead cell if the cell has 1 neighbor', () => {
      // given
      const initialState = [
        [0, 1, 0],
        [0, 1, 0],
        [0, 0, 0]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    it('keeps a live cell the same if the cell has 2 neighbors', () => {
      // given
      const initialState = [
        [0, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(1);
    });

    it('keeps a live cell the same if the cell has 3 neighbors', () => {
      // given
      const initialState = [
        [0, 1, 1],
        [0, 1, 1],
        [0, 0, 0]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(1);
    });

    it('changes a live cell to a dead cell if the cell has 4 neighbors', () => {
      // given
      const initialState = [
        [0, 1, 1],
        [0, 1, 1],
        [0, 0, 1]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    it('changes a live cell to a dead cell if the cell has 5 neighbors', () => {
      // given
      const initialState = [
        [0, 1, 1],
        [0, 1, 1],
        [0, 1, 1]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    it('changes a live cell to a dead cell if the cell has 6 neighbors', () => {
      // given
      const initialState = [
        [0, 1, 1],
        [0, 1, 1],
        [1, 1, 1]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    it('changes a live cell to a dead cell if the cell has 7 neighbors', () => {
      // given
      const initialState = [
        [0, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    it('changes a live cell to a dead cell if the cell has 8 neighbors', () => {
      // given
      const initialState = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    
    it('keeps a dead cell the same if the cell has 0 neighbors', () => {
      // given
      const initialState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    it('keeps a dead cell the same if the cell has 1 neighbor', () => {
      // given
      const initialState = [
        [0, 1, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    it('keeps a dead cell the same if the cell has 2 neighbors', () => {
      // given
      const initialState = [
        [0, 1, 1],
        [0, 0, 0],
        [0, 0, 0]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    it('changes a dead cell to a live cell if the cell has 3 neighbors', () => {
      // given
      const initialState = [
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 0]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(1);
    });

    it('keeps a dead cell the same if the cell has 4 neighbors', () => {
      // given
      const initialState = [
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });
    
    it('keeps a dead cell the same if the cell has 5 neighbors', () => {
      // given
      const initialState = [
        [0, 1, 1],
        [0, 0, 1],
        [0, 1, 1]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    it('keeps a dead cell the same if the cell has 6 neighbors', () => {
      // given
      const initialState = [
        [0, 1, 1],
        [0, 0, 1],
        [1, 1, 1]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    it('keeps a dead cell the same if the cell has 7 neighbors', () => {
      // given
      const initialState = [
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    it('keeps a dead cell the same if the cell has 8 neighbors', () => {
      // given
      const initialState = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState[1][1]).toBe(0);
    });

    
    it('successfully returns the new state according to the rules', () => {
      // given
      const initialState = [
        [0, 1, 1, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 1, 1, 0, 0],
      ];
      // when
      const newState = helpers.getNextState(initialState);
      //then
      expect(newState).toEqual([
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 0]
      ]);
    });
  });
});