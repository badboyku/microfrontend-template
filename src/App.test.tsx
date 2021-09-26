import * as React from 'react';
import { render } from '@testing-library/react';
import App from './App';

const renderApp = (props = {}) => {
  return render(<App {...props} />);
};

describe('Component App', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderApp();
    expect(asFragment()).toMatchSnapshot();
  });
});
