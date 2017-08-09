// @flow
import InternationalResourcesChart from 'components/molecules/InternationalResourcesChart';
import React from 'react';
import type {Props} from 'components/molecules/InternationalResourcesChart';

type WrapperProps = Props & {
  children: any,
  id: string,
  loading: boolean
}

const InternationalResourcesWrapper = (props: WrapperProps) => {
  if (props.loading) return (<p> Loading</p>);
  return (<InternationalResourcesChart
    startYear={props.data.startYear}
    data={props.data}
    config={props.config}
  />);
};

export default InternationalResourcesWrapper;
