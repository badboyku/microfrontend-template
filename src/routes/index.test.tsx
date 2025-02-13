import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routes from './index';

jest.mock('pages/Home', () => () => <div data-testid="home" />);

const renderRoutes = (initialEntries = ['/']) => {
  const router = createMemoryRouter(routes, { initialEntries });

  return render(<RouterProvider router={router} />);
};

describe('Routes', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderRoutes();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the default route "Routes" -> "HomePage"', () => {
    renderRoutes();

    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});
