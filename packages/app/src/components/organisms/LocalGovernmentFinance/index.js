import * as React from 'react';
import { graphql } from 'react-apollo';
import { WhiteBg } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import Chart from '@devinit/dh-ui/lib/molecules/MultiLinePartition';
import config from '@devinit/dh-ui/lib/visbox/localLinePartition';
import { LOC_GVMT_QUERY } from './query.graphql';
const withData = graphql(LOC_GVMT_QUERY, {
    options: props => ({
        variables: {
            id: props.id,
            country: props.country
        },
    }),
});
export default withData(({ data, chartId, year, shouldScrollIntoView, budgetType }) => {
    const loading = data && data.loading;
    const governmentFinance = data && data.localGovernmentFinance;
    if (!governmentFinance)
        return React.createElement("p", null, "loading ...");
    const props = {
        loading: loading === undefined ? true : loading,
        config,
        chartId,
        year,
        shouldScrollIntoView,
        budgetType,
        currencyCode: governmentFinance.currencyCode || '',
        currencyUSD: governmentFinance.currencyUSD || '',
        startYear: governmentFinance.startYear,
        items: [
            {
                title: 'Revenue And Grants',
                data: governmentFinance.revenueAndGrants || [],
            },
            {
                title: 'Expenditure',
                data: governmentFinance.expenditure || [],
            },
        ]
    };
    return React.createElement(WhiteBg, null,
        React.createElement(Chart, Object.assign({}, props)));
});
