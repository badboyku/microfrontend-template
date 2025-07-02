// Add runtime env vars here.
export type ReactAppEnvVars = {
  NODE_ENV?: string;
  // Required
  REACT_APP_MY_VAR: string;
  // Optional
  REACT_APP_LOG_LEVEL?: string;
  REACT_APP_TOKEN?: string;
};

declare global {
  declare const IS_DEV: boolean;
  declare const IS_PROD: boolean;
  declare const SETTINGS_CODE: string;

  export interface Window {
    __RUNTIME_CONFIG__: ReactAppEnvVars;
  }
}
