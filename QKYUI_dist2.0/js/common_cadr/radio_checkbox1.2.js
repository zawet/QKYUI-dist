

/*
1.1版本加入父子类复选联动
1.2版本 拆分出独立暴露单选，或者多选！
*/

define(function(require,exports) {
	//外接单选按钮事件
	exports.radio_run=function(fun){
		$(".radio-qky").on("click",function(){
			if(!$(this).hasClass("disabled")){
			$(this).toggleClass("select").siblings().removeClass("select");
			fun($(this));}
		});
	}
	
	//外接复选按钮事件
	exports.checkbox_run=function(fun){
		$(".checkbox-qky").on("click",function(){
			if(!$(this).hasClass("disabled")){
			$(this).toggleClass("select");
			fun($(this));}
		});	
	}
	
	exports.rach_run=function(rafun,chfun){
		
		
		//复选父子链接选择
		$(".checkbox-qky.parent").on("click",function(){
			var key=$(this).attr("lj");
			var keychild=$(".checkbox-qky.child[lj="+key+"]");
			if(!keychild.hasClass("disabled")){
				if($(this).attr("isc")=="no"){
					keychild.addClass("select");$(this).attr("isc","yes");
				}else{
					keychild.removeClass("select");$(this).attr("isc","no");
				}
			}
		});
		
		exports.radio_run(rafun);
		exports.checkbox_run(chfun);
		
		//复选子类全没选和全选中后，父类改变样式
		$(".checkbox-qky.child").on("click",function(){
			child_in_parent($(this));
		});
		
	}
	//exports.rach_run();
	
	function child_in_parent(id){
		var key=id.attr("lj");
		var childnumber=$(".checkbox-qky.child[lj="+key+"]").length;
		var selectnumber=$(".checkbox-qky.select.child[lj="+key+"]").length;
		if(selectnumber<childnumber){
			$(".checkbox-qky.parent[lj="+key+"]").removeClass("select").attr("isc","no");
		}
		if(selectnumber>=childnumber){
			$(".checkbox-qky.parent[lj="+key+"]").addClass("select").attr("isc","yes");
		}
	}
})