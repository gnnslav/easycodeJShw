import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import tabs from './views/tabs';
import {
    validate
} from './helpers/validate';
import inputError from './helpers/inputError';
import api from './services/auth.service';
import UI from './config/ui.config';
import formUI from './views/form';
import loginFormUI from './views/loginForm';
import location from './store/location';
import {
    inputCountryAutocomplete,
    inputCityAutocomplete,
    inputGenderAutocomplete
} from './views/inputAutocomplete';

const tabItems = tabs.tabItems;
const inputCountry = UI.inputCountry;
const inputCity = UI.inputCity;
const inputGender = UI.inputGender;
const loginForm = loginFormUI.form;
const signupForm = formUI.form;
const inputs = document.querySelectorAll('[data-required]');


tabItems.forEach((tab) => {
    tab.addEventListener('click', (e) => {
        const parent = e.target.closest("[data-tab]");
        const dataTabValue = parent.dataset.tab;
        tabs.activeTab(dataTabValue);
    });
});
inputCountry.addEventListener('input', onCompleteCountriesList);
inputCity.addEventListener('focus', onCompleteCitiesList);
inputGender.addEventListener('focus', onCompleteGenderList);
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmitLoginForm();
});
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    onSubmitSignupForm();
});

function onCompleteGenderList() {
    inputGenderAutocomplete.init(['male', 'female']);
}
async function onCompleteCountriesList() {
    await location.initCountries();
    inputCountryAutocomplete.init(location.countries);
    UI.inputCity.removeAttribute('disabled');
}

async function onCompleteCitiesList() {
    const inputCountryValue = formUI.countryValue;
 
    await location.initCities(inputCountryValue);
    inputCityAutocomplete.init(location.cities);
}

function validateForm(inputs) {
    return Array.from(inputs).every((el) => {
        const isValidInput = validate(el);
        if (!isValidInput) {
            inputError.showInputError(el);
        }
        return isValidInput;
    });

}
async function onSubmitLoginForm() {
    const inputs = document.querySelectorAll('.loginForm [data-required]');
   const isValidLoginForm = validateForm(inputs);

    if (!isValidLoginForm) return;

    const email = loginFormUI.inputsValueForValidate.email;
    const password = loginFormUI.inputsValueForValidate.password;

    try {
        await api.login(email, password);
        loginForm.reset();
    } catch (err) {
        return Promise.reject(err);
    }
    return isValidLoginForm;
}

async function onSubmitSignupForm() {
    const inputs = document.querySelectorAll('.signupForm [data-required]');
    const isValidSignupForm = validateForm(inputs);
 
    if (!isValidSignupForm) return;

    
    const email = formUI.inputsValueForValidate.email;
    const password = formUI.inputsValueForValidate.password;
    const nickname = formUI.inputsValueForValidate.nickname;
    const first_name = formUI.inputsValueForValidate.firstName;
    const last_name = formUI.inputsValueForValidate.lastName;
    const phone = formUI.inputsValueForValidate.phone;
    const gender_orientation = formUI.genderValue;
    const city = formUI.cityValue;
    const country = formUI.countryValue;
    const date_of_birth_day = formUI.dateOfBirthValue.day;
    const date_of_birth_month = formUI.dateOfBirthValue.month;
    const date_of_birth_year = formUI.dateOfBirthValue.year;

    try {
        await api.registration(email, password, nickname, first_name, last_name, phone, gender_orientation, city, country, date_of_birth_day, date_of_birth_month, date_of_birth_year);
        signupForm.reset();
    } catch (err) {
        return Promise.reject(err);
    }
    return isValidSignupForm;
}

inputs.forEach((el) => {
    el.addEventListener('focus', () => {
        inputError.removeInputError(el);
    });
});

