import * as React from 'react';
import { storiesOf } from '@storybook/react';
import MultiLinePartition, {Props} from '.';
import config from '../../visbox/localLinePartition';
const ugData = require('./testData/ug.json');
const keData = require ('./testData/ke.json');

const getProps = (data): Props => {
    const governmentFinance = data.localGovernmentFinance;
    const items: Array<{title: string, data: DH.IDomestic[], inverted?: boolean}> = [];
    const revenueAndGrants = governmentFinance.revenueAndGrants as DH.IDomestic[];
    const expenditure = governmentFinance.expenditure as DH.IDomestic[];
    if (revenueAndGrants.length) items.push({title: 'Revenue', data: revenueAndGrants});
    if (expenditure.length) items.push({title: 'Expenditure', data: expenditure, inverted: false});
    return {
        loading: false,
        chartId: `${governmentFinance.currencyCode}-localGovmntChart`,
        config,
        currencyCode: governmentFinance.currencyCode || '',
        currencyUSD: governmentFinance.currencyUSD || '' ,
        startYear: governmentFinance.startYear,
        items
    };
};

storiesOf('MultiLine partition', module)
  .add('Kampala', () => <MultiLinePartition {...getProps(ugData.data)}/>)
  .add('Nairobi', () => <MultiLinePartition {...getProps(keData.data)}/>);
