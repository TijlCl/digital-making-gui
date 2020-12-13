<template>
<v-app>
  <div id="data-app">
    <h1 id="title">The journey of students</h1>
    <div class="noise"></div>
    <fountain-scene class="scene" :start="appStarted"/>
    <div id="loader">
      <!-- <h1 id="title">The journey of students</h1> -->
      <h2 id="loader-text-1">The journey of a student is full of challenges, the few who push through will reach the top</h2>
      <br />
      <h3 id="loader-text-2">Every year hundreds of students start their multec adventure but through the 3 years many of them fall off.</h3>
      <br />
      <h3 id="loader-text-3">This visualisation will take you through their adventure and show how many actually reach graduation.</h3>
      <v-btn @click="start()" id="start-btn" outlined color="white">Start your journey</v-btn>
    </div>
  </div>
</v-app>
</template>

<script>
import { VBtn } from 'vuetify/lib'

import fountainScene from './components/scene.vue'
import { VApp } from 'vuetify/lib'
window.setTimeout(function(){
  var bgOpacity = 1;
  var titleOpacity = 0;
  var text1Opacity = 0;
  var text2Opacity = 0;
  var text3Opacity = 0;
  var BtnOpacity = 0;
  var loopback = false;

function MyFadeFunction() {
  //  if(window.appStarted === false && titleOpacity < 1) {
  //      titleOpacity += .075;
  //  }
   if(window.appStarted === false && text1Opacity < 1) {
       text1Opacity += .03;
   }
   if(window.appStarted === false && text1Opacity >= 0.7 && text2Opacity < 1) {
       text2Opacity += .03;
   }

   if(window.appStarted === false && text2Opacity >= 0.7 && text3Opacity < 1) {
       text3Opacity += .03;
   }

   if(window.appStarted === false && text3Opacity >= 1 && BtnOpacity < 1) {
       BtnOpacity += .075;
   }

   if (window.appStarted === true) {
     titleOpacity += .1;
     text1Opacity -= .1;
     text2Opacity -= .1;
     text3Opacity -= .1;
     BtnOpacity -= .1;
   }

   if (window.appStarted === true && BtnOpacity < 0) {
     bgOpacity -= .05;
   }

   document.getElementById('title').style.opacity = titleOpacity;
   document.getElementById('loader-text-1').style.opacity = text1Opacity;
   document.getElementById('loader-text-2').style.opacity = text2Opacity;
   document.getElementById('loader-text-3').style.opacity = text3Opacity;
   
   
   document.getElementById('start-btn').style.opacity = BtnOpacity;
   document.getElementById('loader').style.opacity = bgOpacity;
   if (bgOpacity < 0) {
    document.getElementById('loader').style.display = 'none';
   }
   if (window.appStarted === false || text1Opacity > 0 || BtnOpacity > 0 || bgOpacity > 0) {
    setTimeout(function(){MyFadeFunction()},100);
   }
}

MyFadeFunction();
}, 3000);



export default {
  name: 'App',
  components: {
    fountainScene,
    VApp,
    VBtn
  },
  data: () => ({
    appStarted: false
  }),
  created() {
    window.appStarted = false;
  },
  methods: {
    start() {
      this.appStarted = true;
      window.appStarted = true;
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

#title {
  font-size: 3.6117381489841986vh;
  position: absolute;
  /* margin-left: auto; */
  /* margin-right: auto; */
  left: 2vw;
  /* right: 0; */
  top: 2vh;
  text-align: center;
  opacity: 0;
  color: white;
}
#loader-text-1 {
  font-size: 3.6117381489841986vh;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 30vh;
  text-align: center;
  opacity: 0;
}

#loader-text-2 {
  font-size: 3.6117381489841986vh;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 40vh;
  text-align: center;
  opacity: 0;
}
#loader-text-3 {
  font-size: 3.6117381489841986vh;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 50vh;
  text-align: center;
  opacity: 0;
}


#loader {
  height: 100vh;
  width: 100vw;
  background-color: rgb(6, 0, 20);
  position: absolute;
  top: 0;
  text-align: center;
  color: white;
  font-family: 'Roboto', sans-serif;
  padding: 70px 0;
  z-index: 10;
}
#start-btn {
  position: absolute;
  top: 60vh;
  left: 45.57vw;
  opacity: 0;
  border: 0;
  font-weight: 900;
}
#start-btn:hover {
  border-bottom: white 1px;
  background-color: none;
}
#loader-text {
  opacity: 0;
}

.noise {
  position: fixed;
    z-index: 50;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    width: 200%;
    height: 200vh;
    background: transparent url('../public/noise.png') repeat 0 0;
    background-repeat: repeat;
    animation: bg-animation .2s infinite;
    opacity: .30;
    visibility: visible;
    overflow-x: hidden;
    overflow-y: hidden;
    pointer-events: none;

    animation: noise .2s infinite;
    

}
@keyframes noise{
  0%{transform:translate(0)}
  10%{transform:translate(-5%,-5%)}
  20%{transform:translate(-10%,5%)}
  40%{transform:translate(-5%,15%)}
  60%{transform:translate(15%)}
  70%{transform:translateY(10%)}
  80%{transform:translate(-15%)}
  to{transform:translate(5%)}}
</style>
