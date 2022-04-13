<style>
  .drawing-settings{
    min-width: 250px;
  }
  .settings-row{
    margin: 0.5rem 0;
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
        <label>Brush size:</label>
        <input type="range" min="1" max="100" value="5" class="slider" ref="brushSizeInput" @change="onChange">
        <div class="value"><span ref="brushSizeText">?</span> px</div>
      </div>
      <div class="settings-row">
        <label>Brush type:</label>
        <BrushRadioGroup ref="brushRadioGroup" @value-changed="onChange"/>
      </div>
      <div class="settings-row">
        <label>Color:</label>
        <input type="color" class="color-picker" ref="colorInput" @change="onChange">
        <div class="value"><span ref="colorInputText">?</span></div>
      </div>
    </div>
  </CardWrapper>
</template>

<script>
import CardWrapper from "@/assets/UI/CardWrapper";
import BrushRadioGroup from "@/assets/Form/BrushRadioGroup";

export default {
  name: "DrawingSettings",
  components: {CardWrapper, BrushRadioGroup},
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
        color: this.$refs.colorInput.value
      }

      console.log(this.settings);

      this.$refs.brushSizeText.innerText = this.settings.brushSize
      this.$refs.colorInputText.innerText = this.settings.color

      this.$emit('settings-changed', this.settings);
    }
  }
}
</script>