'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Backdrop = function () {
    function Backdrop() {
        _classCallCheck(this, Backdrop);
    }

    _createClass(Backdrop, null, [{
        key: 'getElement',
        value: function getElement() {
            return document.getElementsByClassName('sdp-backdrop')[0] || null;
        }
    }, {
        key: 'show',
        value: function show() {
            if (!this.getElement()) {
                this.render();
            } else {
                this.getElement().classList.remove('hide');
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.getElement().classList.add('hide');
        }
    }, {
        key: 'render',
        value: function render() {
            var element = document.createElement('div');
            element.className = 'sdp-backdrop';
            element.onclick = function () {
                return SweetDatePicker.hide();
            };
            document.querySelector('body').appendChild(element);
        }
    }]);

    return Backdrop;
}();

exports.default = Backdrop;
module.exports = exports['default'];