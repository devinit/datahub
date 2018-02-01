import * as React from 'react';
import { shallow } from 'enzyme';
// import {Button} from 'semantic-ui-react';
import Annotation from '.';

it('renders bubble chart annotation', () => {
  const wrapper = shallow(<Annotation />);
  expect(wrapper.children()).toHaveLength(4);
});
