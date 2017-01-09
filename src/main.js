var Vue = require('vue');
var App = require('./App.vue');
// var nav = require('./components/nav.vue');

var vm = new Vue({
	el: '#app',
	// render: h => h(App)
	components: {
		app: App
	}
})