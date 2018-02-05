// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import { WhiteBg } from '@devinit/dh-ui/lib/components/atoms/Backgrounds';
import Chart from '@devinit/dh-ui/lib/molecules/MultiLinePartition';
import config from '@devinit/dh-ui/lib/visboxConfigs/localLinePartition';
import {errorHandler} from '@devinit/dh-base/lib/utils';
import QUERY from './query.graphql';

const withData = graphql(QUERY, {
  options: props => ({
    variables: {
      id: props.id,
      country: props.country
    },
  }),
  props: ({ data }) => {
    const { error, loading } = data;

    if (error) errorHandler(error, 'error in localgovernment finance chart');

    const {
      currencyCode = '',
      startYear = data.startYear,
      currencyUSD,
      expenditure = [],
      revenueAndGrants = [],
    } = data.localGovernmentFinance || {};
    const items: Object[] = [];
    if (revenueAndGrants.length) items.push({title: 'Revenue', data: revenueAndGrants});
    if (expenditure.length) items.push({title: 'Expenditure', data: expenditure, inverted: false});
    return {
      loading,
      currencyUSD,
      currencyCode,
      startYear,
      config,
      items
    };
  },
});

export default withData(props => {
  return <WhiteBg><Chart {...props} /></WhiteBg>;
});
