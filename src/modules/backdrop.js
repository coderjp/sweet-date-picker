export default class Backdrop {

    static getElement() {
        return document.getElementsByClassName('sdp-backdrop')[0] || null;
    }

    static show() {
        if (!this.getElement()) {
            this.render();
        } else {
            this.getElement().classList.remove('hide');
        }
    }

    static hide() {
        this.getElement().classList.add('hide');
    }

    static render() {
        const element = document.createElement('div');
        element.className = 'sdp-backdrop';
        element.onclick = () => SweetDatePicker.hide();
        document.querySelector('body').appendChild(element);
    }

}