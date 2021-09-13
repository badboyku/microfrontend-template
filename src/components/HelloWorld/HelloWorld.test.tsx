import * as React from 'react';
import {render} from '@testing-library/react';
import HelloWorld from './HelloWorld';

const renderHelloWorld = (props = {}) => {
  return render(<HelloWorld {...props} />);
};

describe('Component HelloWorld', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderHelloWorld();
    expect(asFragment()).toMatchSnapshot();
  });
});
