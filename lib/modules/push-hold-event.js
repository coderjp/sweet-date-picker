'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PushHoldEvent = function () {
    function PushHoldEvent(target, callback, holdInterval, debounceWait) {
        var _this = this;

        _classCallCheck(this, PushHoldEvent);

        this.target = target;

        this.callback = callback;

        this.interval = holdInterval;

        this.debounce = debounceWait;

        this._executed = false;

        this._intervalTimer = null;

        this._timer = null;

        var startEvents = (0, _helpers.supportsTouch)() ? ['ontouchstart', 'onmousedown'] : ['onmousedown'];
        this._bindEvent(this.target, startEvents, function (e) {
            _this._mouseDown(e);
        });

        var endEvents = (0, _helpers.supportsTouch)() ? ['ontouchend', 'onmouseup'] : ['onmouseup'];
        this._bindEvent(this.target, endEvents, function (e) {
            _this._mouseUp(e);
        });
    }

    _createClass(PushHoldEvent, [{
        key: '_mouseDown',
        value: function _mouseDown(e) {
            var _this2 = this;

            // Only fire 1 event
            e.preventDefault();

            this._timer = setTimeout(function () {

                _this2._executed = true;

                _this2._intervalTimer = setInterval(function () {
                    _this2.callback();
                }, _this2.interval);
            }, this.debounce);
        }
    }, {
        key: '_mouseUp',
        value: function _mouseUp(e) {

            // Only fire 1 event
            e.preventDefault();

            this._clear();

            if (!this._executed) {
                // Simulate click as we steal the event
                this.callback();
            }

            this._executed = false;
        }
    }, {
        key: '_clear',
        value: function _clear() {
            if (this._timer !== null) {
                clearTimeout(this._timer);
                this._timer = null;
            }
            if (this._intervalTimer !== null) {
                clearTimeout(this._intervalTimer);
                this._intervalTimer = null;
            }
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent(element, events, callback) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var event = _step.value;

                    element[event] = function (e) {
                        callback(e);
                    };
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
    }]);

    return PushHoldEvent;
}();

exports.default = PushHoldEvent;
module.exports = exports['default'];