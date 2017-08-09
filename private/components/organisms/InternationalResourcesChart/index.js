// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import config from 'visboxConfigs/areaTreemapChart';
import InternationalResourcesChart from 'components/molecules/AreaPartitionChart';
import type { Props } from 'components/molecules/AreaPartitionChart';
import LoadingBar from 'components/molecules/LoadingBar';
import countriesData from 'components/organisms/CountrySearchInput/data';
import RESOURCES_QUERY from '../../../graphql/InternationalResourcesOverTime.graphql';

type WrapperProps = Props & {
  loading: boolean,
  name: string
};

const internationalResourcesChartWrapper = (props: WrapperProps) => {
  if (props.loading) return <LoadingBar loading={props.loading} />;
  return (
    <InternationalResourcesChart
      startYear={props.startYear}
      data={props.data}
      config={config}
      country={props.name}
    />
  );
};
const getCountryName = (slug: string): string => {
  const country = countriesData.countries.find(country => country.slug === slug);
  if (country && country.name) return country.name;
  return slug;
};
const withData = graphql(RESOURCES_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
  props: ({ data }) => {
    const { error, loading } = data;
    if (error) throw new Error(error);
    return loading || !data.internationalResources
      ? { loading }
      : {
        name: getCountryName(data.variables.id),
        startYear: data.internationalResources.startYear,
        data: data.internationalResources.resourcesOverTime.data.map(d => ({
          ...d,
          flow_group: `${d.flow_category}-${d.flow_type}`,
        }))
      };
  },
});

export default withData(internationalResourcesChartWrapper);
