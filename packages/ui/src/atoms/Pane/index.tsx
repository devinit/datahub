/**
 * place holder component that holds the actual tab component
 * label and id are used by the parent tab component that assigns label as the tab heading
 */
// FIXME: THIS SEEM FLOWED, I dont see the need for this component
import * as React from 'react';

export interface Props  {
  children: React.ReactChildren | React.ReactChild;
  label: string;
  id: string; // for id prop. react requirement
}

const Pane = (props: Props) => <div {...props} />;

export default Pane;
