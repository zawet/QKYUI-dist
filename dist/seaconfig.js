seajs.config({

  // 别名配置
  alias: {
    'bs': 'bootstrap/3.3.0/js/bootstrap.min',//引用bootstrap前端框架
    'nav': 'comjs/nav_add1.4',//引用整体头部
	'app': 'comjs/appcenter',//引用应用中心的js模块
	'news': 'comjs/newscenter',//引用消息中心的js模块
	'aset':'comjs/account_settings',//引用账户设置的js模块
	'jq':'jq/1.11.1/jquery',
	'ci':'cropit-master/jquery.cropit',
	/****插件***/
	'cal_fp':'flatpickr/flatpickr',//日历插件fp
	'ec':'echarts/3.0/echarts.common.min',//数据视图插件ec
	'sw':'swiper/3.4.1/js/swiper.min',//3.4轮播插件
	'sw2':'swiper/2.0/idangerous.swiper.min',//2.0轮播插件
	
	/**快捷访问公用模块**/
	'ra_ch':'./js/common_cadr/radio_checkbox1.2',
	'dw':'./js/common_cadr/dropdown_havevalue',
	'upfile':'./js/common_cadr/file',
	'd-ra_ch':'../js/common_cadr/radio_checkbox1.1',
	'd-dw':'../js/common_cadr/dropdown_havevalue',
	'd-upfile':'../js/common_cadr/file',
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