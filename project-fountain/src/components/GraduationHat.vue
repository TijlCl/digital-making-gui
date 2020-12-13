<template>
  
</template>
<script>
import * as BABYLON from "@babylonjs/core"
import { Entity} from 'vue-babylonjs';
import Hat from "file-loader!../../public/models/hat.babylon"
import waterT from "../../public/water-texture.jpg"

export default {
  name: 'graduation-hat',
  mixins: [Entity],
  components: {},
  props: {
    scene: Object
  },
  data: () => ({
    path: Hat,
    planePositions: [],
    hatPositions: [],
    planeMesh: null,
    stopPcs: false
  }),
  computed: {
  },
  watch: {
    async scene (newVal, oldVal){

      //plane
      let plane = BABYLON.Mesh.CreatePlane("plane", "", this.scene);
      plane.position = new BABYLON.Vector3(-1.5, 8.69, 2);
      plane.rotation = new BABYLON.Vector3(1.55, 0, 0);

      this.planeMesh = plane;

      let planePcs = new BABYLON.PointsCloudSystem("pcs", 1, this.scene);

      planePcs.addSurfacePoints(plane, 10000, BABYLON.PointColor.Color, 0);

      this.planePositions = planePcs._positions;

      //hat
      
      let assetContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(this.path);
      var mesh = BABYLON.Mesh.MergeMeshes(assetContainer.meshes);
      mesh.position = new BABYLON.Vector3(-1.5, 8.69, 2);
      mesh.scaling = new BABYLON.Vector3(0.35, 0.35, 0.35);
      mesh.setEnabled(false)

      let hatPcs = new BABYLON.PointsCloudSystem("pcs", 1, this.scene);

      hatPcs.addSurfacePoints(mesh, 10000, BABYLON.PointColor.Color, 0);

      this.hatPositions = hatPcs._positions;

      //this.animatePCS();
      this.createClickPlane();
    }
  },
  methods: {
    createClickPlane() {
      var grass1 = new BABYLON.StandardMaterial("grass1", this.scene);
      grass1.emissiveTexture = new BABYLON.Texture(waterT, this.scene);
      grass1.emissiveColor = new BABYLON.Color3(0, 1, 1);

      let plane = BABYLON.Mesh.CreatePlane("plane", "", this.scene);
      plane.position = new BABYLON.Vector3(-1.5, 8.69, 2);
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
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(m){
        })
      );
      let l = this;
      plane.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function(m){
            plane.material = null;
            l.animatePCS();
            plane.dispose();
        })
      );
    },
    animatePCS() {
        var l = this;
        var vertexData = new BABYLON.VertexData();
        var nbFramesToPause = 120;
        var iterations = 300;
        var direction = 5;
        var frameCount = 0;
        var positions = [];
        var lapsed = 0;

        var colors = new Array(4 * this.planePositions.length / 3);
        var options = [0.76, 0.86, 0.96]
        colors = colors.fill(0).map((x, key) => {
            return options[key % 3];
        })

                //Create a custom mesh  
	    var customMesh = new BABYLON.Mesh("custom", this.scene);

	    //Assign positions
      vertexData.positions = this.planePositions;
      vertexData.colors = colors;

	    //Apply vertexData to custom mesh
	    vertexData.applyToMesh(customMesh, true);
	
        var mat = new BABYLON.StandardMaterial("mat", this.scene);
        mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
        //mat.disableLighting = true;
        mat.pointsCloud = true;
        mat.pointSize = 2;
	
	      customMesh.material = mat;

        this.scene.registerAfterRender(function() {
            if(!l.stopPcs) {
                if (frameCount > nbFramesToPause && frameCount < nbFramesToPause + iterations) {
                for (var p = 0; p < l.planePositions.length / 3; p+= 10) {

                    positions[3 * p ] = l.planePositions[3 * p ] + (frameCount - nbFramesToPause) * (l.hatPositions[3 * p ] - l.planePositions[3 * p ]) / iterations;
                    positions[3 * p + 1] = l.planePositions[3 * p + 1] + (frameCount - nbFramesToPause) * (l.hatPositions[3 * p + 1] - l.planePositions[3 * p + 1]) / iterations;
                    positions[3 * p + 2] = l.planePositions[3 * p + 2] + (frameCount - nbFramesToPause) * (l.hatPositions[3 * p + 2] - l.planePositions[3 * p + 2]) / iterations;
                }

                customMesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);                
            }
            frameCount += direction;
            if (frameCount === 0 || frameCount === (2 * nbFramesToPause + iterations) ) {
                direction *= -1;
                lapsed++;
                if (lapsed === 1) {
                    l.stopPcs = true;
                }
            }
            }         
            // camera.alpha += 0.01;
        })
    }
  }
  // onScene({ name, position, scene }) {
  //   let system = BABYLON.ParticleSystem.Parse(this.myParticles, this.scene, "");
  // },
}
</script>