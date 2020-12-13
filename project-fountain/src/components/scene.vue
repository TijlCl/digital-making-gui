<template>
  <div>
    <control-panel />
    <timeline :start="start" />
    <student-amount :start="start" />
    <Scene style="height: 100vh;" v-model="myScene" ref="scene" @keydown.native="keyHandlerDown" @complete="sceneComplete" >
      <Entity :position="[0,2.1,0]">
        <Asset v-model="fountain" v-if="sceneReady" :src="path" :scaling="[1, 1, 1]" >
        </Asset>
      </Entity>
      <Ground v-model="myGround" :options="{ height: 1000, width: 1000 }">
      </Ground>
      <my-camera :scene="myScene" :light="animatedLight" :fountain="fountain" :start="start"/>
      <particles :scene="myScene" :ground="myGround"/>
      <water :scene="myScene" :ground="myGround" :fountain="fountain"/>
      <graduation-hat :scene="myScene"/>
      <school-front :scene="myScene" />
      <first-year :scene="myScene" />
      <second-year :scene="myScene" />
      <third-year :scene="myScene" />
    </Scene>
  </div>
</template>


<script>
import '@babylonjs/loaders';
import { Scene, Asset, Camera, Entity, Animation, DirectionalLight, PointLight, Box, Sphere, Material,SpotLight, HemisphericLight, Ground, Property} from 'vue-babylonjs';
import Fountain from "file-loader!../../public/models/fountain4.babylon"
import Test from "file-loader!../../public/models/test.babylon"
import myCamera from "./MyCamera.vue"
import Particles from "./Particles.vue"
import sceneEventModule from "../store/modules/SceneEvents"
import controlPanel from "./ControlPanel.vue"
import * as BABYLON from "@babylonjs/core"
import Water from './Water.vue';
import GraduationHat from './GraduationHat.vue';
import SchoolFront from './SchoolFront.vue';
import Timeline from './Timeline.vue';
import FirstYear from './FirstYear.vue';
import SecondYear from './SecondYear.vue';
import ThirdYear from './ThirdYear.vue';
import StudentAmount from './StudentAmount.vue';


export default {
  name: 'fountain-scene',
  components: { Scene, Asset, Camera, Entity, Animation, DirectionalLight, PointLight, Box, myCamera, controlPanel, Sphere, Material, SpotLight, HemisphericLight, Ground, Property, Particles, Water, GraduationHat, SchoolFront, Timeline, FirstYear, SecondYear, ThirdYear, StudentAmount },
  mixins: [Entity],
  props: {
    start: Boolean
  },
  data: () => ({
    path: Fountain,
    testpath: Test,
    showFountain: true,
    myCamera: null,
    myLight: null,
    myScene: null,
    beta: 0,
    sceneReady: false,
    myMaterial: null,
    fountain: null,
    myGround: null,
    animatedLight: null,
  }),
  computed: {
    xaxis () {
      return this.$store.getters["sceneEvents/xaxis"];
    },
    yaxis () {
      return this.$store.getters["sceneEvents/yaxis"];
    },
    zaxis () {
      return this.$store.getters["sceneEvents/zaxis"];
    },
    fogAmount () {
      return this.$store.getters["sceneEvents/fogAmount"];
    },
  },
  beforeMount() {
    this.$store.registerModule("events", sceneEventModule);
  },
  watch: {
    sceneCompleted(newVal) {
      if(newVal) {

      }
    },
    fountain(newVal, oldVal) {
      if(oldVal === null) {
      this.animatedLight = new BABYLON.SpotLight("*spot00", new BABYLON.Vector3(16, 22, 0), new BABYLON.Vector3(-1, -1, 0),  1.5, 80, this.myScene);
      this.animatedLight.diffuse = new BABYLON.Color3(0, 1, 1);
	    this.animatedLight.specular = new BABYLON.Color3(0, 1, 1);
      }
      var shadowGenerator = new BABYLON.ShadowGenerator(1024, this.animatedLight);
      shadowGenerator.getShadowMap().renderList.push(this.fountain);
      shadowGenerator.addShadowCaster(this.fountain);

      this.myGround.receiveShadows = true;
    },
    xaxis(newVal) {
      this.animatedLight.position = new BABYLON.Vector3(this.yaxis, newVal, this.zaxis);
    },
    yaxis(newVal) {
      this.animatedLight.position = new BABYLON.Vector3(newVal, this.xaxis, this.zaxis);
    },
    zaxis(newVal) {
      this.animatedLight.position = new BABYLON.Vector3(this.yaxis, this.xaxis, newVal);
    },
    fogAmount(val) {
      this.myScene.fogDensity = val;
    }
  },
  methods: {
      sceneComplete(scene) {
        this.myScene = scene.scene;
        this.$scense = this.myScene;
        this.myScene.createDefaultEnvironment({
          skyboxSize: 75,
          skyboxColor: new BABYLON.Color3(),
        })
        this.myScene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        this.myScene.fogDensity = this.fogAmount;
        scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
        this.sceneReady = true;
      },
      keyHandlerDown(key) {
        this.beta += 1;
      },
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
