/* @flow */
type Process = {
    browser: boolean,
    env: {
      MapboxAccessToken: string,
      NODE_ENV: string
    }
}
declare var process: Process;

export type Country = {|
    id: ?string,
    name: ?string,
    slug: ?string,
    countryType: ?string,
|}
