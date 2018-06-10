import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import { Controller } from '../../components/Controller';

describe('<Controller/>', () => {
  const props = {
    tick: jest.fn(),
    randomize: jest.fn(),
    setPattern: jest.fn(),
    clearBoard: jest.fn(),
    incrementGeneration: jest.fn(),
    resetGeneration: jest.fn()
  }

  let wrapper;

  afterEach(() => {
    props.tick.mockClear();
    props.randomize.mockClear();
    props.setPattern.mockClear();
    props.clearBoard.mockClear();
    props.incrementGeneration.mockClear();
    props.resetGeneration.mockClear();
  });

  describe('content', () => {
    beforeEach(() => {
      wrapper = shallow(<Controller {...props}/>);
    });

    it('has 2 child divs', () => {
      expect(wrapper.children()).toHaveLength(2);
    });

    it('has the correct number of buttons', () => {
      expect(wrapper.find('.controller-button')).toHaveLength(4);
    });

    it('the first button has text "Play" or "Pause" depending on state.isPlaying', () => {
      wrapper.setState({ isPlaying: false });
      let button = wrapper.find('.controller-button').at(0);
      expect(button.text()).toBe('Play');
      
      wrapper.setState({ isPlaying: true });
      button = wrapper.find('.controller-button').at(0);
      expect(button.text()).toBe('Pause');
    });

    it('the second button has text "Clear"', () => {
      const button = wrapper.find('.controller-button').at(1);
      expect(button.text()).toBe('Clear');
    });

    it('the third button has text "Random"', () => {
      const button = wrapper.find('.controller-button').at(2);
      expect(button.text()).toBe('Random');
    });

    it('the fourth button has text "Patterns"', () => {
      const button = wrapper.find('.controller-button').at(3);
      expect(button.text()).toContain('Patterns');
    });

    it("the dropdown doesn't show unless state.dropdownOpen = true", () => {
      wrapper.setState({ dropdownOpen: false });
      expect(wrapper.find('ul')).toHaveLength(0);
      
      wrapper.setState({ dropdownOpen: true });
      expect(wrapper.find('ul')).toHaveLength(1);
    });

    it('the dropdown has the correct number of list items', () => {
      wrapper.setState({ dropdownOpen: true });
      const numPatterns = wrapper.state('patterns').length;
      const numLi = wrapper.find('ul').find('li').length;
      expect(numLi).toBe(numPatterns);
    });
  });

  describe('interactions', () => {
    beforeEach(() => {
      wrapper = shallow(<Controller {...props}/>);
    });

    it('calls togglePlay on click of Play button', () => {
      wrapper.instance().togglePlay = jest.fn();
      wrapper.instance().forceUpdate();
      wrapper.update();

      wrapper.find('.controller-button').at(0).simulate('click');
      
      expect(wrapper.instance().togglePlay).toBeCalled();
    });

    it('calls clear on click of Clear button', () => {
      wrapper.instance().clear = jest.fn();
      wrapper.instance().forceUpdate();
      wrapper.update();

      wrapper.find('.controller-button').at(1).simulate('click');
      
      expect(wrapper.instance().clear).toBeCalled();
    });

    it('calls randomize on click of Random button', () => {
      wrapper.instance().randomize = jest.fn();
      wrapper.instance().forceUpdate();
      wrapper.update();

      wrapper.find('.controller-button').at(2).simulate('click');
      
      expect(wrapper.instance().randomize).toBeCalled();
    });

    it('calls toggleDropdown on click of Patterns button', () => {
      wrapper.instance().toggleDropdown = jest.fn();
      wrapper.instance().forceUpdate();
      wrapper.update();

      wrapper.find('.controller-pattern').simulate('click');
      
      expect(wrapper.instance().toggleDropdown).toBeCalled();
    });

    it('calls setPattern with correct argument on click of one of the pattern dropdown buttons', () => {
      wrapper.instance().setPattern = jest.fn();
      wrapper.setState({ 
        patterns: [
          {
            name: "Test Pattern",
            code: "testpattern",
            cells: [
              [5, 1], [3, 2]
            ]
          },
        ],
        dropdownOpen: true
      });

      const button = wrapper.find('.controller-pattern-dropdown').find('button').at(0);
      button.simulate('click');
      
      expect(wrapper.instance().setPattern).toBeCalled();
      expect(wrapper.instance().setPattern).toBeCalledWith([[5, 1], [3, 2]]);
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      wrapper = shallow(<Controller {...props}/>);
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    describe('componentDidMount', () => {
      it('sets the patterns when mounted', () => {
        expect(wrapper.state('patterns').length).toBeGreaterThan(0);
      });

      it('calls randomize when mounted', () => {
        spyOn(Controller.prototype, 'randomize')
        mount(<Controller {...props}/>);

        expect(Controller.prototype.randomize).toHaveBeenCalledTimes(1);
      });
    });

    describe('startTimer', () => {
      it('calls setInterval', () => {
        wrapper.instance().startTimer();
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 250);
      });
      
      it('calls props.tick and props.incrementGeneration', () => {
        wrapper.instance().startTimer();

        expect(wrapper.instance().props.tick).not.toBeCalled();
        expect(wrapper.instance().props.incrementGeneration).not.toBeCalled();

        jest.runOnlyPendingTimers();

        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(1); 
        expect(wrapper.instance().props.incrementGeneration).toHaveBeenCalledTimes(1); 
      });

      it('calls runs every 250ms', () => {
        wrapper.instance().startTimer();
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(0);
        expect(wrapper.instance().props.incrementGeneration).toHaveBeenCalledTimes(0);
        
        jest.runTimersToTime(300);
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().props.incrementGeneration).toHaveBeenCalledTimes(1);
        
        jest.runTimersToTime(250);
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(2); 
        expect(wrapper.instance().props.incrementGeneration).toHaveBeenCalledTimes(2); 
        
        jest.runTimersToTime(2000);
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(10); 
        expect(wrapper.instance().props.incrementGeneration).toHaveBeenCalledTimes(10); 
      });

      it('sets state.timer', () => {
        expect(wrapper.state('timer')).toBeNull();
        wrapper.instance().startTimer();
        expect(wrapper.state('timer')).not.toBeNull();
      });
    });

    describe('togglePlay', () => {
      it('clears timer if state.isPlaying is true', () => {
        wrapper.setState({ isPlaying: true });
        wrapper.instance().startTimer();

        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(0); // beginning of timer
        jest.runTimersToTime(300);
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(1); // timer runs once
        
        wrapper.instance().togglePlay();
        jest.runTimersToTime(250);
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(1); // not called again       
      });
      
      it('starts timer if state.isPlaying is false', () => {
        wrapper.instance().startTimer = jest.fn();
        wrapper.setState({ isPlaying: false });

        expect(wrapper.instance().startTimer).not.toBeCalled();

        wrapper.instance().togglePlay();

        expect(wrapper.instance().startTimer).toBeCalled();
      });

      it('toggles state.isPlaying', () => {
        wrapper.setState({ isPlaying: false });

        wrapper.instance().togglePlay();
        expect(wrapper.state('isPlaying')).toBe(true);
        
        wrapper.instance().togglePlay();
        expect(wrapper.state('isPlaying')).toBe(false);
      });
    });

    describe('clear', () => {
      it('clears the timer', () => {
        wrapper.instance().startTimer();
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(0); // beginning of timer
        jest.runTimersToTime(300);
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(1); // timer runs once
        
        wrapper.instance().clear();
        jest.runTimersToTime(250);
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(1); // not called again
      });

      it('changes state.isPlaying to false', () => {
        wrapper.setState({ isPlaying: true });
        wrapper.instance().clear();
        expect(wrapper.state('isPlaying')).toBe(false);
      });

      it('calls props.clearBoard', () => {
        const initial = wrapper.instance().props.clearBoard.mock.calls.length;
        wrapper.instance().clear();
        expect(wrapper.instance().props.clearBoard).toHaveBeenCalledTimes(initial + 1);
      });

      it('calls props.resetGeneration', () => {
        const initial = wrapper.instance().props.resetGeneration.mock.calls.length;
        wrapper.instance().clear();
        expect(wrapper.instance().props.resetGeneration).toHaveBeenCalledTimes(initial + 1);
      });
    });

    describe('randomize', () => {
      it('clears the timer', () => {
        wrapper.instance().startTimer();
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(0); // beginning of timer
        jest.runTimersToTime(300);
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(1); // timer runs once
        
        wrapper.instance().randomize();
        jest.runTimersToTime(250);
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(1); // not called again
      });

      it('changes state.isPlaying to false', () => {
        wrapper.setState({ isPlaying: true });
        wrapper.instance().randomize();
        expect(wrapper.state('isPlaying')).toBe(false);
      });

      it('calls props.resetGeneration', () => {
        const initial = wrapper.instance().props.resetGeneration.mock.calls.length;
        wrapper.instance().randomize();
        expect(wrapper.instance().props.resetGeneration).toHaveBeenCalledTimes(initial + 1);
      });

      it('calls props.randomize', () => {
        const initial = wrapper.instance().props.randomize.mock.calls.length;
        wrapper.instance().randomize();
        expect(wrapper.instance().props.randomize).toHaveBeenCalledTimes(initial + 1);
      });
    });

    describe('setPattern', () => {
      const pattern = [
        [1,2], [3,4]
      ];

      it('clears the timer', () => {
        wrapper.instance().startTimer();
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(0); // beginning of timer
        jest.runTimersToTime(300);
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(1); // timer runs once
        
        wrapper.instance().setPattern(pattern);
        jest.runTimersToTime(250);
        expect(wrapper.instance().props.tick).toHaveBeenCalledTimes(1); // not called again
      });

      it('changes state.isPlaying to false', () => {
        wrapper.setState({ isPlaying: true });
        wrapper.instance().setPattern(pattern);
        expect(wrapper.state('isPlaying')).toBe(false);
      });

      it('calls props.resetGeneration', () => {
        const initial = wrapper.instance().props.resetGeneration.mock.calls.length;
        wrapper.instance().setPattern(pattern);
        expect(wrapper.instance().props.resetGeneration).toHaveBeenCalledTimes(initial + 1);
      });

      it('calls props.setPattern', () => {
        const initial = wrapper.instance().props.setPattern.mock.calls.length;
        wrapper.instance().setPattern(pattern);
        expect(wrapper.instance().props.setPattern).toHaveBeenCalledTimes(initial + 1);
        expect(wrapper.instance().props.setPattern).toBeCalledWith([[1,2],[3,4]]);
      });
    });

    describe('toggleDropdown', () => {
      it('toggles state.dropdownOpen', () => {
        expect(wrapper.state('dropdownOpen')).toBe(false);
        wrapper.instance().toggleDropdown();
        expect(wrapper.state('dropdownOpen')).toBe(true);
      });
    });

    describe('componentWillUnmount', () => {
      it('clears timer on unmount', () => {
        wrapper.instance().startTimer();
        expect(props.tick).toHaveBeenCalledTimes(0); // beginning of timer
        jest.runTimersToTime(300);
        expect(props.tick).toHaveBeenCalledTimes(1); // timer runs once
        
        wrapper.unmount();

        jest.runTimersToTime(250);
        expect(props.tick).toHaveBeenCalledTimes(1); // not called again
      });
    });
  });

  describe('snapshot', () => {
    it('renders correctly', () => {
      const component = renderer.create(<Controller {...props}/>);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});