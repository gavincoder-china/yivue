// 初始化 yivue 全局变量
var yivue = {};

// 初始化组件集
yivue.components = {};

// 初始化页面集
yivue.pages = {};

// 初始化路由集
yivue.routes = [];

// 重定向默认路由
yivue.routes.push({
    path: '/',
    redirect: '/index'
});