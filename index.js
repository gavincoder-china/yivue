#!/usr/bin/env node
const $fs = require('fs');
const $path = require('path');
console.dir(process.cwd());
if(process.argv.length < 3){
	console.log('缺少配置文件参数');
	return;
}

const $config = require($path.join(__dirname,process.argv[3]));
console.dir($config);
console.dir(process.cwd());