import * as React from 'react';
import {render, screen} from '@testing-library/react';
import Home from './Home';

const renderHomePage = (props = {}) => {
  return render(<Home {...props} />);
};

describe('Component HomePage', () => {
  it('renders without crashing', () => {
    renderHomePage();
    expect(screen).toMatchSnapshot();
  });

  it('renders HelloWorld Component', () => {
    renderHomePage();
    expect(screen.queryByText('Hello World!')).toBeInTheDocument();
  });
});
