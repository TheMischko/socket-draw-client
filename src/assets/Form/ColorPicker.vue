<template>
  <div class="color-picker-wrapper">
    <input type="color" ref="input" @change="onInputChange" :value="color1"/>
    <div id="secondColor" ref="secondColorDiv"></div>
    <button id="switchButton" @click="onSwitchClick">⇆</button>
  </div>
</template>

<script>
export default {
  name: "ColorPicker",
  emits:{
    "value-changed": null
  },
  data() {
    return {
      color1: "#000000",
      color2: "#FFFFFF"
    }
  },
  mounted() {
    this.$refs.input.value = this.color1;
    this.$refs.secondColorDiv.style.backgroundColor = this.color2;
  },
  methods: {
    getValue(){
      return this.color1;
    },
    onSwitchClick(){
      this.switchColors();
      this.$emit("value-changed", this.color1);
    },
    onInputChange(){
      this.color1 = this.$refs.input.value;
      this.$emit("value-changed", this.color1);
    },
    switchColors(){
      const tmp = this.color2;
      this.color2 = this.color1;
      this.color1 = tmp;
      this.$refs.secondColorDiv.style.backgroundColor = this.color2;
    }
  }
}
</script>

<style scoped>
input {
  position: relative;
  z-index: 2;
  -webkit-appearance: none;
  width: 36px;
  height: 36px;
  padding: 0;
  top: 36px;
  left: -24px;
}
input::-webkit-color-swatch-wrapper{
  padding: 0;
  margin: 0;
}
input::-webkit-color-swatch{
  border: 1px solid lightgray;
}

.color-picker-wrapper{
  width: 100%;
  height: 100%;
}
#secondColor{
  width: 34px;
  height: 34px;
  border: 1px solid lightgray;
  position: relative;
  top: 12px;
  left: 40px;
}
#switchButton{
  position: relative;
  top: -20px;
  left: -40px;
  background: none;
  border: none;
  box-shadow: none;
}

</style>