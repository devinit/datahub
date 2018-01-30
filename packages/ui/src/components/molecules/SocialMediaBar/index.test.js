import React from 'react';
import { shallow } from 'enzyme';
import SocialMediaBar from '.';

it('renders 1 child of class SocialMediaBar', () => {
  const wrapper = shallow(<SocialMediaBar />);
  expect(wrapper.children()).toHaveLength(1);
});
