import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import config from '@devinit/dh-ui/lib/visbox/areaTreemapChart';
import InternationalResourcesChart from '@devinit/dh-ui/lib/molecules/AreaPartitionChart';
import UnbundlingInternationalResources from '../UnbundlingInternationalResources';
import LoadingBar from '@devinit/dh-ui/lib/molecules/LoadingBar';
import {ResourcesOverTimeQueryVariables,  ResourcesOverTimeQuery} from '../../../types';
import flowCache from './data';
import {Country} from '@devinit/dh-base/lib/types';
import countryCache from '../CountrySearchInput/data';
import {INTL_RESOURCES_QUERY} from './query.graphql';

type QueryVarTs = ResourcesOverTimeQueryVariables & {
  year: number;
  shouldScrollIntoView: boolean;
  chartId: string;
};

type TChildProps = ChildProps<QueryVarTs, ResourcesOverTimeQuery>;

const withData = graphql<ResourcesOverTimeQuery, ResourcesOverTimeQueryVariables, TChildProps>(INTL_RESOURCES_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
});

const Chart: React.SFC<TChildProps> = ({data, year, shouldScrollIntoView, chartId, id}) => {
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
