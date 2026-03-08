import { createBrowserRouter, RouterProvider } from 'react-router';
import { getRoutes } from './routes';
import logger from './utils/logger';
import settings from './utils/settings';

settings.init();

const routes = getRoutes();
const router = createBrowserRouter(routes);

const App = () => {
  logger.debug('microfrontend-template: App called');

  return <RouterProvider router={router} />;
};

export default App;
