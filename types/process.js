/* @flow */
type Process = {
    browser: string,
    env: {
      MapboxAccessToken: string,
      NODE_ENV: string
    }
}
declare var process: Process;
