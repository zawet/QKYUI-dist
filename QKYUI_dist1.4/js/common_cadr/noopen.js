
/****
禁区禁止一切活动事件
****/ 


define(function(require) {
	
	
	
	var opts={"opens":false}
	$.fn.extend({
        "noopen": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            opts = $.extend({}, opts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each(function (i) {
				
				if(!opts.opens){
					$(this).find(".form-control").addClass("disabled");
					$(this).find(".checkbox-inline").addClass("disabled");
				}else{
					$(this).find(".form-control").removeClass("disabled");
					$(this).find(".checkbox-inline").removeClass("disabled");
					$(this).removeClass("no_open");
				}

				
		    })
		}
	});
	//私有方法，检测参数是否合法
    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    } 
})