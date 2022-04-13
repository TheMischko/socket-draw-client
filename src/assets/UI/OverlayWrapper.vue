<template>
<div class="overlay">
  <div class="top">
    <slot name="top-content"></slot>
  </div>
  <div class="left">
    <slot name="left-content"></slot>
  </div>
  <div class="center">
    <slot name="center-content"></slot>
  </div>
  <div class="right">
    <slot name="right-content"></slot>
  </div>
  <div class="bottom">
    <slot name="bottom-content"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "StaticWrapper"
}
</script>

<style scoped>
.overlay {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 350px auto 250px;
  grid-template-rows: 100px auto 100px;
}
.top{
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
}
.left{
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
  margin: 0 0 0 auto;
}
.right{
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
}
.center{
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
}
.bottom{
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
}
</style>