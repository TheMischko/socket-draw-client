<template>
  <div class="radio-group">
    <div v-for="item in data" class="radio-wrapper" :key="item.id">
      <input type="radio" :value="item.value" :id="item.id">
      <label :for="item.id" @click="onClick">{{ item.text }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioGroup",
  props: {
    data: []
  },
  emits: {
    "value-changed": null
  },
  mounted() {

  },
  methods: {
    onClick(e){
      let target = e.target;
      console.log(target);
    }
  }
}
</script>

<style scoped>
input{
  display: none;
}
</style>