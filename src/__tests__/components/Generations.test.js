import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import { Generations } from '../../components/Generations';

describe('<Generations/>', () => {
  it('displays the number of generations passed in', () => {
    const wrapper = shallow(<Generations generation={5}/>);
    expect(wrapper.text()).toContain(5);
  });

  describe('snapshot', () => {
    it('renders correctly', () => {
      const component = renderer.create(<Generations generation={3}/>);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});