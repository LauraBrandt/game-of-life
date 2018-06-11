import { TICK, BACK, SET_RANDOM, SET_PATTERN, TOGGLE_CELL, CLEAR, RESET_GENERATION } from '../../actions/types';
import boardReducer from '../../reducers/boardReducer';

describe('boardReducer', () => {
  it('returns initial state', () => {
    const initialState = boardReducer(undefined, {});
    expect(initialState.current.length).toBe(30);
    for (let i=0; i<initialState.current.length; i++) {
      expect(initialState.current[i].length).toBe(50);
      for (let j=0; j<initialState.current[i].length; j++) {
        expect(initialState.current[i][j]).toBe(0);
      }
    };
    expect(initialState.history).toEqual([]);
  });

  it('gets next state on tick and adds previous state to history', () => {
    // given
    const initialBoard = [
      [1, 0, 0, 1],
      [1, 0, 1, 1],
      [0, 1, 1, 1]
    ];
    const beforeState = {
      current: initialBoard,
      history: [[], []]
    };
    const action = { type: TICK };
    // when
    const afterState = boardReducer(beforeState, action);
    // then
    expect(afterState).toEqual({
      current: [
        [0, 1, 1, 1],
        [1, 0, 0, 0],
        [0, 1, 0, 1]
      ],
      history: [[], [], initialBoard]
    });
  });

  it('gets the previous state, removing it from history', () => {
    // given
    const previousBoard = [
      [1, 0, 0, 1],
      [1, 0, 1, 1],
      [0, 1, 1, 1]
    ];
    const currentBoard = [
      [0, 1, 1, 1],
      [1, 0, 0, 0],
      [0, 1, 0, 1]
    ]
    const beforeState = {
      current: currentBoard,
      history: [[], previousBoard]
    };
    const action = { type: BACK };
    // when
    const afterState = boardReducer(beforeState, action);
    // then
    expect(afterState).toEqual({
      current: previousBoard,
      history: [[]]
    });
  });

  it("returns the current state on 'back' when history is empty", () => {
    // given
    const currentBoard = [
      [0, 1, 1, 1],
      [1, 0, 0, 0],
      [0, 1, 0, 1]
    ]
    const beforeState = {
      current: currentBoard,
      history: []
    };
    const action = { type: BACK };
    // when
    const afterState = boardReducer(beforeState, action);
    // then
    expect(afterState).toEqual(beforeState);
  });

  it('sets up a random board and resets history', () => {
    // given
    const beforeState = {
      current: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      history: [[],[],[]]
    };
    const action = {type: SET_RANDOM};
    // when
    const afterState = boardReducer(beforeState, action);
    // then
    for (let i=0; i<3; i++) {
      for (let j=0; j<4; j++) {
        expect(afterState.current[i][j]).toBeLessThanOrEqual(1);
        expect(afterState.current[i][j]).toBeGreaterThanOrEqual(0);
      }
    }
    expect(beforeState.current).not.toEqual(afterState.current);

    expect(afterState.history).toEqual([]);
  });

  it('sets up a particular pattern and resets history', () => {
    // given
    const beforeState = {
      current: [
        [1, 0, 0, 1],
        [1, 1, 1, 0],
        [0, 1, 0, 1]
      ],
      history: [[],[],[]]
    };
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
    expect(afterState).toEqual({
      current: [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ],
      history: []
    });
  });

  it('toggles a given cell and adds previous state to history', () => {
    // given
    const initialBoard = [
      [1, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0]
    ];
    const beforeState = {
      current: initialBoard,
      history: [[], []]
    }
    const action = {
      type: TOGGLE_CELL,
      cell: [ 0, 0 ]
    };
    // when
    const afterState = boardReducer(beforeState, action);
    // then
    expect(afterState).toEqual({
      current: [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0]
      ],
      history: [[], [], initialBoard]
    });
  });

  it('resets the board and history', () => {
    // given
    const beforeState = {
      current: [
        [1, 0, 0, 1],
        [1, 1, 1, 0],
        [0, 1, 0, 1]
      ],
      history: [[], [], []]
    };
    const action = { type: CLEAR };
    // when
    const afterState = boardReducer(beforeState, action);
    // then
    expect(afterState).toEqual({
      current: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      history: []
    });
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
