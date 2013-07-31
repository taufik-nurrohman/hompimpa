/*
 * Jimp JQuery Plugin
 * http://hompimpaalaihumgambreng.blogspot.com/
 *
 * Copyright 2012, Taufik Nurrohman
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */ (function ($) {
    $.fn.jimp = function (settings) {
        settings = $.extend({
            width: 40,
            height: 40,
            resizeSpeed: 200,
            fadeSpeed: 400,
            delay: 1000,
            offsetTop: 20,
            offsetLeft: 20,
            closeText: '&#215',
            linkText: 'save',
            hideOnOut: false,
            hideOnChange: false
        }, settings);
        // Append the jimp markup
        if (!$('#jimp').length) {
            $(document.body).append('<div id="jimp" class="movable"></div>');
        }
        return this.each(function () {
            var $this = $(this),
                def_width = settings.width,
                def_height = settings.height,
                w_w = $(window).width(),
                w_h = $(window).height(),
                $t = $('.movable'),
                timeout = null;
            // If there is no title attribute, set an empty title attribute
            $(this).attr('title', $(this).attr('title') ? $(this).attr('title') : '');
            // Move the title attribute value to data-title attribute to prevent the appearance of native tooltip
            $this.data('title', $(this).attr("title")).removeAttr('title');
            // Set the default jimp dimension
            $t.css({
                width: def_width,
                height: def_height
            });
            $this.on({
                mouseenter: function (e) {
                    // Filter the HTML element insertion only if the anchor does not have a href value that is equal to the value of src on image inside jimp.
                    // This is used to prevent the repetition of image loading for the same target when the user accidentally touching the same target more than once.
                    if ($('img', $t).attr('src') !== this.href) {
                        var th = $(this).data('preview') ? $(this).data('preview') : this.href,
                            tt_top = e.clientY + settings.offsetTop,
                            tt_left = e.clientX + settings.offsetLeft,
                            tt_tip = $(this).data('title');
                        if (settings.hideOnChange || settings.hideOnOut) {
                            $t.hide().css({
                                width: def_width,
                                height: def_height
                            }).html('');
                        }
                        $t.html('').addClass('loading movable');
                        // Set the execution delay insertion of HTML elements into jimp
                        timeout = setTimeout(function () {
                            // Insert the HTML
                            $t.show().html('<img src="' + th + '" alt="Loading..."/><span class="anchor"><a class="link" href="' + th + '" target="_blank">' + settings.linkText + '</a><a class="closejimp" href="#">' + settings.closeText + '</a></span>');
                            // Set image opacity to zero
                            $('img', $t).css('opacity', 0).load(function (e) {
                                // Calculate the jimp position from the screen before executing the animation
                                // to ensure that jimp not be go out from the visible area
                                var tt_w = $(this).outerWidth(),
                                    tt_h = $(this).outerHeight();
                                if (tt_top + tt_h > w_h) {
                                    tt_top = w_h - tt_h - settings.offsetTop;
                                }
                                if (tt_left + tt_w > w_w) {
                                    tt_left = w_w - tt_w - settings.offsetLeft;
                                }
                                // Animate the container...
                                $(this).parent().stop().animate({
                                    width: $(this).width(),
                                    height: $(this).height(),
                                    top: tt_top,
                                    left: tt_left
                                }, settings.resizeSpeed, function () {
                                    // Then, fade the image
                                    $(this).removeClass('loading').find('img').stop().animate({
                                        opacity: 1
                                    }, settings.fadeSpeed, function () {
                                        // Stop moving the Jimp
                                        $(window).off("mousemove");
                                        // Last, insert the image caption
                                        $(this).before('<h4>' + tt_tip + '</h4>');
                                    });
                                    // A close button...
                                    $t.find('.closejimp').on("click", function () {
                                        $t.fadeOut(settings.fadeSpeed / 2, function () {
                                            $(this).html('').css({
                                                width: def_width,
                                                height: def_height
                                            }).addClass('movable');
                                            moveJimp();
                                        });
                                        return false;
                                    });
                                });
                            });
                        }, settings.delay);
                    }
                },
                mouseleave: function () {
                    if (timeout !== null) {
                        clearTimeout(timeout);
                    }
                    if (settings.hideOnOut) {
                        $t.hide().css({
                            width: def_width,
                            height: def_height
                        }).html('');
                    }
                }
            });

            function moveJimp() {
                $(window).on({
                    mousemove: function (e) {
                        // Again...
                        // Calculate the jimp position from the screen every mouse moving
                        // to ensure that jimp not to be go out from the visible area
                        var $obj = $('.movable'),
                            tt_w = $obj.outerWidth(),
                            tt_h = $obj.outerHeight(),
                            tt_top = e.clientY + settings.offsetTop,
                            tt_left = e.clientX + settings.offsetLeft;
                        if (tt_top + tt_h > w_h) {
                            tt_top = w_h - tt_h - settings.offsetTop;
                        }
                        if (tt_left + tt_w > w_w) {
                            tt_left = w_w - tt_w - settings.offsetLeft;
                        }
                        $obj.css({
                            top: tt_top,
                            left: tt_left
                        });
                    }
                });
            }
            moveJimp();
        });
    };
})(jQuery);