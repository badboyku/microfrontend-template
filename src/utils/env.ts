/* istanbul ignore file */
import type { ReactAppEnvVars } from 'types/app';

const defaultEnvVars: ReactAppEnvVars = {
  REACT_APP_MY_VAR: '',
};

const getEnvVars = (): ReactAppEnvVars => {
  const { __RUNTIME_CONFIG__: env = defaultEnvVars } = window;

  return { ...defaultEnvVars, ...env };
};

const setEnvVars = (newEnvVars: ReactAppEnvVars): void => {
  window.__RUNTIME_CONFIG__ = { ...defaultEnvVars, ...newEnvVars };
};

export default { getEnvVars, setEnvVars };
