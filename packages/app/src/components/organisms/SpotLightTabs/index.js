import * as React from 'react';
import { graphql } from 'react-apollo';
import TabsComponents from '@devinit/dh-ui/lib/molecules/SpotLightTabs';
import Tabs from '@devinit/dh-ui/lib/molecules/Tabs';
import Pane from '@devinit/dh-ui/lib/atoms/Pane';
import LoadingPlaceholder from '@devinit/dh-ui/lib/molecules/LoadingPlaceholder';
import { getDistrictProfileData } from '@devinit/dh-base/lib/pagesData';
import populationConfig from '@devinit/dh-ui/lib/visbox/spotlightPopulationTabCharts';
import overviewConfig from '@devinit/dh-ui/lib/visbox/spotlightOverviewTabCharts';
import TABS_QUERY from './query.graphql';
const spotlightTabs = ({ currency, data, id, country }) => {
    if (!data)
        return React.createElement("p", null, "Missing data key");
    if (data && data.loading) {
        return React.createElement(LoadingPlaceholder, { loading: data.loading });
    }
    const pageData = getDistrictProfileData(id, country);
    const { Overview, Poverty, Population, Education, Health } = TabsComponents[country];
    return (React.createElement(Tabs, { selected: 0 },
        React.createElement(Pane, { label: "Overview", id: "spotlight-overview" },
            React.createElement(Overview, Object.assign({}, data, { pageData: pageData, currency: currency, config: overviewConfig }))),
        React.createElement(Pane, { label: "Poverty", id: "spotlight-poverty" },
            React.createElement(Poverty, Object.assign({}, data, { pageData: pageData }))),
        React.createElement(Pane, { label: "Population", id: "spotlight-population" },
            React.createElement(Population, Object.assign({}, data, { pageData: pageData, config: populationConfig }))),
        React.createElement(Pane, { label: "Education", id: "spotlight-education" },
            React.createElement(Education, Object.assign({}, data, { pageData: pageData, currency: currency }))),
        React.createElement(Pane, { label: "Health", id: "spotlight-health" },
            React.createElement(Health, Object.assign({}, data, { pageData: pageData, currency: currency })))));
};
const withData = graphql(TABS_QUERY, {
    options: props => {
        return {
            variables: { id: props.id },
            country: props.country,
        };
    }
});
export default withData(spotlightTabs);
