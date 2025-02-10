import { render } from '@testing-library/react';
import AppRoot from './AppRoot';

const renderAppRoot = (props = {}) => {
  return render(<AppRoot {...props} />);
};

describe('Component AppRoot', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderAppRoot();

    expect(asFragment()).toMatchSnapshot();
  });
});
