// 开始实例化VUE
var vm = new Vue({
    data: {
        // 全局共享数据
        globalData: {

        }
    },
    router: new VueRouter({
        routes: yivue.routes
    })
}).$mount('#YiVue');