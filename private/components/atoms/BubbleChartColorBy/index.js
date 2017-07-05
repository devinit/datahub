// @flow
import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import Wrapper from 'components/atoms/BubbleChartWidgetWrapper';

type Props = {
  onChange?: (value: string | void) => void,
  options?: Array<Object>
};

const ColorBy = ({ onChange, options }: Props) => (
  <Wrapper title="Color By">
    <Dropdown onClick={onChange} selection fluid options={options} />
  </Wrapper>
);

export default ColorBy;
