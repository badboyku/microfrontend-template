import { jwtDecode } from 'jwt-decode';
import logger from './logger';
import type { TokenPayLoad } from '@types';

/* region Private helper functions */
const decodeToken = (token: string | undefined): TokenPayLoad => {
  if (!token) {
    throw new Response('Token is missing', { status: 401, statusText: 'Unauthorized' });
  }

  try {
    return jwtDecode(token);
  } catch (e) {
    throw new Response((e as Error).message, { status: 401, statusText: 'Unauthorized' });
  }
};

const validateToken = (decodedToken: TokenPayLoad) => {
  const { exp } = decodedToken;

  if (!exp) {
    throw new Response('Token is invalid', { status: 401, statusText: 'Unauthorized' });
  }
  if (exp * 1000 < new Date().getTime()) {
    throw new Response('Token is expired', { status: 401, statusText: 'Unauthorized' });
  }

  return true;
};
/* endregion */

const authorizeToken = (token: string | undefined) => {
  logger.debug('microfrontend-template: utils/authorization authorizeToken called', { token });
  const isTokenValid = validateToken(decodeToken(token));

  return { isAuthorized: isTokenValid };
};

export default { authorizeToken };
