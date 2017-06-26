import React from 'react';
import { shallow } from 'enzyme';
import Menu from '.';

const wrap = (props = {}) => shallow(<Menu {...props} />);

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'Home' });
  expect(wrapper.contains('Home')).toBe(true);
});
