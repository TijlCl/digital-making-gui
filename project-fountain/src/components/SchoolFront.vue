<template>
  
</template>
<script>
import * as BABYLON from "@babylonjs/core"
import { Entity} from 'vue-babylonjs';
import School from "file-loader!../../public/models/schoolfront_with_fountain.babylon"
import waterT from "../../public/water-texture.jpg"

export default {
  name: 'school-front',
  mixins: [Entity],
  components: {},
  props: {
    scene: Object
  },
  data: () => ({
    path: School,
    planeMesh: null,
    schoolMesh: null
  }),
  computed: {
  },
  watch: {
    async scene (newVal, oldVal){
      let assetContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(this.path);
      this.schoolMesh = BABYLON.Mesh.MergeMeshes(assetContainer.meshes);
      this.schoolMesh.position = new BABYLON.Vector3(0, -2.5, 0);
      this.schoolMesh.rotation = new BABYLON.Vector3(0, 0.05, 0);
      this.createClickPlane();
    }
  },
  methods: {
    createClickPlane() {
      let l = this;
      var grass1 = new BABYLON.StandardMaterial("grass1", this.scene);
      grass1.emissiveTexture = new BABYLON.Texture(waterT, this.scene);
      grass1.emissiveColor = new BABYLON.Color3(0, 1, 1);

      let plane = BABYLON.Mesh.CreatePlane("plane", "", this.scene);
      plane.position = new BABYLON.Vector3(0, 2.54, 0);
      plane.rotation = new BABYLON.Vector3(1.55, 0, 0);
      plane.actionManager = new BABYLON.ActionManager(this.scene);
      plane.material = grass1;
      const frameRate = 100;
      const xSlide = new BABYLON.Animation("xSlide", "material.alpha", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
      const keyFrames = [];
      keyFrames.push({
          frame: 0,
          value: 0
      });
      keyFrames.push({
          frame: 200,
          value: 1
      });
      keyFrames.push({
          frame: 300,
          value: 0
      });

      xSlide.setKeys(keyFrames);

      plane.animations.push(xSlide);

      this.scene.beginAnimation(plane, 0, 300, true);

      plane.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(m){
            
        })
      );
      
      plane.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function(m){
            plane.material = null;
            l.animateShool();
            plane.dispose();
        })
      );
    },
    animateShool() {
        const frameRate = 100;
        const xSlide = new BABYLON.Animation("xSlide", "position.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        var bezierEase = new BABYLON.BezierCurveEase(0.32, -0.73, 0.69, 1.59);
        xSlide.setEasingFunction(bezierEase);

        const keyFrames = []; 

        keyFrames.push({
            frame: 0,
            value: -2.5
        });

        keyFrames.push({
            frame: 250,
            value: 1.9
        });

        keyFrames.push({
            frame: 300,
            value: 2.1
        });

        xSlide.setKeys(keyFrames);

        this.schoolMesh.animations.push(xSlide);

        this.scene.beginAnimation(this.schoolMesh, 0, 300, true);
    }
  }
}
</script>