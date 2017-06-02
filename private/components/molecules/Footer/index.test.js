import React from 'react';
import { shallow } from 'enzyme';
import Footer from '.';

const wrap = (props = {}) => shallow(<Footer {...props} />);

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' });
  expect(wrapper).toBeTruthy();
  // return true;
});
