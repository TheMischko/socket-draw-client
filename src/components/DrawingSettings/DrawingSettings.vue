<style>
  .drawing-settings{
    width: 250px;
  }
  .settings-row{
    margin: 0.5rem 0;
  }
  .row{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  label{
    display: block;
    width: 100%;
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .slider{
    display: inline-block;
    width: 70%;
  }
  .value{
    display: inline-block;
    width: auto;
    margin-left: 0.5rem;
  }
  .noselect{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

<template>
  <CardWrapper>
    <div class="drawing-settings noselect">
      <div class="settings-row">
        <label>Brush size: <span ref="brushSizeText">?</span> px</label>
        <input type="range" min="1" max="100" value="5" class="slider" ref="brushSizeInput" @change="onChange">
      </div>
      <div class="settings-row">
        <label>Brush type:</label>
        <BrushRadioGroup ref="brushRadioGroup" @value-changed="onChange"/>
      </div>
      <div class="settings-row row">
        <label>Color:</label>
        <ColorPicker ref="colorInput" @value-changed="onChange"></ColorPicker>
      </div>
    </div>
  </CardWrapper>
</template>

<script>
import CardWrapper from "@/assets/UI/CardWrapper";
import BrushRadioGroup from "@/assets/Form/BrushRadioGroup";
import ColorPicker from "@/assets/Form/ColorPicker";

export default {
  name: "DrawingSettings",
  components: {CardWrapper, BrushRadioGroup, ColorPicker},
  data(){
    return {
      settings: {},
    }
  },
  emits: {
    "settings-changed": null
  },
  mounted() {
    this.onChange();
  },
  methods: {
    onChange(){
      this.settings = {
        brushSize: this.$refs.brushSizeInput.value,
        brushType: this.$refs.brushRadioGroup.getValue(),
        color: this.$refs.colorInput.getValue()
      }

      this.$refs.brushSizeText.innerText = this.settings.brushSize;
      this.$emit('settings-changed', this.settings);
    }
  }
}
</script>