/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

import './bootstrap';
import Vue from 'vue';
import Vuetify from 'vuetify';

import App from '@/js/views/App';

import router from '@/js/router.js';
import store from '@/js/store';

Vue.use(Vuetify);

const app = new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App)
});

export default app;