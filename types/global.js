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
