
/****
特殊卡片模块，值班安排
****/ 


define(function(require) {
	var qkydata=require("define/qkydata");//获取默认数据
	var choose=require("./choose");
	var cadr_data=qkydata.cadr_data;
	var thishtml='<div class="col-sm-12"><table class="table table-bordered table_card"><tbody><tr><td colspan="2" class="col-xs-10"><h4 class="mt0 mb0">';
	var thishtml2='</h4></td><td rowspan="3" class="col-xs-2 td_mc"><a class="edit"><i class="qkyicon_14 mr5">&#xe60f;</i>编辑</a></td></tr><tr><td width="14%">值班人员：</td><td>';
	var thishtml3='</td></tr><tr><td  width="14%">记录人：</td><td>';
	var thishtml4='</td></tr></tbody></table></div>';
	
	//渲染表格		  
	drawhtml=function(id,data){
		for(var key in data){
			id.append(thishtml+key+thishtml2+data[key][0]+thishtml3+data[key][1]+thishtml4);
		}				
	}
	
	//渲染弹出层的内容
	modaldraw=function(id,data,keys){
		//console.log(keys);
		id.html("");
		if(isNull(keys)!="kong"){
			$("#cadr_mould .cadr_box").addClass("active").find(".cadr_change").removeClass("r90");
			$("#cadr_mould .cadr_head span").html(keys);
			$("#cadr_mould .zb").attr("placeholder",data[keys][0]);
			$("#cadr_mould .jl").attr("placeholder",data[keys][1]);
			id.append($("#cadr_mould").html());	
		}else{
			for(var key in data){
				$("#cadr_mould .cadr_box").removeClass("active").find(".cadr_change").addClass("r90");
				$("#cadr_mould .cadr_head span").html(key);
				$("#cadr_mould .zb").attr("placeholder",data[key][0]);
				$("#cadr_mould .jl").attr("placeholder",data[key][1]);
				id.append($("#cadr_mould").html());
			}
		}
		
		
		$(".cadr_change").on("click",function(){$(this).toggleClass("r90");$(this).parent().next(".cadr_body").first().slideToggle();});//下拉开放按钮事件
		
		$(".cadr_cho.zb").on("focusin",function(){//锁定不同类的输入框
			$(".cadr_cho").attr("is_fo","no");$(this).attr("is_fo","yes");//锁定哪个输入框要进行选人操作
			choose.ChooseDraw($("#choosedraw"),{"tit":"值班人员","tit_left":"学校人员","tit_right":"值班人员"});//人员选择框更新信息
			$("#cho_modal").modal();//打开人员选择弹框
		});
		$(".cadr_cho.jl").on("focusin",function(){
			$(".cadr_cho").attr("is_fo","no");$(this).attr("is_fo","yes");
			choose.ChooseDraw($("#choosedraw"),{"tit":"纪录人员","tit_left":"值班人员","tit_right":"纪录人员"});
			$("#cho_modal").modal();
		});	
	}

	drawhtml($("#cadr_"),cadr_data);//渲染外表	
	
	$("#editall").on("click",function(){modaldraw($("#cadr_in"),cadr_data);$("#cadr_modal").modal();});//编辑全部
	$(".edit").on("click",function(){var keys=$(this).parents("tr").find("h4").html();modaldraw($("#cadr_in"),cadr_data,keys);$("#cadr_modal").modal();});//单独编辑
		
	choose.ChoClick();//人员选择框里的点击操作事件

	function isNull(data){ return (data == "" || data == undefined || data == null) ? "kong" : data; }	  
	
})