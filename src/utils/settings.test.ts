import settings from './settings';
import type { ReactAppEnvVars } from 'types';

jest.mock('utils/logger');

describe('Settings Util', () => {
  const envVarsBackup = window.__RUNTIME_CONFIG__ as ReactAppEnvVars;

  const storageGetItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  const storageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem');

  afterAll(() => {
    window.__RUNTIME_CONFIG__ = envVarsBackup;
  });

  describe('calling auth', () => {
    it('returns default auth object as default', () => {
      expect(settings.auth).toEqual({ isAuthorized: false, authorizedDateTime: undefined });
    });
  });

  describe('calling getTokenAsync', () => {
    it('returns default getTokenAsync function as default', () => {
      expect(settings.getTokenAsync).toBeDefined();
    });

    describe('and calling default getTokenAsync function', () => {
      it('returns empty string', async () => {
        const actual = await settings.getTokenAsync();

        expect(actual).toEqual('');
      });
    });
  });

  describe('calling isProd', () => {
    it('returns true as default', () => {
      expect(settings.isProd).toEqual(true);
    });
  });

  describe('calling isRemote', () => {
    it('returns false as default', () => {
      expect(settings.isRemote).toEqual(false);
    });
  });

  describe('calling logLevel', () => {
    it('returns logLevel ERROR as default', () => {
      expect(settings.logLevel).toEqual('ERROR');
    });
  });

  describe('calling rootPath', () => {
    it('returns "/" as default', () => {
      expect(settings.rootPath).toEqual('/');
    });
  });

  describe('calling token', () => {
    it('returns empty string as default', () => {
      expect(settings.token).toEqual('');
    });
  });

  describe('calling init', () => {
    it('calls localStorage.getItem', () => {
      storageGetItemSpy.mockReturnValueOnce(undefined as never);

      settings.init();

      expect(storageGetItemSpy).toHaveBeenCalledWith('microfrontend-template-settings');
    });

    describe('with settings param containing rootPath = "/"', () => {
      it('sets rootPath from param', () => {
        const newSettings = { rootPath: '/' };

        settings.init(newSettings);

        expect(settings.rootPath).toEqual('/');
      });
    });

    describe('with settings param containing rootPath having "/*"', () => {
      it('sets rootPath from param with "/*" removed', () => {
        const newSettings = { rootPath: 'foo/*' };

        settings.init(newSettings);

        expect(settings.rootPath).toEqual('/foo/');
      });
    });

    describe('with settings param containing isRemote', () => {
      it('sets isRemote from param', () => {
        const newSettings = { isRemote: true };

        settings.init(newSettings);

        expect(settings.isRemote).toEqual(newSettings.isRemote);
      });
    });

    describe('with settings param containing token', () => {
      it('sets token from param', () => {
        const newSettings = { token: 'tokenNew' };

        settings.init(newSettings);

        expect(settings.token).toEqual(newSettings.token);
      });
    });

    describe('with settings param containing getTokenAsync', () => {
      it('sets getTokenAsync from param', () => {
        const newSettings = { getTokenAsync: jest.fn() };

        settings.init(newSettings);

        expect(settings.getTokenAsync).toEqual(newSettings.getTokenAsync);
      });
    });

    describe('when localStorage token set', () => {
      it('sets token from localStorage', () => {
        storageGetItemSpy.mockReturnValueOnce('{"token":"foo"}');

        settings.init();

        expect(settings.token).toEqual('foo');
      });
    });
  });

  describe('calling getSettings', () => {
    it('returns settings', () => {
      expect(settings.getSettings()).toEqual(settings);
    });
  });

  describe('calling isAuthorized', () => {
    const testCases = [
      { test: 'auth.isAuthorized = false', isAuthorized: false, expected: false },
      { test: 'auth.isAuthorized = true', isAuthorized: true, expected: true },
    ];
    testCases.forEach(({ test, isAuthorized, expected }) => {
      describe(`with ${test}`, () => {
        beforeEach(() => {
          settings.auth.isAuthorized = isAuthorized;
        });

        it(`returns ${expected.toString()}`, () => {
          const actual = settings.isAuthorized();

          expect(actual).toEqual(expected);
        });
      });
    });
  });

  describe('calling updateSettings', () => {
    describe('with settings param containing isProd', () => {
      const newSettings = { isProd: true };

      it('sets isProd from param', () => {
        settings.updateSettings(newSettings);

        expect(settings.isProd).toEqual(newSettings.isProd);
      });
    });

    describe('with settings param containing isRemote', () => {
      const newSettings = { isRemote: true };

      it('sets isRemote from param', () => {
        settings.updateSettings(newSettings);

        expect(settings.isRemote).toEqual(newSettings.isRemote);
      });
    });

    describe('with settings param containing logLevel', () => {
      const newSettings = { logLevel: 'logLevelNew' };

      it('sets logLevel from param', () => {
        settings.updateSettings(newSettings);

        expect(settings.logLevel).toEqual(newSettings.logLevel);
      });
    });

    describe('with settings param containing rootPath', () => {
      const newSettings = { rootPath: 'rootPathNew' };

      it('sets rootPath from param', () => {
        settings.updateSettings(newSettings);

        expect(settings.rootPath).toEqual(newSettings.rootPath);
      });
    });

    describe('with settings param containing token', () => {
      const newSettings = { token: 'tokenNew' };

      it('sets token from param', () => {
        settings.updateSettings(newSettings);

        expect(settings.token).toEqual(newSettings.token);
      });

      it('sets env var REACT_APP_TOKEN from param', () => {
        settings.updateSettings(newSettings);

        expect(window.__RUNTIME_CONFIG__.REACT_APP_TOKEN).toEqual(newSettings.token);
      });
    });

    describe('with settings param containing auth object', () => {
      const newSettings = { auth: { isAuthorized: true, authorizedDateTime: 1234 } };

      it('sets auth from param', () => {
        settings.updateSettings(newSettings);

        expect(settings.auth).toEqual(newSettings.auth);
      });
    });

    describe('with settings param containing getTokenAsync', () => {
      const newSettings = { getTokenAsync: jest.fn() };

      it('sets getTokenAsync from param', () => {
        settings.updateSettings(newSettings);

        expect(settings.getTokenAsync).toEqual(newSettings.getTokenAsync);
      });
    });

    describe('with persist param = false', () => {
      const newSettings = { token: 'tokenNew' };
      const persist = false;

      it('does not call localStorage.setItem', () => {
        settings.updateSettings(newSettings, persist);

        expect(storageSetItemSpy).not.toHaveBeenCalled();
      });
    });

    describe('with persist param = true', () => {
      const newSettings = { token: 'tokenNew' };
      const settingsStringify = `{"token":"${newSettings.token}"}`;
      const persist = true;

      it('calls localStorage.setItem', () => {
        settings.updateSettings(newSettings, persist);

        expect(storageSetItemSpy).toHaveBeenCalledWith('microfrontend-template-settings', settingsStringify);
      });
    });
  });
});
