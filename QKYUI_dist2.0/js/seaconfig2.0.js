seajs.config({

  // 别名配置
  alias: {
	  /***库引用***/
	'jq':'jq/1.11.1/jquery',
    'bs': 'bootstrap/3.3.0/js/bootstrap.min',//引用bootstrap前端框架
	
	/***所有项目默认模块***/
    'nav': 'common_default/nav_add2.0',//引用整体头部
	'app': 'common_default/appcenter',//引用应用中心的js模块
	'news': 'common_default/newscenter',//引用消息中心的js模块
	'aset':'common_default/account_settings',//引用账户设置的js模块
	
	/**模块或者组件模块**/
	'rach':'common_cadr/radio_checkbox1.2',
	'dw':'common_cadr/dropdown_havevalue',
	'steps':'common_cadr/steps',
	'upfile':'common_cadr/file',

	/****插件***/
	'ci':'plug-in/cropit-master/jquery.cropit',
	'ec':'plug-in/echarts/3.0/echarts.common.min',//数据视图插件ec
	'sw':'plug-in/swiper/3.4.1/js/swiper.min',//3.4轮播插件
	'sw2':'plug-in/swiper/2.0/idangerous.swiper.min',//2.0轮播插件	
	'qkycal':'plug-in/qky_calendar/qky_calendar2.0',//自主日历插件
  },

  // 路径配置
  paths: {
	/****数据路径***/ 
	'datas':'define',//默认数据存放路径
	
	/****模块js路径***/
	'com_c':'./js/common_cadr',//公用模块js存放路径
	'com_d':'./js/common_default',//公用模块js存放路径
	
	/****项目模块js路径***/
	
	
  },

  // 变量配置
  vars: {
    'locale': 'zh-cn'
  }
});

var opt={
	navli_j:[
			{name:"我的工资条",attrcont:"href='index.html'",isactive:false},
			{name:"工资管理",attrcont:"href='index_wage_manag.html'",isactive:false},
			{name:"工资模板管理",attrcont:"href='index_wagemould_manag.html'",isactive:false},
			{name:"工资统计查询",attrcont:"href='index_count.html'",isactive:false},
	]
}

for(var i=0;i<opt.navli_j.length;i++){
	opt.navli_j[i].isactive=false;
}

//二级文件夹页面头部的改变设置
 var second_opts={
	htmlsrc:"../mould_html/qkynav2.0.html",//头部模板获取异步地址
	logosrc:"../images/nav_logo/qky-logo.png",
	pjname:"",
	navli_j:[],
	appcenter_link:"appcenter.html",//应用中心页面链
	newscenter_link:"newscenter.html",//消息中心页面链接
	otherli:[["切换身份","href='switch_user.html'"],["账户设置","href='account_settings.html'"],["个人设置","href='#'"],["退出","href='login.html'"]],
	newsimgsrc:"../images/appicon/",
};