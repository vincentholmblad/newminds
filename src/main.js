import Vue from 'vue'
import App from './App.vue'

import "./styles/main.scss"
require('vue2-animate/dist/vue2-animate.min.css')
import "@/assets/styles/main.css";

import titleMixin from './mixins/titleMixin'

Vue.mixin(titleMixin)

import {VueMasonryPlugin} from 'vue-masonry'
Vue.use(VueMasonryPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
