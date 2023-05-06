import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Routes from './index';

const renderRoutes = (props = {}) => {
  return render(
    <MemoryRouter>
      <Routes {...props} />
    </MemoryRouter>,
  );
};

describe('Component Routes', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderRoutes();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the default route "Routes" -> "HomePage"', () => {
    renderRoutes();

    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});
