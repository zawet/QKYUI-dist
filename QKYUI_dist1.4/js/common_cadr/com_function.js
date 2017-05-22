

//公用函数

define(function(require,exports) {
	
	//异步获取html
	exports.htmlajax=function(url,sucfun){
		var urlhtml="";
		$.ajax({
		  url: url,
		  cache: false,
		  success: function(html){
			 sucfun(html);
		  }
		});	
	}
	//判断某字符串是否为空
	exports.isNull=function (data){ 
    	return (data == "" || data == undefined || data == null) ? "kong" : data; 
	}
	
	//通讯录高级搜索交互开关
	exports.search_box_oc=function(){
		$("#search_box_oc").click(function(){
			$(".search_box").slideToggle(200);
		});
	}
});