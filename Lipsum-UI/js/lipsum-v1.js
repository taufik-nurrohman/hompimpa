/*
Lipsum-UI scripts. These are the lines that will create a miracle
Please note that I created this tool when I was 19 years old. So do not blame me if there's a lots of things are not so efficient :p
+ Updated on 11 Dec 2012
*/

(function($) {

	var $preview = $('#preview'),
		$area = $('#area'),
		$confirmBox = $('.confirmbox'),
		$resultCode = $('#thecode'),
		$button = $('button'),
		$panel = $('.panel'),
		$add = $panel.find('.add'),
		$mainBtn = $('#mainButton'),
		$accordion = $('#akordion'),
		$optionBtn = $('#open, a.jokes'),
		$generateBtn = $('#generate'),
		$resetBtn = $('#resetItem'),
		$extrasBtn = $('#extras'),
		$sidebar = $('#sidebar'),
		$hLevel = $('#header .choose'),
		$addParagraph = $('#addParagraph'),
		$addPreBlock = $('#addPreBlock'),
		$addOther = $('#addOther'),
		$addUl = $('#addul'),
		$addOl = $('#addol'),
		$addTable = $('#addTable'),
		$addForms = $('#addForms'),
		$addVideo = $('#addVideo'),
		$sc1 = $('#source1'),
		$sc2 = $('#source2'),
		$sc3 = $('#source3'),
		$paraField = $('#pg'),
		$imageSource = $('#imageSource'),
		$removeAll = $('#removeAll'),
		list = '<li>This is an example list 1</li><li>This is an example list 2</li><li>This is an example list 3</li><li>This is an example list 4</li><li class="remove"><a class="plus" href="#">add more (+)</a> <a class="minus" href="#">delete (&times;)</a></li>',
		trow = '<tr><td>Division 1.1</td><td>Division 1.2</td><td>Division 1.3</td><td>Division 1.4</td></tr><tr><td>Division 2.1</td><td>Division 2.2</td><td>Division 2.3</td><td>Division 2.4</td></tr><tr><td>Division 3.1</td><td>Division 3.2</td><td>Division 3.3</td><td>Division 3.4</td></tr><tr class="remove"><td colspan="4" class="ui-widget-header"><a class="plus" href="#">add row (+)</a> <a class="minus" href="#">delete row (&times;)</a></td></tr>',
		ls = localStorage;

	$area.sortable();
	$button.button();
	$add.button({
		icons: { primary: "ui-icon-circle-plus" }
	});
	$mainBtn.draggable({ axis: "y" });
	$accordion.accordion({ autoHeight: false });
	$optionBtn.button({
		icons: {
			primary: "ui-icon-wrench",
			secondary: "ui-icon-triangle-1-s"
		}
	}).live("click", function() {
		$sidebar.dialog({
			title: "Options",
			width: 470,
			resizable: false,
			show: "slide",
			hide: "fade",
			position: {
				my: 'right top',
				at: 'right top'
			}
		});
		return false;
	});;

	// UMMM... FUNCTIONS
	var removePart = function() {
		$('.sortable').find('.remove').change(function() {
			if ($(this).is(':checked')) {
				$(this).parent().addClass('active');
				$(':checkbox[style]').removeAttr('style');
			} else {
				$(this).parent().removeClass('active');
			}
		});
	},
	hoverImage = function() {
		$('.separator').hover(function() {
			$('.image-option', this).show();
		}, function() {
			$('.image-option', this).hide();
		});
	},
	toggleClass = function() {
		$('.image-option a').removeClass('selected').on("click", function() {
			$(this).parent().find('a').removeClass('selected');
			$(this).addClass('selected');
		});
	},
	fallDown = function() {
		$('.sortable.hidden').slideDown(600, "easeOutBounce");
	};

	removePart();
	hoverImage();
	toggleClass();

	if (typeof (ls) !== 'undefined') {

		// SAVE ALL DATA WITH LOCAL STORAGE
		var savingsavingsaving = setInterval(function() {
			ls.setItem('savedMarkup', $area.html());
			ls.setItem('savedPara', $paraField.val());
			ls.setItem('videoSource', $sc1.val()+','+$sc2.val()+','+$sc3.val());
			ls.setItem('imageSource', $imageSource.val());
			ls.setItem('mainPanelPos', $mainBtn.css('top'));
		}, 10);

		// RESET THE ITEM
		$resetBtn.button({
			icons: { primary: 'ui-icon-refresh' }
		}).on("click", function() {
			ls.clear();
			clearInterval(savingsavingsaving);
			$confirmBox.html('All saved data has been removed.').dialog({
				title: 'Removed',
				modal: true,
				buttons: {
					"Undo": function() {
						savingsavingsaving = setInterval(function() {
							ls.setItem('savedMarkup', $area.html());
							ls.setItem('savedPara', $paraField.val());
							ls.setItem('videoSource', $sc1.val()+','+$sc2.val()+','+$sc3.val());
							ls.setItem('imageSource', $imageSource.val());
							ls.setItem('mainPanelPos', $mainBtn.css('top'));
						}, 10);
						$(this).dialog("close");
					},
					"Reload?": function() {
						window.location.reload(1);
					},
					"Close": function() {
						$(this).dialog("close");
					}
				}
			});
			return false;
		});
		if (ls.getItem('savedPara')) {
			$paraField.val(ls.getItem('savedPara'));
		}
		if (ls.getItem('imageSource')) {
			$imageSource.val(ls.getItem('imageSource'));
		}
		if (ls.getItem('videoSource')) {
			var part = ls.getItem('videoSource').split(',');
			$sc1.val(part[0]);
			$sc2.val(part[1]);
			$sc3.val(part[2]);
		}
		if (ls.getItem('savedMarkup')) {
			$area.html(ls.getItem('savedMarkup'));
			$area.find(':checkbox:visible').removeAttr('style').parent().removeClass('active');
			hoverImage();
			toggleClass();
		}
		if (ls.getItem('mainPanelPos')) {
			$mainBtn.css('top', ls.getItem('mainPanelPos'));
		}

	} else {
		$resetBtn.remove();
	}

	// HEADER SECTION
	$hLevel.button({
		icons: { primary: "ui-icon-plusthick" }
	}).on("click", function() {
		var hlevel = $(this).attr('id'),
			alt = $(this).text().replace(/Add/i, "Example");
		$area.prepend('<div class="sortable head hidden"><' + hlevel + '>' + alt + '</' + hlevel + '><input type="checkbox" class="remove" /></div>');
		fallDown();
		removePart();
	});

	// PARAGRAPH SECTION
	$addParagraph.on("click", function() {
		var paragraph = $paraField.val(),
			imgUrl = $imageSource.val();
		$area.prepend('<div class="sortable hidden"><div class="separator align-left"><img src="' + imgUrl + '" alt="example image" /><div class="remove image-option ui-widget-header"><b>Float:</b> <a class="fleft selected" href="#">left</a> &bull; <a class="fright" href="#">right</a> &bull; <a class="fnone" href="#">none</a> &bull; <a class="dels" href="#">remove image</a></div></div><p>' + $.trim(paragraph) + '<span class="remove"> <a class="plus" href="#">add more words (+)</a> <a class="minus" href="#">undo add (&times;)</a></span></p><div class="remove clear"></div><input type="checkbox" class="remove" /></div>');
		fallDown();
		removePart();
		hoverImage();
		toggleClass();
	});
	$addPreBlock.on("click", function(teks) {
		teks = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.";
		$area.prepend('<div class="sortable hidden"><blockquote>' + $.trim(teks) + '</blockquote><pre>' + $.trim(teks) + '</pre><input type="checkbox" class="remove" /></div>');
		fallDown();
		removePart();
	});
	$addOther.on("click", function() {
		$('#area').prepend('<div class="sortable hidden"><p>Lorem ipsum <abbr>abbr</abbr> dolor <strong>strong</strong> sit <b>bold</b> amet, <u>underline</u> consectetuer <i>italic</i> adipiscing elit, sed <em>emphasis</em> diam nonummy <b>bold</b> nibh euismod <code>another example code</code> tincidunt ut laoreet <a href="#">this is a link</a> dolore magna aliquam erat volutpat.</p><input type="checkbox" class="remove" /></div>');
		fallDown();
		removePart();
	});

	// LIST SECTION
	$addUl.on("click", function() {
		$area.prepend('<div class="sortable hidden"><ul>' + list + '</ul><input type="checkbox" class="remove" /></div>');
		fallDown();
		removePart();
	});

	$addOl.on("click", function() {
		$area.prepend('<div class="sortable hidden"><ol>' + list + '</ol><input type="checkbox" class="remove" /></div>');
		fallDown();
		removePart();
	});

	// TABLE SECTION
	$addTable.on("click", function() {
		$area.prepend('<div class="sortable hidden"><table border="1"><thead><tr><th>Table Header 1</th><th>Table Header 2</th><th>Table Header 3</th><th>Table Header 4</th></thead><tbody></tr>' + trow + '</tbody></table><input type="checkbox" class="remove" /></div>');
		fallDown();
		removePart();
	});

	// UGLY FORM SECTION
	$addForms.on("click", function() {
		$area.prepend('<div class="sortable hidden"><form><input type="text" /><br /><input type="text" /><br /><textarea>Example text...</textarea><br /><button>A Button</button><input value="A Reset Button" type="reset" /><input value="A Submit Button" type="submit" /><br /><input name="radio" type="radio" /> Male<br /><input name="radio" type="radio" /> Female<br /><input name="radio" type="radio" /> Other?<br /><input type="checkbox" /> I agree with your opinion<br /><select><option>A Select Box</option><option>Option 1</option><option>Option 2</option><option>Option 3</option><option>Option 4</option><option>Option 5</option></select></form><input type="checkbox" class="remove" /></div>');
		fallDown();
		removePart();
	});

	// VIDEO SECTION
	$addVideo.on("click", function() {
		$area.prepend('<div class="sortable hidden"><div class="separator align-center"><video width="320" height="240" style="margin:0px auto 0px;" controls="controls"><source src="' + $sc1.val() + '" type="video/ogg"><source src="' + $sc2.val() + '" type="video/mp4"><source src="' + $sc3.val() + '" type="video/webm">Your browser does not support the video tag. But you could include an iframe/embeded video here.</video></div><input type="checkbox" class="remove" /></div>');
		fallDown();
		removePart();
		toggleClass();
	});

	// INCREASE/DECREASE BUTTONS
	$area.on("click", "li .plus", function() {
		var n = $(this).parent().siblings().length;
		$(this).parent().before('<li>This is an example list ' + (n + 1) + '</li>');
		return false;
	});
	$area.on("click", "li .minus", function() {
		$(this).parent().prev().remove();
		return false;
	});
	$area.on("click", "td .plus", function() {
		var tn = $(this).parents('tr').siblings().length - 1;
		$(this).closest('tr').before('<tr><td>Division ' + (tn + 1) + '.1</td><td>Division ' + (tn + 1) + '.2</td><td>Division ' + (tn + 1) + '.3</td><td>Division ' + (tn + 1) + '.4</td></tr>');
		return false;
	});
	$area.on("click", "td .minus", function() {
		$(this).closest('tr').prev().remove();
		return false;
	});
	$area.on("click", "p .plus", function() {
		var paragraph = $paraField.val();
		$(this).parent().before($.trim('<span class="p hidden"> ' + paragraph + '</span>'));
		$('.p.hidden').fadeIn();
		return false;
	});
	$area.on("click", "p .minus", function() {
		$(this).parent().prev().remove();
		return false;
	});

	// IMAGE OPTIONS
	$area.on("click", ".separator .fleft", function() {
		$(this).closest('.separator').removeClass('align-left align-right align-center').addClass('align-left');
		return false;
	});
	$area.on("click", ".separator .fright", function() {
		$(this).closest('.separator').removeClass('align-left align-right align-center').addClass('align-right');
		return false;
	});
	$area.on("click", ".separator .fnone", function() {
		$(this).closest('.separator').removeClass('align-left align-right align-center').addClass('align-center');
		return false;
	});

	// DELETE!
	$removeAll.button({
		icons: { primary: "ui-icon-trash" }
	}).on("click", function() {
		if ($('.sortable').find(':checked').length) {
			$area.find(':checkbox:checked').parent().slideUp(600, function() {
				$(this).remove();
			});
			$(':checkbox[style]').removeAttr('style');
		} else {
			$confirmBox.html('Please select an object!').dialog({
				title: "Oppsss!!!",
				modal: true,
				buttons: {
					"OK": function() {
						$(this).dialog("close");
						$(':checkbox:hidden').show();
					}
				}
			});
		}
	});
	$area.on("click", ".dels", function() {
		$confirmBox.html('<span class="ui-icon ui-icon-alert" style="float:left;margin:0px 10px 0px 0px;"></span>Hey, this will not be returned. Are you sure?!').dialog({
			title: "Confirmation",
			modal: true,
			buttons: {
				"Yes I Do": function() {
					$('.dels.selected').closest('.separator').remove();
					$(this).dialog("close");
				},
				"Really?": function() {
					$confirmBox.html('<img src="images/meeeeeee.png" style="float:left;margin:0px 10px 0px 0px;" />No, Just kidding. Haha! To restore the image, just <a class="jokes" href="#">add a new paragraph</a>').dialog({
						buttons: {
							"Remove Image": function() {
								$('.dels.selected').closest('.separator').remove();
								$(this).dialog("close");
							},
							"Close": function() {
								$(this).dialog("close");
							}
						}
					});
				}
			}
		});
		return false;
	});

	// EXTRAS...
	$extrasBtn.button({
		icons: { primary: "ui-icon-folder-collapsed" }
	}).toggle(function() {
		$area.slideUp(400, function() {
			$('<div id="loading-helper"><strong class="ui-state-error">Loading...</strong></div>').appendTo($preview).load("extras.html #extras-container");
		});
		$(this).button({
			label: "Back",
			icons: {
				primary: "ui-icon-circle-arrow-w"
			}
		}).prevAll().hide();
	}, function() {
		$preview.find('#loading-helper').remove();
		$area.slideDown('slow', "easeOutBounce", function() {
			$extrasBtn.button({
				label: "Extras",
				icons: {
					primary: "ui-icon-folder-collapsed"
				}
			}).prevAll().fadeIn();
		});
	});

	// I SEE... :(O)
	$generateBtn.button({
		icons: { primary: "ui-icon-carat-2-e-w" }
	}).on("click", function(realContent) {
		realContent = $area.clone();
		realContent.find('.remove').remove();
		realContent.find('.sortable').children().unwrap();
		realContent.find('.p').contents().unwrap();
		var thecode = realContent.html()
		.replace(/<br\s?\/?>/ig, "<br/>")
		.replace(/<\/(h[123456])>/ig, "<\/$1>\n")
		.replace(/(<div class=\"separator(.[^>]*)\">)/ig, "$1\n    ")
		.replace(/<\/div>/ig, "\n<\/div>\n\n")
		.replace(/<source/ig, "\n        <source")
		.replace(/<\/video>/ig, "\n    <\/video>")
		.replace(/<\/p>/ig, "<\/p>\n\n")
		.replace(/<(ul|ol|table|thead|tbody)(.*?)>/ig, "<$1$2>\n    ")
		.replace(/<(input|select|textarea|button)/ig, "\n<$1")
		.replace(/<\/(thead|tbody)>/ig, "<\/$1>\n    ")
		.replace(/<\/(li|tr)>/ig, "<\/$1>\n    ")
		.replace(/<\/tr>/ig, "\n    <\/tr>")
		.replace(/\s+<\/(ul|ol|table)>/ig, "\n<\/$1>\n\n")
		.replace(/<\/form>/g, "\n<\/form>\n\n")
		.replace(/<(input|textarea|\/?select|button)/ig, "    <$1")
		.replace(/    <\/select/ig, "\n    <\/select")
		.replace(/<option/ig, "\n        <option")
		.replace(/<(\/?tr)>/ig, "    <$1>")
		.replace(/<(td|th)>/ig, "\n            <$1>")
		.replace(/<\/(blockquote|pre)>/ig, "<\/$1>\n\n")
		.replace(/^\n+/, "")
		.replace(/\n+$/, "");
		$resultCode.val(thecode).dialog({
			title: "Generated Code",
			width: 600,
			height: 470,
			show: "fade",
			hide: {
				effect: "explode",
				duration: 1000
			},
			resizable: false,
			buttons: {
				"Select All": function() {
					$(this).focus().select();
				},
				"Cancel": function() {
					$(this).dialog("close");
				}
			}
		});
	});

})(jQuery);