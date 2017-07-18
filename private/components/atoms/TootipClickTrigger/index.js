// @flow
import React from 'react';
import type { Element } from 'react';
import glamorous from 'glamorous';

type Props = {
  children: Element<any>,
  onClick: () => void
};
const Container = glamorous.div({});
const TooltipClickTrigger = ({ children, onClick}: Props) => (
  <Container onClick={onClick}>
    {children}
  </Container>
);

export default TooltipClickTrigger;

