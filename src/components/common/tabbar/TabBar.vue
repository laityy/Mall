<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
#tab-bar {
  display: flex;
  align-items: center;
  text-align: center;
  height: 49px;
  background-color: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>