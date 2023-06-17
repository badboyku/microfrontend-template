import { Outlet, RouteObject } from 'react-router-dom';
import { Home } from '../pages';

const Root = () => {
  return <Outlet />;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [{ path: '', element: <Home /> }],
  },
];

export default routes;
