import { render, screen } from '@testing-library/react';
import Home from './Home';

jest.mock('../../components/HelloWorld', () => ({ HelloWorld: () => <div data-testid="helloWorld" /> }));

const renderHomePage = (props = {}) => {
  return render(<Home {...props} />);
};

describe('Component HomePage', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderHomePage();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders header Home', () => {
    renderHomePage();

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders HelloWorld Component', () => {
    renderHomePage();

    expect(screen.getByTestId('helloWorld')).toBeInTheDocument();
  });
});
