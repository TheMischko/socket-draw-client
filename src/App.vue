<template>
<OverlayWrapper>
    <template v-slot:top-content>
      <h1>Sketch.io</h1>
      <div>
        <div v-if="user !== null">Welcome {{ user.login.replace(/^\w/, c => c.toUpperCase()) }}</div>
        <a v-else @click="modalOpen = true">You need to login in order to be able to draw.</a>
        <div>Active user count: <span ref="userCountText">1</span></div>
      </div>
    </template>
    <template v-slot:main-content>
      <MainCanvas ref="canvas" @canvas-click="onCanvasClick" @canvas-draw="onCanvasDraw" :settings="drawSettings"/>
    </template>
    <template v-slot:left-content>
      <DrawingSettings @settings-changed="onSettingsChange"/>
    </template>
  </OverlayWrapper>
  <LoginModal @access-token-acquired="tokenAcquired" :modalOpen="modalOpen"/>
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
      accessToken: "",
      /** @type {WebSocket} */
      connection: null,
      drawSettings: {
        canDraw: false
      },
      user: null,
      modalOpen: true
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
      const canDraw = this.drawSettings.canDraw;
      this.drawSettings = settings;
      this.drawSettings.canDraw = canDraw;
    },

    onCanvasDraw(data){
      this.connection.send(JSON.stringify({
        event: "draw",
        bearer: this.accessToken,
        data: data
      }));
    },

    handshake({status, user, token}){
      if(status === "invalid"){
        //TO-DO wrong login handler
        return
      }
      this.drawSettings.canDraw = true;
      this.user = user;
      this.accessToken = token;
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
    },

    tokenAcquired(token){
      this.connection.send(JSON.stringify({
        event: "initialize",
        data: {
          token
        }
      }));
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
body{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
#app{
  width: 100%;
  height: 100%;
}
</style>
