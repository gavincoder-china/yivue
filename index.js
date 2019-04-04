#!/usr/bin/env node
const _fs	= require('fs'); // 引入文件系统
const _path = require('path'); // 引入路径系统
const _ysc	= require('./yishellcolor.js');

// 参数检查
if(process.argv.length < 3){ // 判断参数长度
	console.log(_ysc('[FR]缺少配置参数[E]'));
	return;
}

// 配置文件目录存在性检查
const $config_dir = _path.resolve(process.argv[2]); // 得到配置文件目录的绝对路径
if(!_fs.existsSync($config_dir)){
	console.log(_ysc('[FR]配置目录不存在[E]'));
	return;
}

// 配置文件存在性检查
const $config_file = _path.join($config_dir,'yivue.config.js'); // 得到配置文件的绝对路径
if(!_fs.existsSync($config_file)){
	console.log(_ysc('[FR]配置文件不存在[E]'));
	return;
}

// 引入配置数据
const $config_data			= require($config_file); // 得到配置参数

for(let $prop of $config_data){
	let $html_components	= [];	// 组件数组
	let $html_pages			= [];	// 页面数组
	let $js_pages			= [];	// 页面文件
	let $js_components		= [];	// 组件文件
	let $js_routes			= [];	// 路由文件
	let $str_template		= '[\\s\\S]*<template>([\\s\\S]+?)<\/template>'; // 模板正则字符
	let $str_script			= '[\\s\\S]*<script.+type=[\"\']?text\/html[\"\']?>([\\s\\S]+?)<\/script>'; // 脚本正则字符
	let $str_route			= '[\\s\\S]*<script.+type=[\"\']?text\/route[\"\']?>([\\s\\S]+?)<\/script>'; // 脚本路由正则字符
	let $files_all			= null; // 读取的所有文件
	let $files_html			= null; // 过滤之后的 html 模板文件
	let $check_success		= true; // 检测结果是否成功状态
	let $check_data			= true; // 检测循环处理数据状态
	let $check_exists		= true; // 检测文件是否存在状态
	let $placeholder		= '^-^';// 模板文件名占位符
	let $data_file			= '';	// 读取的单个文件数据
	let $data_index			= '';	// 缓存首页页面数据
	let $name_page			= '';	// 页面文件名
	let $name_component		= '';	// 组件文件名
	let $name_base			= '';
	let {
		name				= '',
		src_dir				= '.',
		components_dir		= 'components',
		pages_dir			= 'pages',
		dist_dir			= '.',
		component_file		= 'yivue_components.js',
		page_file			= 'yivue_pages.js',
		route_file			= 'yivue_routes.js',
		from_html			= 'yivue_tpl.html',
		to_html				= 'index.html',
		from_index			= 'yivue_index.js',
		to_index			= 'yivue_index.js',
		from_data			= 'yivue_data.js',
		to_data				= 'yivue_data.js'
	} = $prop; // 对象参数结构并设置默认值

	if(!name){ // 是否填写项目名称
		console.log(_ysc('[FR]请填写项目名称[E] ' + JSON.stringify($prop)));
		$check_success = false;
		break;
	}

	let $src_dir			= _path.join($config_dir,src_dir); // 源码目录
	let $components_dir		= _path.join($src_dir,components_dir); // 组件目录
	let $pages_dir			= _path.join($src_dir,pages_dir); // 页面目录
	let $dist_dir			= _path.join($config_dir,dist_dir); // 生成的资源目录
	let $from_html			= _path.join($src_dir,from_html); // 静态网页模板文件
	let $to_html			= _path.join($dist_dir,to_html); // 静态单页文件
	let $from_index 		= _path.join($src_dir,from_index); // 入口源文件
	let $to_index 			= _path.join($dist_dir,to_index); // 入口目标文件
	let $from_data 			= _path.join($src_dir,from_data); // 入口源文件
	let $to_data 			= _path.join($dist_dir,to_data); // 入口目标文件

	if(!_fs.existsSync($dist_dir)){
		_fs.mkdirSync(_path.join($dist_dir));
	}

	let $params	= [$src_dir,$components_dir,$pages_dir,$from_html,$from_index,$from_data]; // 需要被检测的参数数组
	for(let $p of $params){
		if(!_fs.existsSync($p)){
			console.log(_ysc('<FY>[ <FR>' + name + '<FY> ]<E>  ' + $p + ' 不存在','<','>'));
			$check_exists = false;
			break;
		}
	}

	if($check_exists === false){
		$check_success = false;
		break;
	}

	// 开始处理组件资源
	$files_all = _fs.readdirSync($components_dir,{withFileTypes:true}); // 获取所有组件文件

	$files_html = $files_all.filter(($v) => { // 过滤所有非 .html 文件
		if($v.isFile() && _path.extname($v.name) === '.html'){
			return true;
		}else{
			return false;
		}
	});

	for(let $p of $files_html){ // 循环读取所有组件数据
		let $data_html 		= _fs.readFileSync(_path.join($components_dir,$p.name),{encoding:'utf8'});
		let $regx_template	= new RegExp($str_template,'gi'); // 模板正则
		let $regx_script	= new RegExp($str_script,'gi'); // 脚本正则
		let $regx_dobule	= new RegExp($str_template + $str_script,'gi'); // 双重正则
		if(!$regx_template.test($data_html)){// 检测是否有模板
			console.log(_ysc('[FY]' + name + ' [FC]component[FG] ' + $p.name + ' [FW]未找到 template[E]'));
			$check_data = false;
			break;
		}
		if(!$regx_script.test($data_html)){// 检测是否有脚本
			console.log(_ysc('[FY]' + name + ' [FC]component[FG] ' + $p.name + ' [FW]未找到 script[E]'));
			$check_data = false;
			break;
		}
		$data_html.replace($regx_dobule,($match,$template,$script) => {
			$name_component = 'component-' + _path.basename($p.name,'.html'); // 取得文件名
			$html_components.push('<script type="text/html" id="'+ $name_component +'">\n'+ $template.trim() +'\n</script>\n'); // 缓存组件模板资源
			$js_components.push('$yivue_components["' + $name_component + '"] = ' + $script.trim().replace(/\^\-\^/gi,($_,$n) => {return $name_component;}) + '\n\n'); // 缓存组件脚本资源
		});
		console.log(_ysc('[FY]' + name + '[FP] component[FG] ' + $p.name + '[FW] 处理完成...[E]'));
	}

	if($check_data === false){
		$check_success = false;
		break;
	}

	// 开始处理页面资源
	$files_all = _fs.readdirSync($pages_dir,{withFileTypes:true}); // 获取所有文件

	$files_html = $files_all.filter(($v) => { // 过滤所有非 .html 文件
		if($v.isFile() && _path.extname($v.name) === '.html'){
			return true;
		}else{
			return false;
		}
	});

	for(let $p of $files_html){ // 循环读取所有页面数据
		let $data_html 		= _fs.readFileSync(_path.join($pages_dir,$p.name),{encoding:'utf8'});
		let $regx_template	= new RegExp($str_template,'gi'); // 模板正则
		let $regx_script	= new RegExp($str_script,'gi'); // 脚本正则
		let $regx_route		= new RegExp($str_route,'gi'); // 脚本正则
		let $regx_all		= new RegExp($str_template + $str_script + $str_route,'gi'); // 三重正则
		if(!$regx_template.test($data_html)){// 检测是否有模板
			console.log(_ysc('[FY]' + name + ' [FC]pages[FG] ' + $p.name + ' [FW]未找到 template[E]'));
			$check_data = false;
			break;
		}
		if(!$regx_script.test($data_html)){// 检测是否有脚本
			console.log(_ysc('[FY]' + name + ' [FC]pages[FG] ' + $p.name + ' [FW]未找到 script[E]'));
			$check_data = false;
			break;
		}
		if(!$regx_route.test($data_html)){// 检测是否有路由
			console.log(_ysc('[FY]' + name + ' [FC]pages[FG] ' + $p.name + ' [FW]未找到 route[E]'));
			$check_data = false;
			break;
		}
		$data_html.replace($regx_all,($match,$template,$script,$route) => {
			$name_base = _path.basename($p.name,'.html');
			$name_page = 'page-' + $name_base; // 取得文件名
			$html_pages.push('<script type="text/html" id="'+ $name_page +'">\n'+ $template.trim() +'\n</script>\n'); // 缓存组件模板资源
			$js_pages.push('$yivue_pages["'+ $name_page +'"] = ' + $script.trim().replace(/\^\-\^/gi,($m,$n) => {return $name_page;}) + '\n\n'); // 缓存组件脚本资源
			$js_routes.push($route.trim().replace(/\^\-\^/gi,($_,$n) => {return $name_base;}) + '\n'); // 缓存路由脚本资源
		});
		console.log(_ysc('[FY]' + name + ' [FP]page [FG] ' + $p.name + '[FW] 完成...[E]'));
	}

	if($check_data === false){
		$check_success = false;
		break;
	}

	_fs.writeFileSync(_path.join($dist_dir,component_file),'var $yivue_components = {};\n\n' + $js_components.join('')); // 生成组件文件
	_fs.writeFileSync(_path.join($dist_dir,page_file),'var $yivue_pages = {};\n\n' + $js_pages.join('')); // 生成组件文件
	_fs.writeFileSync(_path.join($dist_dir,route_file),'var $yivue_routes = [\n' + $js_routes.join(',') + '\n]'); // 生成路由文件
	$data_file = _fs.readFileSync(_path.join($from_html),{encoding:'utf8'}); // 读 html 模板文件
	$data_index = $data_file.
		replace(/\<\!\-\-\[\:yivue_components\]\-\-\>/gi,$html_components.join('')).
		replace(/\<\!\-\-\[\:yivue_pages\]\-\-\>/gi,$html_pages.join('')); // 替换 html 模板文件占位符
	_fs.writeFileSync(_path.join($to_html),$data_index); // 生成首页文件
	$data_file = _fs.readFileSync(_path.join($from_index),{encoding:'utf8'}); // 读 index.js 模板文件
	_fs.writeFileSync(_path.join($to_index),$data_file); // 生成 index.js 文件
	$data_file = _fs.readFileSync(_path.join($from_data),{encoding:'utf8'}); // 读 data.js 模板文件
	_fs.writeFileSync(_path.join($to_data),$data_file); // 生成 data.js 文件

	if($check_success === false){
		console.log(_ysc(name + ' [FR]处理失败...[E]\n'));
	}else{
		console.log(_ysc(name + ' [FG]处理完成...[E]\n'));
	}
}