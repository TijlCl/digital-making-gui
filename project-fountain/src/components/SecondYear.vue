<template>

</template>
<script>
import * as BABYLON from "@babylonjs/core";
import waterT from "../../public/water-texture.jpg"

export default {
  name: 'second-year',
  components: {},
  props: {
    scene: Object
  },
  data: () => ({
    particleSystem: null,
    plane: null
  }),
  computed: {
    currentLevel: {
      get() {
        return this.$store.getters["sceneEvents/currentLevel"];
      },
      set(val) {
        this.$store.commit("sceneEvents/setLevel", val);
      }
    },
    looped () {
      return this.$store.getters["sceneEvents/looped"];
    }
  },
  watch: {
    currentLevel (val) {
      if (val === 2 && !this.looped) {
        setTimeout(this.start, 2000);
      }
    },
    scene (newVal, oldVal){
      //water
      var water = new BABYLON.StandardMaterial("grass1", this.scene);
      water.emissiveTexture = new BABYLON.Texture(waterT, this.scene);
      water.emissiveColor = new BABYLON.Color3.FromHexString('#C2F970');
      water.alpha = 0

      this.plane = BABYLON.MeshBuilder.CreatePlane("sphere1", {}, this.scene);
      this.plane.position = new BABYLON.Vector3(-2, 5.75, 2.3);
      this.plane.rotation = new BABYLON.Vector3(1.57, 1.6, 0);
      this.plane.scaling = new BABYLON.Vector3(3, 3.5, 0);
      this.plane.material = water;
      this.plane.alpha = 0.5;

      //water fall
      this.particleSystem = BABYLON.ParticleHelper.CreateDefault(new BABYLON.Vector3(0, 0.5, 0));


      this.particleSystem.emitter = BABYLON.Vector3.Zero(); // the starting location

      this.particleSystem.color1 = new BABYLON.Color3(0, 1, 1);
      this.particleSystem.color2 = new BABYLON.Color3.FromHexString('#C2F970');
      this.particleSystem.colorDead = new BABYLON.Color3.FromHexString('#d1f2a0');

      this.particleSystem.minSize = 0.2;
      this.particleSystem.maxSize = 0.4;

      this.particleSystem.minLifeTime = 0.1;
      this.particleSystem.maxLifeTime = 0.5;

      this.particleSystem.emitRate = 1000;


      this.particleSystem.createBoxEmitter(new BABYLON.Vector3(0, -1, 0.5), new BABYLON.Vector3(0, -3, 0.3), new BABYLON.Vector3(-0.3, 5.75, 3.8), new BABYLON.Vector3(-3.7, 5.75, 3.8));

      this.particleSystem.minEmitPower = 1;
      this.particleSystem.maxEmitPower = 5;
      this.particleSystem.updateSpeed = 0.001;

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
    }
  }
}
</script>
<style>