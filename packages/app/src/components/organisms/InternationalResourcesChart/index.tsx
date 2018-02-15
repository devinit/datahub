import * as React from 'react';
import { graphql } from 'react-apollo';
import config from '@devinit/dh-ui/lib/visbox/areaTreemapChart';
import InternationalResourcesChart from '@devinit/dh-ui/lib/molecules/AreaPartitionChart';
import UnbundlingInternationalResources from '../UnbundlingInternationalResources';
// import { Props } from '@devinit/dh-ui/lib/molecules/AreaPartitionChart';
import LoadingBar from '@devinit/dh-ui/lib/molecules/LoadingBar';
import { errorHandler } from '@devinit/dh-base/lib/utils';
import { getCountryName} from '../utils';
import flowCache from './data';
import countryCache from '../CountrySearchInput/data';
import {INTL_RESOURCES_QUERY} from './query.graphql';

interface WrapperProps {
  Props;
  loading: boolean;
  year: number;
  shouldScrollIntoView: boolean;
  chartId: string;
}

const internationalResourcesChartWrapper = (props: WrapperProps) => {
  if (props.loading) return <LoadingBar loading={props.loading} />;
  return (
    <InternationalResourcesChart
      id={props.id}
      countryType={props.countryType}
      startYear={props.startYear}
      data={props.data}
      config={config}
      year={props.year} // look in countryProfile lower tabs
      shouldScrollIntoView={props.shouldScrollIntoView}
      chartId={props.chartId}
      country={props.country}
      inflows={props.inflows}
      outflows={props.outflows}
      unbundlingInternationalResources={UnbundlingInternationalResources}
      }
    />
  );
};

const withData = graphql(INTL_RESOURCES_QUERY, {
  options: props => ({
    variables: {
      id: props.id,
    },
  }),
  props: ({ data, ownProps }) => {
    const [country = {}] = countryCache.countries.filter(country => country.slug === ownProps.id);

    const countryType = country.countryType || 'recipient';

    const { inflows, outflows } = flowCache[countryType];

    const { error, loading } = data;

    if (error) errorHandler(error, 'error in international finance chart');

    return loading || !data.internationalResources
      ? { loading }
      : {
        id: country.id,
        countryType,
        country: getCountryName(data.variables.id),
        startYear: data.internationalResources.startYear,
        data: data.internationalResources.resourcesOverTime.data,
        inflows,
        outflows,
      };
  },
});

export default withData(internationalResourcesChartWrapper);
