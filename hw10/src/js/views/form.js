import UI from '../config/ui.config';
//import inputGenderAutocomplete from './inputAutocomplete';

class FormUI {
    constructor(objUI) {
        this.objUI = objUI;
    }

    get form() {
        return this.objUI.signupForm;
    }

       get inputsValueForValidate() {
        return {
            email: this.objUI.inputEmail.value,
            password: this.objUI.inputPassword.value,
            nickname: this.objUI.inputNickname.value,
            firstName: this.objUI.inputFirstName.value,
            lastName: this.objUI.inputLastName.value,
            phone: this.objUI.inputPhone.value
        };
    }
  

    get genderValue() {
        return this.objUI.inputGender.value;
    }


    get cityValue() {
        return this.objUI.inputCity.value;
    }
    
    get countryValue() {
        const id = this.objUI.inputCountry.id;
        return this.objUI.inputCountry.value;
    }

    get dateOfBirthValue() {
        const date = new Date(this.objUI.inputDateOfBirthday.value);
        const month = date.getMonth() + 1;

        return {
            day: date.getDate(),
            month: `0${month}`,
            year: date.getFullYear(),
        };
    }

}

const formUI = new FormUI(UI);
export default formUI;