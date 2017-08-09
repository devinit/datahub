// @flow
import React from 'react';
import SlidingDualSidebar from '../../molecules/SlidingDualSidebar';
import type {Props} from '../../molecules/SlidingDualSidebar';

type WrapperProps = Props & {
  children: any,
  id: string,
  loading: boolean
}

const InternationalResourcesWrapper = (props: WrapperProps) => {
  if (props.loading) return (<p> Loading</p>);
  return (<SlidingDualSidebar
    country="Uganda"
    startYear={2015}
    data={props.data}
    config={props.config}
  />);
};

export default InternationalResourcesWrapper;
