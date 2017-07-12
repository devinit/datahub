/* @flow */
//  This file was automatically generated and should not be edited.

export type CountriesQuery = {|
  countries: ? Array< {|
    id: ?string,
    name: ?string,
  |} >,
|};

export type ResourcesFlowsQueryVariables = {|
  id: string,
|};

export type ResourcesFlowsQuery = {|
  internationalResources: ? {|
    // an array of inflows for a particular country, for area & partition chart
    inflows: ? Array< {|
      name: ?string,
      id: ?string,
      selections: ? Array< {|
        name: ?string,
        // this is the group ID
        id: ?string,
      |} >,
    |} >,
    // an array of outflows for a particular country
    outflows: ? Array< {|
      name: ?string,
      id: ?string,
      selections: ? Array< {|
        name: ?string,
        // this is the group ID
        id: ?string,
      |} >,
    |} >,
  |},
|};

export type ResourcesOverTimeQueryVariables = {|
  id: string,
|};

export type ResourcesOverTimeQuery = {|
  internationalResources: ? {|
    // for sidebar chart in international resources section & area partition tree chart default data
    // & line chart in the  tabs section
    resourcesOverTime: ? Array< {|
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

export type ResourcesTabQueryVariables = {|
  id: string,
|};

export type ResourcesTabQuery = {|
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
  |},
|};

export type InternationalResourcesTabFragment = {|
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
|};

export type InternationalResourcesFlowSelectionsFragment = {|
  // an array of inflows for a particular country, for area & partition chart
  inflows: ? Array< {|
    name: ?string,
    id: ?string,
    selections: ? Array< {|
      name: ?string,
      // this is the group ID
      id: ?string,
    |} >,
  |} >,
  // an array of outflows for a particular country
  outflows: ? Array< {|
    name: ?string,
    id: ?string,
    selections: ? Array< {|
      name: ?string,
      // this is the group ID
      id: ?string,
    |} >,
  |} >,
|};