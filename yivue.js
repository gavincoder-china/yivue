#!/usr/bin/env node

// 引入模块 ==================================================================
// 引入文件系统
const fs = require('fs');

// 引入路径系统
const path = require('path');

// 引入命令行颜色库
const colors = require('colors/safe');

// 引入文件监听模块
const chokidar = require('chokidar');

// 初始化配置参数 ==============================================================
// 配置目录
const config_dir = process.cwd();

// 配置文件
const config_file = path.join(config_dir, 'yivue.config.js');
if (!fs.existsSync(config_file)) {
	console.log(colors.red('配置文件不存在'));
	return;
}
// 配置数据
const config_data = require(config_file);

function yivue(){
	// 循环处理多个单页项目 =========================================================
	for (let p of config_data) {
		// 为每个单页项目初始化相关变量 ==============================================
		// 组件模板数组
		let html_components = [];

		// 页面模板数组
		let html_pages = [];

		// 单组件、单页面的js脚本

		// 数据文件
		let js_datas = [];

		// 组件文件
		let js_components = [];

		// 页面文件
		let js_pages = [];

		// 路由文件
		let js_routes = [];

		// 正则字符

		// 正则字符-默认-开始
		let str_default_start = '[\\s\\S]*<script.+yv-type=[\"\']?text\/';

		// 正则字符-默认-结束
		let str_default_end = '[\"\']?>([\\s\\S]+?)<\/script>';

		// 模板正则字符
		let str_template = '[\\s\\S]*<template>([\\s\\S]+?)<\/template>';

		// 正则字符-数据
		let str_data = str_default_start + 'data' + str_default_end;

		// 正则字符-组件
		let str_component = str_default_start + 'component' + str_default_end;

		// 正则字符-页面
		let str_page = str_default_start + 'page' + str_default_end;

		// 正则字符-路由
		let str_route = str_default_start + 'route' + str_default_end;

		// 文件读取

		// 读取的所有文件
		let files_all = null;

		// 过滤之后的 html 模板文件
		let files_html = null;

		// 状态变量

		// 检测结果是否成功状态
		let check_success = true;

		// 检测循环处理数据状态
		let check_data = true;

		// 检测文件是否存在状态
		let check_exists = true;

		// 模板文件名占位符
		let placeholder = '\^\-\^';

		// 正则-模板
		let regx_placeholder = new RegExp(placeholder, 'gi');

		// 正则-模板
		let regx_template = new RegExp(str_template, 'gi');

		// 正则-数据
		let regx_data = new RegExp(str_data, 'gi');

		// 正则-组件
		let regx_component = new RegExp(str_component, 'gi');

		// 正则-页面
		let regx_page = new RegExp(str_page, 'gi');

		// 正则-路由
		let regx_route = new RegExp(str_route, 'gi');

		// 首页文件数据

		// 缓存首页页面数据
		let data_index = '';

		// 获取配置文件的参数 ==============================================
		let {
			// 当前单页项目标识名
			name = '',

			// 源码目录
			src_dir = 'src',

			// 生成目录
			dist_dir = 'client',

			// 组件目录
			components_dir = 'components',

			// 页面目录
			pages_dir = 'pages',

			// 生成的数据文件默认名称
			data_file = 'datas.js',

			// 生成的组件文件默认名称
			component_file = 'components.js',

			// 生成的页面文件默认名称
			page_file = 'pages.js',

			// 生成的路由文件默认名称
			route_file = 'routes.js',

			// 来源模板默认名称
			from_html = 'tpl.html',

			// 目标单页文件名称
			to_html = 'index.html',

			// 来源入口脚本
			from_app = 'app.js',

			// 目标入口脚本
			to_app = 'app.js',

			// 来源配置文件
			from_config = 'config.js',

			// 目标配置文件
			to_config = 'config.js'
		} = p;

		// 是否填写项目名称
		if (!name) {
			console.log(colors.red('请填写项目名称 ' + JSON.stringify(p)));
			check_success = false;
			break;
		}

		console.log(colors.cyan(name + ' 项目开始处理...'));
		console.log('\n');

		// 根据参数生成目录和路径 ===================================================
		// 源码目录
		src_dir = path.join(config_dir, src_dir);

		// 组件目录
		components_dir = path.join(src_dir, components_dir);

		// 页面目录
		pages_dir = path.join(src_dir, pages_dir);

		// 生成的资源目录
		dist_dir = path.join(config_dir, dist_dir);

		// 静态网页模板文件
		from_html = path.join(src_dir, from_html);

		// 静态单页文件
		to_html = path.join(dist_dir, to_html);

		// 入口源文件
		from_app = path.join(src_dir, from_app);

		// 入口目标文件
		to_app = path.join(dist_dir, to_app);

		// 数据源文件
		from_config = path.join(src_dir, from_config);

		// 数据目标文件
		to_config = path.join(dist_dir, to_config);

		// 判断资源目录是否存在
		if (!fs.existsSync(dist_dir)) {
			fs.mkdirSync(path.join(dist_dir), { recursive: true });
		}

		// 需要被检测的参数数组 ==================================================
		let check_params = [
			src_dir,
			dist_dir,
			components_dir,
			pages_dir,
			from_html,
			from_app,
			from_config
		];
		for (let p of check_params) {
			if (!fs.existsSync(p)) {
				console.log(colors.yellow(name).red(' ' + p + ' 不存在'));
				check_exists = false;
				break;
			}
		}

		// 路径存在性判断中断
		if (check_exists === false) {
			check_success = false;
			break;
		}

		// 开始处理组件资源 ========================================================
		// 获取所有组件文件
		files_all = fs.readdirSync(components_dir, { withFileTypes: true });

		// 过滤所有非 .html 文件
		files_html = files_all.filter((v) => {
			return v.isFile() && path.extname(v.name) === '.html';
		});

		// 循环读取所有组件数据
		for (let p of files_html) {
			// 文件名称(不含扩展名)
			let name_base = path.basename(p.name, '.html');

			// 合成组件文件名
			let name_component = 'component-' + name_base;

			// 当前组件路径
			let path_component = path.join(components_dir, p.name);

			// 当前组件页面数据
			let data_html = fs.readFileSync(path_component, { encoding: 'utf8' });

			// 检测是否有模板数据
			if (!regx_template.test(data_html)) {
				console.log(colors.red(name + ' components template ' + p.name + ' 未找到'));
				check_data = false;
				break;
			}

			// 检测是否有组件脚本
			if (!regx_component.test(data_html)) {
				console.log(colors.red(name + ' components component ' + p.name + ' 未找到'));
				check_data = false;
				break;
			}

			// 正则查找模板数据
			data_html.replace(regx_template, (match, template) => {
				// 缓存组件模板资源
				html_components.push('<script type="text/html" id="' + name_component + '">\n' + template.trim() + '\n</script>\n');
			});

			// 正则查找组件数据
			data_html.replace(regx_component, (match, component) => {
				// 缓存组件脚本资源
				let tmp = 'yivue.components["' + name_component + '"] = ' +
					component
						.trim()
						.replace(/^([\S\s]+?)\{/gi, (_, s) => {
							return '{';
						})
						.replace(/\^\-\^/gi, (_, n) => {
							return name_component;
						}) + '\n\n';
				js_components.push(tmp);
			});
			console.log(colors.green(name + ' component ' + p.name + ' 处理完成...'));
		}

		// 数据存在性判断
		if (check_data === false) {
			check_success = false;
			break;
		}

		// 开始处理页面资源 ======================================================
		// 获取所有文件
		files_all = fs.readdirSync(pages_dir, { withFileTypes: true });

		// 过滤所有非 .html 文件
		files_html = files_all.filter(v => {
			return v.isFile() && path.extname(v.name) === '.html';
		});

		// 循环读取所有页面数据
		for (let p of files_html) {
			// 文件名称(不含扩展名)
			let name_base = path.basename(p.name, '.html');

			// 合成页面文件名
			let name_page = 'page-' + name_base;

			// 当前页面路径
			let path_page = path.join(pages_dir, p.name);

			// 当前页面数据
			let data_html = fs.readFileSync(path_page, { encoding: 'utf8' });

			// 检测是否有模板
			if (!regx_template.test(data_html)) {
				console.log(colors.red(name + ' pages template ' + p.name + ' 未找到'));
				check_data = false;
				break;
			}

			// 检测是否有页面
			if (!regx_page.test(data_html)) {
				console.log(colors.red(name + ' pages page ' + p.name + ' 未找到'));
				check_data = false;
				break;
			}

			// 检测是否有路由
			if (!regx_route.test(data_html)) {
				console.log(colors.red(name + ' pages route ' + p.name + ' 未找到'));
				check_data = false;
				break;
			}

			// 正则查找模板数据
			data_html.replace(regx_template, (match, template) => {
				// 缓存组件模板资源
				html_pages.push('<script type="text/html" id="' + name_page + '">\n' + template.trim() + '\n</script>\n');
			});

			// 正则查找页面脚本
			data_html.replace(regx_page, (match, page) => {
				// 临时变量
				let tmp = 'yivue.pages["' + name_page + '"] = ' +
					page
						.trim()
						.replace(/^([\S\s]+?)\{/gi, (_, s) => {
							return '{';
						})
						.replace(/\^\-\^/gi, (_, n) => {
							return name_page;
						}) + '\n\n';
				// 缓存页面脚本资源
				js_pages.push(tmp);
			});
			// 正则查找路由脚本
			data_html.replace(regx_route, (match, route) => {
				// 临时变量
				console.log(route); 
				let tmp = 'yivue.routes.push(' +
					route
						.trim()
						.replace(/^([\S\s]+?)\{/gi, (_, s) => {
							// 去掉变量赋值
							return '{';
						})
						.replace(/\}\;$/gi,(_,n) => {
							// 去掉路由结束扩后后面的分号
							return '}';
						})
						.replace(/\^\-\^/gi, (_, n) => {
							// 替换占位符
							return name_base;
						}) + ')\n\n';
				// 缓存页面路由资源
				js_routes.push(tmp);
			});

			// 打印日志
			console.log(colors.green(name + ' page ' + p.name + ' 处理完成...'));
		}


		// 数据判断中断
		if (check_data === false) {
			check_success = false;
			break;
		}

		// 文件生成 ========================================================

		// 生成数据文件
		//fs.writeFileSync(path.join(dist_dir, data_file), 'var yivue_datas = {};\n\n' + js_datas.join(''));

		// 生成组件文件
		fs.writeFileSync(path.join(dist_dir, component_file), js_components.join(''));

		// 生成页面文件
		fs.writeFileSync(path.join(dist_dir, page_file), js_pages.join(''));

		// 生成路由文件
		fs.writeFileSync(path.join(dist_dir, route_file), js_routes.join(''));

		// 读 html 模板文件
		let data_from_html = fs.readFileSync(path.join(from_html), { encoding: 'utf8' });

		// 替换 html 模板文件占位符
		let data_to_html = data_from_html.
			replace(/\<\!\-\-\[\:yivue_components\]\-\-\>/gi, html_components.join('')).
			replace(/\<\!\-\-\[\:yivue_pages\]\-\-\>/gi, html_pages.join(''));

		// 生成首页文件
		fs.writeFileSync(path.join(to_html), data_to_html);

		// 读 app.js 模板文件
		let data_from_app = fs.readFileSync(path.join(from_app), { encoding: 'utf8' });

		// 生成 app.js 文件
		fs.writeFileSync(path.join(to_app), data_from_app);

		// 读 config.js 模板文件
		let data_from_config = fs.readFileSync(path.join(from_config), { encoding: 'utf8' });

		// 生成 data.js 文件
		fs.writeFileSync(path.join(to_config), data_from_config);

		// 成功判断
		if (check_success === false) {
			console.log(colors.red(name + ' 处理失败...\n'));
		} else {
			console.log('\n');
			console.log(colors.yellow(name + ' 项目处理完成...'));
			console.log('---------------------------------');
			console.log(colors.bgCyan(DateTime()));
			console.log('---------------------------------');
		}
	}
}
function DateTime(){
	var t = new Date();
	var Y = t.getFullYear();
	var M = ('00' + (t.getMonth() + 1)).substr(-2);
	var D = ('00' + t.getDate()).substr(-2);
	var H = ('00' + t.getHours()).substr(-2);
	var I = ('00' + t.getMinutes()).substr(-2);
	var S = ('00' + t.getSeconds()).substr(-2);
	return Y + '-' + M + '-' + D + ' ' + H + ':' + I + ':' + S;
}
yivue();
let watcher = chokidar.watch(path.join(config_dir,'src'), {
	ignored: /(^|[\/\\])\../
}).on('unlink',path => {
	yivue();
}).on('change',path => {
	yivue();
});