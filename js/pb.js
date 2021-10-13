	var BK_DB = new BookMarkDB();
	BK_DB.PageList = [{
'thumbnail': '#thumbImg1',
'pagenum': 'index',
'link': 'index.html',
}
];
BK_DB.PageNow = {
'thumbnail': '#thumbPageNow1',
'pagenum': 'index',
'link': 'index.html'
}

	var sound1 = document.createElement("AUDIO");
	var sound2 = document.createElement("AUDIO");

	function FindFitScale(height, width) {
	  var size = (height / $("#div_main").height());

	  function find_(size, width) {
	    if ($("#div_main").width() * size > width) {
	      size -= 0.05;
	      find_(size, width);
	    } else {
	      window.parent_scale = size;
	    }
	  }
	  find_(size, width);
	}
	window.onorientationchange = function() {
	  var orientation = window.orientation;
	  FindFitScale($(window).height(), $(window).width());
	  $("#div_main").css("top", '50%');
	  $("#div_main").css("left", '50%');
	  $("#div_main").css("transform-origin", '0 0');
	  $("#div_main").css("transform", 'scale(' + window.parent_scale + ') translateY(-50%) translateX(-50%)');
	}
	window.onresize = function() {
	  FindFitScale($(window).height(), $(window).width());

	  $("#div_main").css("top", '50%');
	  $("#div_main").css("left", '50%');
	  $("#div_main").css("transform-origin", '0 0');
	  $("#div_main").css("transform", 'scale(' + window.parent_scale + ') translateY(-50%) translateX(-50%)');
	}

	$(document).ready(function() {
	  FindFitScale($(window).height(), $(window).width());
	  $("#div_main").css("top", '50%');
	  $("#div_main").css("left", '50%');
	  $("#div_main").css("transform-origin", '0 0');
	  $("#div_main").css("transform", 'scale(' + window.parent_scale + ') translateY(-50%) translateX(-50%)');
	});

	function changeToggleState(cvs) {
	  if (cvs.state == true) {
	    cvs.state = false;
	  } else {
	    cvs.state = true;
	  }
	}


	var omitformtags = ["input", "textarea", "select"];

	omitformtags = omitformtags.join("|");

	function disableselect(e) {
	  if (omitformtags.indexOf(e.target.tagName.toLowerCase()) == -1)
	    return false;
	}

	function reEnable() {
	  return true;
	}

	if (typeof document.onselectstart != "undefined")
	  document.onselectstart = new Function("return false");
	else {
	  document.onmousedown = disableselect;
	  document.onmouseup = reEnable;
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

  var ConditionalTable = new Object();
  var ActionLibraryTable = new Object();
$(document).ready(function(){
 window.TargetTable = new Object();


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
  function pbonload0() {
     var key = [];
     var dataString = [];
 	distributeAction(null, 'up', 'N', []);
}
$(document).ready(function(){
pbonload0();
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
