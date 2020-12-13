import Vue from 'vue'
import app from './App.vue'
import vb from 'vue-babylonjs'
import Vuex from 'vuex'
import store from './store'

import vuetify from './plugins/vuetify'



Vue.config.productionTip = false

new Vue({
  render: h => h(app),
  app,
  store,
  vuetify
}).$mount('#app')

Vue.use(vb);
Vue.use(Vuex);
Vue.use(vuetify);
