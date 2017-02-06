'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaults = require('./modules/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _render = require('./modules/render');

var _render2 = _interopRequireDefault(_render);

var _backdrop = require('./modules/backdrop');

var _backdrop2 = _interopRequireDefault(_backdrop);

var _part2 = require('./modules/part');

var _part3 = _interopRequireDefault(_part2);

var _modal = require('./modules/modal');

var _modal2 = _interopRequireDefault(_modal);

var _helpers = require('./modules/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sweetDatePickers = [];

var SweetDatePicker = function () {
    function SweetDatePicker(input, config) {
        var _this = this;

        _classCallCheck(this, SweetDatePicker);

        sweetDatePickers.push(this);

        this.settings = Object.assign({}, _defaults2.default, config);

        this.listeners = new Map();

        // Stop people on touch devices accidentally clicking a number
        // instead of the arrow
        if ((0, _helpers.isTouch)()) {
            this.settings.allowInput = false;
        }

        this.parts = [];

        this.input = input;

        this.activePart = -1;

        this.initializeDate();

        this.constrainMax();

        this.initializeForm();

        this.updateForm();

        this.initialized = false;

        this.input.onclick = function (e) {
            _this.show();
            e.target.blur();
        };
    }

    // Get the raw value from the input


    _createClass(SweetDatePicker, [{
        key: 'getValue',
        value: function getValue() {

            if (this.input.getAttribute('data-value')) {
                return this.input.getAttribute('data-value');
            }

            if (this.input.value.length > 0) {
                return this.value;
            }
        }
    }, {
        key: 'assign',
        value: function assign(value) {
            if (value instanceof moment) {
                this._dateMoment = value;
            } else {
                this._dateMoment = moment(value, this.settings.submitFormat);
            }
        }
    }, {
        key: 'initializeDate',
        value: function initializeDate() {

            var rawValue = this.getValue();

            this.assign(rawValue || this.settings.defaultDate || this.input.getAttribute('data-value'));

            if (!this._dateMoment || !this._dateMoment.isValid()) {
                this.assign(this.settings.defaultDate);
            }

            // We need the parts so we can round the date to the appropriate amount of steps
            this.createParts();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var part = _step.value;

                    part.recalculate();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'constrainMax',
        value: function constrainMax() {
            if (this.settings.maxDate && this.settings.maxDate < this._dateMoment) {
                this._dateMoment = this.settings.maxDate;
            }
        }
    }, {
        key: 'show',
        value: function show() {

            if (!this.initialized) {
                this.initializeModal();
            }

            _backdrop2.default.show();
            this.modal.show();
        }
    }, {
        key: 'initializeModal',
        value: function initializeModal() {
            var _this2 = this;

            this.modal = new _modal2.default({ showClear: this.settings.showClear });

            this.modal.addListener('clear', function () {
                return _this2.clear();
            });
            this.modal.addListener('set', function () {
                return _this2.set();
            });

            this.modal.render();

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.parts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var part = _step2.value;

                    this.modal.addPart(part);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'createParts',
        value: function createParts() {
            var _this3 = this;

            var formatParts = this.settings.format.split(' ');

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                var _loop = function _loop() {
                    var format = _step3.value;


                    var part = new _part3.default(_this3, format);

                    _this3.parts.push(part);

                    var index = _this3.parts.length - 1;

                    if (_this3.settings.steps[format]) {
                        part.setSteps(_this3.settings.steps[format]);
                    }

                    part.addListener('input', function (e) {
                        if (_this3.settings.tabFill && e.target.value.length == part.part.inputLength && index < formatParts.length) {
                            _this3.nextPart();
                        }
                    });

                    part.addListener('focus', function () {
                        return _this3.activePart = index;
                    });

                    part.addListener('update', function (date) {
                        _this3._dateMoment = date;

                        // Trigger all the parts to update their UI
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = _this3.parts[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var _part = _step4.value;

                                _part.update();
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
                    });
                };

                for (var _iterator3 = formatParts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: 'initializeForm',
        value: function initializeForm() {
            this.submitInput = (0, _render2.default)('input');
            this.submitInput.setAttribute('type', 'hidden');
            this.submitInput.setAttribute('name', this.input.getAttribute('name'));
            this.input.parentNode.appendChild(this.submitInput);
            this.input.removeAttribute('name');
        }
    }, {
        key: 'nextPart',
        value: function nextPart() {
            var next = this.activePart + 1;

            if (next >= this.parts.length) {
                return false;
            }

            this.parts[next].focus();
        }
    }, {
        key: 'set',
        value: function set() {
            this.updateForm();
            this.constructor.hide();
            this.emit('set', this);
        }
    }, {
        key: 'updateForm',
        value: function updateForm() {
            this.input.value = this._dateMoment.format(this.settings.displayFormat);
            this.submitInput.value = this._dateMoment.format(this.settings.submitFormat);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.input.value = '';
            this.submitInput.value = '';
            this.constructor.hide();
            this.emit('clear', this);
        }
    }, {
        key: 'addListener',


        /*
         Events
         This would ideally be a trait, however traits are not a thing in ES6.
         Roll on ES7
         */

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
    }], [{
        key: 'hide',
        value: function hide() {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {

                for (var _iterator5 = sweetDatePickers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var picker = _step5.value;

                    if (picker.modal) {
                        picker.modal.hide();
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            _backdrop2.default.hide();
        }
    }]);

    return SweetDatePicker;
}();

exports.default = SweetDatePicker;


if (typeof window !== 'undefined') {
    window.SweetDatePicker = SweetDatePicker;

    window.sdp = function (input, config) {
        return new SweetDatePicker(input, config);
    };
} else {
    alert('Sweet Date Picker is a frontend module and requires the window var.');
}
module.exports = exports['default'];