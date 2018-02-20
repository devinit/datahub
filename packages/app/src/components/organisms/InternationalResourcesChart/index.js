import * as React from 'react';
import { graphql } from 'react-apollo';
import config from '@devinit/dh-ui/lib/visbox/areaTreemapChart';
import InternationalResourcesChart from '@devinit/dh-ui/lib/molecules/AreaPartitionChart';
import UnbundlingInternationalResources from '../UnbundlingInternationalResources';
import LoadingBar from '@devinit/dh-ui/lib/molecules/LoadingBar';
import flowCache from './data';
import countryCache from '@devinit/dh-base/lib/__generated__/data';
import { INTL_RESOURCES_QUERY } from './query.graphql';
const withData = graphql(INTL_RESOURCES_QUERY, {
    options: props => ({
        variables: {
            id: props.id,
        },
    }),
});
const Chart = ({ data, year, shouldScrollIntoView, chartId, id }) => {
    if (data && data.loading)
        return React.createElement(LoadingBar, { loading: true });
    if (data && data.error)
        throw new Error(`Error in international finance chart, ${data.error}`);
    if (!data)
        return React.createElement("p", null, "data key is missing");
    const country = countryCache.countries.find((_country) => _country.slug === id);
    if (!country)
        throw new Error(`Wrong country id, country id ${id} doesnt exist`);
    const countryType = country.countryType;
    const { inflows, outflows } = flowCache[countryType];
    const internationalResources = data.internationalResources;
    const resourcesOverTime = internationalResources && internationalResources.resourcesOverTime;
    if (!resourcesOverTime)
        return React.createElement("p", null, "Missing resourcesOverTime");
    return (React.createElement(InternationalResourcesChart, { id: country.id, countryType: countryType, startYear: internationalResources && internationalResources.startYear || 2015, data: resourcesOverTime && resourcesOverTime.data, config: config, year: year, country: country.name, inflows: inflows, outflows: outflows, unbundlingInternationalResources: UnbundlingInternationalResources }));
};
export default withData(Chart);
