'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Time = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _TimeDropdown = require('./TimeDropdown');

var _TimeDropdown2 = _interopRequireDefault(_TimeDropdown);

var _data = require('../helpers/data');

var _animations = require('../helpers/animations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Time = exports.Time = function (_React$Component) {
	_inherits(Time, _React$Component);

	function Time(props) {
		_classCallCheck(this, Time);

		var _this = _possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this, props));

		_this.state = {};

		_this.toggleMeridiem = _this.toggleMeridiem.bind(_this);
		_this.hourClick = _this.hourClick.bind(_this);
		_this.minuteClick = _this.minuteClick.bind(_this);
		_this.closeHourSelect = _this.closeHourSelect.bind(_this);
		_this.closeMinuteSelect = _this.closeMinuteSelect.bind(_this);
		return _this;
	}

	_createClass(Time, [{
		key: 'toggleMeridiem',
		value: function toggleMeridiem() {
			if (this.props.meridiem === 'am') {
				this.props.changeMeridiem('pm');
			} else {
				this.props.changeMeridiem('am');
			}
		}
	}, {
		key: 'hourClick',
		value: function hourClick() {
			if (this.props.unit !== 'hour') {
				this.props.changeUnit('hour');
			} else {
				this.setState({ showHourSelect: !this.state.showHourSelect });
			}
		}
	}, {
		key: 'closeHourSelect',
		value: function closeHourSelect() {
			this.setState({ showHourSelect: false });
		}
	}, {
		key: 'minuteClick',
		value: function minuteClick() {
			if (this.props.unit !== 'minute') {
				this.props.changeUnit('minute');
			} else {
				this.setState({ showMinuteSelect: !this.state.showMinuteSelect });
			}
		}
	}, {
		key: 'closeMinuteSelect',
		value: function closeMinuteSelect() {
			this.setState({ showMinuteSelect: false });
		}
	}, {
		key: 'render',
		value: function render() {
			var props = this.props;
			var config = props.config;
			var styles = {
				wrapper: {
					background: config.TIME_BACKGROUND,
					padding: '14px 16px',
					borderRadius: '3px 3px 0 0'
				},
				timeWrapper: {
					left: 20,
					position: 'relative'
				},
				colon: {
					color: config.TIME_DEFAULT_COLOR,
					fontWeight: '500',
					display: 'inline-block',
					fontSize: '46px',
					verticalAlign: '2px',
					margin: '0 5px',
					lineHeight: 'normal'
				},
				time: {
					color: config.TIME_DEFAULT_COLOR,
					display: 'inline-block',
					fontSize: '48px',
					cursor: 'pointer',
					userSelect: 'none',
					lineHeight: 'normal'
				},
				'timeSelected': {
					color: config.TIME_SELECTED_COLOR,
					animation: 'x 0.6s ease-out both',
					animationName: _animations.popInOut
				},
				hourWrapper: {
					width: '72px',
					textAlign: 'right',
					position: 'relative',
					display: 'inline-block'
				},
				minuteWrapper: {
					position: 'relative',
					display: 'inline-block'
				},
				meridiem: {
					color: config.TIME_DEFAULT_COLOR,
					display: 'inline-block',
					fontSize: '13px',
					textTransform: 'uppercase',
					marginLeft: '2px',
					padding: '10px 8px',
					verticalAlign: '1px',
					fontFamily: config.FONT_FAMILY
				}
			};

			var formattedMinute = ('0' + props.minute).slice(-2);

			return _react2.default.createElement(
				'div',
				{ style: styles.wrapper },
				_react2.default.createElement(
					'div',
					{ style: styles.timeWrapper },
					_react2.default.createElement(
						'div',
						{ style: styles.hourWrapper },
						_react2.default.createElement(
							'span',
							{
								className: 'react-timekeeper__hour-select',
								style: [styles.time, props.unit === 'hour' && styles.timeSelected],
								onClick: this.hourClick
							},
							props.hour
						),
						this.state.showHourSelect ? _react2.default.createElement(_TimeDropdown2.default, {
							config: props.config,
							type: 'hour',
							updateVal: props.changeHour,
							val: props.hour,
							options: _data.CLOCK_DATA[props.unit].dropdownOptions,
							close: this.closeHourSelect
						}) : ''
					),
					_react2.default.createElement(
						'span',
						{ style: styles.colon },
						':'
					),
					_react2.default.createElement(
						'div',
						{ style: styles.minuteWrapper },
						_react2.default.createElement(
							'span',
							{
								className: 'react-timekeeper__minute-select',
								style: [styles.time, props.unit === 'minute' && styles.timeSelected],
								onClick: this.minuteClick
							},
							formattedMinute
						),
						this.state.showMinuteSelect ? _react2.default.createElement(_TimeDropdown2.default, {
							config: props.config,
							type: 'minute',
							updateVal: props.changeMinute,
							val: props.minute,
							options: _data.CLOCK_DATA[props.unit].dropdownOptions,
							close: this.closeMinuteSelect
						}) : ''
					),
					_react2.default.createElement(
						'button',
						{
							type: 'button',
							onClick: this.toggleMeridiem,
							style: styles.meridiem,
							className: 'react-timekeeper-button-reset react-timekeeper__meridiem-toggle'
						},
						props.meridiem
					)
				)
			);
		}
	}]);

	return Time;
}(_react2.default.Component);

Time.propTypes = {
	config: _propTypes2.default.object.isRequired,
	unit: _propTypes2.default.string.isRequired,
	meridiem: _propTypes2.default.string.isRequired,

	changeUnit: _propTypes2.default.func.isRequired,
	changeMeridiem: _propTypes2.default.func.isRequired
};

exports.default = (0, _radium2.default)(Time);