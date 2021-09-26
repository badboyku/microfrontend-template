import * as React from 'react';
import { render } from '@testing-library/react';
import Routes from './index';

const renderRoutes = (props = {}) => {
  return render(<Routes {...props} />);
};

describe('Component Routes', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderRoutes();
    expect(asFragment()).toMatchSnapshot();
  });
});
