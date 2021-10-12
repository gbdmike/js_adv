const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

function send(onError, onSuccess, url, method = 'GET', data = null, headers = [], timeout = 60000) {
  let xhr;

  if (window.XMLHttpRequest) {
    // Chrome, Mozilla, Opera, Safari
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // Internet Explorer
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.open(method, url, true);


  headers.forEach((header) => {
    xhr.setRequestHeader(header.key, header.value);
  })


  xhr.timeout = timeout;

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 400) {
        onError(xhr.statusText)
      } else {
        onSuccess(xhr.responseText)
      }
    }
  }

  xhr.send(data);
}


// Создаем класс для товара
class GoodsItem {
  constructor(element, photo = 'https://placehold.it/200x150') {
    this.product_name = element.product_name;
    this.price = element.price;
    this.id_product = element.id_product;
    this.photo = photo;
  }

  //Метод возвращает html-разметку
  render() {
    return `<div class="goods-item" data-id="${this.id_product}">
                <h3>${this.product_name}</h3>
                <p>${this.price}</p>
                <img class="goods-photo" src="${this.photo}">
                <button class="by-btn" data-id="${this.id_product}"
                data-name="${this.product_name}"
                data-price="${this.price}">Добавить</button>
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
    new Promise((resolve, reject) => {
      send(reject, resolve, `${API_URL}catalogData.json`)
    })
      .then((request) => {
        this.goods = JSON.parse(request).map(good => ({ id_product: good.id_product, product_name: good.product_name, price: good.price }))
        this.render();
      })
      .catch((err) => {
        console.log(err.txt)
      })
  }

  //Метод вывода списка товаров
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem({ id_product: good.id_product, product_name: good.product_name, price: good.price });
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }

  //Метод вывода суммы всех товаров
  sumGoodsList() {
    let initialValue = 0;
    let total = this.goods.reduce((previousValue, currentValue) =>
      previousValue + currentValue.good.price, initialValue)

    let sum = document.getElementById('sum');
    document.getElementById('sum').innerHTML = total;
    sum.innerText = (`Сумма товаров равна ${total}`);
  }
}

//Класс для корзины товаров
class CartItem {
  constructor(product, photo = 'https://placehold.it/50x100') {
    this.title = product.title;
    this.price = product.price;
    this.photo = photo;
    this.quantity = 1;
  }

  //Метод возвращает отрисовку корзины
  renderCart() {
    return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.photo}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Quantity: ${this.quantity}</p>
        <p class="product-single-price">$${this.price} each</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">$${this.quantity * this.price}</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        <p class="cart-total"></p>
        </div>`
  }

  //Увеличиваем кол-во товара на 1
  addQuantity() {
    this.quantity += 1;
  }
}

class Cart {
  fetchCart() {
    send(
      (err) => {
        console.log(err.txt)
      },
      (request) => {
        this.goods = JSON.parse(request)
        this.render();
      },
      `${API_URL}/addToBasket.json`
    )
  }

  render() {
    let listHtml = '';
    let goodsList = document.getElementsByClassName('cart-block');

    this.goods.forEach((CartItem, indexOfProduct) => {
      listHtml += CartItem.renderCart(indexOfProduct);
    });
    goodsList.innerHTML = listHtml;
    this.sumCart();
  }

  //Добавление товара в корзину
  addCartItem(product) {
    
    let cartItem = this.goods[0];

    if (cartItem != undefined) {
      cartItem.addQuantity();
    } else {
      let item = new CartItem(product);
      this.goods.push(item);
    }
  }

  //Метод для вывода суммы корзины
  sumCart() {
    let sumPrice = document.getElementsByClassName('cart-total');
    let sum = 0;
    this.goods.forEach(good => {
      sum += good.price * good.quantity;
    });
    sumPrice.innerText = `Итого ${sum} рублей`;
  }

  //Удаление товара
  removeCartItem(index) {
    delBasket(`${API_URL}/deleteFromBasket.json`, (goods) => {
      this.goods = JSON.parse(goods);
    })
    this.goods.splice(index, 1);
    document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
    this.render();
  }
}


let cart = new Cart();
new GoodsList(cart);







//Чтобы вывести список, нужно создать экземпляр класса GoodsList, вызвать для него метод fetchGoods,
// чтобы записать список товаров в свойство goods, и вызвать render()
const list = new GoodsList();
list.fetchGoods();
list.sumGoodsList();
