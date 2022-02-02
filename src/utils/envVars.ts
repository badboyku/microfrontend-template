/* istanbul ignore file */
import type { EnvVars, WindowEnvVars } from '../@types/global';

/**
 * WindowEnvVars
 */
export const DefaultWindowEnvVars: WindowEnvVars = {
  REACT_APP_MY_ENVVAR: '',
};

export const getWindowEnvVars = (): WindowEnvVars => {
  const { _env_: env = DefaultWindowEnvVars } = window;

  return env;
};

/**
 * EnvVars
 */
declare const ENV_IS_DEV: boolean;
export const IS_DEV = ENV_IS_DEV;

declare const ENV_IS_PROD: boolean;
export const IS_PROD = ENV_IS_PROD;

declare const ENV_PUBLIC_URL: string;
export const PUBLIC_URL = ENV_PUBLIC_URL;

export const getEnvVars = (): EnvVars => {
  const windowEnvVars = getWindowEnvVars();

  return { IS_DEV, IS_PROD, PUBLIC_URL, ...windowEnvVars };
};
