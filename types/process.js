/* @flow */
type Process = {
    browser: string,
    env: {
      MapboxAccessToken: string
    }
}
declare var process: Process;
