import * as React from 'react';
import { render } from '@testing-library/react';
import HelloWorld from './HelloWorld';
import type { Props } from './HelloWorld';

const defaultProps = {};

const renderHelloWorld = (props: Props = defaultProps) => {
  return render(<HelloWorld {...props} />);
};

describe('Component HelloWorld', () => {
  describe('when called', () => {
    it('renders without crashing', () => {
      const { asFragment } = renderHelloWorld();

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
