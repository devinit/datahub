// @flow
import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import Wrapper from '../BubbleChartWidgetWrapper';

interface Props  {
  onChange?: (event: any) => void;
  options?: object[];
  placeholder: string;
}

const selectedCountries = ({ onChange, options, placeholder }: Props) =>
  (<Wrapper title="Selected countries">
    <Dropdown
      onClick={onChange}
      placeholder={placeholder}
      floating
      search
      selection
      multiple
      options={options}
    />
  </Wrapper>);

export default selectedCountries;
