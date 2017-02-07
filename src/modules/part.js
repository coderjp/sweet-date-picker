import moment from 'moment';
import render from './render';
import PushHoldEvent from './push-hold-event';
import formatLookup from './formats';

export default class Part {

    constructor(picker, format) {

        this.picker = picker;

        this.listeners = new Map();

        this.rendered = false;

        this.elements = {};

        this.part = formatLookup(format);

        if (! this.part) {
            throw 'Sweet Date Picker: Unsupported format "' + format + '"';
        }

    }

    setSteps(steps) {
        this.part.step = steps;
    }

    get value() {
        return {
            display: this.picker._dateMoment.format(this.part.format),
            numeric: parseInt(this.picker._dateMoment[this.part.method]() + this.part.modifier)
        };
    }

    set value(value) {

        value -= this.part.modifier;

        // Round value to closest step
        value = Math.round(value / this.part.step) * this.part.step;

        const newDate = moment(this.picker._dateMoment)[this.part.method](value);

        if (this.picker.settings.maxDate && this.picker.settings.maxDate < newDate) {
            return;
        }

        this.emit('update', newDate);

        this.update();

    }

    focus() {
        this.elements.metric.focus();
    }

    render() {

        this.rendered = true;

        const element = render('div.sdp-date-segment-col');
        const segment = render('div.sdp-date-segment');

        element.appendChild(segment);

        this.elements = {
            up: segment.appendChild(render('button.up')),
            metric: segment.appendChild(render('input.metric')),
            comment: segment.appendChild(render('div.comment')),
            down: segment.appendChild(render('button.down'))
        };

        new PushHoldEvent(this.elements.up, () => {
            this.value = this.value.numeric + this.part.step;
        }, this.picker.settings.holdInterval, this.picker.settings.debounceWait);

        new PushHoldEvent(this.elements.down, () => {
            this.value = this.value.numeric - this.part.step;
        }, this.picker.settings.holdInterval, this.picker.settings.debounceWait);

        if (this.picker.settings.allowInput && this.part.numeric) {

            this.elements.metric.oninput = (e) => {

                if (!this.validate(e.target.value)) {
                    this.emit('validation-failed', e);
                }

                this.emit('input', e);
            };

            this.elements.metric.onfocus = (e) => this.emit('focus', e);

            this.elements.metric.onkeypress = (e) => this.emit('keypress', e);


        } else {

            this.elements.metric.disabled = true;

        }

        this.bindEvents();

        // Initialise the values
        this.update();

        return element;

    }

    // Updates the segment with the appropriate values
    update() {
        if (this.rendered) {
            this.elements.metric.value = this.value.display;
            if (this.part.captionFormat) {
                this.elements.comment.innerText = this.picker._dateMoment.format(this.part.captionFormat);
            } else if (this.part.caption) {
                this.elements.comment.innerText = this.part.caption;
            }
        }
    }

    validate(value) {

        // Only validate if we have enough input to go on
        if (value.length < this.part.inputLength) {
            return true;
        }

        value = parseInt(value) - this.part.modifier;

        let testDate = moment(this.picker._dateMoment)[this.part.method](value);

        return testDate[this.part.method]() === value;

    }

    recalculate() {
        this.value = this.value.numeric;
    }

    bindEvents() {
        let originalInput = this.value.display;

        this.addListener('input', (e) => {
            // Only set the value once the user has entered the whole value
            // otherwise moment may not be able to parse full date
            if (e.target.value.length >= this.part.inputLength) {
                this.value = e.target.value;
                e.target.blur();
            }
        });

        this.addListener('focus', (e) => e.target.select());

        this.addListener('keypress', (e) => {
            let charCode = e.which || e.keyCode;
            originalInput = e.target.value;
            return !(charCode > 31 && (charCode < 48 || charCode > 57));
        });

        this.addListener('validation-failed', (e) => {
            e.target.value = originalInput;

            e.target.classList.add('error');

            setTimeout(() => e.target.classList.remove('error'), 1000);

        });

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