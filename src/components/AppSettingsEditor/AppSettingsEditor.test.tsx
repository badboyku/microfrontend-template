import { render } from '@testing-library/react';
import { useLocation, useNavigate, useRevalidator } from 'react-router-dom';
import AppSettingsEditor from './AppSettingsEditor';

jest.mock('react-router-dom');
jest.mock('utils/logger');

const renderAppSettingsEditor = (props = {}) => {
  return render(<AppSettingsEditor {...props} />);
};

describe('Component AppSettingsEditor', () => {
  const location = { pathname: '/foo', search: '?foo=bar' };
  const navigate = jest.fn();
  const revalidate = jest.fn();

  it('renders without crashing', () => {
    jest.mocked(useLocation).mockReturnValue(location as never);
    jest.mocked(useNavigate).mockReturnValue(navigate);
    jest.mocked(useRevalidator).mockReturnValue({ revalidate } as never);

    const { asFragment } = renderAppSettingsEditor();

    expect(asFragment()).toMatchSnapshot();
  });
});
