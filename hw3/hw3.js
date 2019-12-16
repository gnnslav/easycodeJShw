console.log(3);
// На основе массива map и массива users собрать новый массив объектов где в каждом объекте будут только те свойства которые перечислены в массиве map
const map = ["_id", "name", "isActive", "balance"];

const users = [{
        "_id": "5d220b10e8265cc978e2586b",
        "isActive": true,
        "balance": 2853.33,
        "age": 20,
        "name": "Buckner Osborne",
        "gender": "male",
        "company": "EMPIRICA",
        "email": "bucknerosborne@empirica.com",
        "phone": "+1 (850) 411-2997",
        "registered": "2018-08-13T04:28:45 -03:00"
    },
    {
        "_id": "5d220b10144ef972f6c2b332",
        "isActive": true,
        "balance": 1464.63,
        "age": 38,
        "name": "Rosalie Smith",
        "gender": "female",
        "company": "KATAKANA",
        "email": "rosaliesmith@katakana.com",
        "phone": "+1 (943) 463-2496",
        "registered": "2016-12-09T05:15:34 -02:00"
    },
    {
        "_id": "5d220b1083a0494655cdecf6",
        "isActive": false,
        "balance": 2823.39,
        "age": 40,
        "name": "Estrada Davenport",
        "gender": "male",
        "company": "EBIDCO",
        "email": "estradadavenport@ebidco.com",
        "phone": "+1 (890) 461-2088",
        "registered": "2016-03-04T03:36:38 -02:00"
    }
];


// const newUsers = users.map((user) => ({
//     '_id': user._id,
//     name: user.name,
//     isActive: user.isActive,
//     balance: user.balance,
// }));

// const newUsers = users.filter((user) => (

// ));
// console.log(newUsers);

// const [...otherEl] = map;
// console.log(otherEl);
// const [_id, name, isActive, balance] = map;
// console.log(name);
// console.log(balance);
// const newUsers = users.map(function (user) {
//     console.log(user);
//     const keys = Object.keys(user);
//     console.log(keys);

//     //return user.key;
// });
//console.log(newUsers);

// Дан массив объектов, где каждый объект содержит информацию о букве и месте её положения в строке {буква: “a”, позиция_в_предложении: 1}:

const array = [{
        char: "a",
        index: 12
    },
    {
        char: "w",
        index: 8
    },
    {
        char: "Y",
        index: 10
    },
    {
        char: "p",
        index: 3
    },
    {
        char: "p",
        index: 2
    },
    {
        char: "N",
        index: 6
    }, {
        char: " ",
        index: 5
    }, {
        char: "y",
        index: 4
    }, {
        char: "r",
        index: 13
    }, {
        char: "H",
        index: 0
    },
    {
        char: "e",
        index: 11
    }, {
        char: "a",
        index: 1
    }, {
        char: " ",
        index: 9
    }, {
        char: "!",
        index: 14
    }, {
        char: "e",
        index: 7
    }
];

const sortArray = array.sort((a, b) => a.index - b.index);
const str = sortArray.map((el) => el.char);
console.log(str.join(''));

// Организовать функцию getInfo, которая принимает объект вида{ name: ..., info: { employees: [...], partners: [ … ] } }и выводит в консоль имя (если имени нет, показывать ‘Unknown’) и первые две компании из массива partners:

const organisation = {
    name: 'Google',
    info: {
        employees: ['Vlad', 'Olga'],
        partners: ['Microsoft', 'Facebook', 'Xing']
    }
};

const getInfo = (obj) => {
    const inform = obj.info;
    const [partner1, partner2] = inform.partners;
    const result = (obj.name) ? `Name: ${obj.name} Partners: ${partner1} ${partner2}` : "unknown";
    console.log(result);
};
getInfo(organisation);
//const nameOrganisation = getInfo(organisation);

// Сделать так что-бы при получении или изменении свойства name в свойствах lastGet и lastUpdate сохранялась дата последнего получения или последнего обновления соответсвенно. 

const person = {
    name: 'Denis',
    age: 30,
    lastGet: '',
    lastUpdate: '',
    // changeName() {
    //     if (lastName != this.name) {
    //         this.lastGet = new Date().toLocaleString();
    //     } else {
    //         this.lastGet = new Date().toLocaleString();
    //     }
    // }
};
const lastName = person.name;
const lastDate = new Date().toLocaleString();

function changeName(obj) {
    if (lastName != this.name) {
        obj.lastGet = lastDate;
    }
}
changeName(person);
console.log(person);



// Object.defineProperty(person, 'lastGet', {
//     get: function () {
//         const time = new Date();
//         return this.name;
//     }
// });
// сделать геттер который будет возвращать brand и model в виде строки "Apple iPhone 7" а также сделать сеттер в который будет передаваться строка например "Samsung S8 Gold" и в объекте в поле brand будет записано "Samsung" а в поле model будет записано "S8 Gold" 
const product = {
    brand: 'Apple',
    model: 'iPhone 7',
    price: '$300'
};