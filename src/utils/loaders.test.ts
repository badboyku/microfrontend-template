import authorization from 'utils/authorization';
import settings from 'utils/settings';
import loaders from './loaders';

jest.mock('utils/authorization');
jest.mock('utils/logger');
jest.mock('utils/settings');

describe('Util loaders', () => {
  const token = 'token';
  const authorizeTokenMock = jest.mocked(authorization.authorizeToken);
  const isAuthorizedMock = jest.mocked(settings.isAuthorized);
  const getTokenAsyncMock = jest.mocked(settings.getTokenAsync);
  const updateSettingsMock = jest.mocked(settings.updateSettings);

  describe('calling appRoot', () => {
    const authorizeTokenResult = { isAuthorized: true };
    const now = new Date('2023-06-19T07:35:00.000Z');
    const authorizedDateTimeBackup = settings.auth.authorizedDateTime;
    const isRemoteBackup = settings.isRemote;
    const tokenBackup = settings.token;

    beforeEach(() => {
      jest.useFakeTimers({ now });
    });

    afterEach(() => {
      jest.useRealTimers();
      settings.auth.authorizedDateTime = authorizedDateTimeBackup;
      settings.isRemote = isRemoteBackup;
      settings.token = tokenBackup;
    });

    describe('successfully', () => {
      beforeEach(() => {
        settings.token = token;
        authorizeTokenMock.mockReturnValueOnce(authorizeTokenResult);
      });

      it('calls authorization.authorizeToken with token from settings', async () => {
        await loaders.appRoot();

        expect(authorizeTokenMock).toHaveBeenCalledWith(token);
      });

      it('calls settings.updateSettings with token and authorizeToken results', async () => {
        await loaders.appRoot();

        expect(updateSettingsMock).toHaveBeenCalledWith({
          token,
          auth: { isAuthorized: authorizeTokenResult.isAuthorized, authorizedDateTime: 1687160100000 },
        });
      });

      it('returns isAuthorized from authorizeToken results', async () => {
        const { isAuthorized } = (await loaders.appRoot()) as never;

        expect(isAuthorized).toEqual(true);
      });
    });

    describe('with settings.isRemote = true', () => {
      const remoteToken = 'remoteToken';

      beforeEach(() => {
        settings.isRemote = true;
        getTokenAsyncMock.mockResolvedValueOnce(remoteToken as never);
        authorizeTokenMock.mockReturnValueOnce(authorizeTokenResult);
      });

      it('calls settings.getTokenAsync', async () => {
        await loaders.appRoot();

        expect(getTokenAsyncMock).toHaveBeenCalled();
      });

      it('calls authorization.authorizeToken with token from getTokenAsync', async () => {
        await loaders.appRoot();

        expect(authorizeTokenMock).toHaveBeenCalledWith(remoteToken);
      });

      it('calls settings.updateSettings with token from getTokenAsync and authorizeToken results', async () => {
        await loaders.appRoot();

        expect(updateSettingsMock).toHaveBeenCalledWith({
          token: remoteToken,
          auth: { isAuthorized: authorizeTokenResult.isAuthorized, authorizedDateTime: 1687160100000 },
        });
      });
    });

    describe('with settings.auth.authorizedDateTime more than 30 min ago', () => {
      it('calls authUtils.authorize', async () => {
        settings.auth.authorizedDateTime = (now.getTime() - 1800001) as never;
        settings.token = token;
        authorizeTokenMock.mockReturnValueOnce(authorizeTokenResult);

        await loaders.appRoot();

        expect(authorizeTokenMock).toHaveBeenCalledWith(token);
      });
    });

    describe('with settings.isAuthorized = true AND settings.auth.authorizedDateTime less than 30 min ago', () => {
      it('does not call authUtils.authorize', async () => {
        settings.auth.authorizedDateTime = (now.getTime() - 1800000) as never;
        jest.mocked(isAuthorizedMock).mockReturnValueOnce(true);

        await loaders.appRoot();

        expect(authorizeTokenMock).not.toHaveBeenCalled();
      });
    });
  });
});
