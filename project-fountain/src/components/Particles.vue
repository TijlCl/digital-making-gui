<template>
  
</template>
<script>
import * as BABYLON from "@babylonjs/core"
import { Camera, Entity, Animation, Key} from 'vue-babylonjs';
import particles from "../../public/p3.json"

export default {
  name: 'particles',
  mixins: [Entity],
  components: {},
  props: {
    scene: Object,
    ground: Object
  },
  data: () => ({
    myParticles: particles,
    particleSystem: null
  }),
  computed: {
    particleMinSize() {
      return this.$store.getters["sceneEvents/particleMinSize"];
    },
    particleMaxSize() {
      return this.$store.getters["sceneEvents/particleMaxSize"];
    },
    particleSpeed() {
      return this.$store.getters["sceneEvents/particleSpeed"];
    },
    particleAmount() {
      return this.$store.getters["sceneEvents/particleAmount"];
    },
    particleColor1() {
      return this.$store.getters["sceneEvents/particleColor1"];
    },
    particleColor2() {
      return this.$store.getters["sceneEvents/particleColor2"];
    },
  },
  watch: {
    particleMinSize(newVal, oldVal) {
       this.particleSystem.minSize = newVal;
    },
    particleMinSize(newVal, oldVal) {
       this.particleSystem.maxSize = newVal;
    },
    particleSpeed(newVal, oldVal) {
       this.particleSystem.maxEmitPower = newVal;
    },
    particleAmount(newVal, oldVal) {
       this.particleSystem.emitRate = newVal;
    },
    particleColor1(newVal, oldVal) {
       this.particleSystem.color1 = new BABYLON.Color3.FromHexString(newVal);
    },
    particleColor2(newVal, oldVal) {
       this.particleSystem.color2 = new BABYLON.Color3.FromHexString(newVal);
    },
    scene (newVal, oldVal){
      this.particleSystem = BABYLON.ParticleHelper.CreateDefault(new BABYLON.Vector3(0, 0.5, 0));

      //Texture of each particle
      // particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);

      // Where the particles come from
      this.particleSystem.emitter = BABYLON.Vector3.Zero(); // the starting location

      // Colors of all particles
      this.particleSystem.color1 = new BABYLON.Color4(0.76, 0.86, 0.96);
      this.particleSystem.color2 = new BABYLON.Color4(0.51, 0.66, 0.89);
      this.particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

      // Size of each particle (random between...
      this.particleSystem.minSize = this.particleMinSize;
      this.particleSystem.maxSize = this.particleMaxSize;

      // Life time of each particle (random between...
      this.particleSystem.minLifeTime = 0.1;
      this.particleSystem.maxLifeTime = 0.3;

      // Emission rate
      this.particleSystem.emitRate = 600;


      /******* Emission Space ********/
      this.particleSystem.createBoxEmitter(new BABYLON.Vector3(0, 1, 0), new BABYLON.Vector3(0, 8, 0), new BABYLON.Vector3(4, 0, 6), new BABYLON.Vector3(-8, 0, -6));


      // Speed
      this.particleSystem.minEmitPower = 1;
      this.particleSystem.maxEmitPower = 3;
      this.particleSystem.updateSpeed = 0.001;

      // Start the particle system
      this.particleSystem.start();
    }
  },
  methods: {
  }
  // onScene({ name, position, scene }) {
  //   let system = BABYLON.ParticleSystem.Parse(this.myParticles, this.scene, "");
  // },
}
</script>