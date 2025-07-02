import authorization from './authorization';
import loaders from './loaders';
import settings from './settings';

jest.mock('./authorization');
jest.mock('./logger');
jest.mock('./settings');

describe('Util loaders', () => {
  const token = 'token';
  const authorizeTokenMock = jest.mocked(authorization.authorizeToken);
  const isAuthorizedMock = jest.mocked(settings.isAuthorized);
  const getTokenAsyncMock = jest.mocked(settings.getTokenAsync);
  const updateSettingsMock = jest.mocked(settings.updateSettings);

  describe('calling appRoot', () => {
    const params = {};
    const authorizeTokenResult = { isAuthorized: true };
    const now = new Date('2023-06-19T07:35:00.000Z');
    const tokenBackup = settings.token;
    const isRemoteBackup = settings.isRemote;
    const authorizedDateTimeBackup = settings.auth.authorizedDateTime;

    beforeEach(() => {
      jest.useFakeTimers({ now });
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    describe('successfully', () => {
      beforeEach(() => {
        settings.token = token;
        authorizeTokenMock.mockReturnValueOnce(authorizeTokenResult);
      });

      afterAll(() => {
        settings.token = tokenBackup;
      });

      it('calls authorization.authorizeToken with token from settings', async () => {
        await loaders.appRoot({ params } as never);

        expect(authorizeTokenMock).toHaveBeenCalledWith(token);
      });

      it('calls settings.updateSettings with token and authorizeToken results', async () => {
        await loaders.appRoot({ params } as never);

        expect(updateSettingsMock).toHaveBeenCalledWith({
          token,
          auth: { isAuthorized: authorizeTokenResult.isAuthorized, authorizedDateTime: 1687160100000 },
        });
      });

      it('returns isAuthorized from authorizeToken results', async () => {
        const { isAuthorized } = (await loaders.appRoot({ params } as never)) as never;

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

      afterAll(() => {
        settings.isRemote = isRemoteBackup;
      });

      it('calls settings.getTokenAsync', async () => {
        await loaders.appRoot({ params } as never);

        expect(getTokenAsyncMock).toHaveBeenCalled();
      });

      it('calls authorization.authorizeToken with token from getTokenAsync', async () => {
        await loaders.appRoot({ params } as never);

        expect(authorizeTokenMock).toHaveBeenCalledWith(remoteToken);
      });

      it('calls settings.updateSettings with token from getTokenAsync and authorizeToken results', async () => {
        await loaders.appRoot({ params } as never);

        expect(updateSettingsMock).toHaveBeenCalledWith({
          token: remoteToken,
          auth: { isAuthorized: authorizeTokenResult.isAuthorized, authorizedDateTime: 1687160100000 },
        });
      });
    });

    describe('with settings.auth.authorizedDateTime more than 30 min ago', () => {
      beforeEach(() => {
        settings.token = token;
        settings.auth.authorizedDateTime = (now.getTime() - 1800001) as never;
        authorizeTokenMock.mockReturnValueOnce(authorizeTokenResult);
      });

      afterAll(() => {
        settings.token = tokenBackup;
        settings.auth.authorizedDateTime = authorizedDateTimeBackup;
      });

      it('calls authUtils.authorize', async () => {
        await loaders.appRoot({ params } as never);

        expect(authorizeTokenMock).toHaveBeenCalledWith(token);
      });
    });

    describe('with settings.isAuthorized = true AND settings.auth.authorizedDateTime less than 30 min ago', () => {
      beforeEach(() => {
        jest.mocked(isAuthorizedMock).mockReturnValueOnce(true);
        settings.auth.authorizedDateTime = (now.getTime() - 1800000) as never;
      });

      afterAll(() => {
        settings.auth.authorizedDateTime = authorizedDateTimeBackup;
      });

      it('does not call authUtils.authorize', async () => {
        await loaders.appRoot({ params } as never);

        expect(authorizeTokenMock).not.toHaveBeenCalled();
      });
    });
  });
});
