<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.link" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
}
</style>