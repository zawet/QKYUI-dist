
/****
账户设置的js模块中心 20170410 zwt 创建1.0版本
****/ 

define(function(require,exports) {
	var qkydata=require("../define/qkydata");//获取默认数据
	var getpy=require("./getpy");//拼音获取引用
	var opts=qkydata.navdata;
	var haveicon=qkydata.haveicon //已经有的图标名记录数组;
	var rach=require("../../js/common_cadr/radio_checkbox1.2");//获取单复选的暴露方法
	
	//暴露的执行函数
	exports.settings_run=function(){
		
		settings_int();//交互
	}
	
	//交互合集
	function settings_int(){
		$(".news_leftli").on("click",function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(".news_rightmian").addClass("yc");
			$(".news_rightmian."+$(this).attr("id")).removeClass("yc");
		});
		
		$("#oldpassword").focusout(function(){
			if($(this).val()=="123456"){
				$("#login_befor").addClass("yc");
				$("#login_after").removeClass("yc");
				$(this).parent().next(".error_color").addClass("yc");
			}else{
				$(this).parent().next(".error_color").removeClass("yc");
			}
		});
		
		$("#accset_save").click(function(){
			$(".mask_poptips").fadeIn(100);
			setTimeout(function(){$(".mask_poptips").fadeOut(100);},3000);
		});	
	}
	
	
	
})