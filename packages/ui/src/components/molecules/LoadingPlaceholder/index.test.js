import React from 'react';
import { shallow } from 'enzyme';
import LoadingPlaceholder from '.';

it('renders 2 children of class LoadingPlaceholder', () => {
  const props = { loading: true };
  const wrapper = shallow(<LoadingPlaceholder {...props} />);
  expect(wrapper.children()).toHaveLength(2);
});
