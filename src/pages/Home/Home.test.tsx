import { render, screen } from '@testing-library/react';
import Home from './Home';

jest.mock('components/HelloWorld', () => () => <div data-testid="helloWorld" />);
jest.mock('utils/logger');

const renderHome = (props = {}) => {
  return render(<Home {...props} />);
};

describe('Page Home', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderHome();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders header Home', () => {
    renderHome();

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders component HelloWorld', () => {
    renderHome();

    expect(screen.getByTestId('helloWorld')).toBeInTheDocument();
  });
});
