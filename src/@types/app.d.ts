declare module '@types' {
  import type { JwtPayload } from 'jwt-decode';

  type AppSettings = {
    auth: Auth;
    getTokenAsync: () => Promise<string | undefined>;
    isProd: boolean;
    isRemote: boolean;
    logLevel: string;
    rootPath: string;
    token: string;
  };
  type Auth = { isAuthorized: boolean; authorizedDateTime?: number };

  type LogContext = Record<string, unknown>;
  type Logger = {
    debug: (message: string, context?: LogContext) => void;
    info: (message: string, context?: LogContext) => void;
    warn: (message: string, context?: LogContext) => void;
    error: (message: string, context?: LogContext) => void;
  };

  type TokenPayLoad = {
    // TODO: Add claims here!
  } & JwtPayload;
}
