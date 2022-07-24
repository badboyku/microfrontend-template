import * as React from 'react';
import { render } from '@testing-library/react';
import Routes from './index';
import type { Props } from './index';

const defaultProps = {};

const renderRoutes = (props: Props = defaultProps) => {
  return render(<Routes {...props} />);
};

describe('Component Routes', () => {
  describe('when called', () => {
    it('renders without crashing', () => {
      const { asFragment } = renderRoutes();

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
