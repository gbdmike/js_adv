import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../components/GoodsList'
import Cart from '../views/Cart.vue'
import Order from '../views/OrderCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    props: true
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
