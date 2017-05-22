// JavaScript Document
define(function(require,exports) {
	exports.file= function() {
		$(".ycfile").change(function(){
			$(this).parent().parent().prev("input.file").first().val($(this).val());
		})
	}
	exports.file();
});