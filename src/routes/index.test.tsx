import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import routes from './index';

jest.mock('../pages/Home', () => ({ Home: () => <div data-testid="home" /> }));

const renderRoutes = (initialEntries = ['/']) => {
  const router = createMemoryRouter(routes, { initialEntries });

  return render(<RouterProvider router={router} />);
};

describe('Component Routes', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderRoutes();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the default route "Routes" -> "HomePage"', () => {
    renderRoutes();

    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});
