
import UILogin from '../config/uilogin.config';


class LoginFormUI {
    constructor(objUILogin) {
        this.objUILogin = objUILogin;
        this.email = objUILogin.inputEmail;
        this.password = objUILogin.inputPassword;
    }

    get form() {
        return this.objUILogin.loginForm;
    }

    get inputsValueForValidate(){
        return {
            email: this.email.value,
            password: this.password.value,
        };
    }


}

const loginFormUI = new LoginFormUI(UILogin);
export default loginFormUI;