import { render, screen } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import { getRoutes } from './routes';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  createBrowserRouter: jest.fn(),
  RouterProvider: jest.fn(),
}));
jest.mock('routes/index');
jest.mock('utils/logger');
jest.mock('utils/settings');

const renderApp = (props = {}) => {
  jest.isolateModules(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports,global-require
    require('./App');
  });

  return render(<App {...props} />);
};

describe('App', () => {
  const routes = 'routes';
  const router = 'router';

  const createBrowserRouterMock = jest.mocked(createBrowserRouter);
  const RouterProviderMock = jest.mocked(RouterProvider);
  const getAppRoutesMock = jest.mocked(getRoutes);

  beforeEach(() => {
    RouterProviderMock.mockReturnValue(<div data-testid="router-provider" />);
    createBrowserRouterMock.mockReturnValue(router as never);
    getAppRoutesMock.mockReturnValue(routes as never);
  });

  it('renders RouterProvider', () => {
    renderApp();

    expect(screen.getByTestId('router-provider')).toBeInTheDocument();
  });

  it('calls getAppRoutes', () => {
    renderApp();

    expect(getAppRoutesMock).toHaveBeenCalled();
  });

  it('calls createBrowserRouter', () => {
    renderApp();

    expect(createBrowserRouterMock).toHaveBeenCalledWith(routes);
  });
});
