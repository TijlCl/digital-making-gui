<template>
<Entity>
  <Camera type="arcRotate" v-model="myCam" :target="camPos" :alpha="alpha" :radius="radius" :beta="beta">
  </Camera>
</Entity>
</template>
<script>
import { Camera, Entity, Animation, Key} from 'vue-babylonjs';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import * as BABYLON from "@babylonjs/core"

export default {
  name: 'my-camera',
  components: {Camera, Entity, Animation, Key},
  mixins: [Entity],
  props: {
    scene: Object,
    light: Object,
    fountain: Object,
    start: Boolean
  },
  data: () => ({
    myCam: null,
    cameraAnimation: null,
    camPos: [0, 3, 0],
    alpha: -0.683541238900989,
    radius: 75,
    beta: 1.3922062182845616,
    animation: null,
    // test: setTimeout(this.test(), 2000),
    levels: [
      {
        target: new BABYLON.Vector3(0, 3, 0),
        alpha: -0.0343653428024522,
        beta: 1.3916035668033477,
        radius: 10
      },
      {
        target: new BABYLON.Vector3(0, 3, 0),
        alpha: 3.1446343570180897,
        beta: 1.3397326767877398,
        radius: 10
      },
      {
        target: new BABYLON.Vector3(-2, 5, 0),
        alpha: 1.5504257686979033,
        beta: 1.393980118084535,
        radius: 10
      },
      {
        target: new BABYLON.Vector3(-3, 7, 0),
        alpha: -1.5750349932532897,
        beta: 1.3044437106503235,
        radius: 10
      },
      {
        target: new BABYLON.Vector3(-1.5, 9, 0),
        alpha: 1.559111989188483,
        beta: 1.3964073940352668,
        radius: 10
      },
    ]
  }),
  computed: {
    currentLevel() {
      return this.$store.getters["sceneEvents/currentLevel"];
    },
    previousLevel() {
      return this.$store.getters["sceneEvents/previousLevel"];
    }
  },
  watch: {
    start(newVal) {
      if(newVal === true) {
        this.test();
      }
    },
    light() {
      this.myCam.target = new BABYLON.Vector3(this.fountain.position.x, this.fountain.position.y + 5, this.fountain.position.z);//The camera looks at the target camera.radius = 30; //Distance between the camera and the target
    },
    currentLevel(newVal, odlVal) {
      this.animate();
    },
    myCam(newVal, odlVal) {
      if(odlVal === null) {
        this.myCam.upperBetaLimit = 1.50079632679;
        this.myCam.upperRadiusLimit = 75;
        this.myCam.lowerRadiusLimit = 20;
        this.myCam.wheelPrecision = 50;
        this.myCam.allowUpsideDown = false;
      }
    }
  },
  methods: {
    test() {
      this.animate(-0.0343653428024522, 1.3916035668033477, 14, new BABYLON.Vector3(0, 3, 0), 3, true)
    },
    async animate(alpha, beta, radius, target, speed = 1, isIntro = false) {
      if (this.animation !== null) {
        this.animation.stop();
      }

      const currentlevel = this.levels[this.currentLevel];
      const previouslevel = this.levels[this.previousLevel];

     // Target
      var animationcameraTarget = new BABYLON.Animation(
            "myAnimationcamera", 
            "target", 
            isIntro ? 40 : 20, 
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3, 
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
      var bezierEase = new BABYLON.BezierCurveEase(0, 0, 0.50, 1.2);
      animationcameraTarget.setEasingFunction(bezierEase);
      var targetKeys = [];
      targetKeys.push({
      frame: 0,
      value: this.myCam.target,
      })
      targetKeys.push({
      frame: 100 * speed,
      value: target ?? currentlevel.target,
      });
      animationcameraTarget.setKeys(targetKeys);

      // ALPHA
      var animationcameraAlpha = new BABYLON.Animation(
            "myAnimationcamera", 
            "alpha", 
            isIntro ? 60 : 20, 
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
      var bezierEase = new BABYLON.BezierCurveEase(0, 0, 0.50, 1.2);
      animationcameraAlpha.setEasingFunction(bezierEase);
      var alphaKeys = [];
      alphaKeys.push({
      frame: 0,
      value: this.myCam.alpha,
      })
      alphaKeys.push({
      frame: 100 * speed,
      value: alpha ?? currentlevel.alpha,
      });
      animationcameraAlpha.setKeys(alphaKeys);

      // BETHA
      var animationcameraBeta = new BABYLON.Animation(
            "myAnimationcamera", 
            "beta", 
            isIntro ? 80 : 20, 
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
      var bezierEase = new BABYLON.BezierCurveEase(0, 0, 0.50, 1.2);
      animationcameraBeta.setEasingFunction(bezierEase);
      var betaKeys = [];
      betaKeys.push({
      frame: 0,
      value: this.myCam.beta
      })
      betaKeys.push({
      frame: 100 * speed,
      value: beta ?? currentlevel.beta
      });
      animationcameraBeta.setKeys(betaKeys);

      // RADIUS
      var animationcameraRadius = new BABYLON.Animation(
            "myAnimationcamera", 
            "radius", 
            isIntro ? 40 : 20, 
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );
      var bezierEase = new BABYLON.BezierCurveEase(0, 0, 0.50, 1.2);
      animationcameraRadius.setEasingFunction(bezierEase);
      var radiusKeys = [];
      radiusKeys.push({
      frame: 0,
      value: this.myCam.radius,
      })
      radiusKeys.push({
      frame: 100 * speed,
      value: radius ?? currentlevel.radius
      });
      animationcameraRadius.setKeys(radiusKeys);

      // DO ANIMATIONS
      this.myCam.animations = [];
      this.myCam.animations.push(animationcameraTarget);
      this.myCam.animations.push(animationcameraAlpha);
      this.myCam.animations.push(animationcameraBeta);
      this.myCam.animations.push(animationcameraRadius);

      this.myCam.upperBetaLimit = null;
      this.myCam.lowerBetaLimit = null;
      this.myCam.upperAlphaLimit = null;
      this.myCam.lowerAlphaLimit = null;

      this.animation =  this.$scene.beginAnimation(this.myCam, 0, 100 * speed, false, 1);

      // setTimeout(() => { 
      // this.myCam.upperBetaLimit = currentlevel.beta + 0.12;
      // this.myCam.lowerBetaLimit = currentlevel.beta - 0.06;
      // this.myCam.upperAlphaLimit = currentlevel.alpha + 0.12;
      // this.myCam.lowerAlphaLimit = currentlevel.alpha - 0.12;
      //  }, 5000);

      
    },
  }
}
</script>