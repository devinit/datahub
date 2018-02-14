import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import Wrapper from '../BubbleChartWidgetWrapper';

export type onChangeT =  (value: string) => void;
export interface Props  {
  onChange: onChangeT;
  options: Array<{value: any}>;
}

const _onChange = (onChange: onChangeT) => (e, data) => onChange(data.value);

const ColorBy = ({ onChange, options }: Props) =>
  (<Wrapper title="Color By">
    <Dropdown
      defaultValue={options[0].value}
      onChange={_onChange(onChange)}
      selection
      fluid
      options={options}
    />
  </Wrapper>);

export default ColorBy;
