// @flow
import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import {Wrapper} from 'components/atoms/BubbleSizeDropDown';

type Props = {
  onChange?: (value: string | void) => void,
  options?: Array<Object>
};

const ColorBy = ({ onChange, options }: Props) => (
  <Wrapper>
    <Header as="h4">Color By</Header>
    <Dropdown onClick={onChange} selection fluid options={options} />
  </Wrapper>
);

export default ColorBy;
