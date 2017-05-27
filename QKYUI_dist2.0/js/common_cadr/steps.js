/****
下拉菜单可选择值到输入框
****/ 

define(function(require,exports) {//dedine闭包
	exports.steps_run= function() { //exports是让函数暴露在全局里，全局可以调用此模板后进行调用此函数
		$(".steps a").on("click",function(){
		 	$(this).addClass("active").siblings().removeClass("active");
			$(".steps_mian").removeClass("open");
			$(".steps_mian[isid='"+$(this).attr("toshow")+"']").addClass("open");
		 });
		 $(".next_step").on("click",function(){
		 	$(this).parents(".steps_mian").removeClass("open").next(".steps_mian").addClass("open");
			$(".steps a[toshow='"+$(this).parents(".steps_mian").next(".steps_mian").attr("isid")+"']").addClass("active").siblings().removeClass("active");
		 });
	};
	
	exports.steps_run();//可以设置成自运行（加载模块时就执行模块执行体也就是构造函数）
});
