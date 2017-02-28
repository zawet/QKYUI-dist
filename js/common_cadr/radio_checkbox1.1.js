

/*
1.1版本加入父子类复选联动
*/

define(function(require) {
	//单选按钮事件
	$(".radio-inline").on("click",function(){
		if(!$(this).hasClass("disabled"))
		$(this).toggleClass("select").siblings().removeClass("select");
	});
	//复选按钮事件
	$(".checkbox-inline").on("click",function(){
		if(!$(this).hasClass("disabled"))
		$(this).toggleClass("select");
	})
	
	//复选父子链接选择
	$(".checkbox-inline.parent").on("click",function(){
		var key=$(this).attr("lj");
		var keychild=$(".checkbox-inline.child[lj="+key+"]");
		if(!keychild.hasClass("disabled")){
			if($(this).attr("isc")=="no"){
				keychild.addClass("select");$(this).attr("isc","yes");
			}else{
				keychild.removeClass("select");$(this).attr("isc","no");
			}
		}
	});

})