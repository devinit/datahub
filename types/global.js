/* @flow */
type Process = {
    browser: boolean,
    env: {
      PORT: number,
      MapboxAccessToken: string,
      NODE_ENV: {
        PORT: number
      }
    }
}
declare var process: Process;

export type Country = {|
    id: string,
    name: string,
    slug: string,
    countryType: string,
|}

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
