'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ClockWrapper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _Clock = require('./Clock');

var _Clock2 = _interopRequireDefault(_Clock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MERIDIEM_SELECT_SIZE = 38;

var ClockWrapper = exports.ClockWrapper = function (_React$Component) {
	_inherits(ClockWrapper, _React$Component);

	function ClockWrapper() {
		_classCallCheck(this, ClockWrapper);

		return _possibleConstructorReturn(this, (ClockWrapper.__proto__ || Object.getPrototypeOf(ClockWrapper)).apply(this, arguments));
	}

	_createClass(ClockWrapper, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			// force passing clockWrapperEl to child
			this.forceUpdate();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var props = this.props;
			var config = props.config;

			var styles = {
				clockWrapper: {
					textAlign: 'center',
					padding: '18px 0 14px',
					background: config.CLOCK_WRAPPER_BACKGROUND
				},
				meridiemWrapper: {
					textAlign: 'left',
					padding: '0 30px',
					marginTop: '-16px',
					position: 'relative',
					zIndex: 10
				},
				meridiem: {
					background: config.CLOCK_WRAPPER_MERIDIEM_BACKGROUND,
					fontSize: '14px',
					color: config.CLOCK_WRAPPER_MERIDIEM_COLOR,
					display: 'inline-block',
					padding: 0,
					cursor: 'pointer',
					borderRadius: '99px',
					width: MERIDIEM_SELECT_SIZE,
					height: MERIDIEM_SELECT_SIZE,

					textAlign: 'center',
					lineHeight: MERIDIEM_SELECT_SIZE + 'px',
					transition: '0.15s ease-out',
					fontFamily: config.FONT_FAMILY
				},
				meridiemRight: {
					float: 'right'
				},
				meridiemSelected: {
					background: config.CLOCK_WRAPPER_MERIDIEM_BACKGROUND_COLOR_SELECTED,
					color: config.CLOCK_WRAPPER_MERIDIEM_TEXT_COLOR_SELECTED
				}
			};

			return _react2.default.createElement(
				'div',
				{ style: styles.clockWrapper, className: 'react-timekeeper__clock-wrapper', ref: function ref(el) {
						return _this2.clockWrapperEl = el;
					} },
				_react2.default.createElement(_Clock2.default, {
					config: props.config,
					hour: props.hour,
					minute: props.minute,
					unit: props.unit,

					changeHour: props.changeHour,
					changeMinute: props.changeMinute,
					clockWrapperEl: this.clockWrapperEl
				}),
				_react2.default.createElement(
					'div',
					{ style: styles.meridiemWrapper, className: 'react-timekeeper__meridiem-toggle-wrapper' },
					_react2.default.createElement(
						'button',
						{
							type: 'button',
							className: 'react-timekeeper-button-reset react-timekeeper__meridiem-toggle type_am ',
							style: [styles.meridiem, props.meridiem === 'am' && styles.meridiemSelected],
							onClick: function onClick() {
								props.changeMeridiem('am');
							}
						},
						'AM'
					),
					_react2.default.createElement(
						'button',
						{
							type: 'button',
							className: 'react-timekeeper-button-reset react-timekeeper__meridiem-toggle type_pm',
							style: [styles.meridiem, styles.meridiemRight, props.meridiem === 'pm' && styles.meridiemSelected],
							onClick: function onClick() {
								props.changeMeridiem('pm');
							}
						},
						'PM'
					)
				)
			);
		}
	}]);

	return ClockWrapper;
}(_react2.default.Component);

ClockWrapper.propTypes = {
	config: _propTypes2.default.object.isRequired,
	unit: _propTypes2.default.string.isRequired,
	hour: _propTypes2.default.number.isRequired,
	minute: _propTypes2.default.number.isRequired,
	meridiem: _propTypes2.default.string.isRequired,

	changeHour: _propTypes2.default.func.isRequired,
	changeMinute: _propTypes2.default.func.isRequired,
	changeMeridiem: _propTypes2.default.func.isRequired
};

exports.default = (0, _radium2.default)(ClockWrapper);