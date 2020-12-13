<template>

</template>
<script>
import * as BABYLON from "@babylonjs/core";
import waterT from "../../public/water-texture.jpg"

export default {
  name: 'third-year',
  components: {},
  props: {
    scene: Object
  },
  data: () => ({
    particleSystem: null,
    secondParticleSystem: null,
    plane: null
  }),
  computed: {
    currentLevel: {
      get() {
        return this.$store.getters["sceneEvents/currentLevel"];
      },
      set(val) {
        this.$store.commit("sceneEvents/setLevel", val);
      },
    },
    looped () {
      return this.$store.getters["sceneEvents/looped"];
    }
  },
  watch: {
    currentLevel (val) {
      if (val === 3 && !this.looped) {
        setTimeout(this.start, 1800);
      }
    },
    scene (newVal, oldVal){
      //water
      var water = new BABYLON.StandardMaterial("grass1", this.scene);
      water.emissiveTexture = new BABYLON.Texture(waterT, this.scene);
      water.emissiveColor = new BABYLON.Color3.FromHexString('#447192');
      water.alpha = 0;

      this.plane = BABYLON.MeshBuilder.CreatePlane("sphere1", {}, this.scene);
      this.plane.position = new BABYLON.Vector3(-2.9, 7.35, 0.2);
      this.plane.rotation = new BABYLON.Vector3(1.57, 1.57, 0);
      this.plane.scaling = new BABYLON.Vector3(2.8, 3.5, 0);
      this.plane.material = water;
      this.plane.alpha = 0.5;

      //water fall
      this.particleSystem = BABYLON.ParticleHelper.CreateDefault(new BABYLON.Vector3(0, 0.5, 0));


      this.particleSystem.emitter = BABYLON.Vector3.Zero(); // the starting location

      this.particleSystem.color1 = new BABYLON.Color3(0, 1, 1);
      this.particleSystem.color2 = new BABYLON.Color3.FromHexString('#447192');
      this.particleSystem.colorDead = new BABYLON.Color3.FromHexString('#89adc7');

      this.particleSystem.minSize = 0.1;
      this.particleSystem.maxSize = 0.3;

      this.particleSystem.minLifeTime = 0.1;
      this.particleSystem.maxLifeTime = 0.6;

      this.particleSystem.emitRate = 200;


      this.particleSystem.createBoxEmitter(new BABYLON.Vector3(0, -1, -0.9), new BABYLON.Vector3(0, -3, -0.7), new BABYLON.Vector3(-1.2, 7.35, -1.3), new BABYLON.Vector3(-4.7, 7.35, -1.3));

      this.particleSystem.minEmitPower = 1;
      this.particleSystem.maxEmitPower = 5;
      this.particleSystem.updateSpeed = 0.001;


      //second
      //water fall
      this.secondParticleSystem = BABYLON.ParticleHelper.CreateDefault(new BABYLON.Vector3(0, 0.5, 0));


      this.secondParticleSystem.emitter = BABYLON.Vector3.Zero(); // the starting location

      this.secondParticleSystem.color1 = new BABYLON.Color3(0, 1, 1);
      this.secondParticleSystem.color2 = new BABYLON.Color3.FromHexString('#44add4');
      this.secondParticleSystem.colorDead = new BABYLON.Color3.FromHexString('#629c98');

      this.secondParticleSystem.minSize = 0.1;
      this.secondParticleSystem.maxSize = 0.3;

      this.secondParticleSystem.minLifeTime = 0.1;
      this.secondParticleSystem.maxLifeTime = 0.2;

      this.secondParticleSystem.emitRate = 1000;


      this.secondParticleSystem.createBoxEmitter(new BABYLON.Vector3(0, -0.5, -0.9), new BABYLON.Vector3(0, -1, -0.7), new BABYLON.Vector3(-1.2, 7.35, -1.2), new BABYLON.Vector3(-4.7, 7.35, -1.2));

      this.secondParticleSystem.minEmitPower = 1;
      this.secondParticleSystem.maxEmitPower = 5;
      this.secondParticleSystem.updateSpeed = 0.001;

     }
  },
  methods: {
    start() {
      const frameRate = 100;
      const xSlide = new BABYLON.Animation("xSlide", "material.alpha", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
      const keyFrames = [];
      keyFrames.push({
          frame: 0,
          value: 0
      });
      keyFrames.push({
          frame: 300,
          value: 1
      });

      xSlide.setKeys(keyFrames);

      this.plane.animations.push(xSlide);

      this.scene.beginAnimation(this.plane, 0, 300, true);

      setTimeout(this.startParticles, 400);
    },
    startParticles() {
      this.particleSystem.start();
      this.secondParticleSystem.start()
    }
    
  }
}
</script>
<style>