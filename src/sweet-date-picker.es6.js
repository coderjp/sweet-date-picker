'use strict';

import defaults from './modules/defaults';
import render from './modules/render';
import Backdrop from './modules/backdrop';
import Part from './modules/part';
import Modal from './modules/modal';

import { isTouch } from './modules/helpers';

let sweetDatePickers = [];

export default class SweetDatePicker {

    constructor(input, config) {

        sweetDatePickers.push(this);

        this.settings = Object.assign({}, defaults, config);

        this.listeners = new Map();

        // Stop people on touch devices accidentally clicking a number
        // instead of the arrow
        if (isTouch()) {
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

        this.input.onclick = (e) => {
            this.show();
            e.target.blur();
        };

    }

    // Get the raw value from the input
    getValue() {

        if (this.input.getAttribute('data-value')) {
            return this.input.getAttribute('data-value')
        }

        if (this.input.value.length > 0) {
            return this.value;
        }

    }

    assign(value) {
        if (value instanceof moment) {
            this._dateMoment = value;
        } else {
            this._dateMoment = moment(value, this.settings.submitFormat);
        }
    }

    initializeDate() {

        const rawValue = this.getValue();

        this.assign(rawValue || this.settings.defaultDate || this.input.getAttribute('data-value'));

        if (!this._dateMoment || !this._dateMoment.isValid()) {
            this.assign(this.settings.defaultDate);
        }

        // We need the parts so we can round the date to the appropriate amount of steps
        this.createParts();

        for (const part of this.parts) {
            part.recalculate();
        }
    }

    constrainMax() {
        if (this.settings.maxDate && this.settings.maxDate < this._dateMoment) {
            this._dateMoment = this.settings.maxDate;
        }
    }

    show() {

        if (!this.initialized) {
            this.initializeModal();
        }

        Backdrop.show();
        this.modal.show();

    }

    initializeModal() {

        this.modal = new Modal({showClear: this.settings.showClear});

        this.modal.addListener('clear', () => this.clear());
        this.modal.addListener('set', () => this.set());

        this.modal.render();

        for (const part of this.parts) {
            this.modal.addPart(part);
        }

    }

    createParts() {
        const formatParts = this.settings.format.split(' ');

        for (let format of formatParts) {

            let part = new Part(this, format);

            this.parts.push(part);

            let index = this.parts.length - 1;

            if (this.settings.steps[format]) {
                part.setSteps(this.settings.steps[format]);
            }

            part.addListener('input', (e) => {
                if (this.settings.tabFill && e.target.value.length == part.part.inputLength && index < formatParts.length) {
                    this.nextPart();
                }
            });

            part.addListener('focus', () => this.activePart = index);

            part.addListener('update', (date) => {
                this._dateMoment = date;

                // Trigger all the parts to update their UI
                for (let part of this.parts) {
                    part.update();
                }

            });

        }
    }

    initializeForm() {
        this.submitInput = render('input');
        this.submitInput.setAttribute('type', 'hidden');
        this.submitInput.setAttribute('name', this.input.getAttribute('name'));
        this.input.parentNode.appendChild(this.submitInput);
        this.input.removeAttribute('name');
    }

    nextPart() {
        let next = this.activePart + 1;

        if (next >= this.parts.length) {
            return false;
        }

        this.parts[next].focus();
    }

    set() {
        this.updateForm();
        this.constructor.hide();
        this.emit('set', this);
    }

    updateForm() {
        this.input.value = this._dateMoment.format(this.settings.displayFormat);
        this.submitInput.value = this._dateMoment.format(this.settings.submitFormat);
    }

    clear() {
        this.input.value = '';
        this.submitInput.value = '';
        this.constructor.hide();
        this.emit('clear', this);
    }

    static hide() {

        for (let picker of sweetDatePickers) {
            if (picker.modal) {
                picker.modal.hide();
            }
        }

        Backdrop.hide();
    }

    /*
     Events
     This would ideally be a trait, however traits are not a thing in ES6.
     Roll on ES7
     */

    addListener(label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push(callback);
    }

    emit(label, ...args) {
        let listeners = this.listeners.get(label);

        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener(...args);
            });
            return true;
        }
        return false;
    }

}

if (typeof window !== 'undefined') {
window.SweetDatePicker = SweetDatePicker;

    window.sdp = (input, config) => {
        return new SweetDatePicker(input, config)
    };

} else {
alert('Sweet Date Picker is a frontend module and requires the window var.')
}