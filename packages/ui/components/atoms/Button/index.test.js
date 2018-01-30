import React from 'react';
import { shallow } from 'enzyme';
import Button from '.';

const wrap = (props = {}) => shallow(<Button {...props} />);

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'Click Me' });
  expect(wrapper.contains('Click Me')).toBe(true);
});
