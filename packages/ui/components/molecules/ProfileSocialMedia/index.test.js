import React from 'react';
import { shallow } from 'enzyme';
import ProfileSocialMedia from '.';

it('renders 4 children of class ', () => {
  const wrapper = shallow(<ProfileSocialMedia />);
  expect(wrapper.children()).toHaveLength(4);
});
