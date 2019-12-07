console.log("2");
// Дан объект car. Написать условие если поле lastService больше 5 месяцев (из строки нужно достать число) то нужно вывести в консоль сообщение 'Need Repair' и свойство needRepair в объекте car изменить на true; иначе изменить на false.
const car = {
  name: "Lexus",
  age: 10,
  lastService: "6 month",
  create: 2008,
  needRepair: false
};

let lastService = parseInt(car.lastService);
console.log(lastService);
if (lastService > 5) {
  console.log("NeedRepair");
  car.needRepair = true;
  console.log(car.needRepair);
} else {
  car.needRepair = false;
  console.log(car.needRepair);
}

// Написать условие если цена товара больше или равна минимальной цене и меньше или равна максимальной цене то вывести в консоль название этого товара, иначе вывести в консоль что товар не найден.

const product = {
  name: "Яблоко",
  price: "10$"
};

let price = parseInt(product.price);
const min = 10;
const max = 20;

const productName =
  price <= max && price >= min ?
  console.log(product.name) :
  console.log("Товар не найден");

//Cделать новую строку, где каждое слово начинается с большой буквы, а пробелы удалены. Использовать цикл for.
const string = "JavaScript is a pretty good language";
const arr = string.split(" ");

const resArray = [];

for (let i = 0; i < arr.length; i++) {
  const result =
    arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1, arr[i].length);
  resArray.push(result);
}

console.log(resArray.join(""));
//Создать функцию, которая принимает массив, а возвращает новый массив с дублированными элементами входного массива:
const firstArray = [1, 2, 3];
const doubleArray = function (arr) {
  return arr.concat(arr);
};

console.log(doubleArray(firstArray));

//Создать функцию, которая принимает произвольное (любое) число массивов и удаляет из каждого массива первый элемент, а возвращает массив из оставшихся значений:
const arr1 = [1, 2, 3];
const arr2 = ["a", "b", "c"];

function getNewArr(el) {
  const newArr = [];
  return newArr.push(el);
}
// const newArr1 = getNewArr(arr1, arr2);
// console.log(newArr1);
console.log(getNewArr(arr1, arr2));

// function changeCollection(arr, fn) {
//   const res = [];
//   console.log(arr);
//   for (let i = 0; i < arr.length; i++) {
//     //console.log(arr);
//     // let bb = fn(arr[i]);
//     // console.log(bb);
//     // res.push(fn[bb]);
//   }
//   return res;
// }

// function delFirstEl(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     return arr.splice(1, arr.length);
//   }
// }

// const asdf = changeCollection(newArr, delFirstEl);
// console.log(asdf);

//Создать функцию которая принимает массив пользователей, поле которое по которому хочу фильтровать, значение на которое хочу фильтровать. Возвращать новый массив с пользователями соответсвующие указанным параметрам.
const users = [{
    _id: "5d1c3860aa841704d3245513",
    isActive: false,
    balance: 2764.35,
    age: 33,
    name: "Allie Blair",
    gender: "female",
    company: "PHOTOBIN",
    email: "allieblair@photobin.com",
    phone: "+1 (951) 566-2987",
    registered: "2018-11-30T02:29:00 -02:00"
  },
  {
    _id: "5d1c386095ffb689687f2db9",
    isActive: false,
    balance: 3276.25,
    age: 22,
    name: "Yesenia Leblanc",
    gender: "female",
    company: "SKINSERVE",
    email: "yesenialeblanc@skinserve.com",
    phone: "+1 (947) 446-2840",
    registered: "2015-10-31T01:10:31 -02:00"
  },
  {
    _id: "5d1c3860e73ff2a338722e81",
    isActive: true,
    balance: 1868.65,
    age: 38,
    name: "Mamie Kramer",
    gender: "female",
    company: "EARBANG",
    email: "mamiekramer@earbang.com",
    phone: "+1 (885) 564-3305",
    registered: "2014-06-03T09:36:40 -03:00"
  },
  {
    _id: "5d1c386000e4f2fc62be1b1e",
    isActive: true,
    balance: 1003.15,
    age: 32,
    name: "Crawford Bryant",
    gender: "male",
    company: "DIGIRANG",
    email: "crawfordbryant@digirang.com",
    phone: "+1 (889) 408-2141",
    registered: "2015-01-15T05:20:21 -02:00"
  },
  {
    _id: "5d1c386008ff236a315d638b",
    isActive: false,
    balance: 3045.41,
    age: 36,
    name: "Helene Holland",
    gender: "female",
    company: "HYDROCOM",
    email: "heleneholland@hydrocom.com",
    phone: "+1 (937) 554-2040",
    registered: "2014-09-15T08:22:59 -03:00"
  },
  {
    _id: "5d1c3860b4c27c4d5fdb6c1f",
    isActive: true,
    balance: 1693.51,
    age: 23,
    name: "Hernandez Osborn",
    gender: "male",
    company: "TERRASYS",
    email: "hernandezosborn@terrasys.com",
    phone: "+1 (965) 595-3942",
    registered: "2016-08-06T12:19:01 -03:00"
  }
];

function getUsers(arr, keyField, keyValue) {
  const resArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][keyField] === keyValue) {
      resArr.push(arr[i]);
    }
  }
  return resArr;
}
const selectUsers = getUsers(users, "gender", "male");

console.log(selectUsers);

//Проверить как изменится объект obj и найти объяснение
const obj = {};
(function (x) {
  x.b = 1;
  //x = null;
  console.log(x);
  console.log(x.b);
})(obj);

// самовызывающаяся функция, которая в пустом объекте создает поле b со значением 1. x = null удаляется объект тоесть ссылка на объект , в консоле ошибка

//Создать объект, у которого будет цена товара и его скидка, а также два метода: для получения цены и для расчета цены с учетом скидки:
function getPrice() {
  console.log(this.price);
  return this.price;
}

function getPriceDiscount() {
  let newPrice = this.price - (this.price * parseInt(this.discount)) / 100;
  console.log(newPrice);
  return newPrice;
}
const prices = {
  price: 10,
  discount: "15%",
  getPrice: getPrice,
  getPriceDiscount: getPriceDiscount
};

prices.getPrice();
prices.getPriceDiscount();
console.log(prices);

//Не изменяя функцию или объект, получить результат функции getSquare для объекта sizes

const sizes = {
  width: 5,
  height: 10
};
const getSquare = function () {
  return this.width * this.height;
};

console.log(getSquare.call(sizes));