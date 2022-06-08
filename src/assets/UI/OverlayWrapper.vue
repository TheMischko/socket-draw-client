<template>
<div class="overlay">
  <div class="top">
    <slot name="top-content"></slot>
  </div>
  <div ref="leftBar" class="left" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <slot name="left-content"></slot>
  </div>
  <div class="main">
    <slot name="main-content"></slot>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';

const leftBar = ref(null);
const onMouseEnter = () => {
  leftBar.value.classList.add("state-hover");
}

const onMouseLeave = () => {
  leftBar.value.classList.remove("state-hover");
}
</script>

<style>
.overlay {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100px auto;
}
.top{
  grid-row-start: 1;
  grid-row-end: 2;
  
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100%;


  padding: 10px 10%;
  background: black;
  color: white;
}
.top > *:first-child{
  text-align: left;
  margin: 0;
}
.top > *:last-child{
  text-align: right;
}
.main{
  grid-row-start: 2;
  grid-row-end: 3;
}
.left{
  display: block;
  position: absolute;
  z-index: 2;
  top: 150px;
  left: 0;

  transform: translateX(-280px);
  transition: all 0.25s ease;
}
.left.state-hover{
  transform: translateX(0);
}
</style>