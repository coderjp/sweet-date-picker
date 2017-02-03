'use strict';

import defaults from './modules/defaults';
import render from './modules/render';
import Backdrop from './modules/backdrop';
import Part from './modules/part';

import { isTouch } from './modules/helpers';

let sweetDatePickers = [];

export default class SweetDatePicker {

    constructor(input, config) {

        sweetDatePickers.push(this);

        this.settings = Object.assign({}, config, defaults);

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

        console.log(rawValue, this.settings.defaultDate, this.input.getAttribute('data-value'));

        this.assign(rawValue || this.settings.defaultDate || this.input.getAttribute('data-value'));

        if (!this._dateMoment || !this._dateMoment.isValid()) {
            this.assign(this.settings.defaultDate);
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
        this.modal.classList.remove('hide');

    }

    initializeModal() {

        this.buildModal();

        // Create the parts
        const formatParts = this.settings.format.split(' ');

        for (let format of formatParts) {

            let part = new Part(this, format);

            this.parts.push(part);

            let index = this.parts.length - 1;

            part.setPosition(index);

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

            // TODO - don't like need ref to container
            this.modal.querySelector('.sdp-container').appendChild(part.render())

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

    buildModal() {

        this.modal = render('div.sdp-modal.hide');
        if (isTouch()) {
            this.modal.classList.add('touch');
        }

        let closeBtn = render('button.close');
        closeBtn.onclick = () => this.constructor.hide();
        this.modal.appendChild(closeBtn);

        let container = render('div.sdp-container');

        this.modal.appendChild(container);

        // Actions
        let actionContainer = render('div.sdp-actions');
        let clearBtnWrapper = render('div.sdp-btn-wrapper');
        let clearBtn = render('button.sdp-clear');
        let setBtnWrapper = render('div.sdp-btn-wrapper');
        let setBtn = render('button.sdp-set');

        clearBtnWrapper.appendChild(clearBtn);
        setBtnWrapper.appendChild(setBtn);

        clearBtn.innerText = 'Clear';

        setBtn.innerText = 'Set';

        if (this.settings.showClear) {
            actionContainer.appendChild(clearBtnWrapper);
            clearBtn.onclick = () => this.clear();
        }

        actionContainer.appendChild(setBtnWrapper);

        setBtn.onclick = () => {
            this.updateForm();
            this.constructor.hide();
        };

        this.modal.appendChild(actionContainer);

        document.querySelector('body').appendChild(this.modal);

    }

    set() {

    }

    updateForm() {
        this.input.value = this._dateMoment.format(this.settings.displayFormat);
        this.submitInput.value = this._dateMoment.format(this.settings.submitFormat);
    }

    clear() {
        this.input.value = '';
        this.submitInput.value = '';
        this.constructor.hide();
        //TODO - Implement clear event
    }

    static hide() {
        for (let picker of sweetDatePickers) {
            picker.modal.classList.add('hide');
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
window.SweetDatePicker = window.sdp = SweetDatePicker;
} else {
alert('Sweet Date Picker is a frontend module and requires the window var.')
}