declare global {
  interface Window {
    _env_?: WindowEnvVars;
  }
}

export type WindowEnvVars = {
  REACT_APP_MY_ENVVAR: string;
};

export type EnvVars = {
  IS_DEV: boolean;
  IS_PROD: boolean;
  PUBLIC_URL: string;
} & WindowEnvVars;
