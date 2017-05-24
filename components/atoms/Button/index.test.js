import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Button from '.';

const wrap = (props = {}) => shallow(<Button {...props} />);

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'Click Me' });
  expect(wrapper.contains('Click Me')).toBe(true);
});

it('simulates click events', () => {
  const onClick = sinon.spy();
  const wrapper = shallow(<Button onClick={onClick}>Hello Button</Button>);
  wrapper.find('button').simulate('click');
  expect(onClick.callCount).toBe(1);
});
