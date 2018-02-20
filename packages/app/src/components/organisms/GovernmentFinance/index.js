import * as React from 'react';
import { LightBg } from '@devinit/dh-ui/lib/atoms/Backgrounds';
import { graphql } from 'react-apollo';
import Chart from '@devinit/dh-ui/lib/molecules/MultiLinePartition';
import config from '@devinit/dh-ui/lib/visbox/linePartition';
import { GVNMT_QUERY } from './query.graphql';
const withData = graphql(GVNMT_QUERY, {
    options: props => ({
        variables: {
            id: props.id,
        },
    })
});
export default withData(({ data, chartId, year, shouldScrollIntoView, budgetType }) => {
    const loading = data && data.loading;
    const governmentFinance = data && data.governmentFinance;
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
                title: 'Financing',
                inverted: true,
                withoutOptions: true,
                data: governmentFinance.finance || [],
            },
            {
                title: 'Expenditure',
                data: governmentFinance.expenditure || [],
            },
        ]
    };
    return React.createElement(LightBg, null,
        React.createElement(Chart, Object.assign({}, props)));
});
