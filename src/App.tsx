import { createBrowserRouter, RouterProvider } from 'react-router';
import { getRoutes } from './routes';
import logger from './utils/logger';
import settings from './utils/settings';

settings.init();

const App = () => {
  logger.debug('microfrontend-template: App called');

  return <RouterProvider router={createBrowserRouter(getRoutes())} />;
};

export default App;
