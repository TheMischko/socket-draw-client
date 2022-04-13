<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
    <title>Solid brush icon</title>
    <circle cx="16" cy="16" r="16" :fill="fill"/>
  </svg>
</template>

<script>
export default {
  name: "SolidBrushIcon",
  props: {
    fill: String
  }
}
</script>

<style scoped>

</style>