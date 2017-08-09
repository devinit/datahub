// @flow
import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import Wrapper from 'components/atoms/BubbleChartWidgetWrapper';

type Props = {
  onChange?: (value: string | void) => void,
  options?: Array<Object>
};

const bubbleChartSize = ({ onChange, options }: Props) => (
  <Wrapper title="Bubble size">
    <Dropdown onClick={onChange} search selection floating options={options} />
  </Wrapper>
);

export default bubbleChartSize;
