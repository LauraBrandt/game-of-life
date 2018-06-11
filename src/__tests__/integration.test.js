import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import {mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { clearBoard, setPattern } from '../actions/boardActions';
import App from '../App';
import Generations from '../components/Generations'
import Gameboard from '../components/Gameboard';
import Controller from '../components/Controller';

describe('integration', () => {
  const mockStore = configureStore();
  const initialState = {
    generation: 3,
    board: {
      current: [
        [ 1, 0 ],
        [ 0, 1 ],
        [ 1, 1 ]
      ],
      history: []
    }
  }

  describe('props passed correctly', () => {
    let store;
    let wrapper;  
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount(<Provider store={store}><App /></Provider>);
    });
    
    it('passes the correct generation to <Generations/>', () => {
      expect(wrapper.find(Generations).text()).toContain(3);
    });

    it('passes the correct board to <Gameboard/>', () => {
      expect(wrapper.find(Gameboard).find('.board-row')).toHaveLength(3);
      expect(wrapper.find(Gameboard).find('.board-cell')).toHaveLength(6);
      expect(wrapper.find(Gameboard).find('.active')).toHaveLength(4);
    });
  });

  describe('actions dispatched correctly', () => {
    let store;
    let wrapper;  
    beforeEach(() => {
      store = mockStore(initialState);
      wrapper = mount(<Provider store={store}><App /></Provider>);
    });
    
    it('dispatches toggleCell on click of board cell', () => {
      const firstCell = wrapper.find(Gameboard).find('.board-cell').first();
      firstCell.simulate('click');
      const actions = store.getActions();
      expect(actions[actions.length-1]).toEqual({
        type: 'TOGGLE_CELL',
        cell: [ 0, 0 ]
      });
    });
    
    it('dispatches tick and incrementGeneration while timer running', () => {
      const playButton = wrapper.find(Controller).find('.controller-button').at(0);
      expect(playButton.text()).toBe('Play');

      jest.useFakeTimers();
      store.clearActions();

      playButton.simulate('click');

      let actions = store.getActions();
      expect(actions.length).toBe(0);

      jest.runTimersToTime(300);
      actions = store.getActions();
      expect(actions.length).toBe(2); // increased by 2
      expect(actions[actions.length-2]).toEqual({
        type: 'TICK'
      });
      expect(actions[actions.length-1]).toEqual({
        type: 'INCREMENT_GENERATION'
      });

      jest.runTimersToTime(250);
      actions = store.getActions();
      expect(actions.length).toBe(4); // increased by 2
      expect(actions[actions.length-2]).toEqual({
        type: 'TICK'
      });
      expect(actions[actions.length-1]).toEqual({
        type: 'INCREMENT_GENERATION'
      });

      playButton.simulate('click');

      jest.runTimersToTime(250);
      actions = store.getActions();
      expect(actions.length).toBe(4); // not increased any more

      jest.clearAllTimers();
    });

    it('dispatches clearBoard and resetGeneration on click of "Clear" button', () => {
      const button = wrapper.find(Controller).find('.controller-button').at(1);
      expect(button.text()).toBe('Clear');
      button.simulate('click');

      const actions = store.getActions();
      expect(actions[actions.length-2]).toEqual({
        type: 'CLEAR'
      });
      expect(actions[actions.length-1]).toEqual({
        type: 'RESET_GENERATION'
      });
    });

    it('dispatches resetGeneration and setRandom on click of "Random" button', () => {
      const button = wrapper.find(Controller).find('.controller-button').at(2);
      expect(button.text()).toBe('Random');
      button.simulate('click');

      const actions = store.getActions();
      expect(actions[actions.length-2]).toEqual({
        type: 'RESET_GENERATION'
      });
      expect(actions[actions.length-1]).toEqual({
        type: 'SET_RANDOM'
      });
    });

    it('dispatches resetGeneration and setPattern on click "Pattern" button', () => {
      const togglePatternButton = wrapper.find(Controller).find('.controller-button').at(3);
      expect(togglePatternButton.text()).toContain('Patterns');
      togglePatternButton.simulate('click');

      const patternButton = wrapper
        .find(Controller)
        .find('.controller-pattern-dropdown')
        .find('button')
        .at(0);

      patternButton.simulate('click');

      const actions = store.getActions();
      expect(actions[actions.length-2]).toEqual({
        type: 'RESET_GENERATION'
      });
      const lastAction = actions[actions.length-1];
      expect(lastAction.type).toBe('SET_PATTERN');
      expect(lastAction.pattern).toBeDefined;
    });

    it('dispatches back and decrementGeneration on click of back button', () => {
      const button = wrapper.find(Controller).find('.arrow-left');
      button.simulate('click');

      const actions = store.getActions();
      expect(actions[actions.length-2]).toEqual({
        type: 'BACK'
      });
      expect(actions[actions.length-1]).toEqual({
        type: 'DECREMENT_GENERATION'
      });
    });

    it('dispatches tick and incrementGeneration on click of forward button', () => {
      const button = wrapper.find(Controller).find('.arrow-right');
      button.simulate('click');

      const actions = store.getActions();
      expect(actions[actions.length-2]).toEqual({
        type: 'TICK'
      });
      expect(actions[actions.length-1]).toEqual({
        type: 'INCREMENT_GENERATION'
      });
    });
  });

  describe('Gameboard', () => {
    let wrapper;
    let store;
    beforeEach(() => {
      store = createStore(rootReducer);
      wrapper = mount(<Provider store={store}><Gameboard /></Provider>);
    });

    it('toggles "active" class of cell when clicked', () => {
      let firstCell = wrapper.find(Gameboard).find('.board-cell').first();
      expect(firstCell.prop('className')).not.toMatch(/active/);

      firstCell.simulate('click');

      firstCell = wrapper.find(Gameboard).find('.board-cell').first();
      expect(firstCell.prop('className')).toMatch(/active/);

      firstCell.simulate('click');

      firstCell = wrapper.find(Gameboard).find('.board-cell').first();
      expect(firstCell.prop('className')).not.toMatch(/active/);
    });
  });

  describe('Controller', () => {
    let wrapper;
    let store;
    beforeEach(() => {
      store = createStore(rootReducer);
      wrapper = mount(<Provider store={store}><Controller /></Provider>);
    });

    it('toggles the text of the Play/Pause button', () => {
      const playButton = wrapper.find(Controller).find('.controller-button').at(0);
      expect(playButton.text()).toBe('Play');

      playButton.simulate('click');
      expect(playButton.text()).toBe('Pause');
      
      playButton.simulate('click');
      expect(playButton.text()).toBe('Play');
    })
  });

  describe('App', () => {
    let wrapper;
    let store;
    beforeEach(() => {
      jest.useFakeTimers();
      store = createStore(rootReducer);
      wrapper = mount(<Provider store={store}><App /></Provider>);
    });
    afterEach(() => {
      jest.clearAllTimers();
    });

    it('increments Generations display when playing', () => {
      const playButton = wrapper.find(Controller).find('.controller-button').at(0);
      expect(playButton.text()).toBe('Play');
      playButton.simulate('click');

      expect(wrapper.find(Generations).text()).toContain(0);
      jest.runTimersToTime(300);
      expect(wrapper.find(Generations).text()).toContain(1);
      jest.runTimersToTime(250);
      expect(wrapper.find(Generations).text()).toContain(2);
      jest.runTimersToTime(2000);
      expect(wrapper.find(Generations).text()).toContain(10);
    });

    it('updates board while playing', () => {
      // clear board
      store.dispatch(clearBoard());
      wrapper.update();
      let activeCells = wrapper.find(Gameboard).find('.active');
      expect(activeCells).toHaveLength(0);

      // create pattern
      store.dispatch(setPattern([
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2]
      ]));
      wrapper.update();

      // check correct pattern of active cells in Gameboard
      activeCells = wrapper.find(Gameboard).find('.active');
      expect(activeCells).toHaveLength(6);

      let cells = wrapper.find(Gameboard).find('.board-cell');
      let expectedActiveCellIndices = [0, 1, 2, 50+0, 50+1, 50+2] /* corresponds to board of [[1, 1, 1, 0, 0, ...],
                                                                                                [1, 1, 1, 0, 0, ...],
                                                                                                [0, 0, 0, 0, 0, ...],
                                                                                                ...] */
      for (let i=0; i<cells.length; i++) {
        if (expectedActiveCellIndices.includes(i)) {
          expect(cells.at(i).props().className).toContain('active');
        } else {
          expect(cells.at(i).props().className).not.toContain('active');
        }
      }

      // click Play
      const playButton = wrapper.find(Controller).find('.controller-button').at(0);
      expect(playButton.text()).toBe('Play');
      playButton.simulate('click');

      // after 1 tick
      jest.runTimersToTime(300);
      wrapper.update();

      cells = wrapper.find(Gameboard).find('.board-cell');
      expectedActiveCellIndices = [0, 2, 50+0, 50+2, 100+1] /* corresponds to board of [[1, 0, 1, 0, 0, ...],
                                                                                        [1, 0, 1, 0, 0, ...],
                                                                                        [0, 1, 0, 0, 0, ...],
                                                                                         ...] */
      for (let i=0; i<cells.length; i++) {
        if (expectedActiveCellIndices.includes(i)) {
          expect(cells.at(i).props().className).toContain('active');
        } else {
          expect(cells.at(i).props().className).not.toContain('active');
        }
      }

      // after 2 ticks
      jest.runTimersToTime(250);
      wrapper.update();

      cells = wrapper.find(Gameboard).find('.board-cell');
      expectedActiveCellIndices = [50+0, 50+2, 100+1] /* corresponds to board of [[0, 0, 0, 0, 0, ...],
                                                                                  [1, 0, 1, 0, 0, ...],
                                                                                  [0, 1, 0, 0, 0, ...],
                                                                                   ...] */
      for (let i=0; i<cells.length; i++) {
        // if(cells.at(i).props().className.includes('active')) {
        //   console.log(i)
        // }
        if (expectedActiveCellIndices.includes(i)) {
          expect(cells.at(i).props().className).toContain('active');
        } else {
          expect(cells.at(i).props().className).not.toContain('active');
        }
      }

      // after 3 ticks
      jest.runTimersToTime(250);
      wrapper.update();

      cells = wrapper.find(Gameboard).find('.board-cell');
      expectedActiveCellIndices = [50+1, 100+1] /* corresponds to board of [[0, 0, 0, 0, 0, ...],
                                                                            [0, 1, 0, 0, 0, ...],
                                                                            [0, 1, 0, 0, 0, ...],
                                                                             ...] */
      for (let i=0; i<cells.length; i++) {
        if (expectedActiveCellIndices.includes(i)) {
          expect(cells.at(i).props().className).toContain('active');
        } else {
          expect(cells.at(i).props().className).not.toContain('active');
        }
      }

      // after 4 ticks
      jest.runTimersToTime(250);
      wrapper.update();

      activeCells = wrapper.find(Gameboard).find('.active');
      expect(activeCells).toHaveLength(0);
    });

    it('clears board on click of "Clear" button', () => {
      let activeCells = wrapper.find(Gameboard).find('.active');
      expect(activeCells).not.toHaveLength(0);

      const clearButton = wrapper.find(Controller).find('.controller-button').at(1);
      expect(clearButton.text()).toBe('Clear');
      clearButton.simulate('click');

      activeCells = wrapper.find(Gameboard).find('.active');
      expect(activeCells).toHaveLength(0);
    });
  });
});
