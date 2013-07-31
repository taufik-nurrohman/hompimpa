$(window).bind("load", function() {

	var f = function(i, path, parent) {
		$('<style type="text/css"></style>').load('files/' + path + '/' + i + '.css').appendTo('head');
		$('<div class="item"></div>').html('<small>Loading...</small>').load('files/' + path + '/' + i + '.html').appendTo(parent);
	},
	cont1 = '#arrows-container',
	cont2 = '#activity-container',
	cont3 = '#social-container',
	cont4 = '#other-container',
	maincontent = $('#result');


// Oh, GOD! I don't think that this is the best way to load the object.
// --------------------------------------------------------------------


// Arrows Icons
f('undo', 'arrows', cont1);
f('redo', 'arrows', cont1);
f('trianglesets', 'arrows', cont1);
f('arrowsets', 'arrows', cont1);

// Activity Icons
f('home', 'activity', cont2);
f('user', 'activity', cont2);
f('archives', 'activity', cont2);
f('comments', 'activity', cont2);
f('cd', 'activity', cont2);
f('applemac', 'activity', cont2);
f('database', 'activity', cont2);
f('gear', 'activity', cont2);
f('information', 'activity', cont2);
f('watch', 'activity', cont2);
f('laptop', 'activity', cont2);
f('mouse', 'activity', cont2);
f('miniclock', 'activity', cont2);
f('podcast', 'activity', cont2);
f('newfile', 'activity', cont2);
f('geolocation', 'activity', cont2);
f('print', 'activity', cont2);
f('skull', 'activity', cont2);
f('template', 'activity', cont2);
f('trafficlight', 'activity', cont2);
f('starburst', 'activity', cont2);
f('sun', 'activity', cont2);
f('engine', 'activity', cont2);
f('trash', 'activity', cont2);
f('puzzle', 'activity', cont2);
f('shutdown', 'activity', cont2);
f('camera', 'activity', cont2);
f('melody', 'activity', cont2);
f('lock', 'activity', cont2);
f('hypnotic', 'activity', cont2);
f('snow', 'activity', cont2);
f('attachment', 'activity', cont2);
f('video', 'activity', cont2);

// Social icons
f('rss', 'social', cont3);
f('blogger', 'social', cont3);
f('youtube', 'social', cont3);
f('facebook', 'social', cont3);
f('twitter', 'social', cont3);
f('flickr', 'social', cont3);
f('google', 'social', cont3);
f('wordpress', 'social', cont3);
f('linkedin', 'social', cont3);
f('technorati', 'social', cont3);
f('myspace', 'social', cont3);
f('mail', 'social', cont3);
f('gmail', 'social', cont3);
f('delicious', 'social', cont3);
f('digg', 'social', cont3);
f('youtube', 'social', cont3);
f('diigo', 'social', cont3);
f('deviantart', 'social', cont3);
f('designfloat', 'social', cont3);
f('netvibes', 'social', cont3);
f('favorites', 'social', cont3);
f('netvous', 'social', cont3);
f('msn', 'social', cont3);
f('fotolia', 'social', cont3);
f('blinklist', 'social', cont3);
f('friendster', 'social', cont3);
f('misterwong', 'social', cont3);
f('plurk', 'social', cont3);
f('newsvine', 'social', cont3);
f('skype', 'social', cont3);
f('reddit', 'social', cont3);
f('blogmarks', 'social', cont3);
f('designbump', 'social', cont3);
f('slashdot', 'social', cont3);
f('picasa', 'social', cont3);
f('propeller', 'social', cont3);
f('soundcloud', 'social', cont3);

// Other icons
f('konoha', 'other', cont4);
f('sunagakure', 'other', cont4);







	var loader = "<div class='loading'>Loading...</div>";
	$('pre#general').html(loader).load('files/general.css');
	$('a.sc-icon').live("click", function() {
		$('a#top').show();
		$('a.selected').removeClass('selected');
		$(this).addClass('selected');
		$('html, body').animate({scrollTop:$('#result').offset().top-20}, 1000, function() {
			var selected = $('a.selected');
			$('pre', '#css').html(loader).load('files/' + selected.attr('href') + '.css');
			$('pre', '#html').html(loader).load('files/' + selected.attr('href') + '.html', function() {
				$(this).html($(this).html().replace(/\t/g, "    ").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;"));
			});
		});
		return false;
	});
	$('a#top').hide().removeAttr('href').click(function() {
		$('html, body').animate({scrollTop:$('a.selected').parents('div.container').offset().top-30}, 400);
		return false;
	});
	$('pre').click(function() {
		var refNode = $( this )[0];
		if ( $.browser.msie ) {
			var range = document.body.createTextRange();
			range.moveToElementText( refNode );
			range.select();
		} else if ( $.browser.mozilla || $.browser.opera ) {
			var selection = window.getSelection();
			var range = document.createRange();
			range.selectNodeContents( refNode );
			selection.removeAllRanges();
			selection.addRange( range );
		} else if ( $.browser.safari ) {
			var selection = window.getSelection();
			selection.setBaseAndExtent( refNode, 0, refNode, 1 );
		}
	});
});