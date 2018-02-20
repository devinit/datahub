import * as React from 'react';
import { graphql } from 'react-apollo';
import glamorous from 'glamorous';
import { groupBy } from 'ramda';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import TreeChart from '@devinit/dh-ui/lib/atoms/TreeChart';
import { NoDataAvailableContainer } from '@devinit/dh-ui/lib/atoms/Container';
import QUERY from './query.graphql';
const Container = glamorous.div({
    position: 'relative',
});
const withData = graphql(QUERY, {
    options: props => {
        return {
            variables: {
                groupById: props.groupById,
                countryId: props.countryId,
                resourceId: props.resourceId,
            },
        };
    },
    skip: props => !props.shouldFetch
});
const UnbundlingTreemap = ({ data, year, config }) => {
    if (!data)
        return React.createElement("p", null, "Missing data key");
    if (data && data.error)
        return React.createElement("p", null,
            "Error:  $",
            data.error);
    const loading = data.loading;
    const { color = '#888', resources = [] } = data.singleResource || {};
    const bundles = resources ? groupBy((d) => d.year.toString(), resources) : [];
    return (React.createElement("div", null,
        React.createElement(Container, null, loading || !((bundles || {})[year] || []).length
            ? React.createElement(Segment, { basic: true, style: {
                    position: 'absolute',
                    width: '100%',
                    left: 0,
                    right: 0,
                    height: '360px',
                    padding: 0,
                } },
                React.createElement(Dimmer, { style: { backgroundColor: color || '#888', zIndex: 1, height: '100%' }, active: true }, loading
                    ? React.createElement(Loader, null)
                    : React.createElement(NoDataAvailableContainer, null, "Detailed data is not available for this year")))
            : React.createElement(TreeChart, { config: {
                    ...config,
                    colors: [color],
                    coloring: null,
                    tree: {
                        ...config.tree,
                        id: 'name',
                    },
                }, data: bundles[year] || [], height: "360px" }))));
};
export default withData(UnbundlingTreemap);
