const API_URL = 'http://127.0.0.1:3000/';

Vue.component('good-item', {
  template: `<div class="goods-item">
    <h2>{{ title }}</h2>
    <p>{{ price }} $</p>
    <img class="goods-photo" :src="img" alt="image">
    <button class="by-btn" @click="onClick">Купить</button>
    </div>`,

  // data() {
  //   return {
  //     cartGoods: []
  //   }
  // },

  props: {
    title: String,
    price: Number,
    img: String
  },

  methods: {
    onClick() {
      fetch (API_URL + "addGoods", {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({product_name: this.title, price: this.price})
      })
    }
  }
}),

Vue.component('goods-list', {
  template: `<div class="goods-list">
  <good-item
  v-for="good of list"
  v-bind:key="good.id_product"
  v-bind:title="good.product_name"
  v-bind:price="good.price"
  :img="img"
  v-on:addproduct="$emit(addGoods)">
</good-item>
</div>`,
  props: {
    list: Array,
    img: String
  }
})

Vue.component('search', {
  template: `<div class="search">
    <form action="#" class="search-inp" @submit.prevent="submitPrevent">
      <input type="text" class="goods-search" placeholder="Введите название" v-model="searchLine">
      <button class="search-button" type="submit">Искать</button>
    </form>
   </div>`,
  data() {
    return {
      searchLine: ''
    }
  },
  methods: {
    submitPrevent() {
      this.$emit('search', this.searchLine)
    }
  }
})

Vue.component('cart', {
  template: `<div class="cart-block" v-show="showCart">
    <p v-if="!goods.length">Корзина пуста</p>
    <cart-item class="cart-item"
      v-for="item of goods"
      v-bind:key="item.id_product"
      v-bind:cart-item="item"
      :src="img">
    </cart-item>
  </div>`,
  props: {
    goods: Array,
    img: String, //если указываю Image, выдает ошибку img undefined but got String
    show: Boolean
  }
})

Vue.component('cart-item', {
  template: `<div class="cart-item">
        <div class="product-bio">
          <img class="img-small" :img="img" alt="Some image">
          <div class="product-desc">
            <p class="product-title">{{ card.product_name }}</p>
            <p class="product-quantity">Количество: {{ card.quantity }}</p>
            <p class="product-single-price">$ {{ card.price }}</p>
          </div>
        </div>
        <div class="right-block">
          <p class="product-price">{{ card.quantity*card.price }}</p>
          <button class="del-btn" @click="('removeCart', item)">&times;</button>
        </div>
      </div>`,
  props: {
    card: Array,
    img: String
  }
})
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
    // searchLine: '' //содержимое поля поиска
  },
  //Раздел c методами
  methods: {
    loadgoods() {
      //вызываем метод fetch и передаем URL и catalogData.json
      //fetch возвращает promise
      fetch(`${API_URL}catalogData`)
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
    filter(searchLine) {
      let regexp = new RegExp(searchLine, 'i');
      this.filteredGoods = this.goods.filter(el => regexp.test(el.product_name));
    },
  },

  //функция вызывается при загрузке приложения для инициализации
  mounted() {
    this.loadgoods();
  }
})