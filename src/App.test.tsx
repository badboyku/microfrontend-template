import * as React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import App from './App';

const renderApp = (props = {}) => {
  return render(<App {...props} />);
};

describe('Component App', () => {
  describe('when called', () => {
    let docFragment: { (): DocumentFragment };

    beforeEach(() => {
      const { asFragment } = renderApp();
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
