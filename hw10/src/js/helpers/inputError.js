class Inputerror {


    inputErrorTemplate(msg) {
        return `<div class="invalid-feedback">${msg}</div>`;
    }

    showInputError(el) {
        const parent = el.parentElement;
        const msg = el.dataset.invalidMessage || 'Invaled input';
        const template = this.inputErrorTemplate(msg);

        el.classList.add('is-invalid');
        parent.insertAdjacentHTML('beforeEnd', template);

    }

    removeInputError(el) {
        const parent = el.parentElement;
        const err = parent.querySelector('.invalid-feedback');
        if (!err) return;
        el.classList.remove('is-invalid');
        parent.removeChild(err);
    }


}

const inputError = new Inputerror();
export default inputError;