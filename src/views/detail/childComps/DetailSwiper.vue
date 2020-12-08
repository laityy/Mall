<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item v-for="item in topImages" :key="item" class="swiper-item">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>