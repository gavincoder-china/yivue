/*
*----------------------------
* name 		: YI-Shell-Color
* author 	: chensuiyi
* time 		: 2018-03-25
* version 	: 1.0.0
*----------------------------
* useage -->:
* F == font
* B == background
* L == light
* H == hard ( black )
* R == red
* G == green
* Y == yellow
* B == blue
* P == purple
* C == cyan
* W == white
* E == end
* END == end
*----------------------------
*/
const ANSI_ESCAPE_CODE = {
	FH  : '\033[30m',
	FR  : '\033[31m',
	FG  : '\033[32m',
	FY  : '\033[33m',
	FB  : '\033[34m',
	FP  : '\033[35m',
	FC  : '\033[36m',
	FW  : '\033[37m',
	BH  : '\033[40m',
	BR  : '\033[41m',
	BG  : '\033[42m',
	BY  : '\033[43m',
	BB  : '\033[44m',
	BP  : '\033[45m',
	BC  : '\033[46m',
	BW  : '\033[47m',
	LFH : '\033[90m',
	LFR : '\033[91m',
	LFG : '\033[92m',
	LFY : '\033[93m',
	LFB : '\033[94m',
	LFP : '\033[95m',
	LFC : '\033[96m',
	LFW : '\033[97m',
	LBH : '\033[100m',
	LBR : '\033[101m',
	LBG : '\033[102m',
	LBY : '\033[103m',
	LBB : '\033[104m',
	LBP : '\033[105m',
	LBC : '\033[106m',
	LBW : '\033[107m',
	END : '\033[0m',
	E   : '\033[0m'
}

// result
let RES = null;

// regexp
let REG = null;

/*
* [Func] ReplaceConvert
* [v] is input string
* [x] is pre-demarcation
* [y] is end-demarcation
* [m] is regexp $1
* [_] is placeholder
* [Usage] Main('<-FB->沉鱼<-BW->落雁<-END-><-FH->闭月<-END-><-FP-><-BY->羞花<-END->','<-','->');
*/
function  Main(v,x,y){
	x = x || '\\[';
	y = y || '\\]';
	REG = new RegExp(`${x}(.*?)${y}`,'gi');
	RES = v.replace(REG,function (_,m){
		return ANSI_ESCAPE_CODE[m] || '';
	});
	return RES;
}


module.exports = Main;