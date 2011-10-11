(function($){
	$.fn.nInputDefault = function(userOptions) {
		var defaults = {
			focusClass : 'focus'
		},
		options = $.extend(defaults, userOptions),
		canHandlePlaceholder = (function() { var i = document.createElement('input'); return 'placeholder' in i;})();
		return this.each(function() {
			var obj = $(this),strDefault;
			if (obj.attr('type') == "text" || obj.is('textarea')) {
				strDefault = obj.attr('placeholder');
				if(!canHandlePlaceholder && !obj.val().length) obj.val(strDefault);
				obj.unbind('focus').bind('focus', function(){
					if(!canHandlePlaceholder){
						if ((obj.val() == strDefault || obj.val() == '')) {
							obj.val('');
						}
					}
					obj.addClass(options.focusClass);

				}).bind('blur', function(){
					if(!canHandlePlaceholder){
						if (obj.val() == strDefault || obj.val() == '') {
							obj.val(strDefault);
						}
					}
					obj.removeClass(options.focusClass);	
				});
			}
		});
	};
})(jQuery);