import { Outlet, useLoaderData } from 'react-router-dom';
import AppSettingsEditor from 'components/AppSettingsEditor';
import logger from 'utils/logger';
import settings from 'utils/settings';

const AppRoot = () => {
  const { isAuthorized } = useLoaderData() as { isAuthorized: boolean };
  logger.debug('microfrontend-template: components/AppRoot called', { isAuthorized });

  return (
    <>
      {!settings.isProd && <AppSettingsEditor />}
      <Outlet />
    </>
  );
};

export default AppRoot;
