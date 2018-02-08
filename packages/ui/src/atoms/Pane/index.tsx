/**
 * place holder component that holds the actual tab component
 * label and id are used by the parent tab component that assigns label as the tab heading
 */
import * as React from 'react';

interface Props  {
  children: React.ReactChildren;
  label: string;
  id: string; // for id prop. react requirement
}

const Pane = (props: Props) => <div {...props} />;

export default Pane;
