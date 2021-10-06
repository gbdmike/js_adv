// Создаем класс для товара
class GoodsItem {
  constructor(title, price, photo) {
    this.title = title;
    this.price = price;
    this.photo = photo;
  }

  //Метод возвращает html-разметку
  render() {
    return `<div class="goods-item">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <img class="goods-photo" src="${this.photo}">
                <button class="by-btn">Добавить</button>
              </div>`;
  }
}

//Создаем класс списка товаров с пустым массивом
class GoodsList {
  constructor() {
    this.goods = [];
  }

  //Метод для заполнения списка товаров GoodsList
  fetchGoods() {
    this.goods = [
      {
        title: 'Shirt',
        price: 150,
        photo: 'https://cdn11.bigcommerce.com/s-lqiq2tqil5/product_images/uploaded_images/5417-check-shirt-red-black-thumb1.jpg?t=1594254101&_ga=2.177697827.767471844.1594155284-1025973031.1592776194'
      },
      {
        title: 'Socks',
        price: 50,
        photo: 'https://images.ru.prom.st/736981013_w640_h640_nabor-zhenskih-dlinnyh.jpg'
      },
      {
        title: 'Jacket',
        price: 350,
        photo: 'https://sneakerstudio.ru/rus_pl_%D0%9C%D1%83%D0%B6%D1%81%D0%BA%D0%B0%D1%8F-%D0%BA%D1%83%D1%80%D1%82%D0%BA%D0%B0-Alife-Varsity-Jacket-ALIFW20-22-BLUE-CREAM-37001_1.jpg'
      },
      {
        title: 'Shoes',
        price: 550,
        photo: 'https://amazonxyz.com/wp/wp-content/uploads/2020/12/41u06HG0ScL.jpg'
      },
    ];
  }

  //Метод вывода списка товаров
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price, good.photo);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  //Метод вывода суммы всех товаров
  sumGoodsList() {
    let initialValue = 0;
    let total = this.goods.reduce((previousValue, currentValue) =>
      previousValue + currentValue.price, initialValue)

    let sum = document.getElementById('sum');
    document.getElementById('sum').innerHTML = total;
    sum.innerText = (`Сумма товаров равна ${total}`);
  }
}

//Класс для корзины товаров
class goodsCart {
  //добавление кол-ва товаров
  quantityCartItem() { };
};

//Класс для элемента корзины товаров
class elemCart {
  //Добавление товара в корзину
  addCartItem() { };

  //Удаление товара
  removeCartItem() { };

  //Очистить корзину
  clearCart() { };
};



//Чтобы вывести список, нужно создать экземпляр класса GoodsList, вызвать для него метод fetchGoods,
// чтобы записать список товаров в свойство goods, и вызвать render()
const list = new GoodsList();
list.fetchGoods();
list.render();
list.sumGoodsList();