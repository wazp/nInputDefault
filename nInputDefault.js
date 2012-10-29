/*! nInputDefault - https://github.com/wazp/nInputDefault */
/* 
 * Adds support for placeholder="" attribute on input type=text in non-HTML5
 * supported browsers.
 * 
 * The Focus event adds class called "focus" if not specified otherwise by adding
 * {focusClass: 'nameOfClass'} as option, ie:
 * 
 * $('input').nInputDefault();
 * $('input.anotherStyle').nInputDefault({focusClass: 'myFocusClass'});
 */
;(function($){
	$.fn.nInputDefault = function (userOptions) {
		var defaults = { // default focus class applied to element, can be overridden in init
			focusClass: 'focus'
		},
		options = $.extend(defaults, userOptions),
		// quick check to see if the browser can handle the placeholder attribute natively or not
		canHandlePlaceholder = (function () { var i = document.createElement('input'); return 'placeholder' in i; })();
		return this.each(function () {
			var obj = $(this), strDefault, fake;
			// save the current placeholder text
			strDefault = obj.attr('placeholder');
			// we only want this on <input type="text" /> and <textarea>'s.
			if (obj.attr('type') == "text" || obj.is('textarea')) {
				// if no native support, add placeholder as value if not set already from POST
				if (!canHandlePlaceholder && !obj.val().length) obj.val(strDefault);
				// bind event for focus
				obj.unbind('focus.nInputDefault').bind('focus.nInputDefault', function () {
					if (!canHandlePlaceholder) { // if no native support
						// check if not using default text or being empty already
						if ((obj.val() == strDefault || obj.val() == '')) {
							// remove value when clicked. Presto!
							obj.val('');
						}
					}
					// add the focus class we want, either default or user set.
					obj.addClass(options.focusClass);

				}).unbind('blur.nInputDefault').bind('blur.nInputDefault', function () { // bind blur event
					if (!canHandlePlaceholder) { // if no native support
						// if not placeholder text or empty
						if (obj.val() == strDefault || obj.val() == '') {
							// put back the placeholder text as value
							obj.val(strDefault);
						}
					}
					// remove the focus class, either standard or user set.
					obj.removeClass(options.focusClass);
				});
			} else if (obj.attr('type') == 'password') {
				if (!canHandlePlaceholder) {
					// make new fake password box as input text...
					fake = $('<input type="text" id="' + obj.attr('id') + 'Fake" />').insertBefore(obj);
					obj.hide();
					// if no native support, add placeholder as value if not set already from POST
					fake.val(strDefault);

					$(fake).unbind('focus.nInputDefault').bind('focus.nInputDefault', function (e) {
						if (!canHandlePlaceholder || obj.val() == '') {
							fake.hide();
							obj.val('').show().focus();
						}
					})

					$(obj).unbind('blur.nInputDefault').bind('blur.nInputDefault', function () {
						if (!canHandlePlaceholder) {
							if (obj.val() == strDefault || obj.val() == '') {
								obj.hide();
								fake.show();
							}
						}
					});
				}
			}
		});
	};
	// bind as plugin to jQuery. Yay!
})(jQuery);