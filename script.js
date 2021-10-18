const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

new Vue({
  //передаем объект с настройками
  el: "#app",
  data: {
    goods: [], //исходныый список товаров
    cartGoods: [], //корзина с товарами
    showCart: false, //показать/скрыть корзину
    filteredGoods: [], //список товаров после фильтрации
    imgCatalog: 'https://formaoxrany.ru/img/goods/nophoto.jpg', //картинка карточки товара большая
    imgCart: 'https://formaoxrany.ru/img/goods/nophoto.jpg', //картинка карточки товара в корзине
    searchLine: '' //содержимое поля поиска
  },
  //Раздел c методами
  methods: {
    loadgoods() {
      //вызываем метод fetch и передаем URL и catalogData.json
      //fetch возвращает promise
      fetch(`${API_URL}catalogData.json`)
        // распарсим JSON-строку, которая к нам придет
        //request.json тоже возвращает promise, поэтому делаем
        //второй блок .then
        .then((request) => request.json())
        //приходят данные, которые распарсили из JSON-строки
        //и их нужно поместить в this.goods и filtered.goods
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
    },

    //метод добавления кол-ва, товара в корзину
    addGoods(good) {
      fetch(`${API_URL}addToBasket.json`)
        .then(response => response.json())
        .then(data => {
          if (data.result === 1) {
            let find = this.cartGoods.find(el => el.id_product === good.id_product);
            if (find) {
              find.quantity++;
            } else {
              let prod = Object.assign({ quantity: 1 }, good);
              this.cartGoods.push(prod)
            }
          } else {
            alert('Error');
          }
        })
    },

    //метод удаления кол-ва, товара из корзины
    removeCart(item) {
      fetch(`${API_URL}deleteFromBasket.json`)
        .then((request) => request.json())
        .then((data) => {
          if (data.result === 1) {
            if (item.quantity > 1) {
              item.quantity--;
            } else {
              this.cartGoods.splice(this.cartGoods.indexOf(item), 1)
            }
          }
        })
    },

    // поиск товара
    filter() {
      let regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter(el => regexp.test(el.product_name));
    },
  },

  //функция вызывается при загрузке приложения для инициализации
  mounted() {
    this.loadgoods();
  }
})