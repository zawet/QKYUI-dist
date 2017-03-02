/****
下拉菜单可选择值到输入框
****/ 

define(function(require,exports) {//dedine闭包
	exports.havevalue = function() { //exports是让函数暴露在全局里，全局可以调用此模板后进行调用此函数
		$(".dropdown.havechoose").on('shown.bs.dropdown', function () {
			var value_box=$(this).find(".value").first();
			$(this).find(".dropdown-menu li a").on("click", function() {
				value_box.html($(this).text());
			});
	    });
		$(".dropdown.havechoose_input").on('shown.bs.dropdown', function () {
			var value_box=$(this).find(".value").first();
			$(this).find(".dropdown-menu li a").on("click", function() {
				value_box.val($(this).text());
			});
	    })
	};
	
	exports.havevalue();//可以设置成自运行（加载模块时就执行模块执行体也就是构造函数）
});
