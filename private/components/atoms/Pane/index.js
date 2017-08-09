// @flow
/**
 * place holder component that holds the actual tab component
 * label and id are used by the parent tab component that assigns label as the tab heading
 */
import React from 'react';
import type { Element } from 'react';

type Props = {
  children: Element<any>,
  label: string,
  id: string // for id prop. react requirement
};

const Pane = (props: Props) => (
  <div {...props} />
);

export default Pane;
