import * as React from 'react';
import {render} from '@testing-library/react';
import Home from './Home';

const renderHomePage = (props = {}) => {
  return render(<Home {...props} />);
};

describe('Component HomePage', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderHomePage();
    expect(asFragment()).toMatchSnapshot();
  });
});
