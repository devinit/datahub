// @flow
import React from 'react';
import { Dropdown } from 'semantic-ui-react';

type Props = {
  onChange: (value: string | void) => void,
  options?: Array<Object>,
  placeholder: string,
};

const selectedCountries = ({ onChange, options, placeholder }: Props) => (
  <div>
    <span>Selected countries</span>
    <Dropdown onClick={onChange} placeholder={placeholder} fluid search options={options} />
  </div>
);

export default selectedCountries;
