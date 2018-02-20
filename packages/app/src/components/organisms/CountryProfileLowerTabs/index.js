import * as React from 'react';
import Tabs from '@devinit/dh-ui/lib/molecules/Tabs';
import Pane from '@devinit/dh-ui/lib/atoms/Pane';
import GovernmentFinance from '@devinit/dh-ui/lib/molecules/CountryProfileTabs/GovernmentFinanceLower';
import GovernmentFinanceChart from '../GovernmentFinance';
import InflowsVsOutflows from '../InflowsVsOutflows';
import { GOVERNMENT_FINANCE_LOWER, INFLOWS_VS_OUTFLOWS, INTERNATIONAL_RESOURCES } from '@devinit/dh-base/lib/utils/constants';
import InternationalResourcesLower from '@devinit/dh-ui/lib/molecules/CountryProfileTabs/InternationalResourcesLower';
import InternationalResourcesChart from '../InternationalResourcesChart';
import { getCountryProfileData } from '@devinit/dh-base/lib/pagesData';
import ErrorBoundary from '@devinit/dh-ui/lib/molecules/ErrorBoundary';
import { getCountry } from '@devinit/dh-base/lib/utils';
import data from './data';
export default function CountryProfileLowerTabs(props) {
    const country = getCountry(props.id);
    const pageData = getCountryProfileData(props.id);
    const selectedTab = props.selectedTab ? props.selectedTab : 0;
    return (React.createElement(Tabs, { textAlign: "center", selected: selectedTab },
        Number(country.has_domestic_data) ?
            React.createElement(Pane, { label: "GOVERNMENT FINANCE", id: GOVERNMENT_FINANCE_LOWER },
                React.createElement(GovernmentFinance, { pageData: pageData, countryName: country && country.name ? country.name : props.id },
                    React.createElement(ErrorBoundary, null,
                        React.createElement(GovernmentFinanceChart, { budgetType: props.budgetType, shouldScrollIntoView: props.chartId === GOVERNMENT_FINANCE_LOWER, id: props.id, year: props.year, chartId: GOVERNMENT_FINANCE_LOWER }))))
            : '',
        React.createElement(Pane, { label: "INTERNATIONAL RESOURCES", id: INTERNATIONAL_RESOURCES },
            React.createElement(InternationalResourcesLower, { pageData: pageData, toolTip: data.internationalResources.resourcesOverTime.toolTip },
                React.createElement(ErrorBoundary, null,
                    React.createElement(InflowsVsOutflows, { id: props.id, shouldScrollIntoView: props.chartId === INFLOWS_VS_OUTFLOWS, chartId: INFLOWS_VS_OUTFLOWS, year: props.chartId === INFLOWS_VS_OUTFLOWS ? props.year : 2015 })),
                React.createElement(ErrorBoundary, null,
                    React.createElement(InternationalResourcesChart, { shouldScrollIntoView: props.chartId === INTERNATIONAL_RESOURCES, year: props.chartId === INTERNATIONAL_RESOURCES ? props.year : 2015, chartId: INTERNATIONAL_RESOURCES, id: props.id }))))));
}
