import * as React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import HelloWorld from './HelloWorld';

const renderHelloWorld = (props = {}) => {
  return render(<HelloWorld {...props} />);
};

describe('Component HelloWorld', () => {
  describe('when called', () => {
    let docFragment: { (): DocumentFragment };

    beforeEach(() => {
      const { asFragment } = renderHelloWorld();
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
