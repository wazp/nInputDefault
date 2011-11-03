/* nInputDefault v0.5 by Patrick Waks, Nansen <patrick.waks@nansen.se>
 * 
 * Adds support for placeholder="" attribute on input type=text in non-HTML5
 * supported browsers.
 * 
 * The Focus event adds class called "focus" if not specified otherwise by adding
 * {focusClass: 'nameOfClass'} as option, ie:
 * 
 * $('input').nInputDefault();
 * $('input.anotherStyle').nInputDefault({focusClass: 'myFocusClass'});
 */
(function($){
	$.fn.nInputDefault = function(userOptions) {
		var defaults = { // default focus class applied to element, can be overridden in init
			focusClass : 'focus'
		},
		options = $.extend(defaults, userOptions),
		// quick check to see if the browser can handle the placeholder attribute natively or not
		canHandlePlaceholder = (function() { var i = document.createElement('input'); return 'placeholder' in i;})();
		return this.each(function() {
			var obj = $(this),strDefault;
			// we only want this on <input type="text" /> and <textarea>'s.
			if (obj.attr('type') == "text" || obj.is('textarea')) {
				// save the current placeholder text
				strDefault = obj.attr('placeholder');
				// if no native support, add placeholder as value if not set already from POST
				if(!canHandlePlaceholder && !obj.val().length) obj.val(strDefault);
				// bind event for focus
				obj.unbind('focus.nInputDefault').bind('focus.nInputDefault', function(){
					if(!canHandlePlaceholder){ // if no native support
						// check if not using default text or being empty already
						if ((obj.val() == strDefault || obj.val() == '')) { 
							// remove value when clicked. Presto!
							obj.val('');
						}
					}
					// add the focus class we want, either default or user set.
					obj.addClass(options.focusClass);

				}).unbind('blur.nInputDefault').bind('blur.nInputDefault', function(){ // bind blur event
					if(!canHandlePlaceholder){ // if no native support
						// if not placeholder text or empty
						if (obj.val() == strDefault || obj.val() == '') {
							// put back the placeholder text as value
							obj.val(strDefault);
						}
					}
					// remove the focus class, either standard or user set.
					obj.removeClass(options.focusClass);	
				});
			}
		});
	};
	// bind as plugin to jQuery. Yay!
})(jQuery);