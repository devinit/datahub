import * as React from 'react';
import { shallow } from 'enzyme';
import SocialMedia from '.';

it.skip('renders 1 child of class SocialMedia', () => {
  const wrapper = shallow(<SocialMedia />);
  expect(wrapper.children()).toHaveLength(1);
});
