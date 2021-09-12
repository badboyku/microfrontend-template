import * as React from 'react';
import {render, screen} from '@testing-library/react';
import Routes from './index';

const renderRoutes = (props = {}) => {
  return render(<Routes {...props} />);
};

describe('Component Routes', () => {
  it('renders without crashing', () => {
    renderRoutes();
    expect(screen).toMatchSnapshot();
  });

  it('renders the default route "Routes" -> "HomePage"', () => {
    renderRoutes();
    expect(screen.queryByText('Hello World!')).toBeInTheDocument();
  });
});
