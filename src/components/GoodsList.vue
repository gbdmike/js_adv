<template>
  <div class="goods-list">
    <GoodCard
      v-for="good of list"
      v-bind:key="good.id_product"
      v-bind:title="good.product_name"
      v-bind:price="good.price"
      v-bind:img="require(`@/assets/images/${good.img}`)"
      :product="good"
      @addToCart="addToCart"
    ></GoodCard>
  </div>
</template>

<script>
import GoodCard from "./GoodCard.vue";
export default {
  components: {
    GoodCard
  },
  computed: {
    list() {
      return this.$store.getters.getGoods;
    }
  },
  methods: {
      addToCart(data) {
        this.$store.dispatch("addToGood", data);
      },
    },
};
</script>

<style>
.goods-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
}
</style>