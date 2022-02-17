// Add custom react env vars here for runtime env vars.
export type ReactAppEnvVars = {
  REACT_APP_MY_VAR: string;
};

declare global {
  declare const IS_DEV: boolean;
  declare const IS_PROD: boolean;
  declare const PUBLIC_URL: string;

  // Add custom react env vars here for buildtime env vars.
  declare const REACT_APP_MY_VAR: string;

  export interface Window {
    _env_?: ReactAppEnvVars | {};
  }
}
