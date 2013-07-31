// JQuery StickyBar Plugin By Taufik Nurrohman
// URL's: https://plus.google.com/108949996304093815163/about
//		  http://hompimpaalaihumgambreng.blogspot.com
// Usage: $('div').stickyBar();

(function($) {

	$.fn.stickyBar = function(config) {

		config = $.extend({
			animated: false,
			until: "",
			top: 0,
			bottom: 0,
			speed: 400,
			easing: null
		}, config);

		return this.each(function() {
		
			var $this = $(this),

				// This duplicate (spaceHolder) is used to prevent page jump.
				// Because when the element position changes to be 'fixed' or 'absolute' position, they will move from the space and make the page jumping.
				// So I add the same element with hidden visibility, then put it in the same place to make sure that the space still exist
				spaceHolder = $this.clone().addClass('toRemove').css('visibility','hidden'),

				$window = $(window),
				offsetTop = $this.offset().top,
				marginsTop = $this.css('margin-top'),
				marginsLeft = $this.css('margin-left'),
				outerHeight = $this.outerHeight(),
				resetTopPos, stopLimit, offsetLeft, resetLeftPos = $this.css('left');

			stopLimit = (config.until !== "") ? $(config.until).offset().top - $(config.until).outerHeight() - config.bottom : $(document).height();
			resetTopPos = ($this.css('top') == "auto") ? 0 : $this.css('top');

			// Floating...
			function isFixed() {
				offsetLeft = $this.offset().left;
				if (!config.animated) {
					$this.css({
						'position':'fixed',
						'top':config.top,
						'margin-top':0,
						'margin-left':0,
						'left':offsetLeft
					}).after(spaceHolder);
				} else {
					$this.css({
						'position':'relative'
					}).stop().animate({
						top:$window.scrollTop() - offsetTop + config.top
					}, config.speed, config.easing);
				}
			}

			// Default position...
			function isStatic() {
				offsetLeft = $this.offset().left;
				if (!config.animated) {
					$this.css({
						'position':'relative',
						'top':resetTopPos,
						'margin-top':marginsTop,
						'margin-left':marginsLeft,
						'left':resetLeftPos
					});
				} else {
					$this.css({
						'position':'relative',
						'margin-top':marginsTop,
						'margin-left':marginsLeft,
						'left':'auto'
					}).stop().animate({
						top:resetTopPos
					}, config.speed, config.easing);
				}
				$('.toRemove').remove();
			}

			// Stopped by Stopper Element
			function isStopped() {
				stopLimit = $(config.until).offset().top - $(config.until).outerHeight() - config.bottom;
				$this.css({
					'position':'absolute',
					'top':stopLimit + outerHeight,
					'margin-top':0,
					'margin-left':0,
					'left':offsetLeft
				});
				$this.after(spaceHolder);
			}

			$window.on("scroll resize", function() {

				isStatic();

				if ($(this).scrollTop() >= offsetTop - config.top) {
					if ($(this).scrollTop() - outerHeight >= stopLimit && !config.animated) {
						isStopped();
					} else {
						isFixed();
					}
				}
			}).trigger("scroll");

		});

	};

})(jQuery);