'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modal = function () {
    function Modal(settings) {
        var _this = this;

        _classCallCheck(this, Modal);

        this.settings = settings;

        this.listeners = new Map();

        this.modal = (0, _render2.default)('div.sdp-modal.hide');

        if ((0, _helpers.isTouch)()) {
            this.modal.classList.add('touch');
        }

        var closeBtn = (0, _render2.default)('button.close');
        closeBtn.onclick = function () {
            return SweetDatePicker.hide();
        };

        this.modal.appendChild(closeBtn);

        this.container = (0, _render2.default)('div.sdp-container');

        this.modal.appendChild(this.container);

        // Actions
        var actionContainer = (0, _render2.default)('div.sdp-actions');
        var clearBtnWrapper = (0, _render2.default)('div.sdp-btn-wrapper');
        var clearBtn = (0, _render2.default)('button.sdp-clear');
        var setBtnWrapper = (0, _render2.default)('div.sdp-btn-wrapper');
        var setBtn = (0, _render2.default)('button.sdp-set');

        clearBtnWrapper.appendChild(clearBtn);
        setBtnWrapper.appendChild(setBtn);

        clearBtn.innerText = 'Clear';

        setBtn.innerText = 'Set';

        if (this.settings.showClear) {
            actionContainer.appendChild(clearBtnWrapper);
            clearBtn.onclick = function () {
                return _this.emit('clear');
            };
        }

        actionContainer.appendChild(setBtnWrapper);

        setBtn.onclick = function () {
            return _this.emit('set');
        };

        this.modal.appendChild(actionContainer);
    }

    _createClass(Modal, [{
        key: 'render',
        value: function render() {
            document.querySelector('body').appendChild(this.modal);
        }
    }, {
        key: 'addPart',
        value: function addPart(part) {
            this.container.appendChild(part.render());
        }
    }, {
        key: 'show',
        value: function show() {
            this.modal.classList.remove('hide');
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.modal.classList.add('hide');
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
    }]);

    return Modal;
}();

exports.default = Modal;
module.exports = exports['default'];