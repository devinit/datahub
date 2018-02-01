import * as React from 'react';
import { shallow } from 'enzyme';
import ChartFilter from '.';

it('renders 4 children of class ChartFilter', () => {
  const wrapper = shallow(<ChartFilter />);
  expect(wrapper.children()).toHaveLength(4);
});
