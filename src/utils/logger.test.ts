/* eslint-disable no-console, testing-library/no-debugging-utils */
import settings from 'utils/settings';
import logger from './logger';

jest.mock('utils/settings');

describe('Util logger', () => {
  const message = 'message';
  const context = { foo: 'bar' };
  const logLevelBackup = settings.logLevel;

  beforeEach(() => {
    jest.spyOn(console, 'debug').mockImplementationOnce(() => {
      // Do nothing.
    });
    jest.spyOn(console, 'info').mockImplementationOnce(() => {
      // Do nothing.
    });
    jest.spyOn(console, 'warn').mockImplementationOnce(() => {
      // Do nothing.
    });
    jest.spyOn(console, 'error').mockImplementationOnce(() => {
      // Do nothing.
    });
  });

  describe('calling function debug', () => {
    beforeEach(() => {
      settings.logLevel = 'DEBUG';
    });

    afterAll(() => {
      settings.logLevel = logLevelBackup;
    });

    describe('successfully', () => {
      it('calls console.debug with message', () => {
        logger.debug(message);

        expect(console.debug).toHaveBeenCalledWith(message);
      });
    });

    describe('with param context', () => {
      it('calls console.debug with message and context', () => {
        logger.debug(message, context);

        expect(console.debug).toHaveBeenCalledWith(message, context);
      });
    });

    describe('with logLevel higher than DEBUG', () => {
      beforeEach(() => {
        settings.logLevel = 'ERROR';
      });

      afterAll(() => {
        settings.logLevel = logLevelBackup;
      });

      it('does not call console.debug', () => {
        logger.debug(message);

        expect(console.debug).not.toHaveBeenCalled();
      });
    });
  });

  describe('calling function info', () => {
    beforeEach(() => {
      settings.logLevel = 'INFO';
    });

    afterAll(() => {
      settings.logLevel = logLevelBackup;
    });

    describe('successfully', () => {
      it('calls console.info with message', () => {
        logger.info(message);

        expect(console.info).toHaveBeenCalledWith(message);
      });
    });

    describe('with param context', () => {
      it('calls console.info with message and context', () => {
        logger.info(message, context);

        expect(console.info).toHaveBeenCalledWith(message, context);
      });
    });

    describe('with logLevel higher than INFO', () => {
      beforeEach(() => {
        settings.logLevel = 'ERROR';
      });

      afterAll(() => {
        settings.logLevel = logLevelBackup;
      });

      it('does not call console.info', () => {
        logger.info(message);

        expect(console.info).not.toHaveBeenCalled();
      });
    });
  });

  describe('calling function warn', () => {
    beforeEach(() => {
      settings.logLevel = 'WARN';
    });

    afterAll(() => {
      settings.logLevel = logLevelBackup;
    });

    describe('successfully', () => {
      it('calls console.warn with message', () => {
        logger.warn(message);

        expect(console.warn).toHaveBeenCalledWith(message);
      });
    });

    describe('with param context', () => {
      it('calls console.warn with message and context', () => {
        logger.warn(message, context);

        expect(console.warn).toHaveBeenCalledWith(message, context);
      });
    });

    describe('with logLevel higher than WARN', () => {
      beforeEach(() => {
        settings.logLevel = 'ERROR';
      });

      afterAll(() => {
        settings.logLevel = logLevelBackup;
      });

      it('does not call console.warn', () => {
        logger.warn(message);

        expect(console.warn).not.toHaveBeenCalled();
      });
    });
  });

  describe('calling function error', () => {
    beforeEach(() => {
      settings.logLevel = 'ERROR';
    });

    afterAll(() => {
      settings.logLevel = logLevelBackup;
    });

    describe('successfully', () => {
      it('calls console.error with message', () => {
        logger.error(message);

        expect(console.error).toHaveBeenCalledWith(message);
      });
    });

    describe('with param context', () => {
      it('calls console.error with message and context', () => {
        logger.error(message, context);

        expect(console.error).toHaveBeenCalledWith(message, context);
      });
    });
  });
});
