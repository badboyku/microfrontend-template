/* eslint-disable no-console */
import { LOG_LEVELS, LOG_LEVELS_NUM } from 'utils/constants';
import settings from 'utils/settings';
import type { LogContext, Logger } from '@types';

const { DEBUG, INFO, WARN, ERROR } = LOG_LEVELS;
const { DEBUG: DEBUG_NUM, INFO: INFO_NUM, WARN: WARN_NUM, ERROR: ERROR_NUM } = LOG_LEVELS_NUM;

/* region Private helper functions */
const getSeverityNum = (severity: string): number => {
  switch (severity) {
    case DEBUG:
      return DEBUG_NUM;
    case INFO:
      return INFO_NUM;
    case WARN:
      return WARN_NUM;
    case ERROR:
    default:
      return ERROR_NUM;
  }
};

const skipLog = (severity: string) => getSeverityNum(severity) < getSeverityNum(settings.logLevel);
/* endregion */

const logger: Logger = {
  debug: (message: string, context?: LogContext) => {
    if (skipLog(DEBUG)) {
      return;
    }

    if (context) {
      console.debug(message, context);
    } else {
      console.debug(message);
    }
  },

  info: (message: string, context?: LogContext) => {
    if (skipLog(INFO)) {
      return;
    }

    if (context) {
      console.info(message, context);
    } else {
      console.info(message);
    }
  },

  warn: (message: string, context?: LogContext) => {
    if (skipLog(WARN)) {
      return;
    }

    if (context) {
      console.warn(message, context);
    } else {
      console.warn(message);
    }
  },

  error: (message: string, context?: LogContext) => {
    if (context) {
      console.error(message, context);
    } else {
      console.error(message);
    }
  },
};

export default logger;
