import * as React from 'react';
import { shallow } from 'enzyme';
import VisualizationTour from '.';

it('renders chartshare', () => {
  const wrapper = shallow(<VisualizationTour aidType="oda" />);
  expect(wrapper.find('.item-1')).toHaveLength(1);
  expect(wrapper.children()).toHaveLength(8);
});
