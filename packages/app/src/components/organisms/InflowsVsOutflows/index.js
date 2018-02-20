import * as React from 'react';
import { graphql } from 'react-apollo';
import SlidingDualSidebar from '@devinit/dh-ui/lib/molecules/SlidingDualSidebar';
import config from '@devinit/dh-ui/lib/visbox/dualbarChart';
import countryCache from '@devinit/dh-base/lib/__generated__/data';
import { INTL_RESOURCES_QUERY } from '../InternationalResourcesChart/query.graphql';
const withData = graphql(INTL_RESOURCES_QUERY, {
    options: props => ({
        variables: {
            id: props.id,
        },
    }),
});
const Chart = ({ data, year, shouldScrollIntoView, chartId, id }) => {
    if (data && data.loading)
        return React.createElement("p", null, "Loading...");
    if (data && data.error)
        return React.createElement("p", null,
            "Error in internationalResources..., ",
            data.error);
    if (!data)
        return React.createElement("p", null, "Some error.., data key is missing");
    const internationalResources = data.internationalResources;
    const resourcesOverTime = internationalResources && internationalResources.resourcesOverTime;
    if (!resourcesOverTime)
        return React.createElement("p", null, "Missing resourcesOverTime");
    const country = countryCache.countries.find((_country) => _country.slug === id);
    if (!country)
        throw new Error(`Wrong country id, country id ${id} doesnt exist`);
    return (React.createElement(SlidingDualSidebar, { country: country.name, countryType: country.countryType, startYear: internationalResources && internationalResources.startYear || 2015, year: year, shouldScrollIntoView: shouldScrollIntoView, chartId: chartId, data: resourcesOverTime && resourcesOverTime.data, config: config }));
};
export default withData(Chart);
