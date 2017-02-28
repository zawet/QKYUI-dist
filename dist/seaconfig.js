seajs.config({

  // 别名配置
  alias: {
    'bs': 'bootstrap/3.3.0/js/bootstrap.min',//引用bootstrap前端框架
    'nav': 'comjs/nav_add1.2',//引用整体头部
    'navicon': 'comjs/iconfont',//引用头部图标
	
	/****插件***/
	'cal_fp':'flatpickr/flatpickr',//日历插件fp
	'ec':'echarts/3.0/echarts.common.min',//数据视图插件ec
  },

  // 路径配置
  paths: {
	/****数据路径***/ 
	'datas':'define',//默认数据存放路径
	
	/****模块js路径***/
	'com':'./js/common_cadr',//公用模块js存放路径
    'sc1': './js/special_cadr1_1',//版本1特殊模块js存放路径
	'sc2': './js/special_cadr1_2',//版本2特殊模块js存放路径
	
  },

  // 变量配置
  vars: {
    'locale': 'zh-cn'
  }
});