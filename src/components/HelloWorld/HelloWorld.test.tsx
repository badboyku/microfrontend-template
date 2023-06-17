import { render, screen } from '@testing-library/react';
import HelloWorld from './HelloWorld';

const renderHelloWorld = (props = {}) => {
  return render(<HelloWorld {...props} />);
};

describe('Component HelloWorld', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderHelloWorld();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders div with "Hello World!"', () => {
    renderHelloWorld();

    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});
