import * as BABYLON from "@babylonjs/core"

export default {
    currentLevel: 0,
    previousLevel: 0,
    lastLevel: 4,
    xaxis: 22,
    yaxis: 16,
    zaxis: 0,
    fogAmount: 0.06,
    particleAmount: 600,
    particleSpeed: 3,
    particleColor1: new BABYLON.Color3(0.76, 0.86, 0.96).toHexString(),
    particleColor2: new BABYLON.Color3(0.51, 0.66, 0.89).toHexString(),
    particleMinSize: 0.2,
    particleMaxSize: 0.6,
    looped: false
}