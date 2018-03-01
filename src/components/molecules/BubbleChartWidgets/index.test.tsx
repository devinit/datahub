import * as React from 'react';
import { shallow } from 'enzyme';
import { Annotation } from '../../atoms/BubbleChart';
import BubbleChart from '.';
import data from './data';

it('renders 1 child of class BubbleChart', () => {
  const wrapper = shallow(
    <BubbleChart
      {...data}
      click={console.info}
      annotation={<Annotation />}
    />
    );
  expect(wrapper.children()).toHaveLength(1);
});
