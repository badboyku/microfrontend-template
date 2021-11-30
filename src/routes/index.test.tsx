import * as React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Routes from './index';

const renderRoutes = (props = {}) => {
  return render(<Routes {...props} />);
};

describe('Component Routes', () => {
  describe('when called', () => {
    let docFragment: { (): DocumentFragment };

    beforeEach(() => {
      const { asFragment } = renderRoutes();
      docFragment = asFragment;
    });

    afterEach(() => {
      cleanup();
    });

    it('renders without crashing', () => {
      expect(docFragment()).toMatchSnapshot();
    });

    it('matches the snapshot', () => {
      expect(screen).toMatchSnapshot();
    });
  });
});
