// @flow
import React from 'react';
import InternationalResourcesChart from '../../molecules/AreaPartitionChart';
import type {Props} from '../../molecules/AreaPartitionChart';

type WrapperProps = Props & {
  children: any,
  id: string,
  loading: boolean
}

const InternationalResourcesWrapper = (props: WrapperProps) => {
  if (props.loading) return (<p>Loading</p>);

  return (<InternationalResourcesChart
    country="Uganda"
    startYear={2015}
    data={props.data}
    config={props.config}
  />);
};

export default InternationalResourcesWrapper;
