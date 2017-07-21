// @flow
import React from 'react';
import type { Element } from 'react';
import glamorous from 'glamorous';

type Props = {
  children: Element<any>,
  onClick: (boolean) => void
};
const Container = glamorous.div({});
const TooltipClickTrigger = ({ children, onClick}: Props) => (
  <Container onClick={() => onClick(true)}>
    {children}
  </Container>
);

export default TooltipClickTrigger;

