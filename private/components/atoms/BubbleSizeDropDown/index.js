// @flow
import React from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import glamorous from 'glamorous';

export const Wrapper = glamorous.div({
  marginTop: '1em',
  '& h4': {
    marginBottom: '.5em !important'
  }
});

type Props = {
  onChange?: (value: string | void) => void,
  options?: Array<Object>
};

const bubbleChartSize = ({ onChange, options }: Props) => (
  <Wrapper>
    <Header as="h4">Bubble size</Header>
    <Dropdown onClick={onChange} search selection fluid options={options} />
  </Wrapper>
);

export default bubbleChartSize;
