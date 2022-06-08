<template>
  <div class="radio-group">
    <div class="radio-wrapper selected" @click="onClick">
      <input type="radio" value="solidBrush" name="brushType" id="solidBrush">
      <label for="solidBrush"><SolidBrushIcon fill="#000000"/></label>
    </div>
    <div class="radio-wrapper" @click="onClick">
      <input type="radio" value="softBrush" name="brushType" id="softBrush">
      <label for="softBrush"><SoftBrushIcon/></label>
    </div>
  </div>
</template>

<script>
import SolidBrushIcon from "@/assets/Icon/SolidBrushIcon";
import SoftBrushIcon from "@/assets/Icon/SoftBrushIcon";

export default {
  name: "BrushRadioGroup",
  components: {
    SolidBrushIcon, SoftBrushIcon
  },
  emits: {
    "value-changed": null
  },
  methods: {
    onClick(e){
      e.stopPropagation();
      let target = e.target;

      document.querySelectorAll(".radio-wrapper").forEach((element) => {
        element.classList.remove("selected");
      });
      target.classList.add("selected");

      document.querySelectorAll('input[name="brushType"]').forEach((element) => {
        element.checked = false;
      });

      target.childNodes.forEach((childNode) => {
        if(childNode.tagName === "INPUT"){
          this.$emit("value-changed", childNode.value);
        }
      });
    },
    getValue(){
      const selectedInput = document.querySelector('.radio-wrapper.selected > input');
      return selectedInput.value;
    }
  }
}
</script>

<style scoped>
  input {
    display: none;
  }
  .radio-group{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .radio-wrapper{
    width: 32px;
    height: 32px;
    padding: 6px;
    border: 1px solid lightgray;
    border-radius: 1px;
    box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.1);
    background-color: white;
    margin: 2px;
    cursor: pointer;
  }
  .radio-wrapper *{
    pointer-events: none;
  }
  .radio-wrapper.selected{
    background: lightblue;
    border-color: #90cee2;
    box-shadow: -1px -1px 1px 0 rgba(15, 85, 97, 0.1);
  }
</style>