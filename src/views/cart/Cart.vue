<template>
  <div id="cart">
    <nav-bar>
      <template v-slot:center>购物车</template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  components: {
    NavBar,
  },
};
</script>

<style>
</style>