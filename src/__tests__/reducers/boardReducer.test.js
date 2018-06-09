import { TICK, SET_RANDOM, SET_PATTERN, TOGGLE_CELL, CLEAR, RESET_GENERATION } from '../../actions/types';
import boardReducer from '../../reducers/boardReducer';

describe('boardReducer', () => {
  it('returns initial state', () => {
    const initialState = boardReducer(undefined, {});
    expect(initialState.length).toBe(30);
    for (let i=0; i<initialState.length; i++) {
      expect(initialState[i].length).toBe(50);
      for (let j=0; j<initialState[i].length; j++) {
        expect(initialState[i][j]).toBe(0);
      }
    };
  });

  it('gets next state on tick', () => {
    // given
    const beforeState = [
      [1, 0, 0, 1],
      [1, 0, 1, 1],
      [0, 1, 1, 1]
    ];
    const action = { type: TICK };
    // when
    const afterState = boardReducer(beforeState, action);
    // then
    expect(afterState).toEqual([
      [0, 1, 1, 1],
      [1, 0, 0, 0],
      [0, 1, 0, 1]
    ]);
  });

  it('sets up a random board', () => {
    // given
    const beforeState = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    const action = {type: SET_RANDOM};
    // when
    const afterState = boardReducer(beforeState, action);
    // then
    for (let i=0; i<3; i++) {
      for (let j=0; j<4; j++) {
        expect(afterState[i][j]).toBeLessThanOrEqual(1);
        expect(afterState[i][j]).toBeGreaterThanOrEqual(0);
      }
    }
    expect(beforeState).not.toEqual(afterState);
  });

  it('sets up a particular pattern', () => {
    // given
    const beforeState = [
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [0, 1, 0, 1]
    ];
    const action = {
      type: SET_PATTERN,
      pattern: [
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 1 ],
        [ 1, 2 ]
      ]
    };
    // when
    const afterState = boardReducer(beforeState, action);
    // then
    expect(afterState).toEqual([
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ]);
  });

  it('toggles a given cell', () => {
    // given
    const beforeState = [
      [1, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0]
    ];
    const action = {
      type: TOGGLE_CELL,
      cell: [ 0, 0 ]
    };
    // when
    const afterState = boardReducer(beforeState, action);
    // then
    expect(afterState).toEqual([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0]
    ]);
  });

  it('resets the board', () => {
    // given
    const beforeState = [
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [0, 1, 0, 1]
    ];
    const action = { type: CLEAR };
    // when
    const afterState = boardReducer(beforeState, action);
    // then
    expect(afterState).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  it('returns unmodified state for other actions', () => {
    // given
    const beforeState = [
      [1, 0, 0, 1],
      [1, 1, 1, 0],
      [0, 1, 0, 1]
    ];
    const action = {type: RESET_GENERATION};
    // when
    const afterState = boardReducer(beforeState, action);
    // then
    expect(afterState).toEqual(beforeState);
  });
});
