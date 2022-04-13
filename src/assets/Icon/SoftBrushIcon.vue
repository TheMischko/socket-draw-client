<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
    <defs>
      <radialGradient id="softBrushGradient" cx="16" cy="16" r="16" gradientUnits="userSpaceOnUse">
        <stop offset="0"/>
        <stop offset="0.23" stop-color="#040404"/>
        <stop offset="0.43" stop-color="#0f0f0f"/>
        <stop offset="0.63" stop-color="#212121"/>
        <stop offset="0.67" stop-color="#262626"/>
        <stop offset="0.7" stop-color="#2e2e2e"/>
        <stop offset="0.75" stop-color="#444"/>
        <stop offset="0.81" stop-color="#676767"/>
        <stop offset="0.88" stop-color="#989898"/>
        <stop offset="0.96" stop-color="#d6d6d6"/>
        <stop offset="1" stop-color="#fff"/>
      </radialGradient>
    </defs>
    <title>Soft brush icon</title>
    <circle cx="16" cy="16" r="16" fill="url(#softBrushGradient)"/>
  </svg>
</template>

<script>
export default {
  name: "SoftBrushIcon"
}
</script>

<style scoped>

</style>