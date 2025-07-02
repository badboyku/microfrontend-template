import { render } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { getRoutes } from './routes';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  createBrowserRouter: jest.fn(),
  RouterProvider: jest.fn(),
}));
jest.mock('./routes/index');
jest.mock('./utils/logger');
jest.mock('./utils/settings');

const renderApp = (props = {}) => {
  return render(<App {...props} />);
};

describe('App', () => {
  const routes = 'routes';
  const router = 'router';

  beforeEach(() => {
    jest.mocked(getRoutes).mockReturnValue(routes as never);
    jest.mocked(createBrowserRouter).mockReturnValue(router as never);
  });

  it('calls routes getRoutes', () => {
    renderApp();

    expect(getRoutes).toHaveBeenCalled();
  });

  it('calls createBrowserRouter', () => {
    renderApp();

    expect(createBrowserRouter).toHaveBeenCalledWith(routes);
  });

  it('should contain RouterProvider component', () => {
    renderApp();

    expect(RouterProvider).toHaveBeenCalledWith(expect.objectContaining({ router }), {});
  });
});
