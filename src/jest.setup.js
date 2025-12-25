/* istanbul ignore file */
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.fetch = require('jest-fetch-mock');
global.React = require('react');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
