import Vue from 'vue'
import App from './App.vue'
import nav from './components/nav.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const index = {}
var vm = new Vue({
	el: '#app',
	// render: h => h(App)
	components: {
		app: App,
		headers: nav
	}
})