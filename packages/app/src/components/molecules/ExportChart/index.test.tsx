import * as React from 'react';
import { shallow } from 'enzyme';
import ExportChart from '.';

it('renders 1 child of class Exportchart', () => {
  const wrapper = shallow(<ExportChart />);
  expect(wrapper.children()).toHaveLength(1);
});
