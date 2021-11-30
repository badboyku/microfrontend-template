import * as React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Home from './Home';

const renderHomePage = (props = {}) => {
  return render(<Home {...props} />);
};

describe('Component HomePage', () => {
  describe('when called', () => {
    let docFragment: { (): DocumentFragment };

    beforeEach(() => {
      const { asFragment } = renderHomePage();
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
