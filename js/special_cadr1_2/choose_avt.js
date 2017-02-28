// JavaScript Document

define(function(require) {
	var choose=require("./choose");
	$(".cadr_cho.zb").on("focusin",function(){//锁定不同类的输入框
		if(!$(this).hasClass("disabled")){
			$(".cadr_cho").attr("is_fo","no");$(this).attr("is_fo","yes");//锁定哪个输入框要进行选人操作
			choose.ChooseDraw($("#choosedraw"),{"tit":"值班人员","tit_left":"学校人员","tit_right":"值班人员"});//人员选择框更新信息
			$("#cho_modal").modal();//打开人员选择弹框
		}
	});
	$(".cadr_cho.jl").on("focusin",function(){
		if(!$(this).hasClass("disabled")){
			$(".cadr_cho").attr("is_fo","no");$(this).attr("is_fo","yes");
			choose.ChooseDraw($("#choosedraw"),{"tit":"纪录人员","tit_left":"值班人员","tit_right":"纪录人员"});
			$("#cho_modal").modal();
		}
	});
	choose.ChoClick();//人员选择框里的点击操作事件
})