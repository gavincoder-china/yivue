# yivue
用简单易懂的方式，开发基于VUE的单页应用。

/*
* [名称] yivue(易VUE)
* [用途] 使用简单易懂的方式开发VUE单页应用的构建处理工具。
* [作者] 陈随易
* [邮箱] 24323626@qq.com
* [时间] 2018年12月17日
* [版本] v2.0.0
* [配置文件名] yivue.config.js (* 必须)
* [配置文件参数说明]
* [ name ]				项目名称，描述 (* 必填，项目名称)
* [ src_dir ]			源码目录，组件，页面的资源路径以此为基础 (- 选填，默认为配置文件目录 )
* [ components_dir ]	组件所在目录 (- 选填，默认为源码目录下的[ src/ ]components目录)
* [ page_dir ]			页面所在目录 (- 选填，默认为源码目录下的[ src/ ]pages目录)
* [ from_html ]			预先定义的模板文件名 (- 选填，默认为 [ src/ ]tpl.html 文件)
* [ dist_dir ]			生成资源目录 (- 选填，默认为配置文件目录)
* [ component_file ]	生成的组件文件名 (- 选填，默认生成 [ dist/ ] components.js 文件)
* [ page_file ]			生成的目录文件名 (- 选填，默认生成 [ dist/ ] pages.js 文件)
* [ route_file ]		生成的路由文件名 (- 选填，默认生成 [ dist/ ] route.js 文件)
* [ to_html ]			被生成的单页文件名 (- 选填，默认生成 [ dist/ ]index.html 文件)
*
* [示例]
*
* {
	name:'admin',
	src_dir:'.',
	component_dir:'./components',
	page_dir:'./pages',
	from_html:'tpl.html',
	dist_dir:'.',
	component_file:'components.js',
	page_file:'pages.js',
	route_file:'routes.js',
	to_html:'index.html'
 }
*
* [使用方式]
* [安装] npm install -g yivue
* [使用] yivue 配置文件目录
* [其他] yivue 命令确定配置文件 yivue.config.js 目录，配置文件确定源码目录和生成资源目录。所以，可以在
* 任意目录下，执行构建命令，只有配置文件路径无误即可。
*
* [指令说明]
* [^-^] 文件名占位符，如：test1.html 文件中的 ^-^ 会被替换成 test1
* [<!--[:xxx]-->] 组件或页面占位符，如：tpl.html 中的 <!--[:components]--> 将会被替换成所有组件的模板数据
* 此占位符只有 <!--[:components]--> 和 <!--[:pages]--> 两种
*
* [效果]
*
* 源码目录
	├── components
	│   ├── component1.html
	│   └── component2.html
	├── pages
	│   ├── page1.html
	│   └── page2.html
	└── tpl.html

	2 directories, 5 files
* [tpl.html单页模板文件]--------------------------------------------------------------------------------
	<!DOCTYPE HTML>
	<html>
		<head>
			<meta charset="utf8">
		</head>
		<body>
			<div class="YI" id="YI"></div>
		</body>

		<!--[组件文件]-->
		<!--[:components]-->
		<!--[组件文件]-->

		<!--[页面文件]-->
		<!--[:pages]-->
		<!--[页面文件]-->

		<script src="/public/js/vue.min.js"></script>
		<script src="/public/js/vue-router.min.js"></script>
		<script src="/admin/components.js"></script>
		<script src="/admin/pages.js"></script>
		<script src="/admin/routes.js"></script>
		<script src="/admin/index.js"></script>
	</html>

* [pages 目录下的页面文件 page1.html]------------------------------------------------------------------
	<template>
		<div>page1</div>
	</template>

	<script type="text/html">
	{
		data:{

		},
		template:$id('^-^')
	}
	</script>

* [pages 目录下的页面文件 page2.html]-----------------------------------------------------------------
	<template>
		<div>page2</div>
	</template>

	<script type="text/html">
	{
		data:{

		},
		template:$id('^-^')
	}
	</script>

* [components 目录下的组件页面 component1.html]-------------------------------------------------------
	<template>
	<div class="top">component1</div>
	</template>

	<script type="text/html">
	// ^-^
	Vue.component('^-^',{
		data:function(){
			return {

			}
		},
		template:$id('^-^')
	});
	</script>

* [components 目录下的组件页面 component2.html]-------------------------------------------------------
	<template>
	<div class="top">component2</div>
	</template>

	<script type="text/html">
	// ^-^
	Vue.component('^-^',{
		data:function(){
			return {

			}
		},
		template:$id('^-^')
	});
	</script>

* [生成以下文件]--------------------------------------------------------------------------------------
* [components.js 组件脚本文件]------------------------------------------------------------------------

  // component-component1
	Vue.component('component-component1',{
		data:function(){
			return {

			}
		},
		template:$id('component-component1')
	});

	// component-component2
	Vue.component('component-component2',{
		data:function(){
			return {

			}
		},
		template:$id('component-component2')
	});

* [pages.js 页面脚本文件]----------------------------------------------------------------------------
	Pages["page-page1"] = {
		data:{

		},
		template:$id('page-page1')
	}

	Pages["page-page2"] = {
		data:{

		},
		template:$id('page-page2')
	}

* [index.html 单页文件]------------------------------------------------------------------------------
	<!DOCTYPE HTML>
	<html>
		<head>
			<meta charset="utf8">
		</head>
		<body>
			<div class="YI" id="YI"></div>
		</body>

		<!--[组件文件]-->
		<script type="text/html" id="component-component1">
			<div class="top">component1</div>
		</script>
		<script type="text/html" id="component-component2">
			<div class="top">component1</div>
		</script>
		<!--[组件文件]-->

		<!--[页面文件]-->
		<script type="text/html" id="page-page1">
			<div>page1</div>
		</script>
		<script type="text/html" id="page-page2">
			<div>page2</div>
		</script>
		<!--[页面文件]-->

		<script src="/public/js/vue.min.js"></script>
		<script src="/public/js/vue-router.min.js"></script>
		<script src="/admin/components.js"></script>
		<script src="/admin/pages.js"></script>
		<script src="/admin/routes.js"></script>
		<script src="/admin/index.js"></script>
	</html>
*/