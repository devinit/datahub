import * as React from 'react';
import { Button } from 'semantic-ui-react';
import Wrapper from '../BubbleChartWidgetWrapper';

export interface Props  {
   onClick: () => void;
 }

const printWidget = (props: Props) =>
  (<Wrapper title="Print and Share">
    <Button icon="print"  onClick={props.onClick}/>
  </Wrapper>);

export default printWidget;
