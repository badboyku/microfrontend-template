import { redirect } from 'react-router-dom';
import AppError from 'components/AppError';
import AppRoot from 'components/AppRoot';
import Home from 'pages/Home';
import loaders from 'utils/loaders';
import logger from 'utils/logger';
import settings from 'utils/settings';
import type { RouteObject } from 'react-router-dom';

type Props = {
  path?: string;
  isRemote?: boolean;
  token?: string;
  getTokenAsync?: () => Promise<string | undefined>;
};

export const getRoutes = (props: Props = {}): RouteObject[] => {
  logger.debug('microfrontend-template: routes/getRoutes called', { props });
  const { path = '/', isRemote, token, getTokenAsync } = props;
  if (isRemote) {
    settings.init({ rootPath: path, isRemote, token, getTokenAsync });
  }

  return [
    {
      id: 'microfrontend-template-root',
      path,
      element: <AppRoot />,
      errorElement: <AppError />,
      loader: loaders.appRoot,
      children: [
        { index: true, element: <Home /> },
        { path: '*', loader: /* istanbul ignore next */ () => redirect(settings.rootPath) },
      ],
    },
  ];
};
