/****
模态窗口的添加，编辑不同入口进来不一样的标题
****/ 

define(function(require,exports) {
	//模态弹窗数据交互
	function modal_pop(addid,editid,titid,modal,txt){
		$(addid).click(function(){
			$(titid).html("新增"+txt);
			$(modal).modal();
		}); 
		$(editid).on("click",function(){
			$(titid).html("编辑"+txt);
			$(modal).modal();
		});
	}
	exports.modalpop=function(addid,editid,titid,modal,txt){
		modal_pop(addid,editid,titid,modal,txt);
	}
});