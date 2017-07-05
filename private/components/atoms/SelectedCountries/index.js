// @flow
import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import {Wrapper} from 'components/atoms/BubbleSizeDropDown';

type Props = {
  onChange: (value: string | void) => void,
  options?: Array<Object>,
  placeholder: string,
};

const selectedCountries = ({ onChange, options, placeholder }: Props) => (
  <Wrapper>
    <Header as="h4">Selected countries</Header>
    <Dropdown
      onClick={onChange}
      placeholder={placeholder}
      fluid
      search
      selection
      options={options}
    />
  </Wrapper>
);

export default selectedCountries;
