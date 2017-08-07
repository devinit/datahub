// @flow
import React from 'react';
import { Dropdown} from 'semantic-ui-react';
import Wrapper from 'components/atoms/BubbleChartWidgetWrapper';

type Props = {
  onChange: (value: string) => void,
  options: Array<Object>
};

const ColorBy = ({ onChange, options }: Props) => (
  <Wrapper title="Color By">
    <Dropdown
      defaultValue={options[0].value}
      onChange={(e, data) => { onChange(data.value); }}
      selection
      fluid
      options={options}
    />
  </Wrapper>
);

export default ColorBy;
