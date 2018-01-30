import React from 'react';
import { shallow } from 'enzyme';
import About from '.';

it('renders 3 children of class about', () => {
  const wrapper = shallow(<About />);
  expect(wrapper.children()).toHaveLength(3);
});
