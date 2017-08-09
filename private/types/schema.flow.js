/* @flow */
//  This file was automatically generated and should not be edited.

export type UnbundlingAidQuery = {|
  aidType: string,
  year: number,
  groupBy: string,
  to_di_id?: ?string,
  from_di_id?: ?string,
  sector?: ?string,
  buddle?: ?string,
  channel?: ?string,
|};

export type CountriesQuery = {|
  countries: ? Array< {|
    id: ?string,
    name: ?string,
  |} >,
|};

export type ResourcesOverTimeQueryVariables = {|
  id: string,
|};

export type ResourcesOverTimeQuery = {|
  internationalResources: ? {|
    // for sidebar chart in international resources section & area partition tree chart default data
    // & line chart in the  tabs section
    resourcesOverTime: ? Array< {|
      uid: ?string,
      year: number,
      value: number,
      flow_name: string,
      // Category i.e FDI, ODA
      flow_category: ?string,
      // flow either inflow or outflow
      flow_type: ?string,
      // in or out
      direction: ?string,
      color: ?string,
    |} >,
  |},
|};

export type TabDataQueryVariables = {|
  id: string,
|};

export type TabDataQuery = {|
  populationTab: ? {|
    // total population in a country
    population: ?string,
    // Urban vs Rural population level
    populationDistribution: ? Array< {|
      group: ?string,
      value: ?number,
      year: ?number,
    |} >,
    // Number of people in 3 age bands (65+, 15- 65, 0 - 14)
    populationPerAgeBand: ? Array< {|
      band: ?string,
      value: ?number,
      year: ?number,
    |} >,
  |},
  internationalResources: ? {|
    // Gross National Income
    GNI: ?string,
    // Net ODA received, % of GNI for recipient countries
    netODAOfGNIIn: ?string,
    // Net ODA out, % of GNI for recipient countries
    netODAOfGNIOut: ?string,
    // Whats the mix of resources can be for donors (out flows) or receipient (in flows)
    // this is for the donut chart
    mixOfResources: ? Array< {|
      flow_name: string,
      value: number,
    |} >,
    // for sidebar chart in international resources section & area partition tree chart default data
    // & line chart in the  tabs section
    resourcesOverTime: ? Array< {|
      // Category i.e FDI, ODA
      flow_category: ?string,
      value: number,
    |} >,
  |},
|};

export type UnbundlingAidDataQueryVariables = {|
  args?: ?UnbundlingAidQuery,
  aidType: string,
|};

export type UnbundlingAidDataQuery = {|
  selections: ? {|
    // unbundling aid selection options
    to: ? Array< {|
      id: ?string,
      name: ?string,
    |} >,
    from: ? Array< {|
      id: ?string,
      name: ?string,
    |} >,
    channels: ? Array< {|
      id: ?string,
      name: ?string,
    |} >,
    sectors: ? Array< {|
      id: ?string,
      name: ?string,
    |} >,
    // same as form
    buddles: ? Array< {|
      id: ?string,
      name: ?string,
    |} >,
    years: ?Array< ?number >,
  |},
  bundles: ? Array< {|
    uid: ?string,
    id: ?string,
    // country or organisation or channel or bundle name
    name: ?string,
    // this will usually be a summed up aggregate value
    value: ?number,
    color: ?string,
  |} >,
|};

export type GovernmentFinanceQueryVariables = {|
  id: string,
|};

export type GovernmentFinanceQuery = {|
  governmentFinance: ? {|
    // for treemap
    // such as constant 2015 USD for tree map
    currencyCode: ?string,
    // use resourcesRecipient sql
    expenditure: ? Array< {|
      uid: ?string,
      year: ?number,
      levels: ?Array< ?string >,
      // eg Actual or budget
      budgetType: ?string,
      value: ?number,
      valueNcu: ?number,
    |} >,
    revenueAndGrants: ? Array< {|
      uid: ?string,
      year: ?number,
      levels: ?Array< ?string >,
      // eg Actual or budget
      budgetType: ?string,
      value: ?number,
      valueNcu: ?number,
    |} >,
    finance: ? Array< {|
      uid: ?string,
      year: ?number,
      levels: ?Array< ?string >,
      // eg Actual or budget
      budgetType: ?string,
      value: ?number,
      valueNcu: ?number,
    |} >,
  |},
|};