import * as React from 'react';
import { shallow } from 'enzyme';
import {menueData} from './testData';
import Menu from '.';

it('renders props when passed in', () => {
  const component = shallow(<Menu menu={menueData.menu} />);
  expect(component).toBeTruthy();
});
