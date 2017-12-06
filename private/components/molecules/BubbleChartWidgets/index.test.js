import React from 'react';
import { shallow } from 'enzyme';
import BubbleChartAnnotation from 'components/atoms/BubbleChartAnnotation';
import BubbleChart from '.';
import data from './data';

it('renders 1 child of class BubbleChart', () => {
  const wrapper = shallow(<BubbleChart {...data} annotation={<BubbleChartAnnotation />} />);
  expect(wrapper.children()).toHaveLength(1);
});
