/* @flow */
//  This file was automatically generated and should not be edited.

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

export type SpotLightTabDataQueryVariables = {|
  id: string,
  country: string,
|};

export type SpotLightTabDataQuery = {|
  povertyTabRegional: ? {|
    poorestPeople: ?string,
    // WHAT IS THE AVERAGE LIFE EXPECTANCY?
    lifeExpectancy: ?string,
    // WHAT IS THE STANDARD OF LIVING SCORE?
    stdOfLiving: ?string,
  |},
  // id is district slug
  overViewTabRegional: ? {|
    // WHAT PERCENTAGE OF PEOPLE IN WAKISO LIVE BELOW THE NATIONAL POVERTY LINE?
    // can be no data or '12%'
    poorestPeople: ?string,
    // WHAT RESOURCES ARE AVAILABLE TO LOCAL GOVERNMENTS IN WAKISO? eg 3.6m or 2.7bn
    // this is a total of local, donor and central government resources
    regionalResources: ?string,
    // IndicatorDataColored is defined in country profile types
    // has local government, donor and central government
    regionalResourcesBreakdown: ? Array< {|
      id: ?string,
      year: ?number,
      value: ?number,
      name: ?string,
      color: ?string,
    |} >,
    // HOW MUCH DOES THE LOCAL GOVERNMENT SPEND PER PERSON?
    localGovernmentSpendPerPerson: ?string,
  |},
  populationTabRegional: ? {|
    // The total population of a given district and the population density in per sq km
    totalPopulation: ?string,
    populationDensity: ?string,
    // Urban vs Rural population level
    populationDistribution: ? Array< {|
      group: ?string,
      value: ?number,
      year: ?number,
    |} >,
    averageDependencyRatio: ?string,
    allAverageDependencyRatio: ?string,
  |},
  educationTabRegional: ? {|
    // WHAT IS THE PUPIL–TEACHER RATIO IN PRIMARY EDUCATION?...in government schools  and...in all schools
    pupilTeacherRatioGovtSchl: ?string,
    pupilTeacherRatioOtherSchl: ?string,
    // WHAT PERCENTAGE OF STUDENTS PASS THE PRIMARY LEAVING EXAM?
    studentsPassRate: ?string,
    studentsPassDistrictRank: ?string,
    // HOW MUCH PRIMARY EDUCATION FUNDING IS THERE?
    primaryEducationfunding: ?string,
  |},
  healthTabRegional: ? {|
    // WHAT IS THE DISTRICT LEAGUE HEALTH PERFORMANCE SCORE?
    districtPerformance: ?string,
    // WHAT PERCENTAGE OF TUBERCULOSIS CASES HAVE BEEN SUCCESSFULLY TREATED?
    treatmeantOfTb: ?string,
    // HOW MUCH LOCAL GOVERNMENT HEALTHCARE FUNDING IS THERE?
    healthCareFunding: ?string,
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