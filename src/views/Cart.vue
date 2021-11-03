<template>
  <div class="cart-block">
    <p v-if="!cart_data.length">Корзина пуста</p>
    <CartItem
      class="cart-item"
      v-for="(item, index) of cart_data"
      :key="item.id_product"
      :img="img"
      :cart_item="item"
      @deleteFromCart="deleteFromCart(index)"
    ></CartItem>
    <div class="cart__total">
              <h3>TOTAL</h3>
              <p>$ {{cartTotalItem}}</p>
            </div>
            <div class="cart__button" v-if="cart_data.length">
              <button class="cart__button_checkout">Checkout</button>
              <router-link :to="{name: 'Order', params: {cart_data:this.$store.getters.getCart}}">
              <button class="cart__button_gotocart" v-if="cart_data.length">Go to cart</button>
              </router-link>
            </div>
    
    
  </div>
</template>

<script>
import CartItem from "../components/CartItem.vue";
import Order from './OrderCart.vue'
export default {
  components: {
    CartItem,
    Order
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      },
    },
    img: String,
  },
  methods: {
    deleteFromCart(index) {
      this.$store.dispatch('deleteFromCart', index)
    },
  },
  computed: {
    cartTotalItem() {
      let result = [];
      if (this.cart_data.length) {
        for (let item of this.cart_data) {
          result.push(item.quantity * item.price);
        }
        result = result.reduce(function (sum, el) {
          return sum + el;
        });
        return result;
      } else {
        return 0;
      }
    }
  }
};
</script>

<style>
.img-small {
  width: 75px;
  height: 85px;
}
.cart__total {
  display: flex;
  justify-content: space-between;
  color: #222222;
  font-family: Lato;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  padding-top: 19px;
  padding-bottom: 32px;
}
.cart__button {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.cart__button_checkout {
  color: #f16d7f;
  font-family: Lato;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  background-color: #ffffff;
  border: 1px solid #f16d7f;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  padding: 19px 74px;
  transition: all 0.3s;
}
.cart__button_checkout:hover {
  background-color: #f16d7f;
  color: #ffffff;
}
.cart__button_gotocart {
  color: #4a4a4a;
  font-family: Lato;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  padding: 19px 85px;
  margin-top: 11px;
  margin-bottom: 10px;
  transition: all 0.3s;
}
.cart__button_gotocart:hover {
  background-color: #f16d7f;
  color: #ffffff;
  border: 1px solid #f16d7f;
}
</style>