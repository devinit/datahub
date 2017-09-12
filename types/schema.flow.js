/* @flow */
//  This file was automatically generated and should not be edited.

export type UnbundlingAidQuery = {|
  aidType: string,
  year: number,
  groupBy: string,
  to_di_id?: ?string,
  from_di_id?: ?string,
  sector?: ?string,
  bundle?: ?string,
  channel?: ?string,
|};

export type TabDataQueryVariables = {|
  id: string,
|};

export type TabDataQuery = {|
  governmentFinance: ? {|
    // Total revenue for a particular
    totalRevenue: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    grantsAsPcOfRevenue: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // for donut chart
    spendingAllocation: ? {|
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
      data: ? Array< {|
        value: ?number,
        name: ?string,
        color: ?string,
      |} >,
    |},
    // for treemap
    // such as constant 2015 USD for tree map
    currencyCode: ?string,
  |},
  povertyTab: ? {|
    // Poverty reduction over time area chart trend
    poverty190Trend: ? {|
      data: ? Array< {|
        id: ?string,
        year: ?number,
        value: ?number,
        name: ?string,
      |} >,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // how deep is poverty %
    depthOfExtremePoverty: ? {|
      value: ?string,
      toolTip: ? {|
        heading: ?string,
        source: ?string,
      |},
    |},
    // Recipients: how income is distributed, % of income received by each quintil
    incomeDistTrend: ? {|
      data: ? Array< {|
        value: ?number,
        quintileName: ?string,
      |} >,
      toolTip: ? {|
        heading: ?string,
        source: ?string,
      |},
    |},
  |},
  populationTab: ? {|
    // total population in a country
    population: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // Urban vs Rural population level
    populationDistribution: ? {|
      data: ? Array< {|
        group: ?string,
        value: ?number,
        year: ?number,
      |} >,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // Number of people in 3 age bands (65+, 15- 65, 0 - 14)
    populationPerAgeBand: ? {|
      data: ? Array< {|
        band: ?string,
        value: ?number,
        year: ?number,
      |} >,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
  |},
  internationalResources: ? {|
    // Gross National Income
    GNI: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // Net ODA received, % of GNI for recipient countries
    netODAOfGNIIn: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // Net ODA out, % of GNI for recipient countries
    netODAOfGNIOut: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // Whats the mix of resources can be for donors (out flows) or receipient (in flows)
    // this is for the donut chart
    mixOfResources: ? {|
      data: ? Array< {|
        flow_name: string,
        value: number,
      |} >,
      toolTip: ? {|
        heading: ?string,
        source: ?string,
      |},
    |},
    // for line chart in the  international resources tabs section,
    // IndicatorDataColoredWithToolTip  is defined in spotlight types
    resourceInflowsOverTime: ? {|
      data: ? Array< {|
        year: ?number,
        name: ?string,
        color: ?string,
        value: ?number,
      |} >,
      toolTip: ? {|
        heading: ?string,
        source: ?string,
      |},
    |},
  |},
  overviewTab: ? {|
    // how many of the poorest people globally live in a country
    poorestPeople: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // total population for a given country
    population: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    domesticResources: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    internationalResources: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // recipient countries $PPP, both donor and recipient
    governmentSpendPerPerson: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // donor: gross nation income per capit GNI
    averageIncomerPerPerson: ? {|
      data: ? Array< {|
        year: ?number,
        value: ?number,
        id: ?string,
        name: ?string,
      |} >,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // donor: Income share by quintile
    incomeDistTrend: ? {|
      data: ? Array< {|
        value: ?number,
        quintileName: ?string,
      |} >,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
  |},
|};

export type DifferentProvidersDifferentPriotitiesQuery = {|
  bubbleChartOptions: ? {|
    // this list feeds off oda table from countries and global/concept file
    // IdNamePair is defined in unbundling aid types
    indicators: ? Array< {|
      id: ?string,
      name: ?string,
    |} >,
  |},
|};

export type GovernmentFinanceQueryVariables = {|
  id: string,
  country: string,
|};

export type GovernmentFinanceQuery = {|
  localGovernmentFinance: ? {|
    startYear: ?number,
    currencyCode: ?string,
    currencyUSD: ?string,
    expenditure: ? Array< {|
      uid: ?string,
      year: ?number,
      levels: ?Array< ?string >,
      // eg Actual or budget
      budget_type: ?string,
      value: ?number,
      value_ncu: ?number,
    |} >,
    // come from finance file
    revenueAndGrants: ? Array< {|
      uid: ?string,
      year: ?number,
      levels: ?Array< ?string >,
      // eg Actual or budget
      budget_type: ?string,
      value: ?number,
      value_ncu: ?number,
    |} >,
  |},
|};

export type ResourcesOverTimeQueryVariables = {|
  id: string,
|};

export type ResourcesOverTimeQuery = {|
  internationalResources: ? {|
    startYear: ?number,
    // for sidebar chart in international resources section & area partition tree chart default data
    resourcesOverTime: ? {|
      data: ? Array< {|
        uid: ?string,
        year: number,
        value: number,
        flow_id: string,
        flow_name: string,
        short_name: ?string,
        // Category i.e FDI, ODA
        flow_category: ?string,
        // flow either inflow or outflow
        flow_type: ?string,
        // i.e contains flow type as 1st level, flow category as second and flow name as 3rd
        // levels: [String]
        // in or out
        direction: ?string,
        color: ?string,
      |} >,
    |},
  |},
|};

export type MapDataQueryVariables = {|
  id: string,
|};

export type MapDataQuery = {|
  mapData: ? {|
    map: ? Array< {|
      // country code Id in DW this is di_id
      id: ?string,
      // countryName derived from entity.csv
      name: ?string,
      color: ?string,
      year: ?number,
      uid: ?string,
      detail: ?string,
      value: ?number,
      // country slug
      slug: ?string,
    |} >,
    start_year: ?number,
    end_year: ?number,
    country: ?string,
    // map value unit eg US $ or %
    uom_display: ?string,
    // map indicator user friendly label / slug eg Poverty
    name: ?string,
    theme: ?string,
    heading: ?string,
    default_year: ?number,
    description: ?string,
    map_style: ?string,
    id: ?string,
    legend: ? Array< {|
      label: ?string,
      color: ?string,
      backgroundColor: ?string,
    |} >,
  |},
|};

export type PovertyQuery = {|
  bubbleChartOptions: ? {|
    // this list feeds off oda table from countries and global/concept file
    // IdNamePair is defined in unbundling aid types
    indicators: ? Array< {|
      id: ?string,
      name: ?string,
    |} >,
  |},
|};

export type SpotLightTabDataQueryVariables = {|
  id: string,
  country: string,
|};

export type SpotLightTabDataQuery = {|
  povertyTabRegional: ? {|
    poorestPeople: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // WHAT IS THE AVERAGE LIFE EXPECTANCY?
    lifeExpectancy: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // WHAT IS THE STANDARD OF LIVING SCORE?
    stdOfLiving: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
  |},
  // id is district slug
  overviewTabRegional: ? {|
    // WHAT PERCENTAGE OF PEOPLE IN WAKISO LIVE BELOW THE NATIONAL POVERTY LINE?
    // can be no data or '12%'
    poorestPeople: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // WHAT RESOURCES ARE AVAILABLE TO LOCAL GOVERNMENTS IN WAKISO? eg 3.6m or 2.7bn
    // this is a total of local, donor and central government resources
    regionalResources: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // IndicatorDataColored is defined in country profile types
    // has local government, donor and central government
    regionalResourcesBreakdown: ? Array< {|
      data: ? {|
        id: ?string,
        year: ?number,
        value: ?number,
        name: ?string,
        color: ?string,
      |},
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |} >,
    // HOW MUCH DOES THE LOCAL GOVERNMENT SPEND PER PERSON?
    localGovernmentSpendPerPerson: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
  |},
  populationTabRegional: ? {|
    // The total population of a given district and the population density in per sq km
    totalPopulation: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    populationDensity: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // Urban vs Rural population level
    populationDistribution: ? {|
      data: ? Array< {|
        group: ?string,
        value: ?number,
        year: ?number,
      |} >,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    averageDependencyRatio: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    allAverageDependencyRatio: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
  |},
  educationTabRegional: ? {|
    // WHAT IS THE PUPIL–TEACHER RATIO IN PRIMARY EDUCATION?...in government schools  and...in all schools
    pupilTeacherRatioGovtSchl: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    pupilTeacherRatioOtherSchl: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // WHAT PERCENTAGE OF STUDENTS PASS THE PRIMARY LEAVING EXAM?
    studentsPassRate: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    studentsPassDistrictRank: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // HOW MUCH PRIMARY EDUCATION FUNDING IS THERE?
    primaryEducationfunding: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
  |},
  healthTabRegional: ? {|
    // WHAT IS THE DISTRICT LEAGUE HEALTH PERFORMANCE SCORE?
    districtPerformance: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    districtHealthRank: ? {|
      value: ?string,
    |},
    // WHAT PERCENTAGE OF TUBERCULOSIS CASES HAVE BEEN SUCCESSFULLY TREATED?
    treatmeantOfTb: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
    // HOW MUCH LOCAL GOVERNMENT HEALTHCARE FUNDING IS THERE?
    healthCareFunding: ? {|
      value: ?string,
      toolTip: ? {|
        source: ?string,
        heading: ?string,
      |},
    |},
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
    bundles: ? Array< {|
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

export type UnbundlingInternationalResourcesQueryVariables = {|
  resourceId: string,
  countryId: string,
  groupById: string,
|};

export type UnbundlingInternationalResourcesQuery = {|
  // for area tree map chart dropdown selectoion
  singleResource: ? {|
    color: ?string,
    resources: ? Array< {|
      id: ?string,
      name: ?string,
      value: ?number,
      year: ?number,
    |} >,
  |},
|};

export type BubbleChartIndicatorListQuery = {|
  indicators: ? {|
    // this list feeds off oda table from countries and global/concept file
    // IdNamePair is defined in unbundling aid types
    indicators: ? Array< {|
      id: ?string,
      name: ?string,
    |} >,
  |},
|};

export type CountriesQuery = {|
  countries: ? Array< {|
    id: ?string,
    name: ?string,
    slug: ?string,
    countryType: ?string,
  |} >,
|};

export type DistrictsQueryVariables = {|
  country: string,
|};

export type DistrictsQuery = {|
  districts: ? Array< {|
    id: ?string,
    name: ?string,
    slug: ?string,
  |} >,
|};

export type GlobalPictureThemesQuery = {|
  globalPictureThemes: ? Array< {|
    id: ?string,
    name: ?string,
    indicators: ? Array< {|
      id: ?string,
      name: ?string,
      heading: ?string,
      tooltip: ?string,
      source: ?string,
    |} >,
    default_indicator: ?string,
  |} >,
|};

export type InfowsVsOutflowsQueryVariables = {|
  donor: string,
  recipient: string,
|};

export type InfowsVsOutflowsQuery = {|
  // eg recipient or donor
  donor: ? {|
    // an array of inflows for a particular countryType for area & partition chart
    inflows: ? Array< {|
      id: ?string,
      name: ?string,
      selections: ? Array< {|
        // this is the group ID
        id: ?string,
        name: ?string,
        unbundle: ?boolean,
      |} >,
    |} >,
    // an array of outflows for a particular countryType
    outflows: ? Array< {|
      id: ?string,
      name: ?string,
      selections: ? Array< {|
        // this is the group ID
        id: ?string,
        name: ?string,
        unbundle: ?boolean,
      |} >,
    |} >,
  |},
  // eg recipient or donor
  recipient: ? {|
    // an array of inflows for a particular countryType for area & partition chart
    inflows: ? Array< {|
      id: ?string,
      name: ?string,
      selections: ? Array< {|
        // this is the group ID
        id: ?string,
        name: ?string,
        unbundle: ?boolean,
      |} >,
    |} >,
    // an array of outflows for a particular countryType
    outflows: ? Array< {|
      id: ?string,
      name: ?string,
      selections: ? Array< {|
        // this is the group ID
        id: ?string,
        name: ?string,
        unbundle: ?boolean,
      |} >,
    |} >,
  |},
  // eg recipient or donor
  crossover: ? {|
    // an array of inflows for a particular countryType for area & partition chart
    inflows: ? Array< {|
      id: ?string,
      name: ?string,
      selections: ? Array< {|
        // this is the group ID
        id: ?string,
        name: ?string,
        unbundle: ?boolean,
      |} >,
    |} >,
    // an array of outflows for a particular countryType
    outflows: ? Array< {|
      id: ?string,
      name: ?string,
      selections: ? Array< {|
        // this is the group ID
        id: ?string,
        name: ?string,
        unbundle: ?boolean,
      |} >,
    |} >,
  |},
|};

export type ResourcesOverTimeToolTipQueryVariables = {|
  id: string,
|};

export type ResourcesOverTimeToolTipQuery = {|
  internationalResources: ? {|
    // for sidebar chart in international resources section & area partition tree chart default data
    resourcesOverTime: ? {|
      toolTip: ? {|
        heading: ?string,
        source: ?string,
      |},
    |},
  |},
|};

export type PageDataQuery = {|
  countryProfile: ? Array< {|
    id: ?string,
    title: ?string,
    narrative: ?string,
  |} >,
  spotlightDistrict: ? Array< {|
    id: ?string,
    title: ?string,
    narrative: ?string,
  |} >,
|};

export type SpotlightThemesQueryVariables = {|
  country: string,
|};

export type SpotlightThemesQuery = {|
  spotlightThemes: ? Array< {|
    id: ?string,
    name: ?string,
    indicators: ? Array< {|
      id: ?string,
      name: ?string,
      heading: ?string,
      tooltip: ?string,
      source: ?string,
    |} >,
    default_indicator: ?string,
  |} >,
|};