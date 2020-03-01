import UI from '../config/ui.config';

class InputAutocomplete {
    constructor(el, arr) {
        this.input = el;
        this.arr = arr;
    }

    get inputEl() {
        return this.input;
    }

    containerTemplate() {
        return `<div class = "autocomplete-items"></div>`;
    }

    createContainer() {
        const template = this.containerTemplate();
        this.input.insertAdjacentHTML('afterEnd', template);
    }

    itemTemplate(item) {
        return `<div class = "autocomplete-item dropdown-item">${item}</div>`;
    }

    getContainer() {
        return document.querySelector('.autocomplete-items');
    }

    createList(arr, container) {

        arr.forEach((item) => {
            const template = this.itemTemplate(item);
            container.insertAdjacentHTML('afterBegin', template);
        });

        container.addEventListener('click', (e) => {
            const el = e.target;
            this.input.value = el.innerHTML;
            container.remove();
        });

    }

      init(arr) {

        const value = this.input.value;
        if (!this.getContainer()) {
            this.createContainer();
        }
        const container = this.getContainer();
        container.innerHTML = '';

        if (value == '') {
            this.createList(arr, container);
        }
        if (value !== '') {
            const newarr = arr.filter((item) => (item.indexOf(value) != (-1)));
            this.createList(newarr, container);
          }
    }
}
const inputCountryAutocomplete = new InputAutocomplete(UI.inputCountry);
const inputCityAutocomplete = new InputAutocomplete(UI.inputCity);
const inputGenderAutocomplete = new InputAutocomplete(UI.inputGender);
export {
    inputCountryAutocomplete,
    inputCityAutocomplete,
    inputGenderAutocomplete
};