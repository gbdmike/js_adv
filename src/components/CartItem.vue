<template>
<div>
   
    <div class="cart-item">
      <div class="product-bio">
        <img
          class="img-small"
          :src="require(`@/assets/images/${cart_item.img}`)"
          alt="Some image"
        />
      </div>

        <div class="product-desc">
          <p class="product-title">{{ cart_item.product_name }}</p>
          <p class="product-quantity">{{ cart_item.quantity }}<span class="product-single-price"> X </span>${{ cart_item.price }}</p>
          <!-- <p class="product-single-price">$ {{ cart_item.price }}</p> -->
        </div>
      <!-- </div> -->
      <div class="right-block">
        <p class="product-price">$ {{cart_item.quantity * cart_item.price}}</p>
        <button class="del-btn" @click="deleteFromCart">&times;</button>
      </div>
    </div>
   
</div>
  
</template>

<script>
export default {
  props: {
    cart_item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {

  },
  methods: {
    deleteFromCart() {
      this.$emit('deleteFromCart')
    }
  },
  mounted() {
    this.$set(this.cart_item, 'quantity', 1)
  }
};
</script>

<style>
.cart-item {
  display: flex;
  justify-content: space-between;
}
.cart-item:not(:last-child) {
  margin-bottom: 20px;
}
.cart-item img {
  align-self: flex-start;
  margin-right: 15px;
}
.cart-block {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.62);
  border-radius: 5px;
  box-sizing: border-box;
  right: 5px;
  top: 11%;
  position: absolute;
  background-color: white;
  padding: 20px;
  color: black;
  width: 300px;
}
.cart-block:before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  top: -10px;
  right: 110px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
}
.product-title{
  color: #222222;
  font-family: Lato;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}
.product-desc {
  max-width: 150px;
}
.product-quantity {
  color: #f16d7f;
  font-family: Lato;
  font-size: 10px;
}
.product-single-price {
  color: #f16d7f;
  font-family: Lato;
  font-size: 10px;
}
.right-block {
  text-align: right;
}
.product-price {
  margin-left: 30px;
}
.del-btn {
  margin-top: 5px;
  background-color: #ffffff;
  padding: 0px 5px;
  border: 1px solid #eaeaea;
  color: #4a4a4a;
  border-radius: 20px;
  transition: all 0.3s;
  cursor: pointer;
}
.del-btn:hover {
  background-color: #f16d7f;
  color: #ffffff;
  border: 1px solid #fff;
}
.img-small {
  width: 100px;
  height: 100px;
}
</style>