import AppError from 'components/AppError';
import AppRoot from 'components/AppRoot';
import loaders from 'utils/loaders';
import settings from 'utils/settings';
import { getRoutes } from './index';

jest.mock('components/AppError', () => () => <div data-testid="appError" />);
jest.mock('components/AppRoot', () => () => <div data-testid="appRoot" />);
jest.mock('pages/Home', () => () => <div data-testid="home" />);
jest.mock('utils/loaders');
jest.mock('utils/logger');
jest.mock('utils/settings');

describe('Routes', () => {
  describe('calling function getRoutes', () => {
    describe('successfully', () => {
      it('returns routes array', () => {
        const result = getRoutes();

        expect(result).toEqual([
          {
            id: 'microfrontend-template-root',
            path: '/',
            element: <AppRoot />,
            errorElement: <AppError />,
            loader: loaders.appRoot,
            children: expect.any(Array),
          },
        ]);
      });
    });

    describe('with prop path', () => {
      const path = '/path';

      it('sets path in first route', () => {
        const result = getRoutes({ path });

        expect(result[0].path).toEqual(path);
      });
    });

    describe('with prop isRemote = true', () => {
      const isRemote = true;

      it('calls settings.init', () => {
        getRoutes({ isRemote });

        expect(settings.init).toHaveBeenCalledWith({ rootPath: '/', isRemote });
      });

      describe('with prop path', () => {
        const path = '/path';

        it('calls settings.init with path from props', () => {
          getRoutes({ path, isRemote });

          expect(settings.init).toHaveBeenCalledWith({ rootPath: path, isRemote });
        });
      });

      describe('with token path', () => {
        const token = 'token';

        it('calls settings.init with token from props', () => {
          getRoutes({ isRemote, token });

          expect(settings.init).toHaveBeenCalledWith({ rootPath: '/', isRemote, token });
        });
      });

      describe('with getTokenAsync path', () => {
        const getTokenAsync = jest.fn();

        it('calls settings.init with token from props', () => {
          getRoutes({ isRemote, getTokenAsync });

          expect(settings.init).toHaveBeenCalledWith({ rootPath: '/', isRemote, getTokenAsync });
        });
      });
    });
  });
});
