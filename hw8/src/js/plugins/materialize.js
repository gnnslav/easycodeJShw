import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const select = document.querySelectorAll('select');
M.FormSelect.init(select);

export function getSelectInstance(elem) {
    return M.FormSelect.getInstance(elem);
}

const autocomplite = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplite);

export function getAutocompliteInstance(elem) {
    return M.Autocomplete.getInstance(elem);
}

const datePickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datePickers, {
    showClearBtn: true,
    format: 'yyyy-mm'
});

export function getDatePickersInstance(elem) {
    return M.Datepicker.getInstance(elem);
}

const dropdown = document.querySelectorAll('.dropdown-trigger');
M.Dropdown.init(dropdown, {
    closeOnClick: false,
});

export function getDropdownInstance(elem) {
    return M.Dropdown.getInstance(elem);
}