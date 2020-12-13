export default {
    nextCameraFrame(state) {
        state.previousLevel = state.currentLevel
        state.currentLevel = state.lastLevel === state.currentLevel ? 0 : state.currentLevel + 1;
    },
    setLevel(state, level) {
        state.previousLevel = state.currentLevel;
        state.currentLevel = level
    },
    setXaxis(state, value) {
        state.xaxis = value;
    },
    setZaxis(state, value) {
        state.zaxis = value;
    },
    setYaxis(state, value) {
        state.yaxis = value;
    },
    setFogAmount(state, fogAmount) {
        state.fogAmount = fogAmount;
    },
    setParticleSpeed(state, particleSpeed) {
        state.particleSpeed = particleSpeed;
    },
    setParticleAmount(state, particleAmount) {
        state.particleAmount = particleAmount;
    },
    setParticleColor1(state, particleColor) {
        state.particleColor1 = particleColor;
    },
    setParticleColor2(state, particleColor) {
        state.particleColor2 = particleColor;
    },
    setParticleMinSize(state, particleMinSize) {
        state.particleMinSize = particleMinSize;
    },
    setParticleMaxSize(state, particleMaxSize) {
        state.particleMaxSize = particleMaxSize;
    },
    setLooped(state, looped) {
        state.looped = looped
    }
}