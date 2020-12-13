<template>
  <v-timeline id="timeline" dark dense class="timeline">
    <v-timeline-item :color="activeItem === 4 ? '#5F9EA0' : '#3f6c6e'" small @click.native.stop="clicked(4)">Graduation</v-timeline-item>
    <v-timeline-item :color="activeItem === 3 ? '#5F9EA0' : '#3f6c6e'" small @click.native.stop="clicked(3)">3rd year</v-timeline-item>
    <v-timeline-item :color="activeItem === 2 ? '#5F9EA0' : '#3f6c6e'" small @click.native.stop="clicked(2)">2nd year</v-timeline-item>
    <v-timeline-item :color="activeItem === 1 ? '#5F9EA0' : '#3f6c6e'" small @click.native.stop="clicked(1)">1st year</v-timeline-item>
    <v-timeline-item :color="activeItem === 0 ? '#5F9EA0' : '#3f6c6e'" style="padding-bottom: 24px" small @click.native.stop="clicked(0)">Start</v-timeline-item>
  </v-timeline>
</template>
<script>
import { VTimeline, VTimelineItem } from 'vuetify/lib'

function MyFadeFunction() {
   if(TextOpacity < 1 || BtnOpacity < 1) {
       TextOpacity += .075;
       if (TextOpacity > 1) {
         BtnOpacity += .075;
       }
       if (!loopback) {
       }
   }

   if (window.appStarted === true) {
     bgOpacity -= .05;
     TextOpacity -= .03;
     TextOpacity -= .05;
   }

   document.getElementById('loader-text').style.opacity = TextOpacity;
   document.getElementById('start-btn').style.opacity = BtnOpacity;
   document.getElementById('loader').style.opacity = bgOpacity;
   if (bgOpacity < 0) {
    document.getElementById('loader').style.display = 'none';
   }
   if (window.appStarted === false || TextOpacity > 0 || BtnOpacity > 0 || bgOpacity > 0) {
    setTimeout(function(){MyFadeFunction()},100);
   }
}

export default {
  name: 'timeline',
  components: {VTimeline, VTimelineItem},
  props: {
    start: Boolean
  },
  data: () => ({
    activeItem: 0,
    opacity: 0,
    timesLooped: 0
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
    looped: {
      get() {
        return this.$store.getters["sceneEvents/looped"];
      },
      set(val) {
        this.$store.commit("sceneEvents/setLooped", val);
      }
    }
  },
  watch: {
    start(newVal) {
      if(newVal === true) {
        setTimeout(this.view, 6100);
        setTimeout(this.loop, 10000);
      }
    }
  },
  methods: {
    view() {
      this.opacity += 0.05;
      document.getElementById('timeline').style.opacity = this.opacity;
      if(this.opacity < 1) {
        setTimeout(this.view, 10)
      }
    },
    loop() {
      this.timesLooped += 1;
      if(this.timesLooped === 5) {
        this.currentLevel = 0;
        this.activeItem = 0;
      } else {
        this.currentLevel += 1;
        this.activeItem += 1;
        if (this.timesLooped !== 4) {
          setTimeout(this.loop, 10000);
        } else {
          this.looped = true;
        }
      }
    },
    clicked(item) {
      if (this.timesLooped === 4) {
        this.activeItem = item;
        this.$store.commit("sceneEvents/setLevel", item);
      }
    }
  }
}
</script>
<style>
.timeline {
    position: absolute;
    top: 25vh;
    left: 50px;
    opacity: 0;
}
@media only screen and (max-width: 1600px) {
  .timeline {
    top: 18vh;
  }
}
.v-timeline-item__dot {
   z-index: 1;
}
.v-timeline-item {
  padding-bottom: 75px;
  color: white;
}
.v-timeline-item__dot--small .v-timeline-item__inner-dot:hover {
    background-color: #5F9EA0 !important;
    border-color: #5F9EA0 !important;
}
</style>