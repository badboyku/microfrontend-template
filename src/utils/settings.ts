import { LOG_LEVELS } from 'utils/constants';
import logger from 'utils/logger';
import { getWindowLocation } from 'utils/window';
import type { AppSettings } from '@types';

const STORAGE_KEY = 'microfrontend-template-settings';

/* region Private helper functions */
const cleanEnvVar = (envVar: string | undefined, defaultValue = '') =>
  envVar === undefined || envVar === '' || envVar.toLowerCase() === 'false' ? defaultValue : envVar;
const cleanRootPath = (path: string) => (path === '/' ? path : `/${path.replace('*', '')}`);
const isProd = (location: string) => /(domain)\.com/i.test(location);
/* endregion */

export default {
  auth: { isAuthorized: false, authorizedDateTime: undefined },
  getTokenAsync: () => Promise.resolve(''),
  isProd: true,
  isRemote: false,
  logLevel: cleanEnvVar(window.__RUNTIME_CONFIG__?.REACT_APP_LOG_LEVEL, LOG_LEVELS.ERROR)?.toUpperCase(),
  myVar: cleanEnvVar(window.__RUNTIME_CONFIG__?.REACT_APP_MY_VAR),
  rootPath: '/',
  token: cleanEnvVar(window.__RUNTIME_CONFIG__?.REACT_APP_TOKEN),

  init(settings?: Partial<AppSettings>) {
    logger.debug('microfrontend-template: utils/settings init called', { settings });
    const { rootPath, isRemote, token: tokenParam, getTokenAsync } = settings || {};
    const settingsStorage = { ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } as Partial<AppSettings>;
    const { token: tokenStorage } = settingsStorage;
    const token = tokenParam || tokenStorage;

    this.updateSettings({
      ...(rootPath ? { rootPath: cleanRootPath(rootPath) } : {}),
      isProd: isProd(getWindowLocation().href),
      ...(isRemote ? { isRemote } : {}),
      ...(token ? { token } : {}),
      ...(getTokenAsync ? { getTokenAsync } : {}),
    });
  },

  getSettings() {
    return this;
  },

  isAuthorized() {
    return this.auth.isAuthorized;
  },

  updateSettings(settings: Partial<AppSettings>, persist = false) {
    logger.debug('microfrontend-template: utils/settings updateSettings called', { settings, persist });
    Object.assign(this, settings);

    if (
      Object.hasOwn(settings, 'token') &&
      Object.hasOwn(window, '__RUNTIME_CONFIG__') &&
      Object.hasOwn(window.__RUNTIME_CONFIG__, 'REACT_APP_TOKEN')
    ) {
      window.__RUNTIME_CONFIG__.REACT_APP_TOKEN = this.token;
    }

    if (persist) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: this.token }));
    }
  },
};
