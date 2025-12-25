import { jwtDecode } from 'jwt-decode';
import authorization from './authorization';

jest.mock('jwt-decode');
jest.mock('react-router');
jest.mock('utils/logger');
jest.mock('utils/settings');

describe('Util authorization', () => {
  const token = 'token';
  const exp = 1;
  const error = new Error('Foo Bar');
  const jwtDecodeMocked = jest.mocked(jwtDecode);

  describe('authorize', () => {
    describe('successfully', () => {
      const decodedToken = { exp: new Date().getTime() };

      beforeEach(() => {
        jwtDecodeMocked.mockReturnValueOnce(decodedToken);
      });

      it('calls jwtDecode', () => {
        authorization.authorizeToken(token);

        expect(jwtDecodeMocked).toHaveBeenCalledWith(token);
      });

      it('returns isAuthorized = true', () => {
        const result = authorization.authorizeToken(token);

        expect(result).toEqual({ isAuthorized: true });
      });
    });

    describe('with error', () => {
      describe('when decoding token', () => {
        const testCases = [
          { test: 'token is missing', testToken: undefined },
          { test: 'jwtDecode throws error', testToken: token },
        ];
        testCases.forEach(({ test, testToken }) => {
          describe(` and ${test}`, () => {
            it('throws Response with status = 401 and statusText = Unauthorized', () => {
              jwtDecodeMocked.mockImplementation(() => {
                throw error;
              });

              expect(() => {
                authorization.authorizeToken(testToken);
              }).toThrow(expect.objectContaining({ status: 401, statusText: 'Unauthorized' }));
            });
          });
        });
      });

      describe('when validating token', () => {
        const testCases = [
          { test: 'token claims missing exp', decodedToken: {} },
          { test: 'token is expired', decodedToken: { exp } },
        ];
        testCases.forEach(({ test, decodedToken }) => {
          describe(` and ${test}`, () => {
            beforeEach(() => {
              jwtDecodeMocked.mockReturnValueOnce(decodedToken);
            });

            it('throws an error', () => {
              expect(() => {
                authorization.authorizeToken(token);
              }).toThrow(expect.objectContaining({ status: 401, statusText: 'Unauthorized' }));
            });
          });
        });
      });
    });
  });
});
