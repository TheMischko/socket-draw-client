<style>
canvas{
  margin: auto;
  width: 1920px;
  height: 980px;
  border-radius: 3px;
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>✏️</text></svg>") 4 26, auto;
  box-shadow: 5px 5px 4px 4px rgba(0,0,0,0.33);
  background-color: white;
  padding: 2px;
}
.center{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div>
    <canvas @click="canvasClick" @mousedown="drawStart" ref="canvas" @resize="onResizeHandler"></canvas>
  </div>
</template>

<script>

export default {
  name: "MainCanvas",
  props: {
    settings: Object
  },
  data(){
    return {
      coord: {
        x: 0,
        y: 0
      },
      /** @type {CanvasRenderingContext2D} */
      ctx: null
    }
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d');
    window.addEventListener('mouseup', this.drawStop);
    this.resize();
  },
  emits: {
    "canvas-click": null,
    "canvas-draw": null
  },
  methods: {
    canvasClick(e) {
      this.reposition(e)
      this.$emit('canvas-click', this.coord);
    },
    drawStart(event) {
      this.$el.addEventListener("mousemove", this.draw);
      this.reposition(event);
    },
    drawStop() {
      this.$el.removeEventListener("mousemove", this.draw);
    },
    resize(){
      this.ctx.canvas.width = 1920;
      this.ctx.canvas.height = 980;
    },
    reposition(event) {
      this.coord.x = event.clientX - this.$el.offsetLeft;
      this.coord.y = event.clientY - this.$el.offsetTop;
    },
    draw(event) {
      this.ctx.beginPath();
      this.ctx.lineWidth = this.settings.brushSize;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = this.settings.color;
      const moveTo = [this.coord.x, this.coord.y]
      this.ctx.moveTo(this.coord.x, this.coord.y);
      this.reposition(event);
      this.ctx.lineTo(this.coord.x, this.coord.y);
      this.ctx.stroke();

      this.$emit('canvas-draw',{
        settings: {
          brushSize: this.settings.brushSize,
          color: this.settings.color
        },
        moveTo: {
          x: moveTo[0],
          y: moveTo[1]
        },
        lineTo: {
          x: this.coord.x,
          y: this.coord.y
        }
      })
    },
    drawForeign({settings, lineTo, moveTo}) {
      this.ctx.beginPath();
      this.ctx.lineWidth = settings.brushSize;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = settings.color;
      this.ctx.moveTo(moveTo.x, moveTo.y);
      this.ctx.lineTo(lineTo.x, lineTo.y);
      this.ctx.stroke();
    },
    /**
     *
     * @param image {HTMLImageElement}
     */
    drawInitialImage(image) {
      void(image);
      this.ctx.drawImage(image, 0, 0, 1920, 980);
    },

    onResizeHandler() {
      console.log("resize");
    },

    clearCanvas(){
      this.ctx.clearRect(0,0,1920,980);
    }
  }
}
</script>