import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import { Props as SProps} from '@devinit/dh-ui/lib/molecules/SlidingDualSidebar';
import SlidingDualSidebar from '@devinit/dh-ui/lib/molecules/SlidingDualSidebar';
import {getCountryName} from '../utils';
import {ResourcesOverTimeQueryVariables,  ResourcesOverTimeQuery} from '../../../types';
import config from '@devinit/dh-ui/lib/visbox/dualbarChart';
import {INTL_RESOURCES_QUERY} from '../InternationalResourcesChart/query.graphql';

type ChartProps = ResourcesOverTimeQuery & SProps;

type QueryVarTs = ResourcesOverTimeQueryVariables & {
  year?: number;
  shouldScrollIntoView?: boolean;
  loading?: boolean; // hack should be on returned data
  error?: string; // hack should be on returned data
  chartId: string;
};

type TChildProps = ChildProps<QueryVarTs, ChartProps>;

const withData = graphql<ChartProps, ResourcesOverTimeQueryVariables, TChildProps>(INTL_RESOURCES_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
});

const Chart  = ({data, loading, error, year, shouldScrollIntoView, chartId, id}: TChildProps) => {
  if (loading) return <p>Loading...</p>;
  if (error || !data || !data.internationalResources) return <p>Error in internationalResources..., {error}</p>;
  // TODO:  To report typescript schema generation bug or error
  const resourcesOverTime = data.internationalResources && data.internationalResources.resourcesOverTime
    && data.internationalResources.resourcesOverTime.data as DH.IResourceData[];
  if (!resourcesOverTime) return <p>Missing resourcesOverTime</p>;
  const countryName = getCountryName(id);
  return (
    <SlidingDualSidebar
      country={countryName}
      countryType={data.countryType}
      startYear={data.internationalResources.startYear}
      year={year}
      shouldScrollIntoView={shouldScrollIntoView}
      chartId={chartId}
      data={resourcesOverTime}
      config={config}
    />
  );
};

export default withData(Chart);
