import render from './render';
import PushHoldEvent from './push-hold-event';

export default class Part {

    constructor(picker, format) {

        this.picker = picker;

        this.listeners = new Map();

        const table = {
            'YYYY': {unit: 'year', inputLength: 4},
            'YY': {unit: 'year', inputLength: 2},
            'M': {unit: 'month', captionFormat: 'MMMM', inputLength: 2, modifier: 1},
            'MM': {unit: 'month', captionFormat: 'MMMM', inputLength: 2, modifier: 1},
            'MMM': {unit: 'month', inputLength: 3, numeric: false, modifier: 1},
            'MMMM': {unit: 'month', inputLength: 8, numeric: false, modifier: 1},
            'D': {unit: 'day', captionFormat: 'dddd', inputLength: 2, method: 'date'},
            'DD': {unit: 'day', captionFormat: 'dddd', inputLength: 2, method: 'date'},
            'DDD': {unit: 'day', inputLength: 3, numeric: false, method: 'date'},
            'DDDD': {unit: 'day', inputLength: 9, numeric: false, method: 'date'},
            'H': {unit: 'hour', caption: 'Hours', inputLength: 2},
            'HH': {unit: 'hour', caption: 'Hours', inputLength: 2},
            'h': {unit: 'hour', caption: 'Hours', inputLength: 2},
            'hh': {unit: 'hour', caption: 'Hours', inputLength: 2},
            'm': {unit: 'minute', caption: 'Minutes', inputLength: 2},
            'mm': {unit: 'minute', caption: 'Minutes', inputLength: 2},
            's': {unit: 'second', caption: 'Seconds', inputLength: 2},
            'ss': {unit: 'second', caption: 'Seconds', inputLength: 2}
        };

        const defaults = {
            caption: null,
            captionFormat: null,
            numeric: true,
            modifier: 0,
            el: null,
            step: 1,
            inputLength: null,
            format: format
        };

        const lookup = table[format] || null;

        if (!lookup) {
            throw 'Sweet Date Picker: Unsupported format "' + format + '"';
        }

        this.part = Object.assign({}, defaults, lookup);

        this.elements = {};

        if (!this.part.method) this.part.method = this.part.unit;

    }

    setPosition(position) {
        this.position = position;
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

        const newDate = moment(this.picker._dateMoment)[this.part.method](value);

        if (this.picker.settings.maxDate && this.picker.settings.maxDate < newDate) {
            return;
        }

        this.emit('update', newDate);

        //this.picker._dateMoment = newDate;
        this.update();

    }

    focus() {
        console.log('focus', this.elements.metric);
        this.elements.metric.focus();
    }

    render() {

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

        // TODO, picker send part settings over to part class rather than me referencing them up the tree here.

        if (this.picker.settings.allowInput && this.part.numeric) {

            this.elements.metric.oninput = (e) => {

                if (!this.validate(e.target.value)) {
                    this.emit('validation-failed', e)
                }
                ;

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
        this.elements.metric.value = this.value.display;
        if (this.part.captionFormat) {
            this.elements.comment.innerText = this.picker._dateMoment.format(this.part.captionFormat);
        } else if (this.part.caption) {
            this.elements.comment.innerText = this.part.caption;
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