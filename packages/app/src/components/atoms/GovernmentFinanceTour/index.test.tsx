import * as React from 'react';
import { shallow } from 'enzyme';
import GovernmentFinanceTour from '.';

it('renders governmentFinanceTour', () => {
  const wrapper = shallow(<GovernmentFinanceTour />);
  expect(wrapper.find('.item-1')).toHaveLength(1);
  expect(wrapper.children()).toHaveLength(8);
});
