/*!
 * Galleria V2 - JQuery Masonry Widget for Blogger JSON by Taufik Nurrohman
 * URL's: https://plus.google.com/108949996304093815163/about
 *        http://www.dte.web.id/2012/07/rilis-galleria-v2-widget-masonry-untuk.html
 * Licence: http://creativecommons.org/licenses/by-nc-sa/3.0/
 */

// Cross browser hash change event
// => http://www.dte.web.id/2013/05/cross-browser-hash-change-event.html
(function(w) {
	if ('onhashchange' in w) {
		if (w.addEventListener) {
			w.addHashChange = function(func, before) {
				w.addEventListener('hashchange', func, before);
			};
			w.removeHashChange = function(func) {
				w.removeEventListener('hashchange', func);
			};
			return;
		} else if (w.attachEvent) {
			w.addHashChange = function(func) {
				w.attachEvent('onhashchange', func);
			};
			w.removeHashChange = function(func) {
				w.detachEvent('onhashchange', func);
			};
			return;
		}
	}
	var hashChangeFuncs = [], oldHref = location.href;
	w.addHashChange = function(func, before) {
		if (typeof func === 'function') hashChangeFuncs[before ? 'unshift' : 'push'](func);
	};
	w.removeHashChange = function(func) {
		for (var i = hashChangeFuncs.length-1; i >= 0; i--) {
			if (hashChangeFuncs[i] === func) hashChangeFuncs.splice(i, 1);
		}
	};
	setInterval(function() {
		var newHref = location.href;
		if (oldHref !== newHref) {
			oldHref = newHref;
			for (var i = 0; i < hashChangeFuncs.length; i++) {
				hashChangeFuncs[i].call(w, {
					'type': 'hashchange',
					'newURL': newHref,
					'oldURL': oldHref
				});
			}
		}
	}, 100);
})(window);

// Create the widget
(function($, w, d) {

	// I have to remove this code someday...
	if (typeof ($jm_container) != 'undefined') {
		$jm_container.html('<h3>Some options on this widget already deprecated. Please update your widget by visiting the <a href="http://www.dte.web.id/2012/07/rilis-galleria-v2-widget-masonry-untuk.html">revision page</a></h3>');
		return;
	}

	// Plugin
	$.fn.bloggerMasonry = function(o) {
		o = $.extend({
			viewMode: "summary", // Widget mode? "summary" || "thumbnail"
			homePage: "http://dte-feed.blogspot.com", // Your blog homepage
			numPosts: 10, // Number of posts to display per request
			numChars: 270, // Length of summary post
			showThumbnails: true, // Nothing! Still in draft...
			squareImage: false, // Set thumbnail mode to square
			newTabLink: false, // Auto open links in new window/tab?
			columnWidth: 200, // Width of the image (also will resize the brick item width)
			subHeaderText: ["Diposting oleh ", "<br>pada "], // `Posted by FOO on BAR`
			monthNames: [ // Month array
				"Januari",
				"Februari",
				"Maret",
				"April",
				"Mei",
				"Juni",
				"Juli",
				"Agustus",
				"September",
				"Oktober",
				"November",
				"Desember"
			],
			commentLabel: "&nbsp;", // Label text after total comments
			navText: {
				prev: "Sebelumnya", // Previous navigation label
				next: "Berikutnya", // Next navigation label
				disabled: "&times;", // Disabled navigation label
				data: ["Halaman ", " dari "] // `Page # of #`
			},
			postCategory: null, // Change to a label name to sort posts by specific label
			fallbackThumb: "http://hompimpa.googlecode.com/svn/trunk/Blogger-Masonry-Widget/img/meee.png", // Fallback thumbnail for posts without images
			loadingText: "Loading...", // `Loading...` text for loading indicator
			loadedText: "Loaded.", // `Loaded.` text for loading indicator
			infiniteScroll: false, // Enable infinite scroll?
			bottomTolerance: 30, // Bottom tolerance for the end of page indicator in infinite scroll
			masonryConfig: { // Shortcut for Masonry plugin configuration and some local configuration
				itemSelector: '.json_post',
				fadeSpeed: 400, // Speed of thumbnail fading effect
				resizeSpeed: 1000, // Speed of thumbnail resizing effect
				isAnimated: false,
				animateWithTransition: true, // Animate each brick with CSS transition instead of JQuery `.animate()`?
				animationOptions: {
					queue: false,
					duration: 1000,
					easing: null
				},
				isFitWidth: true,
				gutterWidth: 0,
				isRTL: false
			}
		}, o);

		var $this = this, request = null, busy = false, endpage = 0,
			ms = o.masonryConfig, hs = w.location.hash && /\!page\=[0-9]+/.test(w.location.hash) ? w.location.hash.replace('#', "") : '!page=1',
			_prev = hs ? parseInt(hs.split('page=')[1], 10) - 1 : 0,
			_next = hs ? parseInt(hs.split('page=')[1], 10) + 1 : 2;

		// Box animations ? Use JavasScript or CSS Transition?
		// More => http://masonry.desandro.com/docs/animating.html#css_transitions
		$this.masonry({
			itemSelector: ms.itemSelector,
			isAnimated: ms.isAnimated,
			animationOptions: ms.animationOptions,
			isFitWidth: ms.isFitWidth,
			gutterWidth: ms.gutterWidth,
			isRTL: ms.isRTL
		}).html('<span id="json_loading">' + o.loadingText + '</span>').after('<div id="dte-masonry-nav"><a id="json_prev-nav">' + o.navText.prev + '</a><span id="json_total-posts">' + o.navText.data + '</span><a id="json_next-nav">' + o.navText.next + '</a></div>');

		var $nav = {
				root: $('#dte-masonry-nav'),
				prev: $('#json_prev-nav'),
				next: $('#json_next-nav'),
				data: $('#json_total-posts'),
			}, $loader = $('#json_loading'),

		postBrick = function(index) {

			var posts = 0,
				count = 0;

			$loader.removeClass('loaded').html(o.loadingText).stop().animate({top:0}, ms.fadeSpeed * 2);
			$nav.root.css('visibility', 'hidden');

			request = $.get(o.homePage.replace(/\/$/,"") + '/feeds/posts/summary' + (o.postCategory === null ? "" : '/-/' + o.postCategory.replace(/\, ?/g, "/")) + '?alt=json-in-script&orderby=published&max-results=' + o.numPosts + '&start-index=' + (index == 1 ? index : (o.numPosts * (index - 1)) + 1), {}, function(data) {

				if ("entry" in data.feed) {

					var entry = data.feed.entry, // Get the post contents...
						total = parseInt(data.feed.openSearch$totalResults.$t, 10), // Get the total posts...
						postTitle, postDate, postAuthor, postThumbnail, postContent, postUrl, commentText = [],
						skeleton = "";

					for (var i = 0, len = entry.length; i < len; i++) {

						if (i == entry.length) break;

						postTitle = entry[i].title.$t; // Get the post titles...
						postDate = entry[i].published.$t.substring(0,10), // Post date... e.g: "2012-02-07T12:56:00.000+07:00".substring(0,10) => 2012-02-07
						postAuthor = entry[i].author[0].name.$t, // Get the post author...
						postThumbnail = ("media$thumbnail" in entry[i]) ? entry[i].media$thumbnail.url : o.fallbackThumb; // Get the pos thumbnail...
						postContent = ("summary" in entry[i]) ? entry[i].summary.$t : ""; // Get the post content...

						var dy = postDate.substring(0,4), // Take 4 characters from the "postDate" beginning, it means the year (2012)
							dm = postDate.substring(5,7), // Take 2 character 5 step from "postDate" beginning, it mean the month (02)
							dd = postDate.substring(8,10); // Take 2 character 8 step from "postDate" beginning. it means the day (07)

						// Get the post URL
						for (var j = 0, jen = entry[i].link.length; j < jen; j++) {
							postUrl = (entry[i].link[j].rel == 'alternate') ? entry[i].link[j].href : '#nope';
						}
						for (var k = 0, ken = entry[i].link.length; k < ken; k++) {
							// Grab the "10 Comments" --for the example--
							if (entry[i].link[k].rel == 'replies' && entry[i].link[k].type == 'text/html') {
								commentText = entry[i].link[k].title.split(" "); // Get the comment text => "10 Comments"
								break;
							}
						}

						o.commentLabel = (commentText !== [] && o.commentLabel == '&nbsp;') ? commentText[1] : o.commentLabel;

						// About Picasa compression method, using image path such as "s1600/image.jpg", "s400/image.jpg", "s72-c/image.jpg", ...
						// Now you try to reduce the image resolution by replacing the "s[0-9]+" path with your own resolutions
						// Get the image URL from JSON (a mini thumbnail version => "s72-c/image.jpg")
						postThumbnail = (!o.squareImage) ? postThumbnail.replace(/\/s[0-9]+\-c\//, "\/s" + o.columnWidth + "\/") : postThumbnail.replace(/\/s[0-9]+\-c\//, "\/s" + o.columnWidth + "-c\/");

						// Strip all HTML tags
						postContent = postContent.replace(/<br ?\/?>/g, " ").replace(/<.*?>/g, "").replace(/[<>]/g,"");
						postContent = (postContent.length > o.numChars) ? postContent.substring(0, o.numChars) + '&hellip;' : postContent; // Reduce post summary length

						// Open link in new window?
						var tg = (o.newTabLink) ? ' target=\"_blank\"' : "";

						// Now grab the skeleton! In the Java language means "balung"
						if (o.viewMode == "summary") {
							skeleton += '<div style="width:' + o.columnWidth + 'px;" class="json_post json_summary-mode">';
							skeleton += '<h3 class="json_post-title"><a href="' + postUrl + '"' + tg + '>' + postTitle + '</a></h3>';
							skeleton += '<span class="json_sub-header">';
							skeleton += '<span class="json_author">' + o.subHeaderText[0] + postAuthor + '</span> ';
							skeleton += o.subHeaderText[1] + '<abbr class="json_post-date">' + dd + ' ' + o.monthNames[parseInt(dm,10)-1] + ' ' + dy + '</abbr>';
							skeleton += '</span>';
							skeleton += '<div class="json_post-body">';
							skeleton += (o.showThumbnails) ? '<a class="json_img-container loading" href="' + postUrl + '"' + tg + '><img src="' + postThumbnail + '" alt="' + postTitle + '"/></a>' : skeleton;
							skeleton += (o.numChars > 0) ? '<p>' + postContent + '</p>' : skeleton;
							skeleton += '</div>';
							skeleton += '<span class="json_post-footer clearfix">';
							skeleton += '<span class="json_comment">' + commentText[0] + ' ' + o.commentLabel + '</span>';
							skeleton += '<a class="json_more" href="' + postUrl + '"' + tg + '>+</span>';
							skeleton += '</span>';
							skeleton += '</div>';
						} else {
							skeleton += '<figure class="json_post json_thumbnail-mode loading">';
							skeleton += '<a href="' + postUrl + '"' + tg + '><img src="' + postThumbnail + '" alt="' + postTitle + '" style="width:' + o.columnWidth + 'px;"/></a>';
							skeleton += '<figcaption>';
							skeleton += '<strong class="json_caption"><a href="' + postUrl + '"' + tg + '>' + postTitle + '</a></strong>';
							skeleton += '<span class="json_post-date">' + dd + ' ' + o.monthNames[parseInt(dm,10)-1] + ' ' + dy + '</span> ';
							skeleton += '<span class="json_comment">' + commentText[0] + ' ' + o.commentLabel + '</span>';
							skeleton += '</figcaption>';
							skeleton += '</figure>';
						}

						posts++;

					}

					// Reset contents
					if (!o.infiniteScroll) {
						$this.removeClass('css-transition').find('.json_post').remove();
					}

					endpage = o.infiniteScroll ? $(w).scrollTop() : 0;

					// Append the generated content...
					$this.append(skeleton).masonry("reload").addClass(!ms.isAnimated && ms.animateWithTransition ? 'css-transition' : "");

					$(w).scrollTop(endpage);

					var callBack = function() {
						busy = false;
						if (count == o.numPosts || (posts < o.numPosts && count == posts)) {
							$loader.addClass('loaded').html(o.loadedText).stop().delay(700).animate({top:-100}, ms.fadeSpeed * 2);
						}
					};

					$this.find('.loading img').css('opacity', 0).each(function() {
						if (o.viewMode == "summary") {
							$(this).one("load", function() {
								$(this).animate({opacity:1}, ms.fadeSpeed, function() {
									$this.masonry("reload");
								}).parent().removeClass('loading');
								count++;
								callBack();
							});
						} else {
							$(this).on("load", function() {
								var i_w = $(this).outerWidth(),
									i_h = $(this).outerHeight();
								$(this).closest('.json_post').removeClass('loading').animate({
									width: i_w,
									height: i_h
								}, ms.resizeSpeed, function() {
									$(this).find('img').animate({opacity:1}, ms.fadeSpeed, function() {
										$this.masonry("reload");
									});
								}).hover(function() {
									$('figcaption', this).slideDown();
								}, function() {
									$('figcaption', this).slideUp();
								});
								count++;
								callBack();
							});
						}
					});

					// Setup the navigation
					var _data = o.navText.data;
					$nav.prev.html(o.navText.disabled).removeAttr('href');
					$nav.next.html(o.navText.next).attr('href', '#!page=' + _next);
					$nav.data.html(_data[0] + (_prev + 1) + _data[1] + Math.round(total/o.numPosts));
					if (w.location.hash && parseInt(w.location.hash.split('page=')[1], 10) > 1) $nav.prev.html(o.navText.prev).attr('href', '#!page=' + _prev);
					busy = false;

				} else {

					// Reset contents
					if (!o.infiniteScroll) {
						$this.find('.json_post').remove();
					}

					$loader.addClass('loaded').html(o.loadedText).stop().delay(700).animate({top:-100}, ms.fadeSpeed * 2);
					$nav.next.html(o.navText.disabled).removeAttr('href');
					busy = false;

				}

				$nav.root.css('visibility', 'visible').find('a').on("click", function() {
					if (this.href) w.location.hash = this.hash;
					return false;
				});

			}, "jsonp");

		};

		// Hashchange event...
		w.addHashChange(function(e) {
			var i = parseInt(w.location.hash.split('page=')[1], 10) || 1;
			if (o.infiniteScroll && i < _next) {
				$this.find('.json_post').remove();
				$(w).scrollTop(0);
			}
			_prev = i - 1;
			_next = i + 1;
			request.abort();
			postBrick(i);
		});

		// Initiation
		postBrick(hs ? parseInt(hs.split('page=')[1], 10) : 1);

		if (o.infiniteScroll) {
			$(w).on("scroll resize", function() {
				if (!busy && $(this).scrollTop() >= ($this.outerHeight() - $(this).height() - o.bottomTolerance)) {
					$nav.next.trigger("click");
					busy = true;
				}
			});
		}

	};

})(jQuery, window, document);