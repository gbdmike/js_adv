//Событие клик на кнопку by-btn
document.getElementById('by-btn').onclick = getResult;

//Выводим результат
getResult();

//Выводим результат и считаем калории
function getResult() {
    let menu = document.getElementsByClassName('menu');
    let price = 0;
    let calories = 0;
    for (let i = 0; i < menu.length; i++) {
        //Если наш input чекнут, смотрим атрибут цены и калорий и записываем в переменные
        if (menu[i].checked) {
            price += parseFloat(menu[i].getAttribute('data-price'));
            calories += parseFloat(menu[i].getAttribute('data-calories'));
        }
    }
    // Подставляем данные цену и калории
    document.getElementById('price').innerHTML = price;
    document.getElementById('calories').innerHTML = calories;
}