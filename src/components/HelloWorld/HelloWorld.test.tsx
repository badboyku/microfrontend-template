import { render, screen } from '@testing-library/react';
import HelloWorld from './HelloWorld';

jest.mock('utils/logger');

const renderHelloWorld = (props = {}) => {
  return render(<HelloWorld {...props} />);
};

describe('Component HelloWorld', () => {
  it('renders div with "Hello World!"', () => {
    renderHelloWorld();

    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});
