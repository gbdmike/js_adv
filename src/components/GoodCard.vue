<template>
  <div class="container">
		<div class="products-box">
			<div class="block">
				<a href="#" class=""><img class="products-bottom" :src="require(`@/assets/images/${product.img}`)" alt="image"></a>
				<p><a href="singlepage.html" class="text-products">{{ product.product_name }}</a></p>
				<p class="price-products">{{ product.price }} $</p>
				<a class="products__add" @click="addToCart" href="#">Add to Cart</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    addToCart() {
      this.$emit('addToCart', this.product);
    }
  }
};
</script>

<style>
a {
    text-decoration: none;
}
.products-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 60px;
}

.block {
  /* position: relative; */
  width: 263px;
  margin-bottom: 39px;
}

.block:hover {
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.16);
  transform: scale(1.03);
}

.block:hover .products__add {
  display: block;
}

.products__add:hover {
  box-shadow: 0 0 5px #fff;
  transform: scale(1.03);
}

.block:hover .products-bottom {
  filter: brightness(50%);
}

.products__add {
  display: none;
  width: 123px;
  height: 39px;
  line-height: 39px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid #fff;
  position: absolute;
  top: 98px;
  left: 70px;
  text-align: center;
}

.text-products {
  color: #222222;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  margin-left: 15px;
}

.price-products {
  color: #f16d7f;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 17px;
  margin-left: 15px;
  margin-bottom: 20px;
}

.products-bottom {
  margin-bottom: 20px;
  width: 100%;
}

.text-products:hover, .text-first-products:hover {
  color: #f16d7f;
}
</style>