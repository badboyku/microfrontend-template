// Add custom react env vars here for runtime env vars.
export type ReactAppEnvVars = {
  NODE_ENV?: string;
  REACT_APP_MY_VAR: string;
};

declare global {
  declare const IS_DEV: boolean;
  declare const IS_PROD: boolean;

  // Add custom react env vars here for buildtime env vars.
  declare const REACT_APP_MY_VAR: string;

  export interface Window {
    __RUNTIME_CONFIG__?: ReactAppEnvVars | {};
  }
}
