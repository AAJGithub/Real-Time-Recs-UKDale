'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fadeIn = exports.popInOut = undefined;

var _radium = require('radium');

var popInOut = exports.popInOut = (0, _radium.keyframes)({
	'from': { transform: 'scale(1)' },
	'30%': { transform: 'scale(0.88)' },
	'60%': { transform: 'scale(1.05)' },
	'to': { transform: 'scale(1)' }
}, 'popInOut');

var fadeIn = exports.fadeIn = (0, _radium.keyframes)({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 }
}, 'fadeIn');