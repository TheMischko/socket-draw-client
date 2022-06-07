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
  <LoginModal />
</template>

<script>
import MainCanvas from "@/components/MainCanvas";
import DrawingSettings from "@/components/DrawingSettings/DrawingSettings";
import OverlayWrapper from "@/assets/UI/OverlayWrapper";
import LoginModal from './components/LoginModal/LoginModal';
import config from "@/config";
export default {
  name: 'App',
  components: {
    MainCanvas,
    DrawingSettings,
    OverlayWrapper,
    LoginModal
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

<style lang="css">
@font-face {
  font-family: Bebas;
  src: url("../public/fonts/Bebas-Regular.otf");
}

h1{
  display: block;
  width: 100%;

  text-align: center;

  font-family: Bebas;
  font-size: 64px;
  
}

button{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0.5em;
  margin: 0.5em;

  border: 2px solid black;
  box-shadow: 5px 5px black;

  cursor: pointer;
  font-weight: bold;
}

form{
  margin-bottom: 1em;
}

html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
*{
  font-size: 20px;
}
</style>
