
/****
特殊卡片模块，值班表交互模块
****/ 

define(function(require) {
	var dphv=require("./dropdown_havevalue");//获取下拉选择值事件
	var zb_dp=$("#zb_moule").html();
	var zb_inp=$("#zbinput_mould").html();
	$(".zb_one").parent().find("td").html(zb_inp);
	$(".zb_one").html(zb_dp);
	dphv.havevalue();
	$("#zdtable_add").on("click",function(){
		var zb_newstd='<tr><td class="zb_one">'+$("#zb_moule").html()+'</td><td>'+zb_inp+'</td><td>'+zb_inp+'</td><td>'+zb_inp+'</td></tr>';
		$(this).parents("tr").before(zb_newstd);
		dphv.havevalue();
	});
})