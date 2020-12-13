<template>
  <div class="control-panel"> 
    <v-expansion-panels>
      <v-expansion-panel :key="1">
        <v-expansion-panel-header class="camera-color">
          CAMERA PANEL
          <template v-slot:actions>
            <v-icon>
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="camera-color">
          <v-btn block elevation="10" color="#51acad" @click="nextCameraFrame" >
            NEXT PLATFORM
          </v-btn>
          <div class="row">
            <v-btn block @click="setLevel(0)" tile color="#51acad">PLATFORM 1</v-btn>
            <v-btn block @click="setLevel(1)" tile color="#51acad">PLATFORM 2</v-btn>
            <v-btn block @click="setLevel(2)" tile color="#51acad">PLATFORM 3</v-btn>
            <v-btn block @click="setLevel(3)" tile color="#51acad">PLATFORM 4</v-btn>
            <v-btn block @click="setLevel(4)" tile color="#51acad">PLATFORM 5</v-btn>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :key="2">
        <v-expansion-panel-header class="camera-color">
          LIGHT PANEL
          <template v-slot:actions>
            <v-icon>
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="camera-color">
            <v-slider
            v-model="xaxis"
              max="100"
              thumb-label="always"
              min="20"
            ></v-slider>
            <v-slider
            v-model="yaxis"
              max="20"
              thumb-label="always"
              min="-20"
            ></v-slider>
            <v-slider
            v-model="zaxis"
              max="100"
              thumb-label="always"
              min="-100"
            ></v-slider>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :key="3">
        <v-expansion-panel-header class="camera-color">
          PARTICLE PANEL
          <template v-slot:actions>
            <v-icon>
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="camera-color">
          <v-subheader class="sh">Min particle size</v-subheader>
            <v-slider
            v-model="particleMinSize"
              max="1"
              step="0.1"
              min="0.1"
            ></v-slider>
            <v-subheader class="sh">Max particle size</v-subheader>
            <v-slider
            v-model="particleMaxSize"
              max="2"
              step="0.1"
              min="0.4"
            ></v-slider>
            <v-subheader class="sh">Particle height</v-subheader>
            <v-slider
            v-model="particleSpeed"
              max="9"
              min="2"
            ></v-slider>
            <v-subheader class="sh">Particle amount</v-subheader>
            <v-slider
            v-model="particleAmount"
              max="2000"
              min="400"
            ></v-slider>
            <v-layout row>
              <v-color-picker
              class="mr-1"
              v-model="particleColor1"
              hide-inputs
            ></v-color-picker>
            <v-color-picker
              v-model="particleColor2"
              hide-inputs
            ></v-color-picker>
            </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :key="4">
        <v-expansion-panel-header class="camera-color">
          FOG PANEL
          <template v-slot:actions>
            <v-icon>
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="camera-color">
          <v-subheader class="sh">Fog density</v-subheader>
            <v-slider
              v-model="fogAmount"
              max="0.1"
              min="0.01"
              step="0.01"
            ></v-slider>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :key="5">
        <v-expansion-panel-header class="camera-color">
          SIMULATION PANEL
          <template v-slot:actions>
            <v-icon>
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="camera-color">
          <div class="row">
            <v-btn block @click="particleAmount += 10" tile color="#51acad">CHECKIN</v-btn>
            <v-btn block @click="particleAmount = 500" tile color="#51acad">50 STUDENTS</v-btn>
            <v-btn block @click="particleAmount = 1000" tile color="#51acad">100 STUDENTS</v-btn>
            <v-btn block @click="particleAmount = 2000" tile color="#51acad">200 STUDENTS</v-btn>
            <v-btn block @click="particleAmount = 5000" tile color="#51acad">500 STUDENTS</v-btn>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import { VBtn, VExpansionPanels, VExpansionPanel, VExpansionPanelHeader, VExpansionPanelContent, VIcon, VExpansionPanelIcon, VSlider, VSubheader, VColorPicker, VLayout } from 'vuetify/lib'


export default {
  name: 'control-panel',
  components: { VBtn, VExpansionPanels, VExpansionPanel, VExpansionPanelHeader, VExpansionPanelContent, VIcon, VSlider, VSubheader, VColorPicker, VLayout },
  data: () => ({
  }),
  computed: {
    xaxis: {
      get () {
        return this.$store.getters["sceneEvents/xaxis"];
      }, 
      set(val) {
        this.$store.commit("sceneEvents/setXaxis", val);
      }
    },
    yaxis: {
      get () {
        return this.$store.getters["sceneEvents/yaxis"];
      }, 
      set(val) {
        this.$store.commit("sceneEvents/setYaxis", val);
      }
    },
    zaxis: {
      get () {
        return this.$store.getters["sceneEvents/zaxis"];
      }, 
      set(val) {
        this.$store.commit("sceneEvents/setZaxis", val);
      }
    },
    fogAmount: {
      get () {
        return this.$store.getters["sceneEvents/fogAmount"];
      }, 
      set(val) {
        this.$store.commit("sceneEvents/setFogAmount", val);
      }
    },
    particleAmount: {
      get () {
        return this.$store.getters["sceneEvents/particleAmount"];
      }, 
      set(val) {
        this.$store.commit("sceneEvents/setParticleAmount", val);
      }
    },
    particleSpeed: {
      get () {
        return this.$store.getters["sceneEvents/particleSpeed"];
      }, 
      set(val) {
        this.$store.commit("sceneEvents/setParticleSpeed", val);
      }
    },
    particleColor1: {
      get () {
        return this.$store.getters["sceneEvents/particleColor1"];
      }, 
      set(val) {
        this.$store.commit("sceneEvents/setParticleColor1", val);
      }
    },
    particleColor2: {
      get () {
        return this.$store.getters["sceneEvents/particleColor2"];
      }, 
      set(val) {
        this.$store.commit("sceneEvents/setParticleColor2", val);
      }
    },
    particleMinSize: {
      get () {
        return this.$store.getters["sceneEvents/particleMinSize"];
      }, 
      set(val) {
        this.$store.commit("sceneEvents/setParticleMinSize", val);
      }
    },
    particleMaxSize: {
      get () {
        return this.$store.getters["sceneEvents/particleMaxSize"];
      }, 
      set(val) {
        this.$store.commit("sceneEvents/setParticleMaxSize", val);
      }
    }
  },
  methods: {
      debugtest() {
        debugger;
      },
      keyHandlerDown(key) {
        this.beta += 1;
      },
      nextCameraFrame() {
        this.$store.commit("sceneEvents/nextCameraFrame");
      },
      setLevel(level) {
        this.$store.commit("sceneEvents/setLevel", level);
      }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
</style>
<style>
.control-panel {
    width: 50vh;
    background: black;
    opacity: 0.5;
    position: absolute;
    top: 50px;
    right: 50px;
}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 12px;
}
.camera-color {
  background-color: cadetblue;
  color: white !important;
}
.v-btn {
  color: white !important;
}
.sh {
  color: white !important;
}
</style>