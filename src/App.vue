<template>
  <OverlayWrapper>
    <template v-slot:top-content>
      <h1>Sketch.io</h1>
      <div>Active user count: <span ref="userCountText">1</span></div>
    </template>
    <template v-slot:center-content>
      <MainCanvas ref="canvas" @canvas-click="onCanvasClick" @canvas-draw="onCanvasDraw" :settings="drawSettings"/>
    </template>
    <template v-slot:left-content>
      <DrawingSettings @settings-changed="onSettingsChange"/>
    </template>
  </OverlayWrapper>

</template>

<script>
import MainCanvas from "@/components/MainCanvas";
import DrawingSettings from "@/components/DrawingSettings/DrawingSettings";
import OverlayWrapper from "@/assets/UI/OverlayWrapper";
import config from "@/config";

export default {
  name: 'App',
  components: {
    MainCanvas,
    DrawingSettings,
    OverlayWrapper
  },
  data: function () {
    return {
      /** @type {WebSocket} */
      connection: null,
      drawSettings: {}
    }
  },
  created: function() {
    console.log(`Starting connection to WebSocket Server ws://${config.hostAddress}`);
    this.connection = new WebSocket(`ws://${config.hostAddress}`);
    this.connection.component = this;
    this.connection.onmessage = function(event) {
      const message = JSON.parse(event.data);
      try {
        this.component[message.event](message.data);
      } catch (ex) {
        console.log(`No handler for "${message.event}"`);
        console.log(ex);
      }
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the websocket server...")
    }
  },
  methods: {
    onCanvasClick(pos){
      this.connection.send(JSON.stringify({
        event: "click",
        data: {
          pos: pos
        }
      }));
    },
    onSettingsChange(settings){
      this.drawSettings = settings;
    },
    onCanvasDraw(data){
      this.connection.send(JSON.stringify({
        event: "draw",
        data: data
      }));
    },
    usersChanged({userCount}){
      this.$refs.userCountText.innerText = userCount;
    },
    draw(drawData){
      this.$refs.canvas.drawForeign(drawData);
    },
    imageInit(){
      const image = new Image();
      image.src = `http://${config.hostAddress}/canvas.png`;
      image.onload = () => {
        this.$refs.canvas.drawInitialImage(image);
      };

    }
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
