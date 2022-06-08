<template>
<OverlayWrapper>
    <template v-slot:top-content>
      <h1>Sketch.io</h1>
      <div>
        <div v-if="user !== null">Welcome {{ user.login.replace(/^\w/, c => c.toUpperCase()) }}<a @click="logoutHandler">(Logout)</a></div>
        <a v-else @click="modalOpen = true">You need to login in order to be able to draw.</a>
        <div>Active user count: <span ref="userCountText">1</span></div>
        <div v-if="otherNames.length > 0">
          Other active users: <span v-for="name of otherNames" :key="name" style="margin-left: 0.25em">{{ name }}</span>
        </div>
      </div>
    </template>
    <template v-slot:main-content>
      <MainCanvas ref="canvas" @canvas-click="onCanvasClick" @canvas-draw="onCanvasDraw" :settings="drawSettings"/>
    </template>
    <template v-slot:left-content>
      <DrawingSettings @settings-changed="onSettingsChange" @clear-canvas="onClearCanvas" @save-canvas="onCanvasSave"/>
    </template>
  </OverlayWrapper>
  <LoginModal @access-token-acquired="tokenAcquired" :modalOpen="modalOpen"/>
  <NotificationList />
</template>

<script setup>
import { ref } from "vue";

const canvas = ref(null);
const userCountText = ref("");
</script>
<script>
import MainCanvas from "@/components/MainCanvas";
import DrawingSettings from "@/components/DrawingSettings/DrawingSettings";
import OverlayWrapper from "@/assets/UI/OverlayWrapper";
import LoginModal from './components/LoginModal/LoginModal';
import config from "@/config";
import NotificationList from "./components/UI/Notifications/NotificationList";
import { notify } from "./notification";
export default {
  name: 'App',

  components: {
    MainCanvas,
    DrawingSettings,
    OverlayWrapper,
    LoginModal,
    NotificationList
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
      modalOpen: true,
      otherNames: []
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
    this.connection.onopen = function() {
      console.log("Successfully connected to the websocket server...");   
      const accessToken = localStorage.getItem("accessToken");
        if(accessToken){
          this.component.sendInitializeMessage(accessToken);
        }
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
        notify("Handshake between you and server couldn't be established.", "danger");
        return
      }
      this.drawSettings.canDraw = true;
      this.user = user;
      this.accessToken = token;
      this.modalOpen = false;
    },

    usersChanged({userCount, names}){
      this.userCountText.innerText = userCount;
      if(userCount > 1){
        const selfIndex = names.findIndex((name) => name === this.user.login);
        this.otherNames.splice(selfIndex, 1);
      }
    },

    draw(drawData){
      this.canvas.drawForeign(drawData);
    },

    imageInit(){
      const image = new Image();
      image.src = `http://${config.hostAddress}/canvas.png`;
      image.onload = () => {
        this.canvas.drawInitialImage(image);
      };
    },

    tokenAcquired(token){
      localStorage.setItem("accessToken", token);
      this.sendInitializeMessage(token);
    },

    sendInitializeMessage(token){
      this.connection.send(JSON.stringify({
        event: "initialize",
        data: {
          token
        }
      }));
    },

    logoutHandler(){
      localStorage.removeItem("accessToken");
      this.accessToken = null;
      location.reload();
    },

    onClearCanvas({foreign}){
      if(!foreign){
        this.connection.send(JSON.stringify({
          event: "onClearCanvas",
          data: {
            bearer: this.accessToken,
          }
      }));
      }
      this.canvas.clearCanvas();
    },

    onCanvasSave(){
      const download = document.createElement('a');
      download.href = `http://${config.hostAddress}/canvas.png`;
      download.download = "canvas.png";
      document.body.appendChild(download);
      download.click();
      document.body.removeChild(download);
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

a{
  cursor: pointer;
}

a:hover{
  text-decoration: underline;
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
