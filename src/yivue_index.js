// 路由重定向到默认打开的页面
$yivue_routes.push({
	path:'/',
	redirect:'/index'
});

// 开始实例化VUE
var vm = new Vue({
	data:{
		yivueData:$yivue_data
	},
	router:new VueRouter({
		routes:$yivue_routes
	})
}).$mount('#YiVue');