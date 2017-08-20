/* eslint-disable */
// this file is auto generated

module.exports = {
  donor: {
    inflows: [
      {
        id: 'oda-capital-repay',
        name: 'Capital repayments on ODA loans',
        selections: [{ id: 'to_di_id', name: 'Source' }]
      },
      {
        id: 'oda-interest',
        name: 'Interest payments on ODA loans',
        selections: [{ id: 'to_di_id', name: 'Source' }]
      },
      {
        id: 'oofs-capital-repay',
        name: 'Capital repayments on OOFs loans',
        selections: [{ id: 'to_di_id', name: 'Recipients' }]
      },
      {
        id: 'oofs-interest',
        name: 'Interest payments on OOFs loans',
        selections: [{ id: 'to_di_id', name: 'Recipients' }]
      }
    ],
    outflows: [
      {
        id: 'dfis-out',
        name: 'Development Finance Institutions',
        selections: [{ id: 'financing_type', name: 'Finance modalities' }]
      },
      {
        id: 'fdi-devcountries',
        name: 'Foreign Direct Investment in developing countries',
        selections: [
          { id: 'to_di_id', name: 'Destination' },
          { id: 'financing_type', name: 'Financing Instrument' }
        ]
      },
      {
        id: 'oda-out',
        name: 'Official development assistance',
        selections: [
          { id: 'to_di_id', name: 'Recipients' },
          { id: 'channel', name: 'Channels of delivery' },
          { id: 'sector', name: 'Sector' },
          { id: 'bundle', name: 'Finance modalities' }
        ]
      },
      {
        id: 'oofs-out',
        name: 'Other official flows',
        selections: [
          { id: 'to_di_id', name: 'Recipents' },
          { id: 'channel', name: 'Channels of delivery' },
          { id: 'sector', name: 'Sector' },
          { id: 'bundle', name: 'Finance modalities' }
        ]
      },
      {
        id: 'remittances-devcountries',
        name: 'Remittances to developing countries',
        selections: [{ id: 'to_di_id', name: 'Destination' }]
      }
    ]
  },
  recipient: {
    inflows: [
      {
        id: 'fdi-in',
        name: 'Foreign Direct Investment',
        selections: [{ id: 'from_di_id', name: 'Source(OECD countries only)' }]
      },
      {
        id: 'long-debt-disbursement-in',
        name: 'Long-term debt (commercial sources)',
        selections: [{ id: 'flow_type', name: 'Type of Flow' }]
      },
      {
        id: 'long-debt-net-official-in',
        name: 'Long-term debt (official sources)',
        selections: [{ id: 'flow_type', name: 'Type of Flow' }]
      },
      {
        id: 'net-portfolio-equity-in',
        name: 'Portfolio equity',
        selections: [{ id: 'flow_type', name: 'Type of Flow' }]
      },
      {
        id: 'oda-in',
        name: 'Official development assistance',
        selections: [
          { id: 'from_di_id', name: 'Providers' },
          { id: 'channel', name: 'Channels of delivery' },
          { id: 'sector', name: 'Sector' },
          { id: 'bundle', name: 'Finance modalities' }
        ]
      },
      {
        id: 'oofs-in',
        name: 'Other official flows',
        selections: [
          { id: 'from_di_id', name: 'Providers' },
          { id: 'channel', name: 'Channels of delivery' },
          { id: 'sector', name: 'Sector' },
          { id: 'bundle', name: 'Finance modalities' }
        ]
      },
      {
        id: 'remittances-in',
        name: 'Remittances',
        selections: [{ id: 'from_di_id', name: 'Source' }]
      },
      {
        id: 'short-debt-net-flow-in',
        name: 'Short-term debt',
        selections: [{ id: 'flow_type', name: 'Type of Flow' }]
      }
    ],
    outflows: [
      {
        id: 'fdi-in-profits-out',
        name: 'Profits on FDI',
        selections: [{ id: 'flow_type', name: 'Type of Flow' }]
      },
      {
        id: 'fdi-out',
        name: 'Foreign Direct Investment',
        selections: [{ id: 'from_di_id', name: 'Source(OECD countries only)' }]
      },
      {
        id: 'oda-capital-payments-out',
        name: 'Capital repayments on ODA loans',
        selections: [
          { id: 'from_di_id', name: 'Destination' },
          { id: 'from_di_id', name: 'Providers' }
        ]
      },
      {
        id: 'oda-interest-payments-out',
        name: 'Interest payments on ODA loans',
        selections: [{ id: 'from_di_id', name: 'Destination' }]
      },
      {
        id: 'oofs-capital-payments-out',
        name: 'Capital repayments on OOFs loans',
        selections: [{ id: 'flow_type', name: 'Type of Flow' }]
      },
      {
        id: 'oofs-interest-payments-out',
        name: 'Interest payments on OOFs loans',
        selections: [{ id: 'flow_type', name: 'Type of Flow' }]
      },
      {
        id: 'remittances-out',
        name: 'Remittances',
        selections: [{ id: 'from_di_id', name: 'Source(OECD countries only)' }]
      },
      {
        id: 'short-debt-interest-out',
        name: 'Interest payments on short-term debt',
        selections: [{ id: 'flow_type', name: 'Type of Flow' }]
      }
    ]
  }
};
