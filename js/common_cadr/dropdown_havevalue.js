/****
下拉菜单可选择值到输入框
****/ 

define(function(require,exports) {
	exports.havevalue = function() {
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
	exports.havevalue();
});
