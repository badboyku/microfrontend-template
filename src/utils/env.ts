/* istanbul ignore file */
import type { ReactAppEnvVars } from '../@types/global';

export const DefaultEnvVars: ReactAppEnvVars = {
  REACT_APP_MY_VAR: '',
};

export const getEnvVars = (): ReactAppEnvVars => {
  const { __RUNTIME_CONFIG__: env = DefaultEnvVars } = window;

  return { ...DefaultEnvVars, ...env };
};

export const setEnvVars = (newEnvVars: ReactAppEnvVars): void => {
  window.__RUNTIME_CONFIG__ = { ...DefaultEnvVars, ...newEnvVars };
};
