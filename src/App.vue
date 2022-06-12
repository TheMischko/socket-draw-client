<template>
  <OverlayWrapper>
    <template v-slot:top-content>
      <h1>Sketch.io</h1>
      <div>
        <div v-if="userInfo !== null">Welcome {{ userInfo.login.replace(/^\w/, c => c.toUpperCase()) }}<a @click="logoutHandler">(Logout)</a></div>
        <a v-else @click="modalOpen = true">You need to login in order to be able to draw.</a>
        <div>Active user count: {{usersCount}}</div>
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
  <LoadingOverlay :show="showLoading" />
</template>

<script setup>
import MainCanvas from "@/components/MainCanvas";
import DrawingSettings from "@/components/DrawingSettings/DrawingSettings";
import OverlayWrapper from "@/assets/UI/OverlayWrapper";
import LoginModal from './components/LoginModal/LoginModal';
import LoadingOverlay from './assets/UI/LoadingOverlay';
import config from "@/config";
import NotificationList from "./components/UI/Notifications/NotificationList";
import { notify } from "./notification";
import { ref } from "vue";


/** @type {WebSocket} */
const connection = ref(null);
const userInfo =  ref(null);

const accessToken = ref("");
// eslint-disable-next-line
const canvas = ref(null);
// eslint-disable-next-line
const usersCount = ref(1);
const otherNames = ref([]);
let modalOpen = ref(true);
const drawSettings = ref({
  canDraw: false
});
const showLoading = ref(true);


console.log(`Starting connection to WebSocket Server ws://${config.hostAddress}`);
connection.value = new WebSocket(`ws://${config.hostAddress}`);
connection.value.onmessage = function(event) {
  const message = JSON.parse(event.data);
  try {
    websocketHandlers[message.event](message.data);
  } catch (ex) {
    console.log(`No handler for "${message.event}"`);
    console.log(ex);
  }
}
connection.value.onopen = function() {
  console.log("Successfully connected to the websocket server...");   
  showLoading.value = false;
  const loadedToken = localStorage.getItem("accessToken");
    if(loadedToken){
      sendInitializeMessage(loadedToken);
    }
}
// eslint-disable-next-line
const onCanvasClick = (pos) => {
  connection.value.send(JSON.stringify({
    event: "click",
    data: {
      pos: pos
    }
  }));
}
// eslint-disable-next-line
const onSettingsChange = (settings) => {
  const canDraw = drawSettings.value.canDraw;
  drawSettings.value = settings;
  drawSettings.value.canDraw = canDraw;
}
// eslint-disable-next-line
const onCanvasDraw = (data) => {
  connection.value.send(JSON.stringify({
    event: "draw",
    bearer: accessToken.value,
    data: data
  }));
}
// eslint-disable-next-line
const handshake = ({status, user, token}) => {
  if(status === "invalid"){
    notify("Handshake between you and server couldn't be established.", "danger");
    return
  }
  drawSettings.value.canDraw = true;
  userInfo.value = user;
  accessToken.value = token;
  modalOpen.value = false;
}
// eslint-disable-next-line
const usersChanged = ({userCount, names}) => {
  usersCount.value = userCount;
  if(userCount > 1){
    const selfIndex = names.findIndex((name) => name === userInfo.value.login);
    otherNames.value.splice(selfIndex, 1);
  }
}
// eslint-disable-next-line
const draw = (drawData) => {
  canvas.value.drawForeign(drawData);
}
// eslint-disable-next-line
const imageInit = () =>{
  const image = new Image();
  image.src = `http://${config.hostAddress}/canvas.png`;
  image.onload = () => {
    try{
      canvas.value.drawInitialImage(image);
    } catch(err) {
      console.error("Problem with canvas initializing.");
      console.log(err);
    }
  };
}
// eslint-disable-next-line
const tokenAcquired = (token) => {
  localStorage.setItem("accessToken", token);
  sendInitializeMessage(token);
}

const sendInitializeMessage = (token) => {
  connection.value.send(JSON.stringify({
    event: "initialize",
    data: {
      token
    }
  }));
}
// eslint-disable-next-line
const logoutHandler = () => {
  localStorage.removeItem("accessToken");
  accessToken.value = null;
  location.reload();
}
// eslint-disable-next-line
const onClearCanvas = ({foreign}) => {
  if(foreign == false){
    connection.value.send(JSON.stringify({
      event: "onClearCanvas",
      data: {
        bearer: accessToken,
      }
  }));
  }
  canvas.value.clearCanvas();
}
// eslint-disable-next-line
const onCanvasSave = () => {
  const download = document.createElement('a');
  download.href = `http://${config.hostAddress}/canvas.png`;
  download.download = "canvas.png";
  document.body.appendChild(download);
  download.click();
  document.body.removeChild(download);
}

const websocketHandlers = {
  "handshake": handshake,
  "usersChanged": usersChanged,
  "imageInit": imageInit,
  "onClearCanvas": onClearCanvas,
  "draw": draw
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
