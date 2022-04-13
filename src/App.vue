<template>
  <MainCanvas ref="canvas" @canvas-click="onCanvasClick" @canvas-draw="onCanvasDraw" :settings="drawSettings"/>
  <DrawingSettings @settings-changed="onSettingsChange"/>
  <div>Active user count: <span ref="userCountText">1</span></div>
</template>

<script>
import MainCanvas from "@/components/MainCanvas";
import DrawingSettings from "@/components/DrawingSettings/DrawingSettings";
import config from "@/config";

export default {
  name: 'App',
  components: {
    MainCanvas,
    DrawingSettings
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
  background: lightblue;
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
