import authorization from './authorization';
import { THIRTY_MIN_IN_MS } from './constants';
import logger from './logger';
import settings from './settings';
import type { LoaderFunction } from 'react-router-dom';

const appRoot: LoaderFunction = async () => {
  logger.debug('microfrontend-template: utils/loaders appRoot called');
  const timeDiff = settings.auth.authorizedDateTime
    ? new Date().getTime() - settings.auth.authorizedDateTime
    : THIRTY_MIN_IN_MS + 1;

  if (!settings.isAuthorized() || timeDiff > THIRTY_MIN_IN_MS) {
    const token = settings.isRemote ? await settings.getTokenAsync() : settings.token;
    const { isAuthorized } = authorization.authorizeToken(token);
    const auth = { ...settings.auth, isAuthorized, authorizedDateTime: new Date().getTime() };
    settings.updateSettings({ token, auth });

    return { isAuthorized };
  }

  return { isAuthorized: settings.isAuthorized() };
};

export default { appRoot };
