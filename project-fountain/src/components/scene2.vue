<template>
  <div>
    <Scene v-model="myScene" ref="scene" @keydown.native="keyHandlerDown" @complete="sceneComplete" >
      <Ground v-model="myGround" :options="{ height: 1000, width: 1000 }">
      </Ground>
    </Scene>
  </div>
</template>


<script>
import '@babylonjs/loaders';
import { Scene, Ground} from 'vue-babylonjs';
import * as BABYLON from "@babylonjs/core"
import particles from "../../public/particles.json"


export default {
  name: 'fountain-scene',
  components: { Scene, Ground },
  data: () => ({
    myScene: null,
    myGround: null,
    particles: particles
  }),
  watch: {
  },
  methods: {
    sceneComplete(scene) {
      let system = BABYLON.ParticleSystem.Parse(this.particles, scene.scene, "");
      system.emitter = this.myGround;
      system.start();
    },
    keyHandlerDown(){}
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: Robote, Charcoal, sans-serif;
}
</style>
