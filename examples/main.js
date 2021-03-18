import Vue from 'vue';
import App from './App.vue';
import pageages from '../pageages';
import './style.css';

Vue.use(pageages);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
