<template>
    <div class="search">
      <form class="header__form" action="#" @submit.prevent="submitPrevent">
        <div class="browse">
            <ul class="browse__topmenu">
                <li class="browse__topmenu_position">
                    <a class="browse__main-item"  tabindex="1" href="">Browse</a>
                </li>
            </ul>
        </div>
        <input type="text" placeholder="Search for Item..." v-model="searchLine">
        <button type="submit"><img src="@/assets/images/search.png"></button>
    </form>
  </div>
</template>

<script>
export default {
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
}
</script>


<style>
.header__form {
  display: flex;
  align-items: center;
}
.header__form input {
  border-radius: 0;
  border: 1px solid #e6e6e6;
  width: 245px;
  height: 38px;
  padding-left: 16px;
  padding-right: 16px;
}
.header__form input::webkit-input-placeholder {
  background-color: #fff;
  color: #a4a4a4;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.35px;
}
.header__form button {
  border-radius: 0 3px 3px 0;
  border: 1px solid #e6e6e6;
  border-left: none;
  background-color: #ffffff;
  color: #a4a4a4;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.35px;
  padding: 14px 11px;
  height: 42px;
  cursor: pointer;
}
.header__form button:hover {
  transform: scale(1.03);
}
.button {
  background-color: #f16d7f;
  color: #ffffff;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.38px;
  padding: 12px 19px;
  transition: 0.3s;
}
.button:hover {
  filter: brightness(0.9);
}
.browse__topmenu {
  list-style: none;
}
.browse__topmenu_position {
  position: relative;
  padding: 6px 0 6px 0;
}
.browse__main-item {
  display: inline-block;
  border-radius: 3px 0 0 3px;
  border: 1px solid #e6e6e6;
  border-right: none;
  background-color: #cdcdcc;
  background-image: linear-gradient(to bottom, #f9f9f9 0%, #f5f5f5 100%);
  color: #222222;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.35px;
  padding: 11px 15px;
}
</style>