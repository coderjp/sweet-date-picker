import { supportsTouch } from './helpers';

export default class PushHoldEvent {

    constructor(target, callback, holdInterval, debounceWait) {

        this.target = target;

        this.callback = callback;

        this.interval = holdInterval;

        this.debounce = debounceWait;

        this._executed = false;

        this._intervalTimer = null;

        this._timer = null;

        const startEvents = supportsTouch() ? ['ontouchstart', 'onmousedown'] : ['onmousedown'];
        this._bindEvent(this.target, startEvents, (e) => {
            this._mouseDown(e)
        });

        const endEvents = supportsTouch() ? ['ontouchend', 'onmouseup'] : ['onmouseup'];
        this._bindEvent(this.target, endEvents, (e) => {
            this._mouseUp(e)
        });

    }

    _mouseDown(e) {
        // Only fire 1 event
        e.preventDefault();

        this._timer = setTimeout(() => {

            this._executed = true;

            this._intervalTimer = setInterval(() => {
                this.callback();
            }, this.interval);

        }, this.debounce);
    }

    _mouseUp(e) {

        // Only fire 1 event
        e.preventDefault();

        this._clear();

        if (!this._executed) {
            // Simulate click as we steal the event
            this.callback();
        }

        this._executed = false;
    }

    _clear() {
        if (this._timer !== null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
        if (this._intervalTimer !== null) {
            clearTimeout(this._intervalTimer);
            this._intervalTimer = null;
        }
    }

    _bindEvent(element, events, callback) {
        for (let event of events) {
            element[event] = function (e) {
                callback(e);
            }
        }
    }

}