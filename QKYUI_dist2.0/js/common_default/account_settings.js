
/****
账户设置的js模块中心 20170410 zwt 创建1.0版本
****/ 

define(function(require,exports) {
	var qkydata=require("../dist_data/qkydata2.0");//获取默认数据
	var getpy=require("./getpy");//拼音获取引用
	var opts=qkydata.navdata;
	var haveicon=qkydata.haveicon //已经有的图标名记录数组;
	var rach=require("../common_cadr/radio_checkbox1.2");//获取单复选的暴露方法
	
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
		//从显示到编辑
		$(".form_toedit").on("click",function(){
			$(this).parents(".form_show").hide().parent().find(".form_edit").show();
		});
		
		//从编辑到显示
		rach.radio_run(function(thiss){
			 var thisval=thiss.find("span").html();
			 $("#this_sex").html(thisval);
			 thiss.parents(".form_edit").hide().parent().find(".form_show").show();
			 mask_poptips();
	    });
		$("#this_sf_number_inp").focusout(function(){
			var thisval=$(this).val();
			$("#this_sf_number").html(thisval);
			$(this).parents(".form_edit").hide().parent().find(".form_show").show();
			mask_poptips();
		});
	}
	
	function mask_poptips(){
		$(".mask_poptips").fadeIn(100);
		setTimeout(function(){$(".mask_poptips").fadeOut(100);},3000);	
	}
	
	
	
})