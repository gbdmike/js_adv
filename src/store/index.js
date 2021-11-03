import Vue from 'vue'
import Vuex from 'vuex'
const API_URL = 'http://localhost:8080/'

Vue.use(Vuex)

export default new Vuex.Store({
  //глобальные свойства для всего приложения
  //к state обращаемся через getters и mutations
  state: {
    goods: [], //исходныый список товаров
    cartGoods: [], //массив корзины
    filteredGoods: [], //список товаров после фильтрации
    // imgCatalog: '../assets/images/', //картинка карточки товара большая
    // imgCart: 'https://formaoxrany.ru/img/goods/nophoto.jpg' //картинка карточки товара в корзине
  },
  //предоставляют доступ на чтение к state
  //getters вызываем через getters
  getters: {
    getGoods: (state) => state.filteredGoods,
    getCart: (state) => state.cartGoods,
    // imgList:  (state) => state.imgCatalog,
    // imgCart: (state) => state.imgCart
  },
  //предоставляют доступ на запись к state
  //mutations вызываем через commit
  mutations: {
    //второй пар-тр это то, что мы хотим записать (goods)
    addGood: (state, good) => {
      if(state.cartGoods.length) {
        let prod = false;
        state.cartGoods.map(function (item) {
          if(item.id_product === good.id_product) {
            prod = true;
            item.quantity++
          }
        })
        if (!prod) {
          state.cartGoods.push(good)
        }
      } else {
        state.cartGoods.push(good)
      }
    },
    removeFromCart: (state, index) => {
      state.cartGoods.splice(index, 1)
    },
    setGoods: (state, goods) => {
      state.goods = goods,
      state.filteredGoods = goods
    },
    setFiltered: (state, filteredGoods) => {
      state.filteredGoods = filteredGoods
    }
  },
  //функции на получение данных с сервера/ делать что-то асинхронное
  //actions вызываем через dispatch
  actions: {
    loadgoods({commit}) {
      //вызываем метод fetch и передаем URL и catalogData.json
      //fetch возвращает promise
      return fetch(`${API_URL}catalogData`)
        // распарсим JSON-строку, которая к нам придет
        //request.json тоже возвращает promise, поэтому делаем
        //второй блок .then
        .then((request) => request.json())
        //приходят данные, которые распарсили из JSON-строки
        //и их нужно поместить в this.goods и filtered.goods
        .then((data) => {
          commit('setGoods', data) //data передается во второй пар-тр setGoods (goods)
          return data;
        })
    },
    addToGood({commit}, good) {
      fetch (API_URL+'addToCart', {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify(good)
      })
      .then(() => {
        commit('addGood', good)
      })
    },
    deleteFromCart({commit}, index) {
      commit('removeFromCart', index)
    },
    filters({commit, state}, searchLine) {
      let regexp = new RegExp(searchLine, "i");
      commit('setFiltered', state.goods.filter((el) => regexp.test(el.product_name)))
    }
  },
  modules: {
  }
})