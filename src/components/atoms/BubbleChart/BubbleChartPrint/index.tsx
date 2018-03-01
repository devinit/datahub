import * as React from 'react';
import { Button } from 'semantic-ui-react';
import Wrapper from '../BubbleChartWidgetWrapper';

export interface Props  {
   onClick: () => void;
 }

export default (props: Props) =>
  (<Wrapper title="Print and Share">
    <Button icon="print"  onClick={props.onClick}/>
  </Wrapper>);
