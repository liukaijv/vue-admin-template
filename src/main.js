import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from  'vue-resource';
import Swal from './plugins/sweetalert';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Swal);

// Style
import './assets/css/bootstrap.css';
import './assets/css/font-awesome.css';
import './assets/css/animate.css';
import './assets/css/style.css';

// Js
import config from '../config';
import './assets/js/bootstrap';
import App from './app';

// Common Components
import registerComponent from './components/registerComponent';
registerComponent(Vue);

// Directives
import registerDirective from './directives/registerDirective';
registerDirective(Vue);

import authInterceptor from './interceptors/auth_interceptor';
import routeConfig from './routes';

// Storage
Vue.prototype.$session = window.sessionStorage || {};
Vue.prototype.$store = window.localstorage || {};

// config
Vue.config.debug = config.debug;
Vue.config.devtools = config.debug;

Vue.http.options.root = '/backend';

let router = new VueRouter();
routeConfig(router);

authInterceptor(Vue);

router.start(App, '#app');

window.router = router;