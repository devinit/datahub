import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
import TabsComponents from '@devinit/dh-ui/lib/molecules/SpotLightTabs';
import Tabs from '@devinit/dh-ui/lib/molecules/Tabs';
import Pane from '@devinit/dh-ui/lib/atoms/Pane';
import LoadingPlaceholder from '@devinit/dh-ui/lib/molecules/LoadingPlaceholder';
import {getDistrictProfileData} from '@devinit/dh-base/lib/pagesData';
import populationConfig from '@devinit/dh-ui/lib/visbox/spotlightPopulationTabCharts';
import overviewConfig from '@devinit/dh-ui/lib/visbox/spotlightOverviewTabCharts';
import {SpotLightTabDataQuery, SpotLightTabDataQueryVariables} from '../../../types';
import TABS_QUERY from './query.graphql';

type QueryVarTs = SpotLightTabDataQueryVariables & {
  currency: string;
};

type TChildProps = ChildProps<QueryVarTs, SpotLightTabDataQuery>;

const spotlightTabs: React.SFC<TChildProps> = ({currency, data, id, country}) => {
  if (!data) return <p>Missing data key</p>;
  if (data && data.loading) {
    return <LoadingPlaceholder loading={data.loading} />;
  }
  const pageData = getDistrictProfileData(id, country);
  const {Overview, Poverty, Population, Education, Health} = TabsComponents[country];
  return (
    <Tabs selected={0}>
      <Pane label="Overview" id="spotlight-overview">
        <Overview
          {...data}
          pageData={pageData}
          currency={currency}
          config={overviewConfig}
        />
      </Pane>
      <Pane label="Poverty" id="spotlight-poverty">
        <Poverty {...data} pageData={pageData} />
      </Pane>
      <Pane label="Population" id="spotlight-population">
        <Population {...data} pageData={pageData} config={populationConfig} />
      </Pane>
      <Pane label="Education" id="spotlight-education">
        <Education {...data} pageData={pageData} currency={currency} />
      </Pane>
      <Pane label="Health" id="spotlight-health">
        <Health {...data} pageData={pageData} currency={currency} />
      </Pane>
    </Tabs>
  );
};

const withData = graphql<SpotLightTabDataQuery, QueryVarTs, TChildProps>(TABS_QUERY, {
  options: props => {
    return {
      variables: { id: props.id },
      country: props.country,
    };
  }
});

export default withData(spotlightTabs);
