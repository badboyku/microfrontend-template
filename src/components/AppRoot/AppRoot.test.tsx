import { render, screen } from '@testing-library/react';
import { Outlet, useLoaderData } from 'react-router';
import settings from 'utils/settings';
import AppRoot from './AppRoot';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Outlet: jest.fn(),
  useLoaderData: jest.fn(),
}));
jest.mock('components/AppSettingsEditor/AppSettingsEditor', () => () => <div data-testid="app-settings-editor" />);
jest.mock('utils/logger');
jest.mock('utils/settings');

const renderAppRoot = (props = {}) => {
  return render(<AppRoot {...props} />);
};

describe('Component AppRoot', () => {
  const isProdBackup = settings.isProd;

  beforeEach(() => {
    jest.mocked(useLoaderData).mockReturnValue({ isAuthorized: true });
  });

  afterAll(() => {
    settings.isProd = isProdBackup;
  });

  describe('with settings.isProd = true', () => {
    it('should not contain AppSettingsEditor component', () => {
      settings.isProd = true;

      renderAppRoot();

      expect(screen.queryByTestId('app-settings-editor')).not.toBeInTheDocument();
    });
  });

  describe('with settings.isProd = false', () => {
    it('should contain AppSettingsEditor component', () => {
      settings.isProd = false;

      renderAppRoot();

      expect(screen.getByTestId('app-settings-editor')).toBeInTheDocument();
    });
  });

  describe('with isAuthorized = true', () => {
    it('should contain Outlet component', () => {
      renderAppRoot();

      expect(Outlet).toHaveBeenCalled();
    });
  });
});
