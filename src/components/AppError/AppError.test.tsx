import { render, screen } from '@testing-library/react';
import { isRouteErrorResponse, useRouteError } from 'react-router';
import settings from 'utils/settings';
import AppError from './AppError';

jest.mock('react-router');
jest.mock('components/AppSettingsEditor/AppSettingsEditor', () => () => <div data-testid="appSettingsEditor" />);
jest.mock('utils/logger');

const renderAppError = (props = {}) => {
  return render(<AppError {...props} />);
};

describe('Component AppError', () => {
  const data = 'data';
  const statusText = 'statusText';
  const error = { data, statusText };
  const isProdBackup = settings.isProd;

  const isRouteErrorResponseMock = jest.mocked(isRouteErrorResponse);
  const useRouteErrorMock = jest.mocked(useRouteError);

  describe('when isRouteErrorResponse returns true', () => {
    beforeEach(() => {
      isRouteErrorResponseMock.mockReturnValueOnce(true);
      useRouteErrorMock.mockReturnValueOnce(error);
    });

    describe('with settings.isProd = false', () => {
      beforeEach(() => {
        settings.isProd = false;
      });

      afterAll(() => {
        settings.isProd = isProdBackup;
      });

      it('should contain AppSettingsEditor component', () => {
        renderAppError();

        expect(screen.getByTestId('appSettingsEditor')).toBeInTheDocument();
      });

      it('should show error statusText along with data', () => {
        renderAppError();

        expect(screen.getByText(`${statusText}: ${data}`)).toBeInTheDocument();
      });
    });

    describe('with settings.isProd = true', () => {
      beforeEach(() => {
        settings.isProd = true;
      });

      afterAll(() => {
        settings.isProd = isProdBackup;
      });

      it('should not contain AppSettingsEditor component', () => {
        renderAppError();

        expect(screen.queryByTestId('appSettingsEditor')).not.toBeInTheDocument();
      });

      it('should show error statusText only', () => {
        renderAppError();

        expect(screen.getByText(`${statusText}`)).toBeInTheDocument();
      });
    });
  });

  describe('when isRouteErrorResponse returns false and settings.isProd = false', () => {
    beforeEach(() => {
      settings.isProd = false;
      isRouteErrorResponseMock.mockReturnValueOnce(false);
      useRouteErrorMock.mockReturnValueOnce(error);
    });

    afterAll(() => {
      settings.isProd = isProdBackup;
    });

    it('should contain AppSettingsEditor component', () => {
      renderAppError();

      expect(screen.getByTestId('appSettingsEditor')).toBeInTheDocument();
    });
  });

  describe('when isRouteErrorResponse returns false', () => {
    it('should show the default error message', () => {
      isRouteErrorResponseMock.mockReturnValueOnce(false);
      useRouteErrorMock.mockReturnValueOnce(error);
      renderAppError();

      expect(screen.getByText(`We're sorry, but something went wrong`)).toBeInTheDocument();
    });
  });
});
