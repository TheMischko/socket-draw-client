<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {
  name: "CardWrapper"
}
</script>

<style scoped>
.card{
  background: white;
  padding: 1em;
  box-shadow: 10px 10px black;
  border: 4px solid black;
  margin: 0.25em;
  width: auto;
}
</style>