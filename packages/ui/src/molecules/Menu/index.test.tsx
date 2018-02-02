import * as React from 'react';
import { shallow } from 'enzyme';
import Menu from '.';

const wrap = (props = {}) => shallow(<Menu {...props} />);

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' });
  expect(wrapper).toBeTruthy();
  // return true;
});
