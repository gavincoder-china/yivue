#!/usr/bin/env node
/*
* [名称] yivue(易VUE)
* [用途] 使用简单易懂的方式开发VUE单页应用的构建处理工具。
* [作者] 陈随易
* [邮箱] 24323626@qq.com
* [时间] 2018年12月17日
* [版本] v0.0.1
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

* [生成以下文件]
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
const $fs = require('fs'); // 引入文件系统
const $path = require('path'); // 引入路径系统

// 参数检查
if(process.argv.length < 3){ // 判断参数长度
	console.log('缺少配置文件参数');
	return;
}

// 配置文件目录存在性检查
const $config_dir = $path.resolve(process.argv[2]); // 得到配置文件目录的绝对路径
if(!$fs.existsSync($config_dir)){
	console.log('配置目录不存在');
	return;
}

// 配置文件存在性检查
const $config_file = $path.join($config_dir,'yivue.config.js'); // 得到配置文件的绝对路径
if(!$fs.existsSync($config_file)){
	console.log('配置文件不存在');
	return;
}

// 引入配置
const $config_data			= require($config_file); // 得到配置参数
let $components_html		= [];	// 组件数组
let $pages_html				= [];	// 页面数组
let $route_js				= [];	// 路由文件
let $pages_js				= [];	// 页面文件
let $components_js			= [];	// 组件文件
let $template_str			= '[\\s\\S]*<template>([\\s\\S]+?)<\/template>'; // 模板正则字符
let $script_str				= '[\\s\\S]*<script.+type=[\"\']?text\/html[\"\']?>([\\s\\S]+?)<\/script>'; // 脚本正则字符
let $all_files				= null; // 读取的所有文件
let $$html_files			= null; // 过滤之后的 html 模板文件
let $check_success			= true; // 检测结果是否成功状态
let $check_data				= true; // 检测循环处理数据状态
let $check_exists			= true; // 检测文件是否存在状态
let $placeholder			= '^-^';// 模板文件名占位符
let $file_data				= '';	// 读取的单个文件数据
let $index_data				= '';	// 缓存首页页面数据
let $page_name				= '';	// 页面文件名
let $component_name			= '';	// 组件文件名

for(let $prop of $config_data){
	let {
		name				= '',
		src_dir				= '.',
		components_dir		= 'components',
		pages_dir			= 'pages',
		dist_dir			= '.',
		component_file		= 'components.js',
		page_file			= 'pages.js',
		route_file			= 'routes.js',
		from_html			= 'tpl.html',
		to_html				= 'index.html'
	} = $prop; // 对象参数结构并设置默认值

	if(!name){ // 是否填写项目名称
		console.log('请填写项目名称 ' + JSON.stringify($prop));
		$check_success = false;
		break;
	}

	let $src_dir			= $path.join($config_dir,src_dir); // 源码目录
	let $components_dir		= $path.join($src_dir,components_dir); // 组件目录
	let $pages_dir			= $path.join($src_dir,pages_dir); // 页面目录
	let $dist_dir			= $path.join($config_dir,dist_dir); // 生成的资源目录
	let $from_html			= $path.join($src_dir,from_html); // 静态网页模板文件
	let $params				= [$src_dir,$components_dir,$pages_dir,$dist_dir,$from_html]; // 需要被检测的参数数组
	for(let $p of $params){
		if(!$fs.existsSync($p)){
			console.log('[ ' + name + ' ]  ' + $p + ' 不存在');
			$check_exists = false;
			break;
		}
	}

	if($check_exists === false){
		$check_success = false;
		break;
	}
	// 开始处理组件资源
	$all_files = $fs.readdirSync($components_dir,{withFileTypes:true}); // 获取所有文件

	$html_files = $all_files.filter(($v) => { // 过滤所有非 .html 文件
		if($v.isFile() && $path.extname($v.name) === '.html'){
			return true;
		}else{
			return false;
		}
	});

	for(let $p of $html_files){ // 循环读取所有组件数据
		let $html_data = $fs.readFileSync($path.join($components_dir,$p.name),{encoding:'utf8'});
		let $template_regx			= new RegExp($template_str,'gi'); // 模板正则
		let $script_regx			= new RegExp($script_str,'gi'); // 脚本正则
		let $template_script_regx	= new RegExp($template_str + $script_str,'gi'); // 双向正则
		if(!$template_regx.test($html_data)){// 检测是否有模板
			console.log(name + ' component ' + $p.name + ' 未找到 template');
			$check_data = false;
			break;
		}
		if(!$script_regx.test($html_data)){// 检测是否有脚本
			console.log(name + ' component ' + $p.name + ' 未找到 script');
			$check_data = false;
			break;
		}
		$html_data.replace($template_script_regx,($match,$template,$script) => {
			$component_name = 'component-' + $path.basename($p.name,'.html'); // 取得文件名
			$components_html.push('<script type="text/html" id="'+ $component_name +'">\n'+ $template.trim() +'\n</script>\n'); // 缓存组件模板资源
			$components_js.push($script.trim().replace(/\^\-\^/gi,($m,$n) => {return $component_name}) + '\n\n'); // 缓存组件脚本资源
		});
	}

	if($check_data === false){
		$check_success = false;
		break;
	}

	// 开始处理页面资源
	$all_files = $fs.readdirSync($pages_dir,{withFileTypes:true}); // 获取所有文件

	$html_files = $all_files.filter(($v) => { // 过滤所有非 .html 文件
		if($v.isFile() && $path.extname($v.name) === '.html'){
			return true;
		}else{
			return false;
		}
	});

	for(let $p of $html_files){ // 循环读取所有组件数据
		let $html_data = $fs.readFileSync($path.join($pages_dir,$p.name),{encoding:'utf8'});
		let $template_regx			= new RegExp($template_str,'gi'); // 模板正则
		let $script_regx			= new RegExp($script_str,'gi'); // 脚本正则
		let $template_script_regx	= new RegExp($template_str + $script_str,'gi'); // 双向正则
		if(!$template_regx.test($html_data)){// 检测是否有模板
			console.log(name + ' pages ' + $p.name + ' 未找到 template');
			$check_data = false;
			break;
		}
		if(!$script_regx.test($html_data)){// 检测是否有脚本
			console.log(name + ' pages ' + $p.name + ' 未找到 script');
			$check_data = false;
			break;
		}
		$html_data.replace($template_script_regx,($match,$template,$script) => {
			$page_name = 'page-' + $path.basename($p.name,'.html'); // 取得文件名
			$pages_html.push('<script type="text/html" id="'+ $page_name +'">\n'+ $template.trim() +'\n</script>\n'); // 缓存组件模板资源
			$pages_js.push('Pages["'+ $page_name +'"] = ' + $script.trim().replace(/\^\-\^/gi,($m,$n) => {return $page_name}) + '\n\n'); // 缓存组件脚本资源
		});
	}

	if($check_data === false){
		$check_success = false;
		break;
	}

	$fs.writeFileSync($path.join($dist_dir,'components.js'),$components_js.join('')); // 生成组件文件
	$fs.writeFileSync($path.join($dist_dir,'pages.js'),$pages_js.join('')); // 生成组件文件
	$file_data = $fs.readFileSync($path.join($src_dir,'tpl.html'),{encoding:'utf8'}); // 读 html 模板文件
	$index_data = $file_data.
		replace(/\<\!\-\-\[\:components\]\-\-\>/gi,$components_html.join('')).
		replace(/\<\!\-\-\[\:pages\]\-\-\>/gi,$pages_html.join('')); // 替换 html 模板文件占位符
	$fs.writeFileSync($path.join($dist_dir,'index.html'),$index_data); // 生成首页文件
}

if($check_success === false){
	console.log('处理失败');
}else{
	console.log('全部处理完成');
}