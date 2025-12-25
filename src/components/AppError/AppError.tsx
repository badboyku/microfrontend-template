import { useCallback } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router';
import AppSettingsEditor from 'components/AppSettingsEditor';
import logger from 'utils/logger';
import settings from 'utils/settings';

const AppError = () => {
  logger.debug('microfrontend-template: components/AppError called');
  const error = useRouteError();

  /* istanbul ignore next */
  const reloadWindow = useCallback(() => window.location.reload(), []);

  if (isRouteErrorResponse(error)) {
    const { data, statusText } = error;

    return (
      <>
        {!settings.isProd && <AppSettingsEditor />}
        <div>{!settings.isProd ? `${statusText}: ${data}` : statusText}</div>
      </>
    );
  }

  // TODO: Handle error!
  logger.error(error as string);

  return (
    <>
      {!settings.isProd && <AppSettingsEditor />}
      <div style={{ textAlign: 'center' }}>
        <h1 className="error">We&apos;re sorry, but something went wrong</h1>
        <h3>You may go back, or click below to try again</h3>
        <button type="button" onClick={reloadWindow}>
          Retry
        </button>
      </div>
    </>
  );
};

export default AppError;
