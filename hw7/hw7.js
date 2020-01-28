// Создать наследника от Planet, который будет называться PlanetWithSatellite и будет
// принимать, кроме name, название спутника (satelliteName). Переопределите метод
// getName для PlanetWithSatellite так, чтобы он возвращал ту же самую строчку +
// дополнительный текст 'The satellite is' + satelliteName.

function Planet(name) {
    this.name = name;
    this.getName = function () {
        return "Planet name is " + this.name;
    };
}

const planet = new Planet("Eath");


function PlanetWithSatellite(name, satelliteName) {
    Planet.call(this, name);
    this.satelliteName = satelliteName;

    const planetName = this.getName;

    this.getName = function () {
        return `${planetName.call(this)}. The satellite is ${this.satelliteName}.`;
    };
}
const planetWithSatellite = new PlanetWithSatellite("Mars", "Fobos");
PlanetWithSatellite.prototype = Object.create(Planet.prototype);


// Создайте класс “Здание” (пусть у него будет имя, количество этажей, метод “получить количество этажей” и метод “установить количество этажей”).
// Создайте наследников этого класса:
// классы “Жилой дом” и “Торговый центр”. Используйте функциональное наследование

function Building(name, floors) {
    this.name = name;
    this.floors = floors;

    this.getNumOfFloors = function () {
        return this.floors;
    };

    this.setNamOfFloors = function (value) {
        this.floors = value;
    };
}

function House(name, floors, flats) {
    Building.apply(this, arguments);
    this.flats = flats;

    this.getNumOfFloors = function () {
        return {
            floors: this.floors,
            sumOfFlats: this.floors * this.flats
        };
    };
}
const house = new House("house", 5, 5);

function ShoppingCenter(name, floors, shops) {
    Building.apply(this, arguments);
    this.shops = shops;

    this.getNumOfShops = function () {
        return {
            floors: this.floors,
            sumOfShops: this.floors * this.shops
        };
    };
}



// Создать класс “Мебель” с базовыми свойствами “имя”, “цена” и методом “получить информацию” (метод должен вывести имя и цену). Метод должен быть объявлен с помощью прототипов (Func.prototype...). Создать два экземпляра класса “Мебель”: экземпляр “ОфиснаяМебель” и “Мебель для дома”. Придумайте им по одному свойству, которые будут характерны только для этих экземпляров (например, для офисной мебели - наличие компьютерного стола или шредера). Метод “получить информацию” должен учитывать и добавленное вами новое свойство.

function Furniture(name, price) {
    this.name = name;
    this.price = price;
}

Furniture.prototype.getInfo = function () {
    return `имя ${this.name}, ценa ${this.price} `;
};

function OfficeFurniture(name, price, available) {
    Furniture.apply(this, arguments);
    this.available = available;
}
OfficeFurniture.prototype = Object.create(Furniture.prototype);
OfficeFurniture.prototype.getInfo = function () {
    return `имя ${this.name}, ценa ${this.price}, наличие ${this.available} `;
};
const officeFurniture = new OfficeFurniture('Office Table', 20, '+');

function HouseFurniture(name, price, available) {
    Furniture.apply(this, arguments);
    this.available = available;
}
HouseFurniture.prototype = Object.create(Furniture.prototype);
HouseFurniture.prototype.getInfo = function () {
    return `имя ${this.name}, ценa ${this.price}, наличие ${this.available} `;
};
const houseFurniture = new HouseFurniture('House Table', 10, '+');

// Создать класс “Пользователь” с базовыми свойствами “имя”, “дата регистрации” и методом “получить информацию” (метод должен вывести имя и дату регистрации). Метод должен быть объявлен с помощью прототипов (Func.prototype...) Создать два наследника класса “Пользователь”: класс “Админ” и класс “Гость”.
//     У класса “Админ” должно быть дополнительное свойство “суперАдмин” (может быть true/false, должно быть скрытым). Свойства определяются в момент вызова конструктора.

//     У класса “Гость” должно быть свойство “срокДействия” (validDate, например), содержащее дату (например, одну неделю от момента регистрации).

//     У классов-наследников метод “получить информацию” должен так же содержать информацию о дополнительных свойствах (“суперАдмин” и “срокДействия”)

class User {
    constructor(name) {
        this.name = name;
        this.dateOfRegistration = new Date(2020, 0, 26);
    }

    getInfo() {
        return `name: ${this.name}, geristration: ${this.dateOfRegistration.toLocaleDateString()}`;
    }

}

const user = new User('User');

class Admin extends User {
    constructor(name) {
        super(name);
        this._superAdmin = true;
    }

    getInfo() {
        return `${super.getInfo(this)}, superAdmin: ${this.superAdmin}`;
    }
}
const admin = new Admin('superadmin');

class Guest extends User {
    constructor(name) {
        super(...arguments);
        this.validDate();
    }
    validDate() {
        return ((new Date() - Date.parse(this.dateOfRegistration)) / 1000 / 60 / 60) % 60;
    }
    getInfo() {
        return `${super.getInfo(this)}, registration: ${Math.floor(this.validDate())} hours ago`;
    }
}
const guest = new Guest('guest');