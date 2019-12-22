// На основе массива map и массива users собрать новый массив объектов где в каждом объекте будут только те свойства которые перечислены в массиве map
const map = ["_id", "name", "isActive", "balance"];

const users = [
  {
    _id: "5d220b10e8265cc978e2586b",
    isActive: true,
    balance: 2853.33,
    age: 20,
    name: "Buckner Osborne",
    gender: "male",
    company: "EMPIRICA",
    email: "bucknerosborne@empirica.com",
    phone: "+1 (850) 411-2997",
    registered: "2018-08-13T04:28:45 -03:00"
  },
  {
    _id: "5d220b10144ef972f6c2b332",
    isActive: true,
    balance: 1464.63,
    age: 38,
    name: "Rosalie Smith",
    gender: "female",
    company: "KATAKANA",
    email: "rosaliesmith@katakana.com",
    phone: "+1 (943) 463-2496",
    registered: "2016-12-09T05:15:34 -02:00"
  },
  {
    _id: "5d220b1083a0494655cdecf6",
    isActive: false,
    balance: 2823.39,
    age: 40,
    name: "Estrada Davenport",
    gender: "male",
    company: "EBIDCO",
    email: "estradadavenport@ebidco.com",
    phone: "+1 (890) 461-2088",
    registered: "2016-03-04T03:36:38 -02:00"
  }
];

const newUsers = users.map(user => {
  const newObj = {};
  map.forEach(key => {
    newObj[key] = user[key];
    return newObj;
  });
  return newObj;
});
// const newUsers = users.map(element =>
//   map.reduce((accumulator, value) => {
//     accumulator[value] = element[value];
//     return accumulator;
//   }, {})
// );
console.log(newUsers);

// Дан массив объектов, где каждый объект содержит информацию о букве и месте её положения в строке {буква: “a”, позиция_в_предложении: 1}:

const array = [
  {
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
  },
  {
    char: " ",
    index: 5
  },
  {
    char: "y",
    index: 4
  },
  {
    char: "r",
    index: 13
  },
  {
    char: "H",
    index: 0
  },
  {
    char: "e",
    index: 11
  },
  {
    char: "a",
    index: 1
  },
  {
    char: " ",
    index: 9
  },
  {
    char: "!",
    index: 14
  },
  {
    char: "e",
    index: 7
  }
];

const sortArray = array.sort((a, b) => a.index - b.index);
const str = sortArray.map(el => el.char);
console.log(str.join(""));

// Организовать функцию getInfo, которая принимает объект вида{ name: ..., info: { employees: [...], partners: [ … ] } }и выводит в консоль имя (если имени нет, показывать ‘Unknown’) и первые две компании из массива partners:

const organisation = {
  name: "Google",
  info: {
    employees: ["Vlad", "Olga"],
    partners: ["Microsoft", "Facebook", "Xing"]
  }
};

const getInfo = obj => {
  const inform = obj.info;
  const [partner1, partner2] = inform.partners;

  return `Name: ${obj.name || "unknown"} Partners: ${partner1} ${partner2}`;
};
getInfo(organisation);

// Сделать так что-бы при получении или изменении свойства name в свойствах lastGet и lastUpdate сохранялась дата последнего получения или последнего обновления соответсвенно.

const person = {
  displayName: "Denis",
  age: 30,
  lastGet: "",
  lastUpdate: "",
  time: new Date().toLocaleString(),
  get name() {
    this.lastGet = this.time;
    return this.name;
  },
  set name(value) {
    this.lastUpdate = new Date().toLocaleString();
    this.name = value;
  }
};

// сделать геттер который будет возвращать brand и model в виде строки "Apple iPhone 7" а также сделать сеттер в который будет передаваться строка например "Samsung S8 Gold" и в объекте в поле brand будет записано "Samsung" а в поле model будет записано "S8 Gold"

const product = {
  brand: "Apple",
  model: "iPhone 7",
  price: "$300",
  get prod() {
    return `${this.brand} ${this.model}`;
  },
  set prod(str) {
    const indx = str.indexOf(" ");
    this.brand = str.slice(0, indx);
    this.model = str.slice(indx + 1, str.length);
  }
};
product.prod = "Samsung S8 Gold";
