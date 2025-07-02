/* istanbul ignore file */
import '@testing-library/jest-dom';

global.fetch = require('jest-fetch-mock');
global.React = require('react');
