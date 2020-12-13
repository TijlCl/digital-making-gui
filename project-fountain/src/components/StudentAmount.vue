<template>
  <div id="student-amount">
    <h1 class="current-amount">Amount of students checked in: {{ particleAmount / 10 }}</h1>
  </div>
</template>
<script>
import { VTimeline, VTimelineItem } from 'vuetify/lib'

export default {
  name: 'student-amount',
  components: {VTimeline, VTimelineItem},
  props: {
    start: Boolean
  },
  data: () => ({
    opacity: 0
  }),
  computed: {
    particleAmount: {
      get () {
        return this.$store.getters["sceneEvents/particleAmount"];
      }, 
      set(val) {
        this.$store.commit("sceneEvents/setParticleAmount", val);
      }
    },
  },
  watch: {
    start(newVal) {
      if(newVal === true) {
        setTimeout(this.display, 6100);
      }
    }
  },
  methods: {
    display() {
      this.opacity += 0.005;
      document.getElementById('student-amount').style.opacity = this.opacity;
      if(this.opacity < 0.7) {
        setTimeout(this.display, 10)
      }
    },
  }
}
</script>
<style>
#student-amount {
    position: absolute;
    bottom: 0;
    width: 22vw;
    height: 5vh;
    opacity: 0;
    background-color: black;
}
@media only screen and (max-width: 1600px) {
  #student-amount {
    height: 8vh;
  }
  .current-amount {
    color: white;
    padding: 10px;
    font-size: 2.7vh;
  }
}
.current-amount {
  color: white;
  padding: 10px;
}
</style>