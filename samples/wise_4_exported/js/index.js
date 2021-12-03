var htmlname = "index.html";
var isTouchDevice = 'ontouchstart' in document.documentElement;
var pageNo = 1;
var scale;
var sound1 = "sound1";
var sound2 = "sound2";






function FindFitScale(height, width) {
  var size = (height / $("#div_main").height());

  function find_(size, width) {
    if ($("#div_main").width() * size > width) {
      size -= 0.05;
      find_(size, width);
    } else {
      scale = size;
      window.parent_scale = size;
    }
  }
  find_(size, width);

}
window.onorientationchange = function() {
  var orientation = window.orientation;
  FindFitScale($(window).height(), $(window).width());
  $("#div_main").css("left", '50%');
  $("#div_main").css("transform-origin", '0 0');
  $("#div_main").css("transform", 'scale(' + window.parent_scale + ') translateX(-50%)');
  window.parent_top = $('#div_main').get(0).getBoundingClientRect().top;
  window.parent_left = $('#div_main').get(0).getBoundingClientRect().left;
}
window.onresize = function() {
  FindFitScale($(window).height(), $(window).width());

  $("#div_main").css("left", '50%');
  $("#div_main").css("transform-origin", '0 0');
  $("#div_main").css("transform", 'scale(' + window.parent_scale + ') translateX(-50%)');
  window.parent_top = $('#div_main').get(0).getBoundingClientRect().top;
  window.parent_left = $('#div_main').get(0).getBoundingClientRect().left;
}

$(document).ready(function() {
  FindFitScale($(window).height(), $(window).width());
  $("#div_main").css("left", '50%');
  $("#div_main").css("transform-origin", '0 0');
  $("#div_main").css("transform", 'scale(' + window.parent_scale + ') translateX(-50%)');
  window.parent_top = $('#div_main').get(0).getBoundingClientRect().top;
  window.parent_left = $('#div_main').get(0).getBoundingClientRect().left;
});




function changeToggleState(cvs) {
  if (cvs.state == true) {
    cvs.state = false;
  } else {
    cvs.state = true;
  }
}

$("body").on('contextmenu', function() {
  return false;
});

$("body").on('selectstart', function() {
  return false;
});

$("body").on('dragstart', function() {
  return false;
});

var checkMobile = function () {
    var isMobile = false; //initiate as false
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    return isMobile;
}

var canvas_ctx = undefined;
var canvas_MousePos = undefined;

function  getMousePos(elt, evt) {
	var rect = elt.getBoundingClientRect(),
	pos = {x: 0, y: 0};
	if (evt.type.startsWith("touch")){
		pos.x = evt.originalEvent.touches[0].clientX;
		pos.y = evt.originalEvent.touches[0].clientY;
	} else {
		pos.x = evt.clientX;
		pos.y = evt.clientY;
	}
	return {
		x: (pos.x - rect.left),
		y: (pos.y - rect.top)
	}
}

var CanvasDrawContext = function(canvas, isInit){
	isInit = typeof reverse !== 'undefined' ? isInit : false;
	if (canvas_ctx != undefined) {
		canvas_ctx.closePath();
		canvas_ctx = undefined;
	}
	if (canvas != undefined && canvas != null && canvas.tagName.toUpperCase() == "CANVAS") {
		var rect = canvas.getBoundingClientRect(),
		scaleX = canvas.width / rect.width,
		scaleY = canvas.height / rect.height;
		canvas_ctx = canvas.getContext('2d');
		canvas_ctx.globalAlpha = parseFloat($(canvas).attr('data-context-alpha'));
		canvas_ctx.lineWidth = parseInt($(canvas).attr('data-pen-width')) * $('#div_main').css('scale') * (scaleX > scaleY ? scaleY : scaleX);;
  		canvas_ctx.lineJoin = 'round';
  		canvas_ctx.lineCap = 'round';
  		canvas_ctx.strokeStyle = $(canvas).attr('data-pen-color');
        canvas_ctx.fillStyle = canvas_ctx.strokeStyle;
		if (!isInit){
			if ($(canvas).attr('data-type-mode') == "erase")
			{
				canvas_ctx.globalCompositeOperation = 'destination-out';
			} else {
				canvas_ctx.globalCompositeOperation = 'source-over';
			}
			canvas_ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
		}
	}
}

var Canvas_MouseDown = function(e){
	if (e.type == 'mousedown' && isTouchDevice == true) return;

	//e.preventDefault();
	e.stopPropagation();
	CanvasDrawContext(this);
	canvas_MousePos = getMousePos(this, e);
	Canvas_Drawing(canvas_MousePos.x, canvas_MousePos.y, true);
};

var Canvas_MouseMove = function(e){
	if (canvas_ctx == undefined || canvas_ctx == null) return;
	if (e.type == 'mousemove' &&  e.which != 1) return;
	//e.preventDefault();
	e.stopPropagation();
	var pos = getMousePos(this, e);

	var dis = Math.sqrt(Math.pow(canvas_MousePos.x - pos.x, 2)+Math.pow(canvas_MousePos.y - pos.y, 2));
	for (i=0; i < dis; i += 1) {
		var s = i/dis;
		Canvas_Drawing(canvas_MousePos.x * s + pos.x * (1-s), canvas_MousePos.y * s + pos.y * (1-s), true);
	}
	canvas_MousePos = { x: pos.x,  y: pos.y }
};

var Canvas_MouseUp = function(e){
	if (canvas_ctx == undefined || canvas_ctx == null) return;
	//e.preventDefault();
	e.stopPropagation();
	CanvasDrawContext(undefined);
	canvas_MousePos = undefined;
};

var Canvas_MouseLeave = function(e){
	if (canvas_ctx == undefined || canvas_ctx == null) return;
	e.preventDefault();
	e.stopPropagation();
	canvas_MousePos = undefined;
};

var Canvas_MouseEnter = function(e){
	if (canvas_ctx == undefined || canvas_ctx == null) return;
	e.preventDefault();
	e.stopPropagation();
	if (e.type.startsWith("mouse") &&  e.which == 1) {
		canvas_MousePos = getMousePos(this, e);
	    CanvasDrawContext(this);
		Canvas_Drawing(canvas_MousePos.x, canvas_MousePos.y, true);
	}
};

function Canvas_Drawing(x, y, isDraw) {
    if (isDraw) {
        var w = parseFloat(canvas_ctx.lineWidth) * 0.5;
       
        canvas_ctx.beginPath();
        canvas_ctx.arc(x, y, w, 0, 2 * Math.PI);
        canvas_ctx.fill();
        canvas_ctx.closePath();
        canvas_ctx.stroke();
    }
}

function Canvas_Initialize(index, canvas) {
  if (canvas == undefined || canvas == null || canvas.tagName.toUpperCase() != "CANVAS") return;
  $(canvas).on('mousedown touchstart', Canvas_MouseDown);
  $(canvas).on('mousemove touchmove', Canvas_MouseMove);
  $(canvas).on('mouseup touchend', Canvas_MouseLeave);
  $(canvas).on('mouseleave', Canvas_MouseLeave);
  $(canvas).on('mouseenter', Canvas_MouseEnter);
  var src = $(canvas).attr('data-src');
  if (src == undefined || src.length == 0) return;
  var image = new Image(canvas.width, canvas.height);
  image.src = src;
  image.onload = function() {
	CanvasDrawContext(canvas, true);
	canvas_ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
  }
}

$(document).ready(function() {
    $('canvas').each(Canvas_Initialize);
});

$(document).ready(function(){
jQuery.data(cvs_0060, "tag", []);
jQuery.data(cvs_0060, "tag count", '0');
jQuery.data(cvs_0060, "alpha", '1');
jQuery.data(cvs_0060, "hidden", 'False');
jQuery.data(cvs_0060, "area", '-2,-1,1281,801');
jQuery.data(cvs_0060, "interval", 0);
jQuery.data(cvs_0060, "duration", 0);
	AppendClass($('#cvs_0060'), '');
jQuery.data(cvs_0060, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0003, "tag", []);
jQuery.data(cvs_0003, "tag count", '0');
jQuery.data(cvs_0003, "alpha", '1');
jQuery.data(cvs_0003, "hidden", 'False');
jQuery.data(cvs_0003, "area", '79,60,1108,276');
jQuery.data(cvs_0003, "interval", 0);
jQuery.data(cvs_0003, "duration", 0);
	AppendClass($('#cvs_0003'), '');
jQuery.data(cvs_0003, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0007, "tag", []);
jQuery.data(cvs_0007, "tag count", '0');
jQuery.data(cvs_0007, "alpha", '1');
jQuery.data(cvs_0007, "hidden", 'False');
jQuery.data(cvs_0007, "area", '77,394,732,336');
jQuery.data(cvs_0007, "interval", 0);
jQuery.data(cvs_0007, "duration", 0);
	AppendClass($('#cvs_0007'), '');
jQuery.data(cvs_0007, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0013, "tag", []);
jQuery.data(cvs_0013, "tag count", '0');
jQuery.data(cvs_0013, "alpha", '1');
jQuery.data(cvs_0013, "hidden", 'False');
jQuery.data(cvs_0013, "area", '847,395,337,329');
jQuery.data(cvs_0013, "interval", 0);
jQuery.data(cvs_0013, "duration", 0);
	AppendClass($('#cvs_0013'), '');
jQuery.data(cvs_0013, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0019, "tag", []);
jQuery.data(cvs_0019, "tag count", '0');
jQuery.data(cvs_0019, "alpha", '1');
jQuery.data(cvs_0019, "hidden", 'False');
jQuery.data(cvs_0019, "area", '898,443,237,54');
jQuery.data(cvs_0019, "interval", 0);
jQuery.data(cvs_0019, "duration", 0);
	AppendClass($('#cvs_0019'), '');
jQuery.data(cvs_0019, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0021, "tag", []);
jQuery.data(cvs_0021, "tag count", '0');
jQuery.data(cvs_0021, "alpha", '1');
jQuery.data(cvs_0021, "hidden", 'False');
jQuery.data(cvs_0021, "area", '897,531,239,54');
jQuery.data(cvs_0021, "interval", 0);
jQuery.data(cvs_0021, "duration", 0);
	AppendClass($('#cvs_0021'), '');
jQuery.data(cvs_0021, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0023, "tag", []);
jQuery.data(cvs_0023, "tag count", '0');
jQuery.data(cvs_0023, "alpha", '1');
jQuery.data(cvs_0023, "hidden", 'False');
jQuery.data(cvs_0023, "area", '897,622,238,54');
jQuery.data(cvs_0023, "interval", 0);
jQuery.data(cvs_0023, "duration", 0);
	AppendClass($('#cvs_0023'), '');
jQuery.data(cvs_0023, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0025, "tag", []);
jQuery.data(cvs_0025, "tag count", '0');
jQuery.data(cvs_0025, "alpha", '1');
jQuery.data(cvs_0025, "hidden", 'False');
jQuery.data(cvs_0025, "area", '591,465,110,147');
jQuery.data(cvs_0025, "interval", 0);
jQuery.data(cvs_0025, "duration", 0);
jQuery.data(cvs_0025, "img1", 'images/1p_0001.jpg');
	AppendClass($('#cvs_0025'), '');
jQuery.data(cvs_0025, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0029, "tag", []);
jQuery.data(cvs_0029, "tag count", '0');
jQuery.data(cvs_0029, "alpha", '1');
jQuery.data(cvs_0029, "hidden", 'False');
jQuery.data(cvs_0029, "area", '370,468,84,137');
jQuery.data(cvs_0029, "interval", 0);
jQuery.data(cvs_0029, "duration", 0);
jQuery.data(cvs_0029, "img1", 'images/1p_0002.jpg');
	AppendClass($('#cvs_0029'), '');
jQuery.data(cvs_0029, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0033, "tag", []);
jQuery.data(cvs_0033, "tag count", '0');
jQuery.data(cvs_0033, "alpha", '1');
jQuery.data(cvs_0033, "hidden", 'False');
jQuery.data(cvs_0033, "area", '446,467,84,137');
jQuery.data(cvs_0033, "interval", 0);
jQuery.data(cvs_0033, "duration", 0);
jQuery.data(cvs_0033, "img1", 'images/1p_0003.jpg');
	AppendClass($('#cvs_0033'), '');
jQuery.data(cvs_0033, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0035, "tag", []);
jQuery.data(cvs_0035, "tag count", '0');
jQuery.data(cvs_0035, "alpha", '1');
jQuery.data(cvs_0035, "hidden", 'False');
jQuery.data(cvs_0035, "area", '128,463,84,137');
jQuery.data(cvs_0035, "interval", 0);
jQuery.data(cvs_0035, "duration", 0);
jQuery.data(cvs_0035, "img1", 'images/1p_0004.jpg');
	AppendClass($('#cvs_0035'), '');
jQuery.data(cvs_0035, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0037, "tag", []);
jQuery.data(cvs_0037, "tag count", '0');
jQuery.data(cvs_0037, "alpha", '1');
jQuery.data(cvs_0037, "hidden", 'False');
jQuery.data(cvs_0037, "area", '204,524,84,78');
jQuery.data(cvs_0037, "interval", 0);
jQuery.data(cvs_0037, "duration", 0);
jQuery.data(cvs_0037, "img1", 'images/1p_0005.jpg');
	AppendClass($('#cvs_0037'), '');
jQuery.data(cvs_0037, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0039, "tag", []);
jQuery.data(cvs_0039, "tag count", '0');
jQuery.data(cvs_0039, "alpha", '1');
jQuery.data(cvs_0039, "hidden", 'False');
jQuery.data(cvs_0039, "area", '713,526,56,77');
jQuery.data(cvs_0039, "interval", 0);
jQuery.data(cvs_0039, "duration", 0);
jQuery.data(cvs_0039, "img1", 'images/1p_0006.jpg');
	AppendClass($('#cvs_0039'), '');
jQuery.data(cvs_0039, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0047, "tag", []);
jQuery.data(cvs_0047, "tag count", '0');
jQuery.data(cvs_0047, "alpha", '1');
jQuery.data(cvs_0047, "hidden", 'False');
jQuery.data(cvs_0047, "area", '98,640,226,66');
jQuery.data(cvs_0047, "interval", 0);
jQuery.data(cvs_0047, "duration", 0);
	AppendClass($('#cvs_0047'), '');
jQuery.data(cvs_0047, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0049, "tag", []);
jQuery.data(cvs_0049, "tag count", '0');
jQuery.data(cvs_0049, "alpha", '1');
jQuery.data(cvs_0049, "hidden", 'False');
jQuery.data(cvs_0049, "area", '333,640,226,66');
jQuery.data(cvs_0049, "interval", 0);
jQuery.data(cvs_0049, "duration", 0);
	AppendClass($('#cvs_0049'), '');
jQuery.data(cvs_0049, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0051, "tag", []);
jQuery.data(cvs_0051, "tag count", '0');
jQuery.data(cvs_0051, "alpha", '1');
jQuery.data(cvs_0051, "hidden", 'False');
jQuery.data(cvs_0051, "area", '568,639,226,66');
jQuery.data(cvs_0051, "interval", 0);
jQuery.data(cvs_0051, "duration", 0);
	AppendClass($('#cvs_0051'), '');
jQuery.data(cvs_0051, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0053, "tag", []);
jQuery.data(cvs_0053, "tag count", '0');
jQuery.data(cvs_0053, "alpha", '1');
jQuery.data(cvs_0053, "hidden", 'False');
jQuery.data(cvs_0053, "area", '119,114,226,66');
jQuery.data(cvs_0053, "interval", 0);
jQuery.data(cvs_0053, "duration", 0);
	AppendClass($('#cvs_0053'), '');
jQuery.data(cvs_0053, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0055, "tag", []);
jQuery.data(cvs_0055, "tag count", '0');
jQuery.data(cvs_0055, "alpha", '1');
jQuery.data(cvs_0055, "hidden", 'False');
jQuery.data(cvs_0055, "area", '120,222,226,66');
jQuery.data(cvs_0055, "interval", 0);
jQuery.data(cvs_0055, "duration", 0);
	AppendClass($('#cvs_0055'), '');
jQuery.data(cvs_0055, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0056, "tag", []);
jQuery.data(cvs_0056, "tag count", '0');
jQuery.data(cvs_0056, "alpha", '1');
jQuery.data(cvs_0056, "hidden", 'False');
jQuery.data(cvs_0056, "area", '361,111,784,72');
jQuery.data(cvs_0056, "interval", 0);
jQuery.data(cvs_0056, "duration", 0);
	AppendClass($('#cvs_0056'), '');
jQuery.data(cvs_0056, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0058, "tag", []);
jQuery.data(cvs_0058, "tag count", '0');
jQuery.data(cvs_0058, "alpha", '1');
jQuery.data(cvs_0058, "hidden", 'False');
jQuery.data(cvs_0058, "area", '362,219,784,72');
jQuery.data(cvs_0058, "interval", 0);
jQuery.data(cvs_0058, "duration", 0);
	AppendClass($('#cvs_0058'), '');
jQuery.data(cvs_0058, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0059, "tag", []);
jQuery.data(cvs_0059, "tag count", '0');
jQuery.data(cvs_0059, "alpha", '1');
jQuery.data(cvs_0059, "hidden", 'False');
jQuery.data(cvs_0059, "area", '1137,36,100,76');
jQuery.data(cvs_0059, "interval", 0);
jQuery.data(cvs_0059, "duration", 0);
jQuery.data(cvs_0059, "img1", 'images/1p_0007.jpg');
	AppendClass($('#cvs_0059'), '');
jQuery.data(cvs_0059, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0068, "tag", []);
jQuery.data(cvs_0068, "tag count", '0');
jQuery.data(cvs_0068, "alpha", '1');
jQuery.data(cvs_0068, "hidden", 'False');
jQuery.data(cvs_0068, "area", '125,377,209,57');
jQuery.data(cvs_0068, "interval", 0);
jQuery.data(cvs_0068, "duration", 0);
	AppendClass($('#cvs_0068'), '');
jQuery.data(cvs_0068, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_0072, "tag", []);
jQuery.data(cvs_0072, "tag count", '0');
jQuery.data(cvs_0072, "alpha", '1');
jQuery.data(cvs_0072, "hidden", 'False');
jQuery.data(cvs_0072, "area", '1038,378,112,40');
jQuery.data(cvs_0072, "interval", 0);
jQuery.data(cvs_0072, "duration", 0);
	AppendClass($('#cvs_0072'), '');
jQuery.data(cvs_0072, "touch", "n");

});
  var ConditionalTable = new Object();
  var ActionLibraryTable = new Object();
$(document).ready(function(){
 window.TargetTable = new Object();
jQuery.data(TargetTable, "Rectangle-4", cvs_0060);
jQuery.data(TargetTable, "Rectangle", cvs_0003);
jQuery.data(TargetTable, "Rectangle-1", cvs_0007);
jQuery.data(TargetTable, "Rectangle-2", cvs_0013);
jQuery.data(TargetTable, "TextBox", cvs_0019);
jQuery.data(TargetTable, "TextBox-1", cvs_0021);
jQuery.data(TargetTable, "TextBox-1-1", cvs_0023);
jQuery.data(TargetTable, "ImageBox", cvs_0025);
jQuery.data(TargetTable, "ImageBox-1-1", cvs_0029);
jQuery.data(TargetTable, "ImageBox-1-1-1", cvs_0033);
jQuery.data(TargetTable, "ImageBox-1-1-2", cvs_0035);
jQuery.data(TargetTable, "ImageBox-1-1-3", cvs_0037);
jQuery.data(TargetTable, "ImageBox-1-1-4", cvs_0039);
jQuery.data(TargetTable, "Rectangle-3-2", cvs_0047);
jQuery.data(TargetTable, "Rectangle-3-2-1", cvs_0049);
jQuery.data(TargetTable, "Rectangle-3-2-1-1", cvs_0051);
jQuery.data(TargetTable, "Rectangle-3-2-2", cvs_0053);
jQuery.data(TargetTable, "Rectangle-3-2-3", cvs_0055);
jQuery.data(TargetTable, "TextBox-2", cvs_0056);
jQuery.data(TargetTable, "TextBox-2-1", cvs_0058);
jQuery.data(TargetTable, "스피커 참고_소리, 무음", cvs_0059);
jQuery.data(TargetTable, "TextBox-3", cvs_0068);
jQuery.data(TargetTable, "TextBox-4", cvs_0072);
jQuery.data(cvs_0019, "text", '고무');
jQuery.data(cvs_0021, "text", '플라스틱');
jQuery.data(cvs_0023, "text", '금속');
jQuery.data(cvs_0056, "text", '책상, 의자와 같이 모양이 있고 공간을 차지하는 것입니다.');
jQuery.data(cvs_0058, "text", '물체를 이루는 재료입니다.');
jQuery.data(cvs_0068, "text", '물질의 종류');
jQuery.data(cvs_0072, "text", '보기');


  var scrollElement = $(jQuery.data(TargetTable, "ScrollBox"));
  var scrollTopBtn = $(jQuery.data(TargetTable, "icon_top"));
  var onScrollStart = function(){
    scrollTopBtn.addClass('collapse');
  }
  var onScrollEnd = function(){
    scrollTopBtn.removeClass('collapse');
  }
  var lastScrollAt = Date.now(), timeout
  function scrollStartStop() {
      if (Date.now() - lastScrollAt > 100)
          onScrollStart();
      lastScrollAt = Date.now();
      clearTimeout(timeout);
      timeout = setTimeout(function() {
          if (Date.now() - lastScrollAt > 99)
          onScrollEnd();
      }, 100)
  }
  scrollElement.on('scroll', scrollStartStop);


 });
  function pbonload1() {
     var key = [];
     var dataString = [];
 	distributeAction(null, 'up', 'N', []);
}
$(document).ready(function(){
pbonload1();
});
$(document).ready(function(){
$("body *").each(function(event){
if($(this).attr("onmousedown")){
$(this).attr("ontouchstart", $(this).attr("onmousedown"));
}
if($(this).attr("onmouseup")){
}
});
});
