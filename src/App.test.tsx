import * as React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import type { Props } from './App';

const defaultProps = {};

const renderApp = (props: Props = defaultProps) => {
  return render(<App {...props} />);
};

describe('Component App', () => {
  describe('when called', () => {
    it('renders without crashing', () => {
      const { asFragment } = renderApp();

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
