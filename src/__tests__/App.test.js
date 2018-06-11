import React from 'react';
import {Provider} from 'react-redux';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import App from '../App';
import Generations from '../components/Generations'
import Gameboard from '../components/Gameboard';
import Controller from '../components/Controller';

describe('<App />', () => {
  describe('content', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<App />);
    });

    it('has a header', () => {
      expect(wrapper.find('header')).toHaveLength(1);
    });

    it('has a footer', () => {
      expect(wrapper.find('footer')).toHaveLength(1);
    });

    it('has 1 Generations component', () => {
      expect(wrapper.find(Generations)).toHaveLength(1);
    });

    it('has 1 Gameboard component', () => {
      expect(wrapper.find(Gameboard)).toHaveLength(1);
    });

    it('has 1 Controller component', () => {
      expect(wrapper.find(Controller)).toHaveLength(1);
    });
  });

  describe('snapshot', () => {
    it('renders correctly', () => {
      // given
      const mockStore = configureStore();
      const initialState = {
        generation: 0,
        board: {
          current: [],
          history: []
        }
      }
      const store = mockStore(initialState);
      // when
      const component = renderer.create(<Provider store={store}><App /></Provider>);
      const tree = component.toJSON();
      // then
      expect(tree).toMatchSnapshot();
    });
  });
});
