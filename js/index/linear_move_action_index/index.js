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

$(document).ready(function(){
jQuery.data(cvs_0002, "tag", []);
jQuery.data(cvs_0002, "tag count", '0');
jQuery.data(cvs_0002, "alpha", '1');
jQuery.data(cvs_0002, "hidden", 'False');
jQuery.data(cvs_0002, "area", '0,0,90,90');
jQuery.data(cvs_0002, "interval", 0);
jQuery.data(cvs_0002, "duration", 0);
	AppendClass($('#cvs_0002'), '');

	jQuery.data(cvs_0002, "touch", "y");
});
$(document).ready(function(){
$("#cvs_0002").on('mousedown touchstart', function(e) {
if (e.type == 'mousedown' && isTouchDevice == true ) return;
var isHide = $("#cvs_0002").css('visibility') != undefined; 
if (isHide) { 
if ($("#cvs_0002").css('visibility').toLowerCase() != 'visible') { return; } 
} 
e.stopPropagation();
distributeAction(cvs_0002, 'down', 'N', [[{actType:3, actSubType:'Move To', aniTiming:0, target:[cvs_0003], toX:677, toY:90, startTime:0, delay:0, duration:2000 },{actType:3, actSubType:'Move To', aniTiming:0, target:[cvs_1287], toX:677, toY:180, startTime:0, delay:0, duration:2000 },{actType:3, actSubType:'Move To', aniTiming:0, target:[cvs_1289], toX:677, toY:270, startTime:0, delay:0, duration:2000 },{actType:3, actSubType:'Move To', aniTiming:0, target:[cvs_1291], toX:677, toY:360, startTime:0, delay:0, duration:2000 },{actType:3, actSubType:'Move To', aniTiming:0, target:[cvs_1293], toX:677, toY:450, startTime:0, delay:0, duration:2000 },{actType:3, actSubType:'Move To', aniTiming:0, target:[cvs_1295], toX:677, toY:540, startTime:0, delay:0, duration:2000 },{actType:3, actSubType:'Move To', aniTiming:0, target:[cvs_1297], toX:677, toY:630, startTime:0, delay:0, duration:2000 },{actType:3, actSubType:'Move To', aniTiming:0, target:[cvs_1299], toX:677, toY:720, startTime:0, delay:0, duration:2000 },{actType:3, actSubType:'Move To', aniTiming:0, target:[cvs_1301], toX:677, toY:810, startTime:0, delay:0, duration:2000 },{actType:3, actSubType:'Move To', aniTiming:0, target:[cvs_1303], toX:677, toY:900, startTime:0, delay:0, duration:2000 }]]);
});
});
$(document).ready(function(){
jQuery.data(cvs_0003, "tag", []);
jQuery.data(cvs_0003, "tag count", '0');
jQuery.data(cvs_0003, "alpha", '1');
jQuery.data(cvs_0003, "hidden", 'False');
jQuery.data(cvs_0003, "area", '0,90,90,90');
jQuery.data(cvs_0003, "interval", 0);
jQuery.data(cvs_0003, "duration", 0);
	AppendClass($('#cvs_0003'), '');
jQuery.data(cvs_0003, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_1287, "tag", []);
jQuery.data(cvs_1287, "tag count", '0');
jQuery.data(cvs_1287, "alpha", '1');
jQuery.data(cvs_1287, "hidden", 'False');
jQuery.data(cvs_1287, "area", '0,180,90,90');
jQuery.data(cvs_1287, "interval", 0);
jQuery.data(cvs_1287, "duration", 0);
	AppendClass($('#cvs_1287'), '');
jQuery.data(cvs_1287, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_1289, "tag", []);
jQuery.data(cvs_1289, "tag count", '0');
jQuery.data(cvs_1289, "alpha", '1');
jQuery.data(cvs_1289, "hidden", 'False');
jQuery.data(cvs_1289, "area", '0,270,90,90');
jQuery.data(cvs_1289, "interval", 0);
jQuery.data(cvs_1289, "duration", 0);
	AppendClass($('#cvs_1289'), '');
jQuery.data(cvs_1289, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_1291, "tag", []);
jQuery.data(cvs_1291, "tag count", '0');
jQuery.data(cvs_1291, "alpha", '1');
jQuery.data(cvs_1291, "hidden", 'False');
jQuery.data(cvs_1291, "area", '0,360,90,90');
jQuery.data(cvs_1291, "interval", 0);
jQuery.data(cvs_1291, "duration", 0);
	AppendClass($('#cvs_1291'), '');
jQuery.data(cvs_1291, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_1293, "tag", []);
jQuery.data(cvs_1293, "tag count", '0');
jQuery.data(cvs_1293, "alpha", '1');
jQuery.data(cvs_1293, "hidden", 'False');
jQuery.data(cvs_1293, "area", '0,450,90,90');
jQuery.data(cvs_1293, "interval", 0);
jQuery.data(cvs_1293, "duration", 0);
	AppendClass($('#cvs_1293'), '');
jQuery.data(cvs_1293, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_1295, "tag", []);
jQuery.data(cvs_1295, "tag count", '0');
jQuery.data(cvs_1295, "alpha", '1');
jQuery.data(cvs_1295, "hidden", 'False');
jQuery.data(cvs_1295, "area", '0,540,90,90');
jQuery.data(cvs_1295, "interval", 0);
jQuery.data(cvs_1295, "duration", 0);
	AppendClass($('#cvs_1295'), '');
jQuery.data(cvs_1295, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_1297, "tag", []);
jQuery.data(cvs_1297, "tag count", '0');
jQuery.data(cvs_1297, "alpha", '1');
jQuery.data(cvs_1297, "hidden", 'False');
jQuery.data(cvs_1297, "area", '0,630,90,90');
jQuery.data(cvs_1297, "interval", 0);
jQuery.data(cvs_1297, "duration", 0);
	AppendClass($('#cvs_1297'), '');
jQuery.data(cvs_1297, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_1299, "tag", []);
jQuery.data(cvs_1299, "tag count", '0');
jQuery.data(cvs_1299, "alpha", '1');
jQuery.data(cvs_1299, "hidden", 'False');
jQuery.data(cvs_1299, "area", '0,720,90,90');
jQuery.data(cvs_1299, "interval", 0);
jQuery.data(cvs_1299, "duration", 0);
	AppendClass($('#cvs_1299'), '');
jQuery.data(cvs_1299, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_1301, "tag", []);
jQuery.data(cvs_1301, "tag count", '0');
jQuery.data(cvs_1301, "alpha", '1');
jQuery.data(cvs_1301, "hidden", 'False');
jQuery.data(cvs_1301, "area", '0,810,90,90');
jQuery.data(cvs_1301, "interval", 0);
jQuery.data(cvs_1301, "duration", 0);
	AppendClass($('#cvs_1301'), '');
jQuery.data(cvs_1301, "touch", "n");

});
$(document).ready(function(){
jQuery.data(cvs_1303, "tag", []);
jQuery.data(cvs_1303, "tag count", '0');
jQuery.data(cvs_1303, "alpha", '1');
jQuery.data(cvs_1303, "hidden", 'False');
jQuery.data(cvs_1303, "area", '0,900,90,90');
jQuery.data(cvs_1303, "interval", 0);
jQuery.data(cvs_1303, "duration", 0);
	AppendClass($('#cvs_1303'), '');
jQuery.data(cvs_1303, "touch", "n");

});
  var ConditionalTable = new Object();
  var ActionLibraryTable = new Object();
$(document).ready(function(){
 window.TargetTable = new Object();
jQuery.data(TargetTable, "Rectangle", cvs_0002);
jQuery.data(TargetTable, "Rectangle-1", cvs_0003);
jQuery.data(TargetTable, "Rectangle-1-2", cvs_1287);
jQuery.data(TargetTable, "Rectangle-1-3", cvs_1289);
jQuery.data(TargetTable, "Rectangle-1-4", cvs_1291);
jQuery.data(TargetTable, "Rectangle-1-5", cvs_1293);
jQuery.data(TargetTable, "Rectangle-1-6", cvs_1295);
jQuery.data(TargetTable, "Rectangle-1-7", cvs_1297);
jQuery.data(TargetTable, "Rectangle-1-8", cvs_1299);
jQuery.data(TargetTable, "Rectangle-1-9", cvs_1301);
jQuery.data(TargetTable, "Rectangle-1-10", cvs_1303);


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
