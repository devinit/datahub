import React from 'react';
import { shallow } from 'enzyme';
import Loader from '.';

it('renders 1 child of class Loader', () => {
  const props = { loading: true };
  const wrapper = shallow(<Loader {...props} />);
  expect(wrapper.children()).toHaveLength(1);
});
