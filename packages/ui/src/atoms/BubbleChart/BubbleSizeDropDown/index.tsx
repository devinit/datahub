import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import Wrapper from '../BubbleChartWidgetWrapper';

export interface Props {
  onChange?: (event: any) => void;
  options?: object[];
}

export default ({ onChange, options }: Props) =>
  (<Wrapper title="Bubble size">
    <Dropdown onClick={onChange} search selection floating options={options} />
  </Wrapper>);
