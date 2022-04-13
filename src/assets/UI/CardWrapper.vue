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
  box-shadow: 2px 2px 4px 2px rgba(0,0,0,0.25);
  border-radius: 5px;
  margin: 0.5em;
  width: auto;
}
</style>