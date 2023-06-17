import { render, screen } from '@testing-library/react';
import App from './App';

const renderApp = (props = {}) => {
  return render(<App {...props} />);
};

describe('Component App', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderApp();

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the default route "App" -> "Routes -> "HomePage" -> "HelloWorld"', () => {
    renderApp();

    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});
