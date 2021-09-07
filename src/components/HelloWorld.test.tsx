import * as React from 'react';
import { render, screen } from '@testing-library/react';
import HelloWorld from './HelloWorld';

const renderHelloWorld = (_props = {}) => {
  return render(<HelloWorld />);
};

describe('Component HelloWorld', () => {
  it('renders without crashing', () => {
    const { container } = renderHelloWorld({});
    expect(container).toMatchSnapshot();
  });
  it('renders div with "Hello World!"', () => {
    const { container } = renderHelloWorld({});
    // Has an extra div to serve as the "parent" div for the component
    expect(container).toContainHTML('<div><div>Hello World!</div></div>');
  });
  it('renders one div', () => {
    renderHelloWorld({});
    const helloDiv = screen.getByText('Hello World!');
    expect(helloDiv).toBeInTheDocument();
  });
});
