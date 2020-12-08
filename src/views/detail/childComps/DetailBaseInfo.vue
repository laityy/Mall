<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222;
}
.info-price {
  position: relative;
  margin-top: 10px;
}
.info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.info-price .discount {
  position: absolute;
  bottom: 7px;
  font-size: 10px;
  color: #ffffff;
  background-color: var(--color-high-text);
  padding: 2px 4px;
  border-radius: 8px;
}
.info-other {
  font-size: 13px;
  padding-top: 20px;
  padding-bottom: 7px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.info-service {
  display: flex;
  justify-content: space-between;
  color: #222;
  font-size: 13px;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.info-service img {
  width: 12px;
  height: 12px;
}
.info-service-item {
  flex: 1;
}
</style>