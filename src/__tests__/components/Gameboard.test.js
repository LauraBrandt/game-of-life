import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import { Gameboard } from '../../components/Gameboard';

describe('<Gameboard/>', () => {
  const props = {
    board: [
      [0,1,0],
      [1,0,1]
    ],
    toggleCell: jest.fn()
  }
  let wrapper;

  describe('content', () => {
    beforeEach(() => {
      wrapper = shallow(<Gameboard {...props}/>);
    });

    it('has the correct number of rows', () => {
      expect(wrapper.find('.board-row')).toHaveLength(2);
    });

    it('has the correct number of cells', () => {
      expect(wrapper.find('.board-cell')).toHaveLength(6);
    });

    it('has the correct number of active cells', () => {
      expect(wrapper.find('.active')).toHaveLength(3);
    });
  });

  describe('interactions', () => {
    describe('toggleCell', () => {
      beforeEach(() => {
        wrapper = shallow(<Gameboard {...props}/>);
      });
      afterEach(() => {
        props.toggleCell.mockClear();
      });

      it('calls toggleCell when cell clicked, with target cell as argument', () => {
        const firstCell = wrapper.find('.board-cell').first();
        firstCell.simulate('click');
        expect(props.toggleCell).toBeCalled();
        expect(props.toggleCell).toBeCalledWith([0,0]);
      });
    });
  });

  describe('snapshot', () => {
    it('renders correctly', () => {
      const component = renderer.create(<Gameboard board={[[0,1],[1,0]]} toggleCell={jest.fn()}/>);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});