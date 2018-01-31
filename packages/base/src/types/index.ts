export type District = {
  id: string,
  name: string,
  slug: string
}

export type Country = District & {
  has_domestic_data?: string,
  countryType: string,
  hasPDF?: boolean
}

// TODO: allan improvise to remove at some point in future
// in favour of auto generated types
export type Resource = {|
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
|};

export type NavIndicator = {
    id: ?string,
    name: ?string,
    heading: ?string,
    tooltip: ?string,
    source: ?string,
}

export type NavBarItem = {|
  id: ?string,
  name: ?string,
  indicators: ? Array<NavIndicator>,
  default_indicator: ?string,
|}

export type SelectOption = {|
  id: ?string,
  name: ?string,
  text: ?string,
|}

export type IndicatorValueWithToolTip ={
    value: ?string,
    toolTip: {|
      source: string,
      heading: string,
    |}
}
