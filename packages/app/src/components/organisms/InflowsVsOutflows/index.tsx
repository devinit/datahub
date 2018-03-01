import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import SlidingDualSidebar from '../../molecules/SlidingDualSidebar';
import {Country} from '../../types';
import {ResourcesOverTimeQueryVariables,  ResourcesOverTimeQuery} from '../../gql-types';
import config from '../../visbox/dualbarChart';
import countryCache from '../../molecules/SearchInput/global';
import {INTL_RESOURCES_QUERY} from '../InternationalResourcesChart/query.graphql';

type QueryVarTs = ResourcesOverTimeQueryVariables & {
  year?: number;
  shouldScrollIntoView?: boolean;
  chartId: string;
};

type TChildProps = ChildProps<QueryVarTs, ResourcesOverTimeQuery>;

const withData = graphql<ResourcesOverTimeQuery, QueryVarTs, TChildProps>(INTL_RESOURCES_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
});

const Chart: React.SFC<TChildProps> = ({data, year, shouldScrollIntoView, chartId, id}) => {
  if (data && data.loading) return <p>Loading...</p>;
  if (data && data.error) return <p>Error in internationalResources..., {data.error}</p>;
  if (!data) return <p>Some error.., data key is missing</p>;
  // TODO:  To report typescript schema generation bug or error, forinstance resourcesOverTime is not
  // nullable, but it is here and so is data;
  const internationalResources = data.internationalResources;
  const resourcesOverTime = internationalResources && internationalResources.resourcesOverTime;
  if (!resourcesOverTime) return <p>Missing resourcesOverTime</p>;
  const country: Country | undefined =
    countryCache.countries.find((_country: Country) => _country.slug === id);
  if (!country) throw new Error (`Wrong country id, country id ${id} doesnt exist`);
  return (
    <SlidingDualSidebar
      country={country.name}
      countryType={country.countryType}
      startYear={internationalResources && internationalResources.startYear || 2015}
      year={year}
      shouldScrollIntoView={shouldScrollIntoView}
      chartId={chartId}
      data={resourcesOverTime && resourcesOverTime.data as DH.IResourceData[]}
      config={config}
    />
  );
};

export default withData(Chart);
