console.log('2');
// Дан объект car. Написать условие если поле lastService больше 5 месяцев (из строки нужно достать число) то нужно вывести в консоль сообщение 'Need Repair' и свойство needRepair в объекте car изменить на true; иначе изменить на false.
const car = {
    name: 'Lexus',
    age: 10,
    lastService: '6 month',
    create: 2008,
    needRepair: false
};

let lastService = parseInt(car.lastService);
console.log(lastService);
if (lastService > 5){
    console.log('NeedRepair');
    car.needRepair = true;
    console.log(car.needRepair);
}else{
    car.needRepair = false;
    console.log(car.needRepair);
}


// Написать условие если цена товара больше или равна минимальной цене и меньше или равна максимальной цене то вывести в консоль название этого товара, иначе вывести в консоль что товар не найден.

const product = {
    name: 'Яблоко',
    price: '10$'
};

let price = parseInt(product.price);
const min = 10;
const max = 20;

const productName = (price <= max  && price >= min ) ? console.log(product.name) : console.log('Товар не найден');

//Cделать новую строку, где каждое слово начинается с большой буквы, а пробелы удалены. Использовать цикл for.
const string = 'JavaScript is a pretty good language';
const arr = string.split(' ');

const resArray = [];

for(let i = 0; i < arr.length; i++){

    // const firstLetter = arr[i].slice(0, 1).toUpperCase();
    // const lastWold = arr[i].slice(1, arr[i].length);
    // const result = firstLetter + lastWold;
    // resArray[i] = result;
    const result = arr[i].slice(0, 1).toUpperCase() + arr[i].slice(1, arr[i].length);
   
    console.log(result.replace('\n', ""));
}

//Создать функцию, которая принимает массив, а возвращает новый массив с дублированными элементами входного массива:


//Создать функцию, которая принимает произвольное (любое) число массивов и удаляет из каждого массива первый элемент, а возвращает массив из оставшихся значений:

//Создать функцию которая принимает массив пользователей, поле которое по которому хочу фильтровать, значение на которое хочу фильтровать. Возвращать новый массив с пользователями соответсвующие указанным параметрам. 


//Проверить как изменится объект obj и найти объяснение

//Создать объект, у которого будет цена товара и его скидка, а также два метода: для получения цены и для расчета цены с учетом скидки:

//Не изменяя функцию или объект, получить результат функции getSquare для объекта sizes





