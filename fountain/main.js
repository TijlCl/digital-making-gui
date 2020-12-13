var particles = require("./public/particles3.json");

var canvas = document.getElementById("renderCanvas");
let engine = null;
var scene = null;
var sceneToRender = null;

var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
        
const createScene = function () {
    const scene = new BABYLON.Scene(engine)
    const camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", -Math.PI / 2, Math.PI / 2.2, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene)
    // Ground for positional reference
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 25, height: 25});
    ground.material = new BABYLON.GridMaterial("groundMat");
    ground.material.backFaceCulling = false
    // Load the previously setup particle system (it was setup with the inspector)
    // let system = BABYLON.ParticleSystem.Parse(particles, scene, "");
    // system.emitter = ground
    return scene;
}
try {
engine = createDefaultEngine();
} catch(e) {
console.log("the available createEngine function failed. Creating the default engine instead");
engine = createDefaultEngine();
}
if (!engine) throw 'engine should not be null.';
scene = createScene();
sceneToRender = scene
engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
        sceneToRender.render();
    }
});
// Resize
window.addEventListener("resize", function () {
    engine.resize();
});

