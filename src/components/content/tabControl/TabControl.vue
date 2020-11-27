<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      @click="changeIndex(index)"
      :class="{ active: index === currentIndex }"
    >
      <span>
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
}
.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 6px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 4px solid var(--color-tint);
}
</style>