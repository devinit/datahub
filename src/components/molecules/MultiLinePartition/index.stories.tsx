// import * as React from 'react';
// import { storiesOf } from '@storybook/react';
// import MultiLinePartition, {Props} from '.';
// import config from '../../visbox/localLinePartition';
// const ugData = require('./testData/ug.json');
// const keData = require ('./testData/ke.json');
// const ngData = require ('./testData/ng.json');

// const getProps = (data: any, financeType: string): Props => {
//     const governmentFinance = data[financeType];
//     const items: Array<{title: string, data: DH.IDomestic[], inverted?: boolean}> = [];
//     // const revenueAndGrants = governmentFinance.revenueAndGrants as DH.IDomestic[];
//     const expenditure = governmentFinance.expenditure as DH.IDomestic[];
//     // if (financeType === 'governmentFinance') {
//     //     const finance = governmentFinance.finance as DH.IDomestic[];
//     //     items.push({title: 'Finance', data: finance, inverted: false});
//     // }
//     // if (revenueAndGrants.length) items.push({title: 'Revenue', data: revenueAndGrants});
//     if (expenditure.length) items.push({title: 'Expenditure', data: expenditure, inverted: false});
//     return {
//         loading: false,
//         chartId: `${governmentFinance.currencyCode}-GovmntChart`,
//         config,
//         currencyCode: governmentFinance.currencyCode || '',
//         currencyUSD: governmentFinance.currencyUSD || '' ,
//         supportLocalCurrencyOnly: !!governmentFinance.supportLocalCurrencyOnly,
//         startYear: governmentFinance.startYear,
//         items
//     };
// };

// storiesOf('MultiLine partition', module)
//   .add('Kampala', () => <MultiLinePartition {...getProps(ugData.data, 'localGovernmentFinance')}/>)
//   .add('Nairobi', () => <MultiLinePartition {...getProps(keData.data, 'localGovernmentFinance')}/>)
//   .add('Nigeria', () => <MultiLinePartition {...getProps(ngData.data, 'governmentFinance')}/>);
