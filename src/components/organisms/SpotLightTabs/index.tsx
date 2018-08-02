import * as React from 'react';
import { ChildProps, graphql } from 'react-apollo';
import Pane from '../../atoms/Pane';
import { SpotLightTabDataQuery, SpotLightTabDataQueryVariables } from '../../gql-types';
import ErrorBoundary from '../../molecules/ErrorBoundary';
import TabsComponents from '../../molecules/SpotLightTabs';
import Tabs from '../../molecules/Tabs';
import { getDistrictProfileData } from '../../pageData';
import overviewConfig from '../../visbox/spotlightOverviewTabCharts';
import populationConfig from '../../visbox/spotlightPopulationTabCharts';
import TABS_QUERY from './query.graphql';
import { LoadingIndicator } from '../../molecules/LoadingIndicator';

type QueryVarTs = SpotLightTabDataQueryVariables & {
  currency: string;
};

type TChildProps = ChildProps<QueryVarTs, SpotLightTabDataQuery>;

const spotlightTabs: React.SFC<TChildProps> = ({ currency, data, id, country }) => {
  if (!data) {
    return <p>Missing data key</p>;
  }
  if (data && data.loading) {
    return <LoadingIndicator height={ '300px' }/>;
  }
  const pageData = getDistrictProfileData(id, country);
  const { Overview, Poverty, Population, Education, Health } = TabsComponents[country];

  return (
    <Tabs selected={ 0 }>
      <Pane label="Overview" id="spotlight-overview">
        <ErrorBoundary>
        <Overview
          { ...data }
          pageData={ pageData }
          currency={ currency }
          config={ overviewConfig }
        />
        </ErrorBoundary>
      </Pane>
      <Pane label="Poverty" id="spotlight-poverty">
      <ErrorBoundary>
        <Poverty { ...data } pageData={ pageData } />
        </ErrorBoundary>
      </Pane>
      <Pane label="Population" id="spotlight-population">
      <ErrorBoundary>
        <Population { ...data } pageData={ pageData } config={ populationConfig } />
        </ErrorBoundary>
      </Pane>
      <Pane label="Education" id="spotlight-education">
      <ErrorBoundary>
        <Education { ...data } pageData={ pageData } currency={ currency } />
        </ErrorBoundary>
      </Pane>
      <Pane label="Health" id="spotlight-health">
      <ErrorBoundary>
        <Health { ...data } pageData={ pageData } currency={ currency } />
        </ErrorBoundary>
      </Pane>
    </Tabs>
  );
};

const withData = graphql<SpotLightTabDataQuery, QueryVarTs, TChildProps>(TABS_QUERY, {
  options: props => {
    return {
      variables: { id: props.id, country: props.country }
    };
  }
});

export default withData(spotlightTabs);
