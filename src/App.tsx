import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getRoutes } from './routes';
import logger from './utils/logger';
import settings from './utils/settings';

settings.init();

const App = () => {
  logger.debug('microfrontend-template: App called');

  return <RouterProvider router={createBrowserRouter(getRoutes())} future={{ v7_startTransition: true }} />;
};

export default App;
