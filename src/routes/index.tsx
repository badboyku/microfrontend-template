import AppError from 'components/AppError';
import AppRoot from 'components/AppRoot';
import Home from 'pages/Home';
import type { RouteObject } from 'react-router-dom';

type Props = {};

const getRoutes = (_props: Props = {}): RouteObject[] => {
  return [
    { path: '/', element: <AppRoot />, errorElement: <AppError />, children: [{ index: true, element: <Home /> }] },
  ];
};

export default getRoutes();
