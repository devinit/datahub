// @flow
import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import Wrapper from 'components/atoms/BubbleChartWidgetWrapper';

type Props = {
  onChange: (value: string | void) => void,
  options?: Array<Object>,
  placeholder: string,
};

const selectedCountries = ({ onChange, options, placeholder }: Props) => (
  <Wrapper title="Selected countries">
    <Dropdown
      onClick={onChange}
      placeholder={placeholder}
      floating
      search
      selection
      multiple
      options={options}
    />
  </Wrapper>
);

export default selectedCountries;
