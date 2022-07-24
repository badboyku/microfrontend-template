import * as React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
import type { Props } from './Home';

const defaultProps = {};

const renderHomePage = (props: Props = defaultProps) => {
  return render(<Home {...props} />);
};

describe('Component HomePage', () => {
  describe('when called', () => {
    it('renders without crashing', () => {
      const { asFragment } = renderHomePage();

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
