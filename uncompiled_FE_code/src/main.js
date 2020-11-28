import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB-23i4h40QWQgjFW13cZNpMLU222iCSPw',
    libraries: 'places,directions',
    language: 'En',
  },
  autobindAllEvents: false,

});
new Vue({
  render: h => h(App),
}).$mount('#app');
