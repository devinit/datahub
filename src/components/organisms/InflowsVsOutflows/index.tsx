import * as React from 'react';
import { ChildProps, graphql } from 'react-apollo';
import SlidingDualSidebar from '../../molecules/SlidingDualSidebar';
import PrintDualSidebar from '../../molecules/SlidingDualSidebar/print';
import { Country } from '../../types';
import { ResourcesOverTimeQuery, ResourcesOverTimeQueryVariables } from '../../gql-types';
import config from '../../visbox/dualbarChart';
import countryCache from '../../molecules/SearchInput/global';
import { INTL_RESOURCES_QUERY } from '../InternationalResourcesChart/query.graphql';

type QueryVarTs = ResourcesOverTimeQueryVariables & {
  year?: number;
  shouldScrollIntoView?: boolean;
  chartId: string;
  onDataLoaded?: (data: any) => void;
  showYearSlider?: boolean;
  allowShare?: boolean;
  printVersion?: boolean;
};

type TChildProps = ChildProps<QueryVarTs, ResourcesOverTimeQuery>;

const withData = graphql<ResourcesOverTimeQuery, QueryVarTs, TChildProps>(INTL_RESOURCES_QUERY, {
  options: props => ({
    variables: {
      id: props.id
    }
  })
});

const Chart: React.SFC<TChildProps> = (props) => {
  const {
    data, year, shouldScrollIntoView, chartId, id, showYearSlider, allowShare, printVersion, onDataLoaded
  } = props;
  if (data && data.loading) {
    return <p>Loading...</p>;
  }
  if (data && data.error) {
    return <p>Error in internationalResources..., { data.error }</p>;
  }
  if (!data) {
    return <p>Some error.., data key is missing</p>;
  }
  // TODO:  To report typescript schema generation bug or error, forinstance resourcesOverTime is not
  // nullable, but it is here and so is data;
  const internationalResources = data.internationalResources;
  const resourcesOverTime = internationalResources && internationalResources.resourcesOverTime;
  if (!resourcesOverTime) {
    return <p>Missing resourcesOverTime</p>;
  } else if (onDataLoaded && internationalResources && internationalResources.resourcesOverTime) {
    onDataLoaded(internationalResources.resourcesOverTime);
  }
  const country: Country | undefined =
    countryCache.countries.find((_country: Country) => _country.slug === id);
  if (!country) {
    throw new Error(`Wrong country id, country id ${id} doesnt exist`);
  }

  if (printVersion) {
    return (
      <PrintDualSidebar
        country={ country.name }
        countryType={ country.countryType }
        startYear={ internationalResources && internationalResources.startYear || 2016 }
        year={ year }
        shouldScrollIntoView={ shouldScrollIntoView }
        chartId={ chartId }
        data={ resourcesOverTime && resourcesOverTime.data as DH.IResourceData[] }
        config={ config }
        showYearSlider={ showYearSlider }
        allowShare={ allowShare }
      />
    );
  }

  return (
    <SlidingDualSidebar
      country={ country.name }
      countryType={ country.countryType }
      startYear={ internationalResources && internationalResources.startYear || 2016 }
      year={ year }
      shouldScrollIntoView={ shouldScrollIntoView }
      chartId={ chartId }
      data={ resourcesOverTime && resourcesOverTime.data as DH.IResourceData[] }
      config={ config }
      showYearSlider={ showYearSlider }
      allowShare={ allowShare }
    />
  );
};

Chart.defaultProps = {
  showYearSlider: true,
  allowShare: true
};

export default withData(Chart);
