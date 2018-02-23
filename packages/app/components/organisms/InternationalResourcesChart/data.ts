/* tslint:disable */
// this file is auto generated

export  default {
  donor: {
    inflows: [
      {
        id: 'oda-capital-repay',
        name: 'Capital repayments on ODA loans',
        selections: [{ id: 'to_di_id', name: 'Source', unbundle: false }]
      },
      {
        id: 'oda-interest',
        name: 'Interest payments on ODA loans',
        selections: [{ id: 'to_di_id', name: 'Source', unbundle: false }]
      },
      {
        id: 'oofs-capital-repay',
        name: 'Capital repayments on OOFs loans',
        selections: [{ id: 'to_di_id', name: 'Recipients', unbundle: false }]
      },
      {
        id: 'oofs-interest',
        name: 'Interest payments on OOFs loans',
        selections: [{ id: 'to_di_id', name: 'Recipients', unbundle: false }]
      }
    ],
    outflows: [
      {
        id: 'dfis-out',
        name: 'Development Finance Institutions',
        selections: [
          { id: 'financing_type', name: 'Finance modalities', unbundle: false }
        ]
      },
      {
        id: 'fdi-devcountries',
        name: 'Foreign Direct Investment in developing countries',
        selections: [
          { id: 'to_di_id', name: 'Destination', unbundle: false },
          {
            id: 'financing_type',
            name: 'Financing Instrument',
            unbundle: false
          }
        ]
      },
      {
        id: 'oda-out',
        name: 'Official development assistance',
        selections: [
          { id: 'to_di_id', name: 'Recipients', unbundle: true },
          { id: 'channel', name: 'Channels of delivery', unbundle: true },
          { id: 'sector', name: 'Sector', unbundle: true },
          { id: 'bundle', name: 'Finance modalities', unbundle: true }
        ]
      },
      {
        id: 'oofs-out',
        name: 'Other official flows',
        selections: [
          { id: 'to_di_id', name: 'Recipents', unbundle: true },
          { id: 'channel', name: 'Channels of delivery', unbundle: true },
          { id: 'sector', name: 'Sector', unbundle: true },
          { id: 'bundle', name: 'Finance modalities', unbundle: true }
        ]
      },
      {
        id: 'remittances-devcountries',
        name: 'Remittances to developing countries',
        selections: [{ id: 'to_di_id', name: 'Destination', unbundle: false }]
      }
    ]
  },
  recipient: {
    inflows: [
      {
        id: 'fdi-in',
        name: 'Foreign Direct Investment',
        selections: [
          {
            id: 'from_di_id',
            name: 'Source(OECD countries only)',
            unbundle: false
          }
        ]
      },
      {
        id: 'long-debt-disbursement-in',
        name: 'Long-term debt (commercial sources)',
        selections: [
          {
            id: 'destination_institution_type',
            name: 'Type of borrower',
            unbundle: false
          },
          {
            id: 'financing_type',
            name: 'Financing Instrument',
            unbundle: false
          }
        ]
      },
      {
        id: 'long-debt-net-official-in',
        name: 'Long-term debt (official sources)',
        selections: [
          {
            id: 'destination_institution_type',
            name: 'Type of borrower',
            unbundle: false
          },
          {
            id: 'destination_institution_type',
            name: 'Financing Instrument',
            unbundle: false
          }
        ]
      },
      {
        id: 'net-portfolio-equity-in',
        name: 'Portfolio equity',
        selections: [{ id: 'from_di_id', name: 'Providers', unbundle: false }]
      },
      {
        id: 'oda-in',
        name: 'Official development assistance',
        selections: [
          { id: 'from_di_id', name: 'Providers', unbundle: true },
          { id: 'channel', name: 'Channels of delivery', unbundle: true },
          { id: 'sector', name: 'Sector', unbundle: true },
          { id: 'bundle', name: 'Finance modalities', unbundle: true }
        ]
      },
      {
        id: 'oofs-in',
        name: 'Other official flows',
        selections: [
          { id: 'from_di_id', name: 'Providers', unbundle: true },
          { id: 'channel', name: 'Channels of delivery', unbundle: true },
          { id: 'sector', name: 'Sector', unbundle: true },
          { id: 'bundle', name: 'Finance modalities', unbundle: true }
        ]
      },
      {
        id: 'remittances-in',
        name: 'Remittances',
        selections: [{ id: 'from_di_id', name: 'Source', unbundle: false }]
      },
      {
        id: 'short-debt-net-flow-in',
        name: 'Short-term debt',
        selections: [
          {
            id: 'destination_institution_type',
            name: 'Type of borrower',
            unbundle: false
          },
          {
            id: 'financing_type',
            name: 'Financing Instrument',
            unbundle: false
          }
        ]
      }
    ],
    outflows: [
      { id: 'fdi-in-profits-out', name: 'Profits on FDI', selections: [] },
      {
        id: 'fdi-out',
        name: 'Foreign Direct Investment',
        selections: [
          {
            id: 'from_di_id',
            name: 'Source(OECD countries only)',
            unbundle: false
          }
        ]
      },
      {
        id: 'oda-capital-payments-out',
        name: 'Capital repayments on ODA loans',
        selections: [
          { id: 'from_di_id', name: 'Destination', unbundle: false },
          { id: 'from_di_id', name: 'Providers', unbundle: false }
        ]
      },
      {
        id: 'oda-interest-payments-out',
        name: 'Interest payments on ODA loans',
        selections: [{ id: 'from_di_id', name: 'Destination', unbundle: false }]
      },
      {
        id: 'oofs-capital-payments-out',
        name: 'Capital repayments on OOFs loans',
        selections: []
      },
      {
        id: 'oofs-interest-payments-out',
        name: 'Interest payments on OOFs loans',
        selections: [{ id: 'from_di_id', name: 'Providers', unbundle: false }]
      },
      { id: 'remittances-out', name: 'Remittances', selections: [] },
      {
        id: 'short-debt-interest-out',
        name: 'Interest payments on short-term debt',
        selections: []
      }
    ]
  },
  crossover: {
    inflows: [
      {
        id: 'fdi-in',
        name: 'Foreign Direct Investment',
        selections: [
          {
            id: 'from_di_id',
            name: 'Source(OECD countries only)',
            unbundle: false
          }
        ]
      },
      {
        id: 'long-debt-disbursement-in',
        name: 'Long-term debt (commercial sources)',
        selections: [
          {
            id: 'destination_institution_type',
            name: 'Type of borrower',
            unbundle: false
          },
          {
            id: 'financing_type',
            name: 'Financing Instrument',
            unbundle: false
          }
        ]
      },
      {
        id: 'long-debt-net-official-in',
        name: 'Long-term debt (official sources)',
        selections: [
          {
            id: 'destination_institution_type',
            name: 'Type of borrower',
            unbundle: false
          },
          {
            id: 'destination_institution_type',
            name: 'Financing Instrument',
            unbundle: false
          }
        ]
      },
      {
        id: 'net-portfolio-equity-in',
        name: 'Portfolio equity',
        selections: [{ id: 'from_di_id', name: 'Providers', unbundle: false }]
      },
      {
        id: 'oda-in',
        name: 'Official development assistance',
        selections: [
          { id: 'from_di_id', name: 'Providers', unbundle: true },
          { id: 'channel', name: 'Channels of delivery', unbundle: true },
          { id: 'sector', name: 'Sector', unbundle: true },
          { id: 'bundle', name: 'Finance modalities', unbundle: true }
        ]
      },
      {
        id: 'oofs-in',
        name: 'Other official flows',
        selections: [
          { id: 'from_di_id', name: 'Providers', unbundle: true },
          { id: 'channel', name: 'Channels of delivery', unbundle: true },
          { id: 'sector', name: 'Sector', unbundle: true },
          { id: 'bundle', name: 'Finance modalities', unbundle: true }
        ]
      },
      {
        id: 'remittances-in',
        name: 'Remittances',
        selections: [{ id: 'from_di_id', name: 'Source', unbundle: false }]
      },
      {
        id: 'short-debt-net-flow-in',
        name: 'Short-term debt',
        selections: [
          {
            id: 'destination_institution_type',
            name: 'Type of borrower',
            unbundle: false
          },
          {
            id: 'financing_type',
            name: 'Financing Instrument',
            unbundle: false
          }
        ]
      }
    ],
    outflows: [
      { id: 'fdi-in-profits-out', name: 'Profits on FDI', selections: [] },
      {
        id: 'fdi-out',
        name: 'Foreign Direct Investment',
        selections: [
          {
            id: 'from_di_id',
            name: 'Source(OECD countries only)',
            unbundle: false
          }
        ]
      },
      {
        id: 'oda-capital-payments-out',
        name: 'Capital repayments on ODA loans',
        selections: [
          { id: 'from_di_id', name: 'Destination', unbundle: false },
          { id: 'from_di_id', name: 'Providers', unbundle: false }
        ]
      },
      {
        id: 'oda-interest-payments-out',
        name: 'Interest payments on ODA loans',
        selections: [{ id: 'from_di_id', name: 'Destination', unbundle: false }]
      },
      {
        id: 'oofs-capital-payments-out',
        name: 'Capital repayments on OOFs loans',
        selections: []
      },
      {
        id: 'oofs-interest-payments-out',
        name: 'Interest payments on OOFs loans',
        selections: [{ id: 'from_di_id', name: 'Providers', unbundle: false }]
      },
      { id: 'remittances-out', name: 'Remittances', selections: [] },
      {
        id: 'short-debt-interest-out',
        name: 'Interest payments on short-term debt',
        selections: []
      }
    ]
  }
};
