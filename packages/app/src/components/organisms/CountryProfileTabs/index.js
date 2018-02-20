import * as React from 'react';
import { graphql } from 'react-apollo';
import povertyConfig from '@devinit/dh-ui/lib/visbox/povertyTabCharts';
import populationConfig from '@devinit/dh-ui/lib/visbox/populationTabCharts';
import govtFinanceConfig from '@devinit/dh-ui/lib/visbox/governmentFinanceTabCharts';
import internationalResourcesConfig from '@devinit/dh-ui/lib/visbox/internationalResourceTabCharts';
import Tabs from '@devinit/dh-ui/lib/molecules/Tabs';
import Pane from '@devinit/dh-ui/lib/atoms/Pane';
import { DONOR } from '@devinit/dh-base/lib/utils/constants';
import { getCountry } from '@devinit/dh-base/lib/utils';
import { shouldShowTabData } from '@devinit/dh-base/lib/utils';
import LoadingPlaceholder from '@devinit/dh-ui/lib/molecules/LoadingPlaceholder';
import overviewConfig from '@devinit/dh-ui/lib/visbox/overviewTabCharts';
import { getCountryProfileData } from '@devinit/dh-base/lib/pageData';
import { TAB_QUERY } from './query.graphql';
const CountryProfileTabs = ({ data, id }) => {
    if (!data || data.loading) {
        return React.createElement(LoadingPlaceholder, { loading: true });
    }
    const variables = data.variables;
    if (!variables)
        throw new Error('country profile variable id missing');
    const pageData = getCountryProfileData(id);
    const country = getCountry(id);
    const props = data;
    return (React.createElement(Tabs, { selected: 0 },
        React.createElement(Pane, { label: "Overview", id: 'overview-tab' },
            React.createElement(CountryProfileTabs.Overview, Object.assign({}, props, { pageData: pageData, countryType: country.countryType, config: overviewConfig }))),
        country.countryType !== DONOR && props.povertyTab && shouldShowTabData(props.povertyTab)
            ? React.createElement(Pane, { label: "Poverty", id: 'poverty-tab' },
                React.createElement(CountryProfileTabs.Poverty, Object.assign({ pageData: pageData, config: povertyConfig }, props)))
            : '',
        props.populationTab && shouldShowTabData(props.populationTab) ?
            React.createElement(Pane, { label: "Population", id: 'population-tab' },
                React.createElement(CountryProfileTabs.Population, Object.assign({ pageData: pageData, config: populationConfig }, props))) : '',
        Number(country.has_domestic_data) && props.governmentFinance
            && shouldShowTabData(props.governmentFinance) ?
            React.createElement(Pane, { label: "Government Finance", id: 'govt-finance-tab' },
                React.createElement(CountryProfileTabs.GovernmentFinance, Object.assign({ pageData: pageData, config: govtFinanceConfig }, props)))
            : '',
        props.internationalResources && shouldShowTabData(props.internationalResources) ?
            React.createElement(Pane, { label: "International Resources", id: 'internantion-reseources-tab' },
                React.createElement(CountryProfileTabs.InternationalResources, Object.assign({ pageData: pageData, countryType: country.countryType, config: internationalResourcesConfig }, props))) : ''));
};
const withData = graphql(TAB_QUERY, {
    options: props => {
        return {
            variables: { id: props.id },
        };
    }
});
export default withData(CountryProfileTabs);
