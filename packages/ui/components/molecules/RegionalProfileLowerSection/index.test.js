import React from 'react';
import { shallow } from 'enzyme';
import RegionalProfileLowerSection from '.';

it('renders 1 children of class RegionalProfileLowerSection', () => {
  const wrapper = shallow(<RegionalProfileLowerSection />);
  expect(wrapper.children()).toHaveLength(1);
});
