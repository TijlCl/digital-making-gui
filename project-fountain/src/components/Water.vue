<template>
  
</template>
<script>
import * as BABYLON from "@babylonjs/core"
import { Camera, Entity, Animation, Key} from 'vue-babylonjs';
import waterT from "../../public/water-texture.jpg"

export default {
  name: 'water',
  mixins: [Entity],
  components: {},
  props: {
    scene: Object,
    ground: Object,
    fountain: Object 
  },
  data: () => ({
    texture: waterT
  }),
  computed: {
  },
  watch: {
    scene (newVal, oldVal){
     if(this.ground !== null) {
     var grass1 = new BABYLON.StandardMaterial("grass1", this.scene);
     grass1.emissiveTexture = new BABYLON.Texture(waterT, this.scene);
     grass1.emissiveColor = new BABYLON.Color3(0, 1, 1);

    //emissive texture 
     var plane = BABYLON.MeshBuilder.CreatePlane("sphere1", {}, this.scene);
     plane.position = new BABYLON.Vector3(-2, 1, 0);
     plane.rotation = new BABYLON.Vector3(1.55, 0, 0);
     plane.scaling = new BABYLON.Vector3(14, 13, 0);
     plane.material = grass1;
     plane.alpha = 0.5;


     var plane2 = BABYLON.MeshBuilder.CreatePlane("sphere1", {}, this.scene);
     plane2.position = new BABYLON.Vector3(-9, 0.95, -3);
     plane2.rotation = new BABYLON.Vector3(1.55, 0, 0);
     plane2.scaling = new BABYLON.Vector3(5, 6, 0);
     plane2.material = grass1;
     
     var gl = new BABYLON.GlowLayer("glow", this.scene, {});


    //  var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, -1, 0), this.scene);
	  //  light.diffuse = new BABYLON.Color3(0, 1, 1);
	  //  light.specular = new BABYLON.Color3(0, 0, 1);
    //  light.groundColor = new BABYLON.Color3(0, 0, 0);
    //  light.parent = plane;
    //  light.excludedMeshes.push(this.ground);
    //  light.intensity = 0.1
     }
    },
  }
  // onScene({ name, position, scene }) {
  //   let system = BABYLON.ParticleSystem.Parse(this.myParticles, this.scene, "");
  // },
}
</script>