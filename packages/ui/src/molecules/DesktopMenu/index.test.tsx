import * as React from 'react';
import { shallow } from 'enzyme';
import menueData from './testData';
import Menu from '.';

it('renders 7 children for class Menu', () => {
  const wrapper = shallow(<Menu menu={menueData.mainMenu} />);
  expect(wrapper.children()).toHaveLength(7);
});