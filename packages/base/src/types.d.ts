declare namespace NodeJS {
  export interface Process {
    version: string;
    browser: boolean;
    // @ts-ignore
    config: Process['config'] & {
      api: string;
      old_datahub: string;
    };
    env: any & {
      PORT: number,
      NODE_ENV: string;
    };
  }
}