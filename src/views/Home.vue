<template>
  <div id="app">
    <router-view></router-view>
    <header>
      <Search v-on:search="filter"></Search>
      <Cart 
      :cart_data="getCart"
      v-show="showCart"
      ></Cart>
      <button
        class="card"
        type="button"
        @click="showCart = !showCart"
        ><img class="card" src="@/assets/images/card.svg" alt="card">
      </button>
    </header>
    <main>
      <GoodsList></GoodsList>
    </main>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import GoodsList from "../components/GoodsList.vue";
import Cart from './Cart.vue';
import Ship from './OrderCart.vue';

export default {
  components: {
    Search,
    GoodsList,
    Cart,
    Ship
  },
  data() {
    return {
      showCart: false, //показать/скрыть корзину
    };
  },
  //Раздел c методами
  methods: {
  //поиск товара
    filter(searchLine) {
      this.$store.dispatch("filters", searchLine)
    },
  },
  computed: {
    filteredGoods() {
      return this.$store.getters.getGoods
    },
    getCart() {
      return this.$store.getters.getCart
    }
  },

  //функция вызывается при загрузке приложения для инициализации
  mounted() {
    //вызываем метод loadgoods из actions через хуки жизненного цикла
    this.$store.dispatch("loadgoods");
  },
};
</script>

<style>
@font-face {
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  src: url("https://fonts.googleapis.com/css?family=Lato:100,300,400,400i,700");
}
body {
  font-family: "Lato", sans-serif;
  width: 1140px;
  margin: 0 auto;
}
header {
  display: flex;
  justify-content: space-between;
}
.card {
  border: none;
  background-color: white;
  cursor: pointer;
  padding: 0;
}
.card:hover {
  transform: scale(1.03);
}
</style>