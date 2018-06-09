import { INCREMENT_GENERATION, RESET_GENERATION, CLEAR } from '../../actions/types';
import generationReducer from '../../reducers/generationReducer';

describe('generationReducer', () => {
  it('returns initial state', () => {
    expect(generationReducer(undefined, {})).toEqual(0);
  });

  it('increments generation', () => {
    // given
    const beforeState = 5;
    const action = {type: INCREMENT_GENERATION};
    // when
    const afterState = generationReducer(beforeState, action);
    // then
    expect(afterState).toBe(6);
  });

  it('resets generation', () => {
    // given
    const beforeState = 5;
    const action = {type: RESET_GENERATION};
    // when
    const afterState = generationReducer(beforeState, action);
    // then
    expect(afterState).toBe(0);
  });

  it('returns unmodified state for other actions', () => {
    // given
    const beforeState = 5;
    const action = {type: CLEAR};
    // when
    const afterState = generationReducer(beforeState, action);
    // then
    expect(afterState).toBe(5);
  });
});
