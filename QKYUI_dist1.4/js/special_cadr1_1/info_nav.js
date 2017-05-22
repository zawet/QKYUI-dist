/****
特殊模块，信息导航交互
****/ 

define(function(require,exports) {
	$(".info_nav").on("click","a",function(){
		 	$(this).addClass("active").siblings().removeClass("active");
			$(".info_main").hide();
			$("."+$(this).attr("id")).slideDown(200);
	});
});