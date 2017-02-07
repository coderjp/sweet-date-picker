'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _render2 = require('./render');

var _render3 = _interopRequireDefault(_render2);

var _pushHoldEvent = require('./push-hold-event');

var _pushHoldEvent2 = _interopRequireDefault(_pushHoldEvent);

var _formats = require('./formats');

var _formats2 = _interopRequireDefault(_formats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Part = function () {
    function Part(picker, format) {
        _classCallCheck(this, Part);

        this.picker = picker;

        this.listeners = new Map();

        this.rendered = false;

        this.elements = {};

        this.part = (0, _formats2.default)(format);

        if (!this.part) {
            throw 'Sweet Date Picker: Unsupported format "' + format + '"';
        }
    }

    _createClass(Part, [{
        key: 'setSteps',
        value: function setSteps(steps) {
            this.part.step = steps;
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.elements.metric.focus();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            this.rendered = true;

            var element = (0, _render3.default)('div.sdp-date-segment-col');
            var segment = (0, _render3.default)('div.sdp-date-segment');

            element.appendChild(segment);

            this.elements = {
                up: segment.appendChild((0, _render3.default)('button.up')),
                metric: segment.appendChild((0, _render3.default)('input.metric')),
                comment: segment.appendChild((0, _render3.default)('div.comment')),
                down: segment.appendChild((0, _render3.default)('button.down'))
            };

            new _pushHoldEvent2.default(this.elements.up, function () {
                _this.value = _this.value.numeric + _this.part.step;
            }, this.picker.settings.holdInterval, this.picker.settings.debounceWait);

            new _pushHoldEvent2.default(this.elements.down, function () {
                _this.value = _this.value.numeric - _this.part.step;
            }, this.picker.settings.holdInterval, this.picker.settings.debounceWait);

            if (this.picker.settings.allowInput && this.part.numeric) {

                this.elements.metric.oninput = function (e) {

                    if (!_this.validate(e.target.value)) {
                        _this.emit('validation-failed', e);
                    }

                    _this.emit('input', e);
                };

                this.elements.metric.onfocus = function (e) {
                    return _this.emit('focus', e);
                };

                this.elements.metric.onkeypress = function (e) {
                    return _this.emit('keypress', e);
                };
            } else {

                this.elements.metric.disabled = true;
            }

            this.bindEvents();

            // Initialise the values
            this.update();

            return element;
        }

        // Updates the segment with the appropriate values

    }, {
        key: 'update',
        value: function update() {
            if (this.rendered) {
                this.elements.metric.value = this.value.display;
                if (this.part.captionFormat) {
                    this.elements.comment.innerText = this.picker._dateMoment.format(this.part.captionFormat);
                } else if (this.part.caption) {
                    this.elements.comment.innerText = this.part.caption;
                }
            }
        }
    }, {
        key: 'validate',
        value: function validate(value) {

            // Only validate if we have enough input to go on
            if (value.length < this.part.inputLength) {
                return true;
            }

            value = parseInt(value) - this.part.modifier;

            var testDate = (0, _moment2.default)(this.picker._dateMoment)[this.part.method](value);

            return testDate[this.part.method]() === value;
        }
    }, {
        key: 'recalculate',
        value: function recalculate() {
            this.value = this.value.numeric;
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var _this2 = this;

            var originalInput = this.value.display;

            this.addListener('input', function (e) {
                // Only set the value once the user has entered the whole value
                // otherwise moment may not be able to parse full date
                if (e.target.value.length >= _this2.part.inputLength) {
                    _this2.value = e.target.value;
                    e.target.blur();
                }
            });

            this.addListener('focus', function (e) {
                return e.target.select();
            });

            this.addListener('keypress', function (e) {
                var charCode = e.which || e.keyCode;
                originalInput = e.target.value;
                return !(charCode > 31 && (charCode < 48 || charCode > 57));
            });

            this.addListener('validation-failed', function (e) {
                e.target.value = originalInput;

                e.target.classList.add('error');

                setTimeout(function () {
                    return e.target.classList.remove('error');
                }, 1000);
            });
        }

        /*
         Events
         This would ideally be a trait, however traits are not a thing in ES6.
         Roll on ES7
         */

    }, {
        key: 'addListener',
        value: function addListener(label, callback) {
            this.listeners.has(label) || this.listeners.set(label, []);
            this.listeners.get(label).push(callback);
        }
    }, {
        key: 'emit',
        value: function emit(label) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var listeners = this.listeners.get(label);

            if (listeners && listeners.length) {
                listeners.forEach(function (listener) {
                    listener.apply(undefined, args);
                });
                return true;
            }
            return false;
        }
    }, {
        key: 'value',
        get: function get() {
            return {
                display: this.picker._dateMoment.format(this.part.format),
                numeric: parseInt(this.picker._dateMoment[this.part.method]() + this.part.modifier)
            };
        },
        set: function set(value) {

            value -= this.part.modifier;

            // Round value to closest step
            value = Math.round(value / this.part.step) * this.part.step;

            var newDate = (0, _moment2.default)(this.picker._dateMoment)[this.part.method](value);

            if (this.picker.settings.maxDate && this.picker.settings.maxDate < newDate) {
                return;
            }

            this.emit('update', newDate);

            this.update();
        }
    }]);

    return Part;
}();

exports.default = Part;
module.exports = exports['default'];