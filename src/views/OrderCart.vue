<template>
<div>
<div class="table-responsive">
    <CartItem
      class="cart-item"
      v-for="(item, index) of cart"
      :key="item.id_product"
      :img="img"
      
      @deleteFromCart="deleteFromCart(index)"
    ></CartItem>
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    
                    <th>{{cart.product_name}}</th>
                    <th>{{cart.price}}</th>
                    <th>{{cart.quantity}}</th>
                    <th>Сумма</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="cart">
                <tr><td colspan="6"><img src="" alt=""></td></tr>
            </tbody>
        </table>
    </div>
    <div>Итого: <span id="total-cart-summa">0</span> $</div>
    <br>
    <button id="order" class="btn btn-info">Оформить заказ</button>
</div>

</template>

<script>
export default {
    
  data() {
    return {
        cart: this.$store.getters.getCart
    };
  },
  computed: {

  },
  methods: {
    deleteFromCart() {
      this.$emit('deleteFromCart')
    }
  }
};
</script>