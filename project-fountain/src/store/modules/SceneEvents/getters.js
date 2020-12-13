export default {
    currentLevel: state => state.currentLevel,
    previousLevel: state => state.previousLevel,
    xaxis: state => state.xaxis,
    yaxis: state => state.yaxis,
    zaxis: state => state.zaxis,
    fogAmount: state => state.fogAmount,
    particleAmount: state => state.particleAmount,
    particleSpeed: state => state.particleSpeed,
    particleColor1: state => state.particleColor1,
    particleColor2: state => state.particleColor2,
    particleMinSize: state => state.particleMinSize,
    particleMaxSize: state => state.particleMaxSize,
    looped: state => state.looped
}