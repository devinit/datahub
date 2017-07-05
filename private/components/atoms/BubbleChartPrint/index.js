// @flow
import React from 'react';
import { Button } from 'semantic-ui-react';
import Wrapper from 'components/atoms/BubbleChartWidgetWrapper';

type Props = {
  onClick: () => void,
};

const selectedCountries = ({ onClick }: Props) => (
  <Wrapper title="Selected countries">
    <Button icon="print" />
  </Wrapper>
);

export default selectedCountries;
