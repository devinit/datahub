import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import config from '../../visbox/areaTreemapChart';
import InternationalResourcesChart from '../../molecules/AreaPartitionChart';
import UnbundlingInternationalResources from '../UnbundlingInternationalResources';
import LoadingBar from '../../molecules/LoadingBar';
import {ResourcesOverTimeQueryVariables,  ResourcesOverTimeQuery} from '../../gql-types';
import flowCache from './data';
import {Country} from '../../types';
import countryCache from '../../molecules/SearchInput/global';
import {INTL_RESOURCES_QUERY} from './query.graphql';

type QueryVarTs = ResourcesOverTimeQueryVariables & {
  year: number;
};

type TChildProps = ChildProps<QueryVarTs, ResourcesOverTimeQuery>;

const withData = graphql<ResourcesOverTimeQuery, QueryVarTs, TChildProps>(INTL_RESOURCES_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
});

const Chart: React.SFC<TChildProps> = ({data, year, id}) => {
  if (data && data.loading) return <LoadingBar loading />;
  if (data && data.error) throw new Error (`Error in international finance chart, ${data.error}`);
  if (!data) return <p>data key is missing</p>;
  const country: Country | undefined =
    countryCache.countries.find((_country: Country) => _country.slug === id);
  if (!country) throw new Error (`Wrong country id, country id ${id} doesnt exist`);
  const countryType = country.countryType;
  const { inflows, outflows } = flowCache[countryType];
  const internationalResources = data.internationalResources;
  const resourcesOverTime = internationalResources && internationalResources.resourcesOverTime;
  if (!resourcesOverTime) return <p>Missing resourcesOverTime</p>;
  return (
    <InternationalResourcesChart
      id={country.id}
      countryType={countryType}
      startYear={internationalResources && internationalResources.startYear || 2015}
      data={resourcesOverTime && resourcesOverTime.data as DH.IResourceData[]}
      config={config}
      year={year} // look in countryProfile lower tabs
      country={country.name}
      inflows={inflows}
      outflows={outflows}
      unbundlingInternationalResources={UnbundlingInternationalResources}
    />
  );
};

export default withData(Chart);
