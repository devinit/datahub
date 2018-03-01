import * as React from 'react';
import { shallow } from 'enzyme';
import VisualizationTour from '.';

it('renders 10 chirldren for class VisualizationTour', () => {
  const wrapper = shallow(<VisualizationTour entity="global map" />);
  expect(wrapper.children()).toHaveLength(10);
});
