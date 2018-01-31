// @flow
import React from 'react';
import { Button } from 'semantic-ui-react';
import Wrapper from '../BubbleChartWidgetWrapper';

// type Props = {
//   onClick: () => void,
// };

const printWidget = () =>
  (<Wrapper title="Print and Share">
    <Button icon="print" />
  </Wrapper>);

export default printWidget;
