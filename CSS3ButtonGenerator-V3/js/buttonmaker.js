var cssText = '',
	forValue = '';
var cssStuff = new Array();
// Default style
cssStuff['kelas'] = "button";
cssStuff['buttonPadding'] = "20px 40px";
cssStuff['backgroundTop'] = "#2770d6";
cssStuff['backgroundCent'] = "#3161c2";
cssStuff['backgroundBottom'] = "#3059ab";
cssStuff['borderColor'] = "#3f5691";
cssStuff['borderRadius'] = "8px";
cssStuff['borderWidth'] = "1px";
cssStuff['textColor'] = "#ffffff";
cssStuff['hoverColor'] = "#ffffff";
cssStuff['hoverBackgroundTop'] = "#49579c";
cssStuff['hoverBackgroundCent'] = "#1b3880";
cssStuff['hoverBackgroundBottom'] = "#142b70";
cssStuff['borderHoverColor'] = "#0f2852";
cssStuff['fontSize'] = "16px";
cssStuff['fontStack'] = "'Century Gothic',Helvetica,Arial,Sans-Serif";
cssStuff['fontWeight'] = "normal";
cssStuff['textShadow'] = "rgba(0,0,0,0.3)";
cssStuff['borderStyle'] = "solid";
cssStuff['tingkatBlur'] = "2px";
cssStuff['warnaBayang'] = "#515151";
cssStuff['boxShadow'] = "";
cssStuff['offstX'] = "0px";
cssStuff['offstY'] = "1px";
cssStuff['colorstop1'] = "0%";
cssStuff['colorstop2'] = "50%";
cssStuff['colorstop3'] = "100%";
cssStuff['colorstop12'] = "0%";
cssStuff['colorstop22'] = "50%";
cssStuff['colorstop32'] = "100%";
cssStuff['orientation'] = "top";
cssStuff['gradientType'] = "0";
// Build the CSS Template
function createCSS() {
	cssText = ".button {";
	cssText += "  cursor:pointer;";
	cssText += "  border:" + cssStuff['borderWidth'] + " " + cssStuff['borderStyle'] + " " + cssStuff['borderColor'] + ";";
	cssText += "  background-color:" + cssStuff['backgroundBottom'] + ";";
	cssText += "  filter:progid:DXImageTransform.Microsoft.gradient(GradientType=" + cssStuff['gradientType'] + ", startColorstr='" + cssStuff['backgroundTop'] + "', endColorstr='" + cssStuff['backgroundBottom'] + "');";
	cssText += "  background-image:-webkit-linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['backgroundTop'] + " " + cssStuff['colorstop1'] + ", " + cssStuff['backgroundCent'] + " " + cssStuff['colorstop2'] + ", " + cssStuff['backgroundBottom'] + " " + cssStuff['colorstop3'] + ");";
	cssText += "  background-image:-moz-linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['backgroundTop'] + " " + cssStuff['colorstop1'] + ", " + cssStuff['backgroundCent'] + " " + cssStuff['colorstop2'] + ", " + cssStuff['backgroundBottom'] + " " + cssStuff['colorstop3'] + ");";
	cssText += "  background-image:-ms-linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['backgroundTop'] + " " + cssStuff['colorstop1'] + ", " + cssStuff['backgroundCent'] + " " + cssStuff['colorstop2'] + ", " + cssStuff['backgroundBottom'] + " " + cssStuff['colorstop3'] + ");";
	cssText += "  background-image:-o-linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['backgroundTop'] + " " + cssStuff['colorstop1'] + ", " + cssStuff['backgroundCent'] + " " + cssStuff['colorstop2'] + ", " + cssStuff['backgroundBottom'] + " " + cssStuff['colorstop3'] + ");";
	cssText += "  background-image:linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['backgroundTop'] + " " + cssStuff['colorstop1'] + ", " + cssStuff['backgroundCent'] + " " + cssStuff['colorstop2'] + ", " + cssStuff['backgroundBottom'] + " " + cssStuff['colorstop3'] + ");";
	cssText += "  padding:" + cssStuff['buttonPadding'] + ";";
	cssText += "  -webkit-border-radius:" + cssStuff['borderRadius'] + ";";
	cssText += "  -moz-border-radius:" + cssStuff['borderRadius'] + ";";
	cssText += "  border-radius:" + cssStuff['borderRadius'] + ";";
	cssText += "  -webkit-box-shadow:inset 0px 1px 0px rgba(255,255,255,0.3), " + cssStuff['boxShadow'] + "" + cssStuff['offstX'] + " " + cssStuff['offstY'] + " " + cssStuff['tingkatBlur'] + " " + cssStuff['warnaBayang'] + ";";
	cssText += "  -moz-box-shadow:inset 0px 1px 0px rgba(255,255,255,0.3), " + cssStuff['boxShadow'] + "" + cssStuff['offstX'] + " " + cssStuff['offstY'] + " " + cssStuff['tingkatBlur'] + " " + cssStuff['warnaBayang'] + ";";
	cssText += "  box-shadow:inset 0px 1px 0px rgba(255,255,255,0.3), " + cssStuff['boxShadow'] + "" + cssStuff['offstX'] + " " + cssStuff['offstY'] + " " + cssStuff['tingkatBlur'] + " " + cssStuff['warnaBayang'] + ";";
	cssText += "  text-shadow:0px 1px 0px " + cssStuff['textShadow'] + ";";
	cssText += "  color:" + cssStuff['textColor'] + ";";
	cssText += "  font:" + cssStuff['fontWeight'] + " " + cssStuff['fontSize'] + " " + cssStuff['fontStack'] + ";";
	cssText += "  text-decoration:none;";
	cssText += "  outline:none;";
	cssText += "  vertical-align:middle;";
	cssText += "}";
	cssText += ".button:hover, .hover {";
	cssText += "  border-color:" + cssStuff['borderHoverColor'] + ";";
	cssText += "  background-color:" + cssStuff['hoverBackgroundTop'] + ";";
	cssText += "  filter:progid:DXImageTransform.Microsoft.gradient(GradientType=" + cssStuff['gradientType'] + ", startColorstr='" + cssStuff['hoverBackgroundTop'] + "', endColorstr='" + cssStuff['hoverBackgroundBottom'] + "');";
	cssText += "  background-image:-webkit-linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['hoverBackgroundTop'] + " " + cssStuff['colorstop12'] + ", " + cssStuff['hoverBackgroundCent'] + " " + cssStuff['colorstop22'] + ", " + cssStuff['hoverBackgroundBottom'] + " " + cssStuff['colorstop32'] + ");";
	cssText += "  background-image:-moz-linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['hoverBackgroundTop'] + " " + cssStuff['colorstop12'] + ", " + cssStuff['hoverBackgroundCent'] + " " + cssStuff['colorstop22'] + ", " + cssStuff['hoverBackgroundBottom'] + " " + cssStuff['colorstop32'] + ");";
	cssText += "  background-image:-ms-linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['hoverBackgroundTop'] + " " + cssStuff['colorstop12'] + ", " + cssStuff['hoverBackgroundCent'] + " " + cssStuff['colorstop22'] + ", " + cssStuff['hoverBackgroundBottom'] + " " + cssStuff['colorstop32'] + ");";
	cssText += "  background-image:-o-linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['hoverBackgroundTop'] + " " + cssStuff['colorstop12'] + ", " + cssStuff['hoverBackgroundCent'] + " " + cssStuff['colorstop22'] + ", " + cssStuff['hoverBackgroundBottom'] + " " + cssStuff['colorstop32'] + ");";
	cssText += "  background-image:linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['hoverBackgroundTop'] + " " + cssStuff['colorstop12'] + ", " + cssStuff['hoverBackgroundCent'] + " " + cssStuff['colorstop22'] + ", " + cssStuff['hoverBackgroundBottom'] + " " + cssStuff['colorstop32'] + ");";
	cssText += "  color:" + cssStuff['hoverColor'] + ";";
	cssText += "}";
	cssText += ".button:active {";
	cssText += "  background-color:" + cssStuff['hoverBackgroundBottom'] + ";";
	cssText += "  filter:progid:DXImageTransform.Microsoft.gradient(GradientType=" + cssStuff['gradientType'] + ", startColorstr='" + cssStuff['hoverBackgroundBottom'] + "', endColorstr='" + cssStuff['hoverBackgroundTop'] + "');";
	cssText += "  background-image:-webkit-linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['hoverBackgroundBottom'] + ", " + cssStuff['hoverBackgroundTop'] + ");";
	cssText += "  background-image:-moz-linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['hoverBackgroundBottom'] + ", " + cssStuff['hoverBackgroundTop'] + ");";
	cssText += "  background-image:-ms-linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['hoverBackgroundBottom'] + ", " + cssStuff['hoverBackgroundTop'] + ");";
	cssText += "  background-image:-o-linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['hoverBackgroundBottom'] + ", " + cssStuff['hoverBackgroundTop'] + ");";
	cssText += "  background-image:linear-gradient(" + cssStuff['orientation'] + ", " + cssStuff['hoverBackgroundBottom'] + ", " + cssStuff['hoverBackgroundTop'] + ");";
	cssText += "}";
	$("style#thestyle").replaceWith("<style id='thestyle' type='text/css'>" + cssText + "</style>");
	cssText = cssText.replace(/;/g, ";<br />  ").replace(/{/g, "{<br />  ").replace(/  }/g, "}<br /><br />").replace(/, .hover/g, "").replace(/.button/g, "." + cssStuff['kelas']);
	$("#kode-css, #preview").html(cssText);
}

function reCenterButton() {
	$(".button").position({
		"my": "center center",
		"at": "center center",
		"of": $("#button-box")
	});
}
$(function () {
	$("#preview").css({
		'height': $(window).height() / 2,
		'cursor': 'default'
	}).disableSelection();
	$("head").append("<style id='thestyle' type='text/css'></style>");
	reCenterButton();
	createCSS();
	// Button padding
	$("#sizer").slider({
		range: "min",
		value: 40,
		min: 4,
		max: 80,
		step: 2,
		slide: function (event, ui) {
			cssStuff['buttonPadding'] = ui.value / 2 + "px " + ui.value + "px";
			reCenterButton();
			createCSS();
		}
	});
	// Font size
	$("#font-sizer").slider({
		range: "min",
		value: 16,
		min: 8,
		max: 24,
		slide: function (event, ui) {
			cssStuff['fontSize'] = ui.value + "px";
			reCenterButton();
			createCSS();
		}
	});
	// Rounded Corner
	$("#border-rounder").slider({
		range: "min",
		value: 8,
		min: 0,
		max: 120,
		slide: function (event, ui) {
			cssStuff['borderRadius'] = ui.value + "px";
			reCenterButton();
			createCSS();
		}
	});
	// Border width
	$("#penebal-border").slider({
		range: "min",
		value: 1,
		min: 0,
		max: 24,
		slide: function (event, ui) {
			cssStuff['borderWidth'] = ui.value + "px";
			reCenterButton();
			createCSS();
		}
	});
	// Shadow blur
	$("#bayangan").slider({
		range: "min",
		value: 2,
		min: 0,
		max: 20,
		slide: function (event, ui) {
			cssStuff['tingkatBlur'] = ui.value + "px";
			reCenterButton();
			createCSS();
		}
	});
	// Shadow offset-X
	$("#bayanganX").slider({
		range: "min",
		value: 0,
		min: -20,
		max: 20,
		slide: function (event, ui) {
			cssStuff['offstX'] = ui.value + "px";
			reCenterButton();
			createCSS();
		}
	});
	// Shadow offset-Y
	$("#bayanganY").slider({
		range: "min",
		value: 1,
		min: -20,
		max: 20,
		slide: function (event, ui) {
			cssStuff['offstY'] = ui.value + "px";
			reCenterButton();
			createCSS();
		}
	});
	// Colorpicker format
	$(".pickable").ColorPicker({
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(".button.hover").removeClass("hover");
			$(colpkr).hide();
			return false;
		},
		onSubmit: function (hsb, hex, rgb, el) {
			$(".button.hover").removeClass("hover");
			$(el).val(hex).css("background", "#" + hex);
			$(el).ColorPickerHide();
			forValue = $(el).attr("rel");
			cssStuff[forValue] = "#" + hex;
			createCSS();
		},
		onChange: function (hsb, hex, rgb, el) {
			$($(this).data('colorpicker').el).val(hex).css("background", "#" + hex);
			forValue = $($(this).data('colorpicker').el).attr("rel");
			cssStuff[forValue] = "#" + hex;
			createCSS();
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor(this.value);
		}
	});
	// Font family
	$("#fontSelector").change(function () {
		cssStuff['fontStack'] = $(this).val();
		reCenterButton();
		createCSS();
	});
	// Font weight
	$("#fontWeight").change(function () {
		cssStuff['fontWeight'] = $(this).val();
		reCenterButton();
		createCSS();
	});
	// Border style
	$("#borderStyleSelector").change(function () {
		cssStuff['borderStyle'] = $(this).val();
		reCenterButton();
		createCSS();
	});
	// Shadow type
	$("#boxShadow").change(function () {
		cssStuff['boxShadow'] = $(this).val();
		createCSS();
	});
	// Embossed or Letterpress
	$("#textShadow").change(function () {
		cssStuff['textShadow'] = $(this).val();
		createCSS();
	});
	// Clear textfield onfocus & Update ClassName on Keyup
	$("#ganti").focus(function () {
		$(this).val("");
	}).keyup(function () {
		cssStuff['kelas'] = $(this).val();
		createCSS();
	});
	// COLOR STOPSZZZZZ!!!!
	$("#cstop1").slider({
		range: "min",
		value: 0,
		min: 0,
		max: 100,
		slide: function (event, ui) {
			cssStuff['colorstop1'] = ui.value + "%";
			reCenterButton();
			createCSS();
		}
	});
	$("#cstop2").slider({
		range: "min",
		value: 50,
		min: 0,
		max: 100,
		slide: function (event, ui) {
			cssStuff['colorstop2'] = ui.value + "%";
			reCenterButton();
			createCSS();
		}
	});
	$("#cstop3").slider({
		range: "min",
		value: 100,
		min: 0,
		max: 100,
		slide: function (event, ui) {
			cssStuff['colorstop3'] = ui.value + "%";
			reCenterButton();
			createCSS();
		}
	});
	$("#cstop12").slider({
		range: "min",
		value: 0,
		min: 0,
		max: 100,
		slide: function (event, ui) {
			cssStuff['colorstop12'] = ui.value + "%";
			reCenterButton();
			createCSS();
		}
	});
	$("#cstop22").slider({
		range: "min",
		value: 50,
		min: 0,
		max: 100,
		slide: function (event, ui) {
			cssStuff['colorstop22'] = ui.value + "%";
			reCenterButton();
			createCSS();
		}
	});
	$("#cstop32").slider({
		range: "min",
		value: 100,
		min: 0,
		max: 100,
		slide: function (event, ui) {
			cssStuff['colorstop32'] = ui.value + "%";
			reCenterButton();
			createCSS();
		}
	});
	// Gradient orientation
	$("input[name='orientation']").change(function () {
		cssStuff['orientation'] = $(this).val();
		cssStuff['gradientType'] = $(this).attr('rel');
		createCSS();
	});
	$("input[name='customorient']").change(function () {
		if ($(this).is(':checked')) {
			$('#custom').slideDown();
		} else {
			$(this).next("strong").text("Custom Orientation");
			$('#custom').slideUp();
		}
	});
	$("#custom").slider({
		range: "min",
		value: 270,
		min: 0,
		max: 360,
		slide: function (event, ui) {
			cssStuff['orientation'] = ui.value + "deg";
			$("input[name='customorient']").next("strong").text(ui.value + "deg");
			createCSS();
		}
	});
	// DIALOG OPENER
	$("#opsi").click(function () {
		$("#opsi-lain").dialog({
			title: "Font Family, Border Style and Other",
			width: 325,
			height: "auto",
			show: "slide",
			hide: "blind",
			buttons: {
				"OK": function () {
					$(this).dialog("close");
				}
			},
			position: {
				my: 'right top',
				at: 'right top'
			}
		});
	});
	$("#advanced").click(function () {
		$("#color-stop-advanced").dialog({
			title: "Gradient Color Stop",
			width: 350,
			height: "auto",
			show: "slide",
			hide: "blind",
			position: {
				my: 'right top',
				at: 'right top'
			},
			buttons: {
				"OK": function () {
					$(this).dialog("close");
				}
			}
		});
	});
	$("#ukur").click(function () {
		$("#ukuran").dialog({
			title: "Variable Size",
			width: 350,
			height: "auto",
			show: "slide",
			hide: "blind",
			buttons: {
				"OK": function () {
					$(this).dialog("close");
				}
			},
			position: {
				my: 'right top',
				at: 'right top'
			}
		});
	});
	$("#showhow").click(function () {
		$("#howto").dialog({
			title: "How to Use",
			modal: true,
			width: 700,
			height: "auto",
			buttons: {
				"OK": function () {
					$(this).dialog("close");
				}
			}
		});
		return false;
	});
	// Toggle layout
	$("#toggle1").click(function () {
		$("#button-box, body").toggleClass("hitam");
		$("span", this).toggle();
	});
	$("#color-stop-advanced .hov").hover(function () {
		$(".button").addClass("hover");
	}, function () {
		$(".button").removeClass("hover");
	});
	$('#hover-section div').click(function () {
		$(".button").addClass("hover");
	});
	// GENERATE CSS!
	$("a.button").click(function () {
		$("#preview-outer, a.close").hide();
		$("#page-wrap").css('margin-bottom', 50);
		$("#kode-css").dialog({
			title: "CSS Code",
			width: 600,
			height: 400,
			hide: "fade",
			buttons: {
				"About": function () {
					window.open("https://plus.google.com/108949996304093815163/about");
				},
				"Close": function () {
					$(this).dialog("close");
				}
			}
		});
		return false;
	});
});