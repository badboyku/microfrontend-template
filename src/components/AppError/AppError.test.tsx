import { render } from '@testing-library/react';
import { useRouteError } from 'react-router-dom';
import AppError from './AppError';

jest.mock('react-router-dom', () => ({ useRouteError: jest.fn() }));

const renderAppError = (props = {}) => {
  return render(<AppError {...props} />);
};

describe('Component AppError', () => {
  const error = new Error('foo bar');

  beforeEach(() => {
    jest.mocked(useRouteError).mockReturnValueOnce(error);
    jest.spyOn(console, 'error').mockImplementationOnce(() => {
      // Do nothing.
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    const { asFragment } = renderAppError();

    expect(asFragment()).toMatchSnapshot();
  });
});
