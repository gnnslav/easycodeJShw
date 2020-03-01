const regExpDictionary = {
    email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    password: /[A-Za-z0-9]{8,}/,
    nickname: /[A-Za-z0-9]{6,}/,
    firstName: /[A-Za-z]{3,}/,
    lastName: /[A-Za-z]{3,}/,
    phone: /(\d?)(\d{3})(\d{3})(\d{2})(\d{2})/,
};

export function validate(el) {
    const regExpName = el.dataset.required;
    if(!regExpName){
        return;
    }
    return regExpDictionary[regExpName].test(el.value);
}