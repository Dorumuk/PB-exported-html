var gameURL = "";

var mArrJsonData;
var mDataIndex = 0;
var videobox;
var myWindow;
var totalPageCount;
var countPerPage = 2;
var recorder = "";
var userData;

var mode1Contents1X = "640px";
var mode2Contents1X = "171px";

var functionS;
var minHeight = 1470;

var originContentsWidth = 918;
var originContentsHeight = 1470;

window.receiveMessage = function(event) {
	// event.data로 결과가 전달됨.
	if (event.data.stuInfo) {
		window.userData = event.data.stuInfo;
	}
	var obj = document.getElementById("contents");
	if (obj) {
		var objDoc = obj.contentWindow || obj.contentDocument;
		objDoc && objDoc.receiveMessage ? objDoc.receiveMessage(event) : "";
		window.parent.userData = event.data.stuInfo;
	}
};

if (window.addEventListener) {
	window.addEventListener("message", receiveMessage, false);
} else {
	if (window.attachEvent) {
		window.attachEvent("onmessage", receiveMessage);
	}
}

function getUserInfo() {
	var requestData = {
		requestType: "getStuInfo"
	};
	window.parent.postMessage(requestData, "*");
}
getUserInfo();

function changePageShowMode() {
	var contents1Src = $("#contents").attr("src");
	var arrContents1Src = contents1Src.split("-");
	var contents2Src = null;
	if (parseInt(arrContents1Src[0]) % 2 == 0) {
		contents2Src = contents1Src;
		contents1Src = parseInt(arrContents1Src[0]) - 1 + ".html";

		//console.log(contents1Src + " // " + contents2Src);
	} else {
		contents2Src = parseInt(arrContents1Src[0]) + 1 + ".html";
	}

	if (countPerPage == 1) {
		countPerPage = 2;
		$("#contents").attr("src", contents1Src);
		$("#contents2").attr("src", contents2Src);
		$("#contents2").show();
		$("#contents").css("left", mode2Contents1X);
		setCurrentPageCountBox();
		/*        setTotalPageCountBox(); */
	} else {
		countPerPage = 1;
		$("#contents2").hide();
		$("#contents").css("left", mode1Contents1X);
		setCurrentPageCountBox();
		setTotalPageCountBox();
	}

	//console.log("changePageShowMode => //" + countPerPage);
}

function shapeBlink(target) {
    if (target == undefined) return;
    var computedStyle = window.getComputedStyle(target, null);
    var opacity = parseFloat(computedStyle.getPropertyValue("opacity"));
    if (jQuery.data(target, 'alpha') == undefined) {
        jQuery.data(target, 'alpha', opacity);
    }
    if (opacity > 0) {
        $(target).fadeTo("fast", 0.0);
    } else {
        $(target).fadeTo("fast", parseFloat(jQuery.data(target, 'alpha')));
    }
}

function stopShapeBlink(target, ShowAtFinish) {
    var blink_timer = jQuery.data(target, "blink_timer");
    clearInterval(blink_timer);
    if (ShowAtFinish == 'Y') {
        $(target).fadeTo("fast", parseFloat(jQuery.data(target, 'alpha')));
    } else {
        $(target).fadeTo("fast", 0.0);
    }
}

function openWin(url) {
	myWindow = window.open(url, "", "width=500, height=500");
	myWindow.focus();
}

function contentsZoomIn() {
	var scale = $("#contents").width() / $("#contents").height();
	$("#contents").css("height", $("#contents").height() + 100 + "px");
	$("#contents").css("width", $("#contents").width() + 100 * scale + "px");
	$("#contents2").css("height", $("#contents2").height() + 100 + "px");
	$("#contents2").css("width", $("#contents2").width() + 100 * scale + "px");
}

function contentsZoomOut() {
	if ($("#contents").height() <= 1470) {
		alert(
			"占쎌쥙�ο옙袁ъ삕�ル쵐�뺧옙醫묒삕 �좎럡�↑린�쎌삕占쎌럩�뺧옙醫묒삕 占쎌쥙猷욑옙占� 占쎌쥙�ο옙源띿삕占쎈챷�뺝뜝�덈쐞�됵옙."
		);
		return;
	}
	var scale = $("#contents").width() / $("#contents").height();
	$("#contents").css("height", $("#contents").height() - 100 + "px");
	$("#contents").css("width", $("#contents").width() - 100 * scale + "px");
	$("#contents2").css("height", $("#contents2").height() - 100 + "px");
	$("#contents2").css("width", $("#contents2").width() - 100 * scale + "px");
}

function inputBoxKeyEvent() {
	$("#currentPageCountBox").keyup(function(event) {
		if (event.keyCode === 13) {
			gotoPage({
				goto: "Get Content"
			});
		}
	});
}

function setTotalPageCountBox() {
	$("#totalPageCountBox").val(totalPageCount);
}

function setCurrentPageCountBox() {
	const currentPageNo = null;
	let isInnerFrame = false;
	let iframeSrc = $("#contents").attr("src");

	if (iframeSrc == null) {
		// if (countPerPage === 2)
		iframeSrc = $("#contents", parent.document).attr("src");
		isInnerFrame = true;
	}

	currentPageNo = iframeSrc.split("-")[0];
	if (isInnerFrame) {
		$("#currentPageCountBox", parent.document).val(currentPageNo);
	} else {
		$("#currentPageCountBox").val(currentPageNo);
	}
}

function makeObj(ori, alt) {
	var cvs = new Object();
	cvs.state = false;
	cvs.originImage = ori;
	cvs.altImage = alt;
	cvs.changeToggleState = function() {
		changeToggleState(cvs);
	};
	return cvs;
}

function change(params, s) {
	var a = document.getElementsByTagName("font");

	for (var i = 0; i < a.length; i++) {
		var fontPx = a[i].style.fontSize;
		var ls = a[i].style.letterSpacing;
		if (fontPx.length > 0) {
			fontPx = fontPx.replace("px", "");
			var point = Number(fontPx) * s;
			a[i].style.fontSize = point + "px";
		}
		if (ls.length > 0) {
			ls = ls.replace("px", "");
			var point = Number(ls) * s;
			a[i].style.letterSpacing = point + "px";
		}
	}

	var b = document.getElementsByTagName("p");

	for (var i = 0; i < b.length; i++) {
		var lh = b[i].style.lineHeight;
		if (lh.length > 0) {
			lh = lh.replace("px", "");
			var point = Number(lh) * s;
			b[i].style.lineHeight = point + "px";
		}
		lh = b[i].style.textIndent;
		if (lh.length > 0) {
			lh = lh.replace("px", "");
			var point = Number(lh) * s;
			b[i].style.textIndent = point + "px";
		}
		var lh = b[i].style.marginTop;
		if (lh.length > 0) {
			lh = lh.replace("px", "");
			var point = Number(lh) * s;
			b[i].style.marginTop = point + "px";
		}
		var lh = b[i].style.marginBottom;
		if (lh.length > 0) {
			lh = lh.replace("px", "");
			var point = Number(lh) * s;
			b[i].style.marginBottom = point + "px";
		}
		var lh = b[i].style.marginLeft;
		if (lh.length > 0) {
			lh = lh.replace("px", "");
			var point = Number(lh) * s;
			b[i].style.marginLeft = point + "px";
		}
		var lh = b[i].style.marginRight;
		if (lh.length > 0) {
			lh = lh.replace("px", "");
			var point = Number(lh) * s;
			b[i].style.marginRight = point + "px";
		}
	}
	distributeNextAction(params.nextAction);
}

function changeBy(params, s) {
	console.log($(params.target[0]).find("font"));
	console.log($(params.target[0]).length);
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];
			if (tg == null) alert("null box");
			if (params.actSubType == "Hide") {
                $(params.obj).addClass("collapse");
				if (videobox == tg) {
					videobox.pause();
					videobox = null;
				}
			} else {
                $(params.obj).removeClass("collapse");
                if (params.callfunc) {
					var fnstring = params.callfunc;
					var fn = window[fnstring];
					if (typeof fn === "function") fn();
				}
			}
		}

		for (var j = 0; j < params.target.length; j++) {
			var a = $(params.target[j]).find("span");
			console.log("value !! = " + params.target.length);
			for (var i = 0; i < a.length; i++) {
				var fontPx = a[i].style.fontSize;
				var ls = a[i].style.letterSpacing;
				if (fontPx.length > 0) {
					fontPx = fontPx.replace("rem", "");
					var point = Number(fontPx) + s  / 10;
					a[i].style.fontSize = point + "rem";
				}
				if (ls.length > 0) {
					ls = ls.replace("rem", "");
					var point = Number(ls) + s / 10;
					a[i].style.letterSpacing = point + "rem";
				}
			}

			var b = $(params.target[j]).find("p");

			for (var i = 0; i < b.length; i++) {
				var lh = b[i].style.lineHeight;
				if (lh.length > 0) {
					lh = lh.replace("px", "");
					var point = Number(lh) + s;
					b[i].style.lineHeight = point + "px";
				}
				lh = b[i].style.textIndent;
				if (lh.length > 0) {
					lh = lh.replace("px", "");
					var point = Number(lh) + s;
					b[i].style.textIndent = point + "px";
				}
				var lh = b[i].style.marginTop;
				if (lh.length > 0) {
					lh = lh.replace("px", "");
					var point = Number(lh) + s;
					b[i].style.marginTop = point + "px";
				}
				var lh = b[i].style.marginBottom;
				if (lh.length > 0) {
					lh = lh.replace("px", "");
					var point = Number(lh) + s;
					b[i].style.marginBottom = point + "px";
				}
				var lh = b[i].style.marginLeft;
				if (lh.length > 0) {
					lh = lh.replace("px", "");
					var point = Number(lh) + s;
					b[i].style.marginLeft = point + "px";
				}
				var lh = b[i].style.marginRight;
				if (lh.length > 0) {
					lh = lh.replace("px", "");
					var point = Number(lh) + s;
					b[i].style.marginRight = point + "px";
				}
			}
		}
		distributeNextAction(params.nextAction);
	}, params.delay);
}

function fixFont(s) {
	change(s / window.devicePixelRatio);
}

function bigger(params) {
	console.log("bigger");
	changeBy(params, 0.5);
}

function smaller(params) {
	console.log("smaller");
	changeBy(params, -0.5);
}

//var mTouchedObject;

function distributeAction(touchedObject, touchID, rand, arrActions) {
   // try {
    //     event.preventDefault();
    // } catch (err) {

    // }
    if (arrActions == null) {
        return;
    }
    var arrActionParams;

    try {
        if (touchedObject != null) {
            if (touchID == "up") {
                //console.log("[up] previousObject : " + mTouchedObject)
                console.log("[up] triggerObject : " + touchedObject)
                //if (mTouchedObject != touchedObject) return;
                if (jQuery.data($(touchedObject).get(0), "startedInRect") == 'Y') {
                    return;
                }
                if (jQuery.data($(touchedObject).get(0), "actionUpIndex") == null) {
                    jQuery.data($(touchedObject).get(0), "actionUpIndex", -1);
                }

                jQuery.data($(touchedObject).get(0), "actionUpIndex", jQuery.data($(touchedObject).get(0), "actionUpIndex") + 1);
                /*     alert("actionUpIndex" + "//" + (jQuery.data($(touchedObject).get(0), "actionUpIndex"))); */

            } else if (touchID == "down") {
                // 2018-07-19 recoed
                var contentsType;
                try {
                    contentsType = arrActions[0][0].content;
                } catch (err) {
                    contentsType = "";
                }
                console.log("[down] triggerObject : " + touchedObject)
                //mTouchedObject = touchedObject;
                if (jQuery.data($(touchedObject).get(0), "actionDownIndex") == null) {
                    jQuery.data($(touchedObject).get(0), "actionDownIndex", -1);
                }
                jQuery.data($(touchedObject).get(0), "actionDownIndex", jQuery.data($(touchedObject).get(0), "actionDownIndex") + 1);
            } else if (touchID == "inRect") {
                if (jQuery.data($(touchedObject).get(0), "actionInRectIndex") == null) {
                    jQuery.data($(touchedObject).get(0), "actionInRectIndex", -1);
                }
                jQuery.data($(touchedObject).get(0), "actionInRectIndex", jQuery.data($(touchedObject).get(0), "actionInRectIndex") + 1);

            } else if (touchID == "Conditional") {
                if (jQuery.data($(touchedObject).get(0), "actionConditionalIndex") == null) {
                    jQuery.data($(touchedObject).get(0), "actionConditionalIndex", -1);
                }
                jQuery.data($(touchedObject).get(0), "actionConditionalIndex", jQuery.data($(touchedObject).get(0), "actionConditionalIndex") + 1);
            } else if (touchID == "ActionLibrary") {
                if (jQuery.data($(touchedObject).get(0), "actionLibraryIndex") == null) {
                    jQuery.data($(touchedObject).get(0), "actionLibraryIndex", -1);
                }
                jQuery.data($(touchedObject).get(0), "actionLibraryIndex", jQuery.data($(touchedObject).get(0), "actionLibraryIndex") + 1);
            }


            if (touchID == "up") {
                if (jQuery.data($(touchedObject).get(0), "actionUpIndex") >= arrActions.length) {
                    jQuery.data($(touchedObject).get(0), "actionUpIndex", 0);
                }

                if (rand == "Y") {
                    var beforeNo;
                    if (jQuery.data($(touchedObject).get(0), "beforeRand") == null) {
                        beforeNo = 0;
                    } else {
                        beforeNo = jQuery.data($(touchedObject).get(0), "beforeRand");
                    }


                    /* alert(shuffleRandom(beforeNo, arrActions.length)); */
                    var randNo = 0;
                    if (arrActions.length > 1) {
                        randNo = shuffleRandom(beforeNo, arrActions.length);
                    }
                    jQuery.data($(touchedObject).get(0), "beforeRand", randNo);
                    arrActionParams = arrActions[randNo];
                } else {
                    arrActionParams = arrActions[(jQuery.data($(touchedObject).get(0), "actionUpIndex"))];
                }


            } else if (touchID == "down") {
                if (jQuery.data($(touchedObject).get(0), "actionDownIndex") >= arrActions.length) {
                    jQuery.data($(touchedObject).get(0), "actionDownIndex", 0);
                }
                if (rand == "Y") {

                    var beforeNo;
                    if (jQuery.data($(touchedObject).get(0), "beforeRand") == null) {
                        beforeNo = 0;
                    } else {
                        beforeNo = jQuery.data($(touchedObject).get(0), "beforeRand");
                    }
                    var randNo = 0;
                    if (arrActions.length > 1) {
                        randNo = shuffleRandom(beforeNo, arrActions.length);
                    }
                    jQuery.data($(touchedObject).get(0), "beforeRand", randNo);
                    arrActionParams = arrActions[randNo];
                } else {
                    arrActionParams = arrActions[(jQuery.data($(touchedObject).get(0), "actionDownIndex"))];
                }
            } else if (touchID == "inRect") {
                if (jQuery.data($(touchedObject).get(0), "actionInRectIndex") >= arrActions.length) {
                    jQuery.data($(touchedObject).get(0), "actionInRectIndex", 0);
                }
                if (rand == "Y") {

                    var beforeNo;
                    if (jQuery.data($(touchedObject).get(0), "beforeRand") == null) {
                        beforeNo = 0;
                    } else {
                        beforeNo = jQuery.data($(touchedObject).get(0), "beforeRand");
                    }
                    var randNo = 0;
                    if (arrActions.length > 1) {
                        randNo = shuffleRandom(beforeNo, arrActions.length);
                    }
                    jQuery.data($(touchedObject).get(0), "beforeRand", randNo);
                    arrActionParams = arrActions[randNo];
                } else {
                    arrActionParams = arrActions[(jQuery.data($(touchedObject).get(0), "actionInRectIndex"))];
                }
            } else if (touchID == "Conditional") {
                if (jQuery.data($(touchedObject).get(0), "actionConditionalIndex") >= arrActions.length) {
                    jQuery.data($(touchedObject).get(0), "actionConditionalIndex", 0);
                }
                if (rand == "Y") {

                    var beforeNo;
                    if (jQuery.data($(touchedObject).get(0), "beforeRand") == null) {
                        beforeNo = 0;
                    } else {
                        beforeNo = jQuery.data($(touchedObject).get(0), "beforeRand");
                    }
                    var randNo = 0;
                    if (arrActions.length > 1) {
                        randNo = shuffleRandom(beforeNo, arrActions.length);
                    }
                    jQuery.data($(touchedObject).get(0), "beforeRand", randNo);
                    arrActionParams = arrActions[randNo];
                } else {
                    arrActionParams = arrActions[(jQuery.data($(touchedObject).get(0), "actionConditionalIndex"))];
                }
            } else if (touchID == "ActionLibrary") {
                if (jQuery.data($(touchedObject).get(0), "actionLibraryIndex") >= arrActions.length) {
                    jQuery.data($(touchedObject).get(0), "actionLibraryIndex", 0);
                }
                if (rand == "Y") {

                    var beforeNo;
                    if (jQuery.data($(touchedObject).get(0), "beforeRand") == null) {
                        beforeNo = 0;
                    } else {
                        beforeNo = jQuery.data($(touchedObject).get(0), "beforeRand");
                    }
                    var randNo = 0;
                    if (arrActions.length > 1) {
                        randNo = shuffleRandom(beforeNo, arrActions.length);
                    }
                    jQuery.data($(touchedObject).get(0), "beforeRand", randNo);
                    arrActionParams = arrActions[randNo];
                } else {
                    arrActionParams = arrActions[(jQuery.data($(touchedObject).get(0), "actionLibraryIndex"))];
                }
            }
        } else {
            arrActionParams = arrActions[0];
        }
    }
    catch (e) {
        arrActionParams = arrActions[0];
    }

    if (arrActionParams == null) {
        return;
    }


    for (var i = 0; i < arrActionParams.length; i++) {
        var params = arrActionParams[i];
        try {
            if (params.repeatCount > 0) {
                params.repeatCount = params.repeatCount - 1;
            }
        } catch (e) {

        }
        try {
            params.delay = params.startTime + params.delay;
        } catch (e) {

        }
        try {
            playEffectSound(params.effectSound, params.delay);
        } catch (e) {

        }

        var firstTarget = null;
        try {
            firstTarget = params.target[0];
        } catch (err) {
            console.log("My ErrorLog : " + err);
        }

        //// 0 : none, 1 : child, 2 : group
        //var isGroup = IsGroup(params);

        if (firstTarget == "Conditional") {
            startConditionalAction(params);
        }
        if (firstTarget == "ActionLibrary") {
            startLibraryAction(params);
        } else {
            if (params == undefined || params.actType == undefined) return;

            switch (params.actType) {
                case 0:
                    startStopAll(params);
                    break;
                case 1:
                    startHideShow(params);
                    break;
                case 2:
                    startFade(params);
                    break;
                case 3:
                    startMove(params);
                    break;
                case 4:
                    startScaleMove(params);
                    break;
                case 5:
                    break;
                case 6:
                    startRotate(params);
                    break;
                case 8:
                    startFlip(params);
                    break;
                case 9:
                    startAnimation(params);
                    break;
                case 10:
                    playMovie(params);
                    break;
                case 11:
                    playSound(params);
                    break;
                case 12: // gotopage
                    gotoPage(params);
                    break;
                case 13: // gotopage
                    pagingViewControl(params);
                    break;
                case 14: // scroll
                    startScroll(params);
                    break;
                case 15: //
                    startToggle(params);
                    break;
                case 16: // setContent
                    if (params.content == "getUserInfo") {
                        getUserInfo();
                        return false;
                    }
                    if (params.actSubType == "change mode") {
                        changePageShowMode();
                    } else if (params.actSubType == "replace") {
                        // 2018-07-19 recoed
                        var contentsType;
                        try {
                            contentsType = params.content.replace(/\s/gi, '').toLowerCase();
                        } catch (err) {
                            contentsType = "";
                        }
                        if (!(contentsType && contentsType.indexOf("recode") != -1 && !(navigator.getUserMedia || navigator.mediaDevices.getUserMedia))) { // ie 같이 userMedia가 없는 브라우저는 이렇게 처리
                            if (contentsType == "recodestart" || contentsType == "recodeplay") {

                                var user_media;
                                function startUserMedia_(stream) {
                                    startUserMedia(stream);
                                    if (contentsType == "recodestart") window.pb_custom_recode.clear();
                                    window.pb_custom_recode.record();
                                    distributeNextAction(arrActions[0][0].nextAction);
                                }
                                try {
                                    window.AudioContext = window.AudioContext || window.webkitAudioContext;
                                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices.getUserMedia;
                                    window.URL = window.URL || window.webkitURL;

                                    audio_context = new AudioContext;
                                    __log('Audio context set up.');
                                    __log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
                                } catch (e) {
                                    alert('No web audio support in this browser!');
                                }

                                if (navigator.userAgent.indexOf('iP') != -1) {
                                    console.log("iPad");
                                    navigator.mediaDevices.getUserMedia({ audio: true }).then(startUserMedia_).catch(function (e) {
                                        __log('No live audio input: ' + e);
                                    });
                                } else {
                                    navigator.getUserMedia({ audio: true }, startUserMedia_, function (e) {
                                        __log('No live audio input: ' + e);
                                    });
                                }

                            } else if (contentsType == "recodestop") {
                                console.log("stop");
                                window.pb_custom_recode.stop();
                                distributeNextAction(arrActions[0][0].nextAction);

                            } else if (contentsType == "recodeend") {
                                window.pb_custom_recode.stop();
                                distributeNextAction(arrActions[0][0].nextAction);
                            } else if (contentsType == "recodelisten") {
                                //alert("url :: "+window.pb_custom_recode.url.substring(0,100));
                                sound1 = new Audio(window.pb_custom_recode.url);
                                sound1.play();
                                distributeNextAction(arrActions[0][0].nextAction);
                            } else if (contentsType == "recodelistenpause") {
                                try {
                                    sound1.pause();
                                    distributeNextAction(arrActions[0][0].nextAction);
                                } catch (err) {
                                }
                            } else if (contentsType == "recodesistenpausecheck") {
                                try {
                                    sound1.addEventListener('timeupdate', function () {
                                        if (sound1.currentTime == sound1.duration) {
                                            arrActions[0][0].pauseCallback();
                                        }
                                    })
                                } catch (err) {
                                }
                            } else if (contentsType == "recodesave") {
                                window.pb_custom_recode.onsave();
                                distributeNextAction(arrActions[0][0].nextAction);
                            }
                        }
                        if (contentsType && contentsType.indexOf("@") != -1 && contentsType.split("@")[0] == "locationmove") {
                            window.location.assign(contentsType.split("@")[1]);
                        }
                        if (contentsType == "pictureinsert") {
                            var input_item = $("<input id='PictureInsert' type='file' accept='image/*' capture />"); //capture='camera' accept='image/*'
                            var input_label = $("<label for='PictureInsert'></label>");
                            input_label.css({
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                fontSize: 0,
                                width: 10,
                                height: 10,
                                padding: 0,
                                opacity: 0
                            });
                            $("body").append(input_item);
                            $("body").append(input_label);
                            input_item.on("change", function (e) {
                                $(arrActions[0][0].target).attr("src", URL.createObjectURL(e.target.files[0]));
                                !userData ? userData = window.parent.userData : "";

                                var file = e.target.files[0];
                                var frm = document.createElement("form");
                                frm.method = 'POST';
                                frm.enctype = 'multipart/form-data';

                                var fileData = new FormData();
                                fileData.append('file', file, 'output.png');
                                fileData.append('fileExt', 'png');
                                fileData.append('stu_id', userData.userId);
                                fileData.append('book_name', userData.bookNm);
                                fileData.append('actvt_kind', '02');
                                fileData.append('timelrn_sq', userData.chapterId);

                                // ajax
                                $.ajax({
                                    url: 'https://stu.ideepstudy.com/app/api/rd/uploadFile.do',
                                    type: 'POST',
                                    data: fileData,
                                    async: false,
                                    cache: false,
                                    contentType: false,
                                    processData: false,
                                }).done(function (response) {
                                    console.log("전달성공");
                                });

                            });

                            input_label.trigger("click");
                            return false;
                        }
                        if (params.content == "backgroundcolor") {
                            var regex = /[?&]([^=#]+)=([^&#]*)/g,
                                url = window.location.href,
                                params = {},
                                match;
                            while (match = regex.exec(document.location.href)) {
                                params[match[1]] = match[2];
                            }
                            console.log(params);
                            $('body').css({
                                background: "#" + params.bgColor
                            });
                            $('div#div_main').css({
                                background: "#" + params.bgColor
                            });
                            distributeNextAction(arrActions[0][0].nextAction);
                            return false;
                        }
                        if (params.content == "game1" || params.content == "game2" || params.content == "game3" || params.content == "game4" || params.content == "game5") {
                            var myid = $((jQuery.data(TargetTable, 'userid'))).val();
                            var loginstate = 'login_no';
                            var mycourse = $((jQuery.data(TargetTable, 'course'))).val();
                            var mylevel = $((jQuery.data(TargetTable, 'level'))).val();
                            var month = $((jQuery.data(TargetTable, 'month'))).val();
                            if (myid != 'no log') {
                                loginstate = 'login_yes'
                                gameURL = "./" + params.content + "/pb.html?userid=" + myid + "&loginstate=" + loginstate + "&course=" + mycourse + "&level=" + mylevel + "&month=" + month;
                            } else {
                                gameURL = "./" + params.content + "/pb.html";
                            }
                        } else if (params.content == 'savelogininfo') {
                            saveLoginInfo();
                        } else if (params.content == 'deletelogininfo') {
                            deleteLoginInfo();
                        } else if (params.content == 'load data') {
                            startLoadData(params);
                        } else if (params.content == 'change data') {
                            startChangeData(params);
                        } else {
                            replaceContent(params);
                        }

                    } else if (params.actSubType == "loadData") {

                    } else {
                        openWin(params.url);
                    }
                    break;
                //占쎌쥙�⒳펺誘�삕�좑옙 �좎럡�∽옙�뀀쐻�좑옙 占쎌쥙��옙占쎌삕�좑옙.
                case 24:
                    startResetBeginSequence(params);
                    break;
                case 25:
                    startResetEndSequence(params);
                    break;
                case 26:
                    startResetInRectSequence(params);
                    break;

                case 27:
                    startAppend(params);
                    break;
                case 28:
                    startRemove(params);
                    break;
                case 29:
                    startReplace(params);
                    break;
                case 30:
                    startRemoveAll(params);
                    break;
                case 31:
                    startAdd(params);
                    break;
                case 32:
                    startSubtract(params);
                    break;
                case 33:
                    startMultiply(params);
                    break;
                case 34:
                    startDivide(params);
                    break;
                case 35: // 占쎄퀣�좑옙占� 占쎄쑴��.

                    break;
                case 36:
                    startTimer(params);
                    break;
                case 37:
                    stopTimer(params);
                    break;

                case 38: //iframe
                    goBack(params);
                    break;
                case 39: //iframe
                    goForward(params);
                    break;
                case 40: //iframe
                    reload(params);
                    break;
                case 41:
                    if (params.actSubType == "Get Data") {
                        startLoadData(params);
                    } else if (params.actSubType == "Select Next") {
                        startChangeData(params);
                    }
                    break;
                case 46:
                    smaller(params);
                    break;
                case 47:
                    bigger(params);
                    break;
                case 50:
                    startlink(params);
                    break;
            }
        }
    }
}

function distributeNextAction(arrActionParams) {
	if (arrActionParams == null) {
		return;
	}

	for (var i = 0; i < arrActionParams.length; i++) {
		var params = arrActionParams[i];
		if (params.repeatCount > 0) {
			params.repeatCount = params.repeatCount - 1;
		}
		params.delay = params.startTime + params.delay;
		playEffectSound(params.effectSound, params.delay);

		var firstTarget = null;
		try {
			firstTarget = params.target[0];
		} catch (err) {
			console.log("My ErrorLog : " + err);
		}

		var isGroup = false;
		if (params.target != null && params.target[0].parentElement != null) {
		}

		if (firstTarget == "Conditional") {
			startConditionalAction(params);
		}
		if (firstTarget == "ActionLibrary") {
			startLibraryAction(params);
		} else {
			switch (params.actType) {
				case 0:
					startStopAll(params);
					break;
				case 1:
					startHideShow(params);
					break;
				case 2:
					startFade(params);
					break;
				case 3:
					startMove(params);
					break;
				case 4:
					startScaleMove(params);
					break;
				case 5:
					break;
				case 6:
					startRotate(params);
					break;
				case 8:
					startFlip(params);
					break;
				case 9:
					startAnimation(params);
					break;
				case 10:
					playMovie(params);
					break;
				case 11:
					playSound(params);
					break;
				case 12: // gotopage
					gotoPage(params);
					break;
				case 13: // gotopage
					pagingViewControl(params);
					break;
				case 14: // scroll
					startScroll(params);
					break;
				case 15: //
					startToggle(params);
					break;
				case 16: // setContent
					if (params.actSubType == "changemode") {
						changePageShowMode();
					} else if (params.actSubType == "replace") {
						// 2018-07-19 recoed
						var contentsType;
						try {
							contentsType = params.content.replace(/\s/gi, "").toLowerCase();
						} catch (err) {
							contentsType = "";
						}
						if (
							!(
								contentsType &&
								contentsType.indexOf("recode") != -1 &&
								!(navigator.getUserMedia || navigator.mediaDevices.getUserMedia)
							)
						) {
							// ie 같이 userMedia가 없는 브라우저는 이렇게 처리
							if (contentsType == "recodestart") {
								var user_media;
								function startUserMedia_(stream) {
									startUserMedia(stream);
									window.pb_custom_recode.clear();
									window.pb_custom_recode.record();
									distributeNextAction(arrActions[0][0].nextAction);
								}
								try {
									window.AudioContext =
										window.AudioContext || window.webkitAudioContext;
									navigator.getUserMedia =
										navigator.getUserMedia ||
										navigator.webkitGetUserMedia ||
										navigator.mediaDevices.getUserMedia;
									window.URL = window.URL || window.webkitURL;

									audio_context = new AudioContext();
									__log("Audio context set up.");
									__log(
										"navigator.getUserMedia " +
											(navigator.getUserMedia ? "available." : "not present!")
									);
								} catch (e) {
									alert("No web audio support in this browser!");
								}

								if (navigator.userAgent.indexOf("iP") != -1) {
									console.log("iPad");
									navigator.mediaDevices
										.getUserMedia({ audio: true })
										.then(startUserMedia_)
										.catch(function(e) {
											__log("No live audio input: " + e);
										});
								} else {
									navigator.getUserMedia(
										{ audio: true },
										startUserMedia_,
										function(e) {
											__log("No live audio input: " + e);
										}
									);
								}
							} else if (contentsType == "recodestop") {
								console.log("stop");
								window.pb_custom_recode.stop();
								distributeNextAction(arrActions[0][0].nextAction);
							} else if (contentsType == "recodeend") {
								window.pb_custom_recode.stop();
								distributeNextAction(arrActions[0][0].nextAction);
							} else if (contentsType == "recodelisten") {
								//alert("url :: "+window.pb_custom_recode.url.substring(0,100));
								sound1 = new Audio(window.pb_custom_recode.url);
								sound1.play();
								distributeNextAction(arrActions[0][0].nextAction);
							} else if (contentsType == "recodesistenpause") {
								try {
									sound1.pause();
									distributeNextAction(arrActions[0][0].nextAction);
								} catch (err) {}
							} else if (contentsType == "recodelistenpausecheck") {
								try {
									sound1.addEventListener("timeupdate", function() {
										if (sound1.currentTime == sound1.duration) {
											arrActions[0][0].pauseCallback();
										}
									});
								} catch (err) {}
							} else if (contentsType == "recodesave") {
								window.pb_custom_recode.onsave();
								distributeNextAction(arrActions[0][0].nextAction);
							}
						}

						if (
							contentsType &&
							contentsType.indexOf("@") != -1 &&
							contentsType.split("@")[0] == "locationmove"
						) {
							window.location.assign(contentsType.split("@")[1]);
						}
						if (contentsType == "pictureinsert") {
							var input_item = $(
								"<input id='PictureInsert' type='file' accept='image/*' capture />"
							); //capture='camera' accept='image/*'
							var input_label = $("<label for='PictureInsert'></label>");
							input_item.css({
								position: "absolute",
								top: 0,
								left: 0,
								fontSize: 0,
								width: 10,
								height: 10,
								padding: 0,
								opacity: 0
							});
							input_label.css({
								position: "absolute",
								top: 0,
								left: 0,
								fontSize: 0,
								width: 10,
								height: 10,
								padding: 0,
								opacity: 0
							});
							$("body").append(input_item);
							$("body").append(input_label);
							input_item.on("change", function(e) {
								$(arrActions[0][0].target).attr(
									"src",
									URL.createObjectURL(e.target.files[0])
								);
								!userData ? (userData = window.parent.userData) : "";

								var file = e.target.files[0];
								var frm = document.createElement("form");
								frm.method = "POST";
								frm.enctype = "multipart/form-data";

								var fileData = new FormData();
								fileData.append("file", file, "output.png");
								fileData.append("fileExt", "png");
								fileData.append("stu_id", userData.userId);
								fileData.append("book_name", userData.bookNm);
								fileData.append("actvt_kind", "02");
								fileData.append("timelrn_sq", userData.chapterId);

								// ajax
								$.ajax({
									url: "https://stu.ideepstudy.com/app/api/rd/uploadFile.do",
									type: "POST",
									data: fileData,
									async: false,
									cache: false,
									contentType: false,
									processData: false
								}).done(function(response) {
									console.log("전달성공");
								});
							});

							input_label.trigger("click");
							return false;
						}
						if (params.content == "Background Color") {
							var regex = /[?&]([^=#]+)=([^&#]*)/g,
								url = window.location.href,
								params = {},
								match;
							while ((match = regex.exec(document.location.href))) {
								params[match[1]] = match[2];
							}
							console.log(params);
							$("body").css({
								background: "#" + params.bgColor
							});
							$("div#div_main").css({
								background: "#" + params.bgColor
							});
							distributeNextAction(arrActions[0][0].nextAction);
							return false;
						}
						if (
							params.content == "game1" ||
							params.content == "game2" ||
							params.content == "game3" ||
							params.content == "game4" ||
							params.content == "game5"
						) {
							var myid = $(jQuery.data(TargetTable, "userid")).val();
							var loginstate = "login_no";
							var mycourse = $(jQuery.data(TargetTable, "course")).val();
							var mylevel = $(jQuery.data(TargetTable, "level")).val();
							var month = $(jQuery.data(TargetTable, "month")).val();
							if (myid != "no log") {
								loginstate = "login_yes";
								gameURL =
									"./" +
									params.content +
									"/pb.html?userid=" +
									myid +
									"&loginstate=" +
									loginstate +
									"&course=" +
									mycourse +
									"&level=" +
									mylevel +
									"&month=" +
									month;
							} else {
								gameURL = "./" + params.content + "/pb.html";
							}
						} else if (params.content == "savelogininfo") {
							saveLoginInfo();
						} else if (params.content == "deletelogininfo") {
							deleteLoginInfo();
						} else if (params.content == "loaddata") {
							startLoadData(params);
						} else if (params.content == "changedata") {
							startChangeData(params);
						} else {
							replaceContent(params);
						}
					} else {
						openWin(params.url);
					}
					break;
				//占쎌쥙�⒳펺誘�삕�좑옙 �좎럡�∽옙�뀀쐻�좑옙 占쎌쥙��옙占쎌삕�좑옙.
				case 24:
					startResetBeginSequence(params);
					break;
				case 25:
					startResetEndSequence(params);
					break;
				case 26:
					startResetInRectSequence(params);
					break;

				case 27:
					startAppend(params);
					break;
				case 28:
					startRemove(params);
					break;
				case 29:
					startReplace(params);
					break;
				case 30:
					startRemoveAll(params);
					break;
				case 31:
					startAdd(params);
					break;
				case 32:
					startSubtract(params);
					break;
				case 33:
					startMultiply(params);
					break;
				case 34:
					startDivide(params);
					break;
				case 35: // 占쎄퀣�좑옙占� 占쎄쑴��.
					break;

				case 36:
					startTimer(params);
					break;
				case 37:
					stopTimer(params);
					break;
				case 38: //iframe
					goBack(params);
					break;
				case 39: //iframe
					goForward(params);
					break;
				case 40: //iframe
					reload(params);
					break;
				case 41:
					if (params.actSubType == "Get Data") {
						startLoadData(params);
					} else if (params.actSubType == "Select Next") {
						startChangeData(params);
					}
					break;
				case 50:
					startlink(params);
					break;
			}
		}
	}
}

function quickSort(arr, left, right) {
	var i = left;
	var j = right;

	var temp;
	var pivot = parseInt($(arr[Math.round((left + right) / 2)]).css("z-index"));

	//console.log('right : ' + right +', left : ' + left + ', pivot : ' + pivot);

	while (i <= j) {
		while (parseInt($(arr[i]).css("z-index")) > pivot) i++;
		while (parseInt($(arr[j]).css("z-index")) < pivot) j--;
		if (i <= j) {
			temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
			i++;
			j--;
		}
	}

	if (left < j) quickSort(arr, left, j);

	if (i < right) quickSort(arr, i, right);

	return arr;
}

// 20160603 - hyukin
// 효과박스 처리
function pagingViewControl(params) {
	console.log("pagingViewControl");
	//console.log("params : " + params.duration)
	setTimeout(function() {
		var tg = params.target[0];
		//var tgArray = $(tg).find('canvas');
		//var ctx = tg.getContext("2d");
		var width = tg.width;
		var height = tg.height;
		var left = tg.style.left;
		var top = tg.style.top;
		var tempImage = new Image();
		var imageArray = jQuery.data(tg, "imageArray");
		var imageCnt = jQuery.data(tg, "imageCnt");

		var tgArray = jQuery.data(tg, "arraySort");
		var score = [];
		var properties1 = {};
		var properties2 = {};
		var properties3 = {};

		var tempArray = [tgArray.length];

		for (var j = 0; j < tgArray.length; j++) {
			score[j] = parseInt($(tgArray[j]).css("z-index"));
		}

		var max = score[0];
		var min = score[0];

		for (var i = 1; i < score.length; i++) {
			if (score[i] > max) max = score[i];

			if (score[i] < min) min = score[i];
		}

		//console.log("max : " + max + ", min : " + min);

		switch (params.actSubType) {
			case "Go Next":
				console.log("Go Next : " + imageCnt);
				if (imageCnt < tgArray.length - 1) imageCnt++;
				else return;

				if ($(tgArray[0]).is(":animated")) {
					if (imageCnt == tgArray.length - 1) return;

					for (var i = 0; i < tgArray.length; i++) {
						$(tgArray[i]).stop(true, true);
					}

					pagingViewControl(params);
					return;
				}

				isAnimated = true;

				//console.log(params.Direction)

				//if(params.paramValue[0].Direction)
				console.log("params.useAnimation :: " + params.useAnimation);
				if (params.useAnimation == "Y") {
					//Effect 분기처리-----------------------------------------------
					switch (params.effect) {
						// 덮어쓰기
						case 0:
							console.log("덮어쓰기 Next!!");

							$(tg).css("pointerEvents", "none");
							if (params.Direction == "Horiz") {
								properties1 = {
									left: $(tg).width() / 2,
									opacity: 1
								};
								properties2 = {
									left: 0,
									opacity: 1
								};
								properties3 = {
									left: $(tg).width(),
									opacity: 1
								};
								$(tgArray[1]).css("left", $(tg).width());
								$(tgArray[1]).css("z-index", max);
								$(tgArray[0]).css("z-index", max - 1);
							} else {
								properties1 = {
									top: $(tg).height() / 2,
									opacity: 1
								};
								properties2 = {
									top: 0,
									opacity: 1
								};
								properties3 = {
									opacity: 0
								};

								$(tgArray[1]).css("top", $(tg).height());
								$(tgArray[1]).css("z-index", max);
								$(tgArray[0]).css("z-index", max - 1);
							}

							//console.log(params.duration)
							$(tgArray[1]).animate(properties1, {
								duration: params.duration / 2,
								easing: "linear",
								queue: false,
								complete: function() {
									$(tgArray[1]).animate(properties2, {
										duration: params.duration / 2,
										easing: "linear",
										queue: false,
										complete: function() {}
									});
									$(tgArray[0]).css("opacity", 1);
									$(tgArray[0]).animate(
										{
											opacity: 0
										},
										{
											duration: params.duration / 2,
											easing: "linear",
											queue: false,
											complete: function() {
												//console.log("complete!!!!!");

												isAnimated = false;
												for (var i = 0; i < tgArray.length; i++) {
													switch (i) {
														case 0:
															$(tgArray[i]).css("z-index", min);
															break;

														case 1:
															$(tgArray[i]).css("z-index", max);
															break;

														default:
															var tempInt = parseInt(
																$(tgArray[i]).css("z-index")
															);
															tempInt++;
															$(tgArray[i]).css("z-index", tempInt);
															break;
													}
												}

												tgArray = quickSort(tgArray, 0, tgArray.length - 1);

												for (var j = 0; j < tgArray.length; j++) {
													//console.log('[AFTER] : ' + $(tgArray[j]).attr('id') +' : ' + $(tgArray[j]).css('z-index'));
												}

												jQuery.data(tg, "arraySort", tgArray);
												jQuery.data(tg, "imageCnt", imageCnt);

												$(tg).css("pointerEvents", "auto");
											}
										}
									);
									$(tgArray[0]).css("left", 0);
									$(tgArray[0]).css("top", 0);
								}
							});

							break;

						// 페이드
						case 1:
							console.log(
								"fade================================================"
							);
							if (params.Direction == "Horiz") {
								properties1 = {
									opacity: 0
								};
							} else {
								properties1 = {
									opacity: 0
								};
							}

							$(tgArray[1]).css("opacity", 1);
							$(tgArray[0]).animate(properties1, {
								duration: params.duration,
								easing: "linear",
								queue: false,
								complete: function() {
									console.log("complete!!!!!");
									for (var i = 0; i < tgArray.length; i++) {
										switch (i) {
											case 0:
												$(tgArray[i]).css("z-index", min);
												break;

											case 1:
												$(tgArray[i]).css("z-index", max);
												break;

											default:
												var tempInt = parseInt($(tgArray[i]).css("z-index"));
												tempInt++;
												$(tgArray[i]).css("z-index", tempInt);
												break;
										}
									}

									tgArray = quickSort(tgArray, 0, tgArray.length - 1);

									jQuery.data(tg, "arraySort", tgArray);
									jQuery.data(tg, "imageCnt", imageCnt);
								}
							});

							break;

						// 밀기
						case 2:
							if (params.Direction == "Horiz") {
								properties1 = {
									left: -$(tg).width() / 2,
									opacity: 1
								};
								properties2 = {
									left: -$(tg).width(),
									opacity: 0
								};
								properties3 = {
									left: $(tg).width() / 2,
									opacity: 1
								};
								properties4 = {
									left: 0,
									opacity: 1
								};
								$(tgArray[1]).css("left", $(tg).width());
							} else {
								properties1 = {
									top: -$(tg).height() / 2,
									opacity: 1
								};
								properties2 = {
									top: -$(tg).height(),
									opacity: 0
								};
								properties3 = {
									top: $(tg).height() / 2,
									opacity: 1
								};
								properties4 = {
									top: 0,
									opacity: 1
								};
								$(tgArray[1]).css("top", $(tg).height());
							}

							$(tgArray[0]).animate(properties1, {
								duration: params.duration / 2,
								easing: "linear",
								queue: false,
								complete: function() {
									$(tgArray[0]).animate(properties2, {
										duration: params.duration / 2,
										easing: "linear",
										queue: false,
										complete: function() {}
									});
								}
							});

							$(tgArray[1]).animate(properties3, {
								duration: params.duration / 2,
								easing: "linear",
								queue: false,
								complete: function() {
									$(tgArray[1]).animate(properties4, {
										duration: params.duration / 2,
										easing: "linear",
										queue: false,
										complete: function() {
											console.log("complete!!!!!");
											for (var i = 0; i < tgArray.length; i++) {
												switch (i) {
													case 0:
														$(tgArray[i]).css("z-index", min);
														break;

													case 1:
														$(tgArray[i]).css("z-index", max);
														break;

													default:
														var tempInt = parseInt(
															$(tgArray[i]).css("z-index")
														);
														tempInt++;
														$(tgArray[i]).css("z-index", tempInt);
														break;
												}
											}

											tgArray = quickSort(tgArray, 0, tgArray.length - 1);

											jQuery.data(tg, "arraySort", tgArray);
											jQuery.data(tg, "imageCnt", imageCnt);
										}
									});
								}
							});

							break;

						// 드러내기
						case 3:
							if (params.Direction == "Horiz") {
								properties1 = {
									left: -$(tg).width() / 2,
									opacity: 1
								};
								properties2 = {
									left: -$(tg).width(),
									opacity: 0
								};
								properties3 = {
									opacity: 1
								};
								$(tgArray[1]).css("opacity", 0);
								$(tgArray[1]).css("left", 0);
								$(tgArray[0]).css("left", 0);
							} else {
								properties1 = {
									top: -$(tg).height() / 2,
									opacity: 1
								};
								properties2 = {
									top: -$(tg).height(),
									opacity: 0
								};
								properties3 = {
									opacity: 1
								};
								$(tgArray[1]).css("opacity", 0);
								$(tgArray[0]).css("top", 0);
							}

							$(tgArray[0]).animate(properties1, {
								duration: params.duration / 2,
								easing: "linear",
								queue: false,
								complete: function() {
									$(tgArray[0]).animate(properties2, {
										duration: params.duration / 2,
										easing: "linear",
										queue: false,
										complete: function() {
											/*$(tgArray[0]).css('left', 0);
                                             $(tgArray[0]).css('left', 0);*/
											console.log("complete");
											isAnimated = false;
											for (var i = 0; i < tgArray.length; i++) {
												switch (i) {
													case 0:
														$(tgArray[i]).css("z-index", min);
														break;

													case 1:
														$(tgArray[i]).css("z-index", max);
														break;

													default:
														var tempInt = parseInt(
															$(tgArray[i]).css("z-index")
														);
														tempInt++;
														$(tgArray[i]).css("z-index", tempInt);
														break;
												}
											}

											tgArray = quickSort(tgArray, 0, tgArray.length - 1);

											for (var j = 0; j < tgArray.length; j++) {
												//console.log('[AFTER] : ' + $(tgArray[j]).attr('id') +' : ' + $(tgArray[j]).css('z-index'));
											}

											jQuery.data(tg, "arraySort", tgArray);
											jQuery.data(tg, "imageCnt", imageCnt);
										}
									});
								}
							});

							$(tgArray[1]).animate(properties3, {
								duration: params.duration / 2,
								easing: "linear",
								queue: false,
								complete: function() {}
							});

							break;
					}
				} else {
					for (var i = 0; i < tgArray.length; i++) {
						$(tgArray[i]).css("opacity", 0);
						switch (i) {
							case 0:
								$(tgArray[i]).css("z-index", min);
								break;

							case 1:
								$(tgArray[i]).css("z-index", max);
								$(tgArray[i]).css("opacity", 1);
								break;

							default:
								var tempInt = parseInt($(tgArray[i]).css("z-index"));
								tempInt++;
								$(tgArray[i]).css("z-index", tempInt);
								break;
						}
					}

					tgArray = quickSort(tgArray, 0, tgArray.length - 1);

					for (var j = 0; j < tgArray.length; j++) {
						//console.log('[AFTER] : ' + $(tgArray[j]).attr('id') +' : ' + $(tgArray[j]).css('z-index'));
					}

					jQuery.data(tg, "arraySort", tgArray);
					jQuery.data(tg, "imageCnt", imageCnt);
				}
				break;

			case "Go Prev":
				console.log(imageCnt);
				if (0 <= imageCnt) imageCnt--;
				else return;
				if (imageCnt == -1) return;

				if ($(tgArray[0]).is(":animated")) {
					if (imageCnt == 0) return;
					for (var i = 0; i < tgArray.length; i++) {
						$(tgArray[i]).stop(true, true);
					}
					pagingViewControl(params);
					return;
				}

				isAnimated = true;
				//$(tgArray[0]).css('pointerEvents','none');

				if (params.useAnimation == "Y") {
					//Effect 분기처리-----------------------------------------------
					switch (params.effect) {
						// 덮어쓰기
						case 0:
							$(tg).css("pointerEvents", "none");
							if (params.Direction == "Horiz") {
								properties1 = {
									left: -$(tg).width() / 2,
									opacity: 1
								};
								properties2 = {
									left: 0,
									opacity: 1
								};
								properties3 = {
									left: 0,
									opacity: 0
								};
								$(tgArray[tgArray.length - 1]).css("left", -$(tg).width());
							} else {
								properties1 = {
									top: -$(tg).height() / 2,
									opacity: 1
								};
								properties2 = {
									top: 0,
									opacity: 1
								};
								properties3 = {
									opacity: 0
								};
								$(tgArray[tgArray.length - 1]).css("top", -$(tg).height());
							}

							for (var i = 0; i < tgArray.length; i++) {
								switch (i) {
									case tgArray.length - 1:
										$(tgArray[i]).css("z-index", max);
										break;
									default:
										var tempInt = parseInt($(tgArray[i]).css("z-index"));
										tempInt--;
										$(tgArray[i]).css("z-index", tempInt);
										break;
								}
							}

							$(tgArray[tgArray.length - 1]).animate(properties1, {
								duration: params.duration / 2,
								easing: "linear",
								complete: function() {
									$(tgArray[tgArray.length - 1]).animate(properties2, {
										duration: params.duration / 2,
										easing: "linear",
										complete: function() {}
									});

									$(tgArray[0]).animate(properties3, {
										duration: params.duration / 2,
										easing: "linear",
										complete: function() {
											tgArray = quickSort(tgArray, 0, tgArray.length - 1);

											for (var j = 0; j < tgArray.length; j++) {
												//console.log('[AFTER] : ' + $(tgArray[j]).attr('id') +' : ' + $(tgArray[j]).css('z-index'));
											}

											jQuery.data(tg, "arraySort", tgArray);
											jQuery.data(tg, "imageCnt", imageCnt);

											$(tg).css("pointerEvents", "auto");
										}
									});
								}
							});
							break;

						// 페이드
						case 1:
							if (params.Direction == "Horiz") {
								properties1 = {
									opacity: 0
								};
							} else {
								properties1 = {
									opacity: 0
								};
							}

							$(tgArray[tgArray.length - 1]).css("opacity", 1);
							$(tgArray[0]).animate(properties1, {
								duration: params.duration,
								easing: "linear",
								queue: false,
								complete: function() {
									console.log("complete!!!!!");
									for (var i = 0; i < tgArray.length; i++) {
										switch (i) {
											case tgArray.length - 1:
												$(tgArray[i]).css("z-index", max);
												break;
											default:
												var tempInt = parseInt($(tgArray[i]).css("z-index"));
												tempInt--;
												$(tgArray[i]).css("z-index", tempInt);
												break;
										}
									}

									tgArray = quickSort(tgArray, 0, tgArray.length - 1);

									jQuery.data(tg, "arraySort", tgArray);
									jQuery.data(tg, "imageCnt", imageCnt);

									//console.log(tgArray);
								}
							});

							break;

						// 밀기
						case 2:
							if (params.Direction == "Horiz") {
								properties1 = {
									left: $(tg).width() / 2,
									opacity: 1
								};
								properties2 = {
									left: $(tg).width(),
									opacity: 0
								};
								properties3 = {
									left: -$(tg).width() / 2,
									opacity: 1
								};
								properties4 = {
									left: 0,
									opacity: 1
								};
								$(tgArray[tgArray.length - 1]).css("left", -$(tg).width());
							} else {
								properties1 = {
									top: $(tg).height() / 2,
									opacity: 1
								};
								properties2 = {
									top: $(tg).height(),
									opacity: 0
								};
								properties3 = {
									top: -$(tg).height() / 2,
									opacity: 1
								};
								properties4 = {
									top: 0,
									opacity: 1
								};
								$(tgArray[tgArray.length - 1]).css("top", -$(tg).height());
							}

							$(tgArray[0]).animate(properties1, {
								duration: params.duration / 2,
								easing: "linear",
								queue: false,
								complete: function() {
									$(tgArray[0]).animate(properties2, {
										duration: params.duration / 2,
										easing: "linear",
										queue: false,
										complete: function() {}
									});
								}
							});

							$(tgArray[tgArray.length - 1]).animate(properties3, {
								duration: params.duration / 2,
								easing: "linear",
								queue: false,
								complete: function() {
									$(tgArray[tgArray.length - 1]).animate(properties4, {
										duration: params.duration / 2,
										easing: "linear",
										queue: false,
										complete: function() {
											console.log("complete!!!!!");
											for (var i = 0; i < tgArray.length; i++) {
												switch (i) {
													case tgArray.length - 1:
														$(tgArray[i]).css("z-index", max);
														break;
													default:
														var tempInt = parseInt(
															$(tgArray[i]).css("z-index")
														);
														tempInt--;
														$(tgArray[i]).css("z-index", tempInt);
														break;
												}
											}

											tgArray = quickSort(tgArray, 0, tgArray.length - 1);

											jQuery.data(tg, "arraySort", tgArray);
											jQuery.data(tg, "imageCnt", imageCnt);
										}
									});
								}
							});
							break;

						// 드러내기
						case 3:
							if (params.Direction == "Horiz") {
								properties1 = {
									left: $(tg).width() / 2,
									opacity: 1
								};
								properties2 = {
									left: $(tg).width(),
									opacity: 0
								};
								properties3 = {
									opacity: 1
								};
								$(tgArray[tgArray.length - 1]).css("opacity", 0);
								$(tgArray[tgArray.length - 1]).css("left", 0);
							} else {
								properties1 = {
									top: $(tg).height() / 2,
									opacity: 1
								};
								properties2 = {
									top: $(tg).height(),
									opacity: 0
								};
								properties3 = {
									opacity: 1
								};
								$(tgArray[tgArray.length - 1]).css("opacity", 0);
								$(tgArray[tgArray.length - 1]).css("top", 0);
							}

							$(tgArray[0]).animate(properties1, {
								duration: params.duration / 2,
								easing: "linear",
								queue: false,
								complete: function() {
									$(tgArray[0]).animate(properties2, {
										duration: params.duration / 2,
										easing: "linear",
										queue: false,
										complete: function() {
											isAnimated = false;
											for (var i = 0; i < tgArray.length; i++) {
												switch (i) {
													case tgArray.length - 1:
														$(tgArray[i]).css("z-index", max);
														break;
													default:
														var tempInt = parseInt(
															$(tgArray[i]).css("z-index")
														);
														tempInt--;
														$(tgArray[i]).css("z-index", tempInt);
														break;
												}
											}

											tgArray = quickSort(tgArray, 0, tgArray.length - 1);

											for (var j = 0; j < tgArray.length; j++) {
												//console.log('[AFTER] : ' + $(tgArray[j]).attr('id') +' : ' + $(tgArray[j]).css('z-index'));
											}

											jQuery.data(tg, "arraySort", tgArray);
											jQuery.data(tg, "imageCnt", imageCnt);
										}
									});
								}
							});

							$(tgArray[tgArray.length - 1]).animate(properties3, {
								duration: params.duration / 2,
								easing: "linear",
								queue: false,
								complete: function() {}
							});

							break;
					}
				} else {
					for (var i = 0; i < tgArray.length; i++) {
						$(tgArray[i]).css("opacity", 0);
						switch (i) {
							case tgArray.length - 1:
								$(tgArray[i]).css("z-index", max);
								$(tgArray[i]).css("opacity", 1);
								break;
							default:
								var tempInt = parseInt($(tgArray[i]).css("z-index"));
								tempInt--;
								$(tgArray[i]).css("z-index", tempInt);
								break;
						}
					}

					tgArray = quickSort(tgArray, 0, tgArray.length - 1);

					for (var j = 0; j < tgArray.length; j++) {
						//console.log('[AFTER] : ' + $(tgArray[j]).attr('id') +' : ' + $(tgArray[j]).css('z-index'));
					}

					jQuery.data(tg, "arraySort", tgArray);
					jQuery.data(tg, "imageCnt", imageCnt);
				}
				break;
		}

		/*switch (params.actSubType){
         case 'Go Next' :
         if(imageCnt < imageArray.length - 1 )
         imageCnt ++;
    
         tempImage.src = imageArray[imageCnt];
         tempImage.onload = function(){
         ctx.clearRect(0,0,width,height);
         //ctx.save();
         drawImage(ctx, tempImage, 0,0,width,height,0);
         //ctx.restore();
         }
    
         jQuery.data(tg, 'imageCnt', imageCnt);
         break;
    
         case 'Go Prev' :
         if(imageCnt > 0 )
         imageCnt --;
         tempImage.src = imageArray[imageCnt];
         tempImage.onload = function(){
         ctx.clearRect(left,top,width,height);
         //ctx.save();
         drawImage(ctx, tempImage, 0,0,width,height,0);
         //ctx.restore();
         }
         jQuery.data(tg, 'imageCnt', imageCnt);
         break;
         }*/
		//distributeNextAction(params.nextAction);
	}, params.delay);
}

function startlink(params) {
	var type = params.actSubType;
	var url = params.url;

	if (url.length > 0) {
		if (type.indexOf("Current") > 0) {
			window.open(url, "_self");
		} else if (type.indexOf("New") > 0) {
			window.open(url, "_blank");
		} else if (type.indexOf("Download") > 0) {
			window.open(url, "_self");
		}
	}
}

function startHideShow(params) {
	//console.log("hide");

	var startHideShowTimer;
	for (var i = 0; i < params.target.length; i++) {
		var tg = params.target[i];
		if (tg == null) alert("null box");
		try {
			var blink_timer =
				"clearInterval(" + replaceAll(tg.id, "cvs", "blink_timer") + ")";
			eval(blink_timer);
			var blink_setTimer =
				"clearInterval(" + replaceAll(tg.id, "cvs", "blink_setTimer") + ")";
			eval(blink_setTimer);
			eval(blink_setTimer);
		} catch (e) {}
		startHideShowTimer = setTimeout(function() {
			if (params.actSubType == "Hide") {
                $(tg).addClass("collapse");
				if (videobox == tg) {
					videobox.pause();
					videobox = null;
				}
			} else {
                $(tg).removeClass("collapse");

				if (params.callfunc) {
					var fnstring = params.callfunc;
					var fn = window[fnstring];
					if (typeof fn === "function") fn();
				}
			}
			distributeNextAction(params.nextAction);
		}, params.delay);
		jQuery.data(tg, "startHideShow", startHideShowTimer);
	}
}

function replaceContent(params) {
	setTimeout(function() {
		distributeNextAction(params.nextAction);

		if (params.content.endsWith("mp4")) {
			var target = params.target[0];
			var videoSource = params.content;
			if (params.actSubType == "Stop") {
				//console.log("playMovie11");
				target.pause();
				videobox = null;
			} else {
				videobox = target;
				if (videoSource != null && videoSource != "") {
					document.getElementById("mp4").setAttribute("src", videoSource);
				}
				target.load();
				target.play();
			}
		}
		if (params.content.startsWith("http://")) {
			var target = params.target[0];
			replaceContent;
			target.location.href = params.content;
		} else {
			var element = params.target[0];
			if (element == null || element == undefined) {
				return;
			}

			try {
				$(element).attr("src", params.content);
			} catch (err) {}

			//distributeNextAction(params.nextAction);
		}
	}, params.delay);
}
if (typeof String.prototype.startsWith != "function") {
	// see below for better implementation!
	String.prototype.startsWith = function(str) {
		return this.indexOf(str) === 0;
	};
}
if (typeof String.prototype.endsWith !== "function") {
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

function drawImage(ctx, image, x, y, w, h, r) {
	if (r == 0) {
		ctx.drawImage(image, x, y, w, h);
	} else {
		ctx.save();
		ctx.translate(x + w / 2, y + h / 2);
		ctx.rotate((r * Math.PI) / 180);
		ctx.drawImage(image, -w / 2, -h / 2, w, h);
		ctx.restore();
	}
}

function startAppend(params) {
	//console.log("startAppend");
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];

			var UserInput = params.UserInput;
			var InputValue = params.InputValue;

			var ConditionAttribute = params.ConditionAttribute;
			var ConditionTo = params.ConditionTo;
			var ConditionTarget = params.ConditionTarget;
			var ConditionAttribute = params.ConditionAttribute;

			var toValue = null;
			var fromValue = null;
			if (ConditionTo == "0") {
				toValue = jQuery.data($(tg).get(0), "tag");
			} else {
				toValue = jQuery.data($(tg).get(0), "text");
			}
			//console.log("toValue is " + toValue);
			if (UserInput == null || UserInput == 0) {
				if (ConditionAttribute == "Tag") {
					fromValue = jQuery.data($(ConditionTarget).get(0), "tag");
				} else if (ConditionAttribute == "Tag Count") {
					fromValue = jQuery.data($(ConditionTarget).get(0), "tag count");
				} else if (ConditionAttribute == "Alpha") {
					fromValue = jQuery.data($(ConditionTarget).get(0), "alpha");
				} else if (ConditionAttribute == "Hidden") {
					fromValue = jQuery.data($(ConditionTarget).get(0), "hidden");
				} else if (ConditionAttribute == "Area") {
					fromValue = jQuery.data($(ConditionTarget).get(0), "area");
				} else if (ConditionAttribute == "CurrentPage") {
					break;
				} else {
					fromValue = jQuery.data($(ConditionTarget).get(0), "text");
				}
				//console.log("fromValue is " + fromValue);
				toValue = toValue.concat(fromValue);
			} else {
				fromValue = InputValue;

				toValue = toValue.push(fromValue);
			}

			if (ConditionTo == "0") {
				$(tg).data("tag", toValue);
			} else {
				changeDisplayedText(tg, toValue);
			}
			//console.log("Append Result value is " + jQuery.data($(tg).get(0), "text"));
		}

		distributeNextAction(params.nextAction);
	}, params.delay);
}

function startRemove(params) {
	//console.log("startRemove");
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];

			var UserInput = params.UserInput;
			var InputValue = params.InputValue;

			var ConditionAttribute = params.ConditionAttribute;
			var ConditionTo = params.ConditionTo;
			var ConditionTarget = params.ConditionTarget;
			var ConditionAttribute = params.ConditionAttribute;

			var toValue = null;
			var fromValue = null;
			if (ConditionTo == "0") {
				toValue = jQuery.data($(tg).get(0), "tag");
			} else {
				toValue = jQuery.data($(tg).get(0), "text");
			}
			//console.log("toValue is " + toValue);
			if (UserInput == null || UserInput == 0) {
				if (ConditionAttribute == "Tag") {
					fromValue = jQuery.data($(ConditionTarget).get(0), "tag");
				} else {
					fromValue = jQuery.data($(ConditionTarget).get(0), "text");
				}
				//console.log("fromValue is " + fromValue);
				for (var i = 0; i < fromValue.length; i++) {
					toValue.remove(fromValue[i]);
				}
			} else {
				fromValue = InputValue;
				//console.log("fromValue is " + fromValue);
				toValue.remove(fromValue);
			}

			if (ConditionTo == "0") {
				$(tg).data("tag", toValue);
			} else {
				changeDisplayedText(tg, toValue);
			}
			//console.log("Remove Result value is " + jQuery.data($(tg).get(0), "tag"));
		}

		distributeNextAction(params.nextAction);
	}, params.delay);
}

function startReplace(params) {
	var tg = null;
	var tgType = params.targetType;

	// targetType 0 : 그래픽  1 : 변수({pagenumber}.js 의 지역변수가 인자)  2 : 전역변수 (indexedDB에 키로 사용될 문자열)
	if (tgType == 0) tg = params.target[0];
	else tg = params.target;

	var ConditionAttribute = params.ConditionAttribute;
	var ConditionTo = params.ConditionTo; // 0 : Tag, 1 : Text
	var ConditionTarget = params.ConditionTarget;

	var UserInput = params.UserInput;
	var InputValue = params.InputValue;
	var ConditionTgType = params.ConditionTargetType;

	if (UserInput == undefined || UserInput == null || UserInput == 0) {
		// if conditionTarget is graphic or variable.

		var conditionTargetValue = null; // ConditionTarget can be
		if (ConditionTgType == 0) {
			// if condition target is graphic
			if (ConditionAttribute == undefined || ConditionAttribute == "Tag") {
				conditionTargetValue = jQuery.data($(ConditionTarget).get(0), "tag");
			} else {
				//conditionTargetValue= $(ConditionTarget).get(0).textContent;
				var tb = $(ConditionTarget).get(0);
				var contentDiv = $(tb).find("div.contentsbox")[0];
				conditionTargetValue = getTextBoxText(contentDiv);
			}
		} else if (ConditionTgType == 1) {
			// 만약 condition target이 지역 변수면,

			conditionTargetValue = this[ConditionTarget];
		} else if (ConditionTgType == 2) {
			// 만약 condition target이 전역 변수면,

			conditionTargetValue = sessionStorage.getItem(ConditionTarget);
		}
		// conditionTargetValue가 모든 경우에 대해 구해졌음

		// conditionTargetValue를 주입하기
		if (tgType == 0) {
			// if Target is Graphic
			if (ConditionTo == "0") {
				// graphic 속성 (Tag) 를 타겟할 경우
				jQuery.data($(tg).get(0), "tag", conditionTargetValue);
			} else {
				var tb = $(tg).get(0);
				var contentDiv = $(tb).find("div.contentsbox")[0];
				setTextBoxText(contentDiv, conditionTargetValue);
			}
		} else if (tgType == 1) {
			// if Target is local variable
			this[tg] = conditionTargetValue[0];
		} else if (tgType == 2) {
			// if Target is global variable
			sessionStorage.setItem(tg, conditionTargetValue);
		}
	} else {
		// if userInput Exist then Isert UserInput
		if (tgType == 0) {
			// if tgType is graphic

			if (ConditionTo == "0") {
				// tag
				jQuery.data($(tg).get(0), "tag", InputValue);
			} else {
				var tb = $(tg).get(0);
				var contentDiv = $(tb).find("div.contentsbox")[0];
				setTextBoxText(contentDiv, InputValue);
			}
		} else if (tgType == 1) {
			//If Target Type is local variable.
			this[tg] = InputValue;
		} else if (tgType == 2) {
			//If Target Type is global variable.

			sessionStorage.setItem(tg, InputValue);
		}
	}
	distributeNextAction(params.nextAction);
}

function getTextBoxText(elem) {
	var elementList = elem.children;
	var result = "";

	for (var i = 0; i < elementList.length; i++) {
		var element = elementList[i];
		var name = element.tagName.toLowerCase();
		if (name == "span") {
			result += element.innerText;
		} else if (name == "p") {
			result += getTextBoxText(element) + "\\n";
		} else {
			result += getTextBoxText(element);
		}
	}
	return result;
}

// 텍스트 박스의 텍스트를 설정합니다.
// 텍스트 박스에 여러 텍스트가 존재하고 여러 스타일이 존재합니다.
// 스타일은 첫 번째로 통일하여 따라합니다.
// p와 span에 스타일을 복사합니다.

function setTextBoxText(elem, text) {

	var firstParagraphStyle = null; 
	var firstSpanStyle =  null; 

	//  div contentsbox  ~> div     ~> p       ~> span
	if ( elem.children[0] !=null  ) { // DIV always exist, but for test
		
		try{ 
			firstParagraphStyle = elem.children[0].children[0].style;
			firstSpanStyle = elem.children[0].children[0].children[0].style;
		}
		catch (e) {
			firstParagraphStyle = "";
			firstSpanStyle = "";
		}
	}

	//  erase all children Element
	elem.innerHTML = "";
	elem.appendChild(document.createElement("DIV"));

	elem = elem.children[0];

	var tmpString = "";
	// text == "null" 인덱스드 디비가 null일 때 문자열 상수로 null 임
	if (text == null || text == undefined || text.length == 0 || text == "null") {
		var pNode = document.createElement("P");
		var spanNode = document.createElement("SPAN");
		pNode.appendChild(spanNode);
		elem.appendChild(pNode);
		return;
	}
	for (var i = 0; i < text.length; i++) {
		var cur = text[i];
		if (cur == "\\") {
			if (i + 1 < text.length) {
				if (text[i + 1] == "n") {
					i++;
					var pNode = document.createElement("P");
					var spanNode = document.createElement("SPAN");
					pNode.appendChild(spanNode);

					spanNode.textContent = tmpString;

					//style copied
					pNode.setAttribute("style", firstParagraphStyle.cssText);
					spanNode.setAttribute("style", firstSpanStyle.cssText);

					elem.appendChild(pNode);

					tmpString = "";
				}
			}
		} else tmpString += text[i];
	}
	if (tmpString != "") {
		//create element
		var pNode = document.createElement("P");
		var spanNode = document.createElement("SPAN");

		pNode.appendChild(spanNode);
		spanNode.textContent = tmpString;
		//style
		pNode.setAttribute("style", firstParagraphStyle.cssText);
		spanNode.setAttribute("style", firstSpanStyle.cssText);

		elem.appendChild(pNode);
	}
}

function startRemoveAll(params) {
	var ConditionTo = params.ConditionTo;

	var tgType = params.targetType;
	var tg = null;

	// targetType이 graphic 이면
	if (tgType == 0) {
		tg = params.target[0];

		if (ConditionTo == "0") {
			jQuery.data($(tg).get(0), "tag", []);
		} else {
			var tb = $(tg).get(0);
			var contentDiv = $(tb).find("div.contentsbox")[0];

			setTextBoxText(contentDiv, "");
		}
	} else if (tgType == 1) {
		tg = params.target;
		this[tg] = null;
	} else if (tgType == 2) {
		tg = params.target;
		sessionStorage.setItem(tg, null);
	}
	distributeNextAction(params.nextAction);
}

function startAdd(params) {
	//console.log("startAdd");
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];

			var UserInput = params.UserInput;
			var InputValue = params.InputValue;

			var ConditionAttribute = params.ConditionAttribute;
			var ConditionTo = params.ConditionTo;
			var ConditionTarget = params.ConditionTarget;
			var ConditionAttribute = params.ConditionAttribute;

			var toValue = null;
			var fromValue = null;
			if (ConditionTo == "0") {
				toValue = jQuery.data($(tg).get(0), "tag");
			} else {
				toValue = jQuery.data($(tg).get(0), "text");
				//toValue = $(tg).val();
			}
			if (toValue == null || toValue == undefined || toValue == "") {
				toValue = 0;
			}

			if (UserInput == null || UserInput == 0) {
				if (ConditionAttribute == "Tag") {
					fromValue = jQuery.data($(ConditionTarget).get(0), "tag");
				} else {
					fromValue = jQuery.data($(ConditionTarget).get(0), "text");
					//fromValue = [$(ConditionTarget).val()];
				}
			} else {
				fromValue = [String(InputValue)];
			}
			var a = 0;
			var b = 0;

			if (!isNaN(toValue)) {
				a = parseInt(toValue);
			}
			if (a == null || a == "" || a == isNaN(a)) {
				a = 0;
			}

			if (!isNaN(fromValue)) {
				b = parseInt(fromValue);
			}
			if (b == null || b == "") {
				b = 0;
			}

			var s = 0;
			s = a + b;
			var strResult = String(s);
			if (ConditionTo == "0") {
				jQuery.data($(tg).get(0), "tag", [strResult]);
			} else {
				jQuery.data($(tg).get(0), "text", [strResult]);
				//$(tg).val(s);
				changeDisplayedText(tg, s);
			}
			//console.log("startAdd Result value is " + jQuery.data($(tg).get(0), "tag"));
			//console.log("startAdd Result value is " + jQuery.data($(tg).get(0), "text"));
		}

		distributeNextAction(params.nextAction);
	}, params.delay);
}

function startSubtract(params) {
	//console.log("startSubtract");
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];

			var UserInput = params.UserInput;
			var InputValue = params.InputValue;

			var ConditionAttribute = params.ConditionAttribute;
			var ConditionTo = params.ConditionTo;
			var ConditionTarget = params.ConditionTarget;
			var ConditionAttribute = params.ConditionAttribute;

			var toValue = null;
			var fromValue = null;
			if (ConditionTo == "0") {
				toValue = jQuery.data($(tg).get(0), "tag");
			} else {
				toValue = jQuery.data($(tg).get(0), "text");
				//toValue = $(tg).val();
			}
			if (toValue == null || toValue == undefined || toValue == "") {
				toValue = 0;
			}

			if (UserInput == null || UserInput == 0) {
				if (ConditionAttribute == "Tag") {
					fromValue = jQuery.data($(ConditionTarget).get(0), "tag");
				} else {
					fromValue = jQuery.data($(ConditionTarget).get(0), "text");
					//fromValue = [$(ConditionTarget).val()];
				}
			} else {
				fromValue = [String(InputValue)];
			}
			var a = 0;
			var b = 0;

			if (!isNaN(toValue)) {
				a = parseInt(toValue);
			}
			if (a == null || a == "" || a == isNaN(a)) {
				a = 0;
			}

			if (!isNaN(fromValue)) {
				b = parseInt(fromValue);
			}
			if (b == null || b == "") {
				b = 0;
			}

			var s = 0;
			var a = 0;
			var b = 0;

			if (!isNaN(toValue)) {
				a = parseInt(toValue);
			}
			if (!isNaN(fromValue)) {
				b = parseInt(fromValue);
			}
			s = a - b;
			var strResult = String(s);
			if (ConditionTo == "0") {
				jQuery.data($(tg).get(0), "tag", [strResult]);
			} else {
				jQuery.data($(tg).get(0), "text", [strResult]);
				//  $(tg).val(s);
				changeDisplayedText(tg, s);
			}
			//console.log("startSubtract Result value is " + jQuery.data($(tg).get(0), "tag"));
		}

		distributeNextAction(params.nextAction);
	}, params.delay);
}

function startMultiply(params) {
	//console.log("startMultiply");
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];

			var UserInput = params.UserInput;
			var InputValue = params.InputValue;

			var ConditionAttribute = params.ConditionAttribute;
			var ConditionTo = params.ConditionTo;
			var ConditionTarget = params.ConditionTarget;
			var ConditionAttribute = params.ConditionAttribute;

			var toValue = null;
			var fromValue = null;
			if (ConditionTo == "0") {
				toValue = jQuery.data($(tg).get(0), "tag");
			} else {
				toValue = jQuery.data($(tg).get(0), "text");
				//toValue = $(tg).val();
			}
			if (toValue == null || toValue == undefined || toValue == "") {
				toValue = 0;
			}

			if (UserInput == null || UserInput == 0) {
				if (ConditionAttribute == "Tag") {
					fromValue = jQuery.data($(ConditionTarget).get(0), "tag");
				} else {
					fromValue = jQuery.data($(ConditionTarget).get(0), "text");
					//fromValue = [$(ConditionTarget).val()];
				}
			} else {
				fromValue = [String(InputValue)];
			}
			var a = 0;
			var b = 0;

			if (!isNaN(toValue)) {
				a = parseInt(toValue);
			}
			if (a == null || a == "" || a == isNaN(a)) {
				a = 0;
			}

			if (!isNaN(fromValue)) {
				b = parseInt(fromValue);
			}
			if (b == null || b == "") {
				b = 0;
			}

			var s = 0;
			var a = 0;
			var b = 0;

			if (!isNaN(toValue)) {
				a = parseInt(toValue);
			}
			if (!isNaN(fromValue)) {
				b = parseInt(fromValue);
			}
			s = a * b;
			var strResult = String(s);
			if (ConditionTo == "0") {
				jQuery.data($(tg).get(0), "tag", [strResult]);
			} else {
				jQuery.data($(tg).get(0), "text", [strResult]);
				// $(tg).val(s);
				changeDisplayedText(tg, s);
			}
			//console.log("startMultiply Result value is " + jQuery.data($(tg).get(0), "tag"));
		}

		distributeNextAction(params.nextAction);
	}, params.delay);
}

function startDivide(params) {
	//console.log("startDivide");
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];

			var UserInput = params.UserInput;
			var InputValue = params.InputValue;

			var ConditionAttribute = params.ConditionAttribute;
			var ConditionTo = params.ConditionTo;
			var ConditionTarget = params.ConditionTarget;
			var ConditionAttribute = params.ConditionAttribute;

			var toValue = null;
			var fromValue = null;
			if (ConditionTo == "0") {
				toValue = jQuery.data($(tg).get(0), "tag");
			} else {
				toValue = jQuery.data($(tg).get(0), "text");
				//toValue = $(tg).val();
			}
			if (toValue == null || toValue == undefined || toValue == "") {
				toValue = 0;
			}

			if (UserInput == null || UserInput == 0) {
				if (ConditionAttribute == "Tag") {
					fromValue = jQuery.data($(ConditionTarget).get(0), "tag");
				} else {
					fromValue = jQuery.data($(ConditionTarget).get(0), "text");
					//fromValue = [$(ConditionTarget).val()];
				}
			} else {
				fromValue = [String(InputValue)];
			}
			var a = 0;
			var b = 0;

			if (!isNaN(toValue)) {
				a = parseInt(toValue);
			}
			if (a == null || a == "" || a == isNaN(a)) {
				a = 0;
			}

			if (!isNaN(fromValue)) {
				b = parseInt(fromValue);
			}
			if (b == null || b == "") {
				b = 0;
			}

			var s = 0;
			var a = 0;
			var b = 0;

			if (!isNaN(toValue)) {
				a = parseInt(toValue);
			}
			if (!isNaN(fromValue)) {
				b = parseInt(fromValue);
			}
			s = a / b;
			var strResult = String(s);
			if (ConditionTo == "0") {
				jQuery.data($(tg).get(0), "tag", [strResult]);
			} else {
				jQuery.data($(tg).get(0), "text", [strResult]);
				// $(tg).val(s);
				changeDisplayedText(tg, s);
			}
			//console.log("startDivide Result value is " + jQuery.data($(tg).get(0), "tag"));
		}

		distributeNextAction(params.nextAction);
	}, params.delay);
} ////////////////////////////////////

function startFade(params) {
	var startFadeTimer;
	//    console.log("startFade");
	for (var i = 0; i < params.target.length; i++) {
		var tg = params.target[i];

		//console.log(tg);

		var tagValue = jQuery.data($(tg).get(0), "tag");
		/*        console.log("tagValue is " + tagValue); */

		var originOpacity = $(tg).css("opacity");
		/*         console.log(originOpacity); */

		var easingVar = "";

		switch (params.aniTiming) {
			case 0:
				easingVar = "linear";
				break;
			case 1:
				easingVar = "easeInCubic";
				break;
			case 2:
				easingVar = "easeOutCubic";
				break;
			case 3:
				easingVar = "easeInOutCubic";
				break;
		}

		$(tg).show();
		if (params.reverse == "Y") {
			startFadeTimer = setTimeout(function() {
				$(tg).animate(
					{
						opacity: params.opacity
					},
					{
						duration: params.duration,
						easing: easingVar,
						queue: false,
						complete: function() {
							//if ($(tg).css("opacity") == 0) {
							//    $(tg).hide();
							//}
							setTimeout(function() {
								$(tg).animate(
									{
										opacity: originOpacity
									},
									{
										duration: params.revDuration,
										easing: easingVar,
										queue: false,
										complete: function() {
											//alert("originOpacity // " + originOpacity);
											if (params.opacity == 1) {
												$(tg).hide();
												if (jQuery.data($(tg).get(0), "touch") == "y") {
													$(tg).css("pointerEvents", "none");
												}
											} else {
												if (jQuery.data($(tg).get(0), "touch") == "y") {
													$(tg).css("pointerEvents", "auto");
												}
											}
											if (
												params.repeatForever != null &&
												params.repeatForever == "Y"
											) {
												params.delay = params.delay - params.startTime;
												params.startTime = 0;
												params.startTime = 0;
												startFade(params);
											} else if (params.repeatCount > 0) {
												params.delay = params.delay - params.startTime;
												params.startTime = 0;
												params.startTime = 0;
												startFade(params);
												params.repeatCount -= 1;
											} else {
												distributeNextAction(params.nextAction);
											}
										}
									}
								);
							}, params.waitingTime);
						}
					}
				);
			}, params.delay);
		} else {
			startFadeTimer = setTimeout(function() {
				$(tg).animate(
					{
						opacity: params.opacity
					},
					{
						duration: params.duration,
						easing: easingVar,
						complete: function() {
							if ($(tg).css("opacity") == 0) {
								$(tg).hide();
							}

							if (params.repeatForever != null && params.repeatForever == "Y") {
								params.delay = params.delay - params.startTime;
								params.startTime = 0;
								$(tg).css("opacity", originOpacity);
								startFade(params);
							} else {
								if (
									params.opacity > 0 &&
									jQuery.data($(tg).get(0), "touch") == "y"
								) {
									$(tg).show();
									$(tg).css("pointerEvents", "auto");
								} else if (
									params.opacity == 0 &&
									jQuery.data($(tg).get(0), "touch") == "y"
								) {
									$(tg).hide();
									$(tg).css("pointerEvents", "none");
								}
								distributeNextAction(params.nextAction);
							}
						}
					}
				);
			}, params.delay);
		}

		jQuery.data(tg, "startFade", startFadeTimer);
	}
}

function playMovie(params) {
	//console.log("playMovie");
	var target = params.target[0];
	var videoSource = params.videoSrc;
	if (params.actSubType == "Stop") {
		//console.log("playMovie11");
		jQuery.data(target, "state", "stop");
		target.pause();
		target.currentTime = 0;
		videobox = null;
	} else if (params.actSubType == "Pause") {
		jQuery.data(target, "state", "pause");
		//console.log("playMovie11");
		target.pause();
	} else {
		videobox = target;

		console.log(jQuery.data(target, "state"));

		if (jQuery.data(target, "state") != "pause") {
			if (
				videoSource != "" &&
				document.getElementById("mp4").getAttribute("src") != videoSource
			) {
				document.getElementById("mp4").setAttribute("src", videoSource);
				target.load();
			}
			if (target.paused != true || jQuery.data(target, "state") == "stop")
				target.load();
		} else {
			console.debug(videoSource);
			console.debug(document.getElementById("mp4").getAttribute("src"));
			if (
				videoSource != "" &&
				document.getElementById("mp4").getAttribute("src") != videoSource
			) {
				document.getElementById("mp4").setAttribute("src", videoSource);
				target.load();
			}
		}
		target.play();
		jQuery.data(target, "state", "play");
	}
}

function soundPause() {
	//console.log("cb.js - soundPause()");
	sound1.pause();
}

function soundResume() {
	//console.log("cb.js - soundResume()");
	sound1.play();
}

function playSound(params) {
	setTimeout(function() {
		var target = document.getElementById(params.target[0]);
		try {
			target.removeEventListener("ended", functionS, null);
			target.removeEventListener("timeupdate", functionS, null);
		} catch (e) {}

		if (params.actSubType == "Pause Sound") {
			target.pause();
			distributeNextAction(params.nextAction);
		} else if (params.actSubType == "Stop Sound") {
			target.pause();
			target.currentTime = 0;
			distributeNextAction(params.nextAction);
		} else if (params.actSubType == "Play Sound") {
			SoundPromisePlay(target);
			target.addEventListener(
				"ended",
				(functionS = function() {
					distributeNextAction(params.nextAction);
				})
			);
		} else {
			var soundPath = params.audioSrc;

			target.src = soundPath;

			if (soundPath.startsWith("#")) {
				var k = replaceAll(soundPath, "#", "");
				target.src = jQuery.data(jQuery.data(TargetTable, k), "VariablePath");
			}

			if (params.ReadyPlayer == "NO") {
				SoundPromisePlay(target);
				//console.log("repeatCount : "+ params.repeatCount + ", soundPath : " + soundPath);
				if (params.useSectionPlay == "YES") {
					target.addEventListener("loadeddata", function() {
						target.currentTime = params.secStartTime / 1000.0;
					});
					target.addEventListener(
						"timeupdate",
						(functionS = function() {
							if (target.currentTime > params.secEndTime / 1000.0) {
								target.pause();
								target.currentTime = params.secStartTime / 1000.0;
								if (
									params.repeatForever != null &&
									params.repeatForever == "Y"
								) {
									SoundPromisePlay(target);
								} else if (params.repeatCount > 0) {
									SoundPromisePlay(target);
									params.delay = params.delay - params.startTime;
									params.startTime = 0;
									params.repeatCount -= 1;
								} else {
									if (params.nextAction != null) {
										distributeNextAction(params.nextAction);
									}
								}
							}
						})
					);
				} else {
					target.addEventListener(
						"ended",
						(functionS = function() {
							// target.removeEventListener("ended", functionS, null);
							if (target.currentTime > params.secEndTime / 1000.0) {
								target.pause();
								target.currentTime = 0;
								if (
									params.repeatForever != null &&
									params.repeatForever == "Y"
								) {
									SoundPromisePlay(target);
								} else if (params.repeatCount > 0) {
									SoundPromisePlay(target);
									params.delay = params.delay - params.startTime;
									params.startTime = 0;
									params.repeatCount -= 1;
								} else {
									if (params.nextAction != null) {
										distributeNextAction(params.nextAction);
									}
								}
							}
						})
					);
				}
			}
		}
	}, params.delay);
}

function SoundPromisePlay(media) {
	const playPromise = media.play();
	//if (playPromise !== null) {
	//    playPromise.catch(() => { media.play(); })
	//}
	if (playPromise !== null) {
		playPromise.catch(function() {
			media.play();
		});
	}
}

function startMove(params) {
	//console.log("startMove");
	if (params.actSubType == "Curve To") {
		makeCurve(params);
		return;
	}
	var startMoveTimer;
	var easingVar = "";

	switch (params.aniTiming) {
		case 0:
			easingVar = "linear";
			break;
		case 1:
			easingVar = "easeInCubic";
			break;
		case 2:
			easingVar = "easeOutCubic";
			break;
		case 3:
			easingVar = "easeInOutCubic";
			break;
	}

	for (var i = 0; i < params.target.length; i++) {
		var tg = params.target[i];
		var groupCheck = IsGroup(tg);

		var absX = $(tg)
			.css("left")
			.replace("px", "");
		absX = Number(absX);
		var absY = $(tg)
			.css("top")
			.replace("px", "");
		absY = Number(absY);
		var relX = tg.clientLeft;
		var relY = tg.clientTop;
		var targetx = params.toX;
		var targety = params.toY;

		if (groupCheck == 2) {
			var groupRect = GroupResizing(tg);
		} else if (groupCheck == 1) {
			var groupTg = tg.parentElement.parentElement;
			var st = window.getComputedStyle(tg, null);
			var tr = st.getPropertyValue("transform-origin").split("px");
			var width = parseFloat(st.getPropertyValue("width").split("px")[0]);
			var height = parseFloat(st.getPropertyValue("height").split("px")[0]);
			var left = parseFloat(st.getPropertyValue("left").split("px")[0]);
			var top = parseFloat(st.getPropertyValue("top").split("px")[0]);

			var gSt = window.getComputedStyle(groupTg, null);
			var gLeft = parseFloat(gSt.getPropertyValue("left").split("px")[0]);
			var gTop = parseFloat(gSt.getPropertyValue("top").split("px")[0]);

			var xy = RotatePoint(
				groupTg,
				null,
				null,
				targetx + width / 2,
				targety + height / 2,
				-1
			);
			xy[0] -= gLeft;
			xy[1] -= gTop;
			targetx = xy[0] - width / 2;
			targety = xy[1] - height / 2;

			var leftTopCenter = RotatePoint(
				tg,
				null,
				null,
				left + width / 2,
				top + height / 2,
				1
			);
			$(tg).css("left", leftTopCenter[0] - width / 2); //nx, width
			$(tg).css("top", leftTopCenter[1] - height / 2); // ny, height
			$(tg).css("transform-origin", "50% " + "50%");
		}

		if (params.actSubType == "Move By") {
			targetx = params.toX + absX;
			targety = params.toY + absY;
		}

		if (params.reverse == "Y") {
			startMoveTimer = setTimeout(function() {
				$(tg).animate(
					{
						left: targetx,
						top: targety
					},
					{
						duration: params.duration,
						easing: easingVar,
						queue: false,
						complete: function() {
							setTimeout(function() {
								$(tg).animate(
									{
										left: absX,
										top: absY
									},
									{
										duration: params.revDuration,
										easing: easingVar,
										queue: false,
										complete: function() {
											if (
												params.repeatForever != null &&
												params.repeatForever == "Y"
											) {
												params.delay = params.delay - params.startTime;
												params.startTime = 0;
												params.startTime = 0;
												startMove(params);
											} else if (params.repeatCount > 0) {
												params.delay = params.delay - params.startTime;
												params.startTime = 0;
												params.startTime = 0;
												startMove(params);
												params.repeatCount -= 1;
											} else {
												if (params.nextAction != null) {
													distributeNextAction(params.nextAction);
												}
											}
										}
									}
								);
							}, params.waitingTime);
						}
					}
				);
			}, params.delay);
		} else {
			startMoveTimer = setTimeout(function() {
				$(tg).animate(
					{
						left: targetx,
						top: targety
					},
					{
						duration: params.duration,
						easing: easingVar,
						queue: false,
						complete: function() {
							//console.log("after" + "/" + tg.offsetLeft + "/" + absY);
							if (params.repeatForever != null && params.repeatForever == "Y") {
								params.delay = params.delay - params.startTime;
								params.startTime = 0;
								startMove(params);
							} else if (params.repeatCount > 0) {
								params.delay = params.delay - params.startTime;
								params.startTime = 0;
								startMove(params);
								params.repeatCount -= 1;
							} else {
								distributeNextAction(params.nextAction);
							}
						}
					}
				);
			}, params.delay);
		}
		jQuery.data(tg, "startMove", startMoveTimer);
	}
}

function makeCurve(params) {
	var startCurveTimer;

	for (var i = 0; i < params.target.length; i++) {
		var tg = params.target[i];
		startCurveTimer = setTimeout(function() {
			var path = params.elements;
			if (jQuery.data($(params.target[0]).get(0), "reverse") == "Y") {
				path = params.reverselements;
			} else {
				path = params.elements;
			}

			var lastCurve;

			function updateFromCode(doNotUpdatePath) {
				if (lastCurve) lastCurve.stop();
				var curve = new CurveAnimator(path);

				var o = tg;
				o.style.position = "absolute";

				curve.animate(params, params.duration / 1000, function(point, angle) {
					o.style.left = point.x - $(o).width() / 2 + "px";
					o.style.top = point.y - $(o).height() / 2 + "px";
				});
				lastCurve = CurveAnimator.lastCreated;
				var p2s = lastCurve.path.pathSegList;
				//m2 = p2s.getItem(0),
				//c2 = p2s.getItem(1);
				if (!doNotUpdatePath) {
					/* try {
                         m1.x = m2.x;
                         m1.y = m2.y;
                     } catch (err) {
          
                     }*/

					try {
						/*c1.x = c2.x;
                        c1.y = c2.y;
                        c1.x1 = c2.x1;
                        c1.y1 = c2.y1;
                        c1.x2 = c2.x2;
                        c1.y2 = c2.y2;*/
					} catch (err) {}

					fireEvent(path, "updated");
				}
			}

			updateFromCode();

			function fireEvent(el, name) {
				var e = document.createEvent("Event");
				e.initEvent(name, true, true);
				try {
					el.dispatchEvent(e);
				} catch (err) {}
			}
		}, params.delay);
		jQuery.data(tg, "startCurve", startCurveTimer);
	}
}

function finish() {
	//console.log("finish");
	onFinish();
}

function willStart(name) {
	//console.log("willStart:" + name);
	onWillStart(name);
}

function didFinish(name) {
	//console.log("didFinish:" + name);
	onDidFinish(name);
}

function contentsClick() {
	//console.log("contentsClick");
	onContentsClick();
}

function gotoPage(params) {
	try {
		if (window.hasOwnProperty("htmlname")) {
			if (htmlname.indexOf("xhtml") != -1) {
				window.parent.PBCallBack(htmlname);
				return;
			}
		}

		if (isNaN(params) == false) {
			if (params > 0 && params <= totalPage) {
				params = {
					actSubType: "Next",
					actType: 12,
					delay: 0,
					duration: 0,
					goto: BK_DB.PageList[params - 1].link,
					startTime: 0
				};
			} else return;
		} else {
			for (var key in BK_DB.PageList) {
				if (params["goto"] == BK_DB.PageList[key].link) {
					BK_DB.PageNow = BK_DB.PageList[key];
					break;
				}
			}
		}

		// 북마크 여부 체크.
		var is_marked = false;
		$("x-bookmarklist[data-bookmark=true] > ul > li").each(function(idx) {
			if (
				$(this)
					.find(" h3 > a > .pagenum")
					.text() == BK_DB.PageNow.pagenum
			) {
				is_marked = true;
			}
		});
		if (is_marked) {
            $(".bookmarker_on[data-bookmark=true]").addClass("collapse");
            $(".bookmarker_off[data-bookmark=true]").removeClass("collapse");
		} else {
            $(".bookmarker_off[data-bookmark=true]").addClass("collapse");
            $(".bookmarker_on[data-bookmark=true]").removeClass("collapse");
		}
	} catch (e) {}

	//console.log("gotoPage : " + params.goto);
	//console.log("gotoPage : SubType " + params.actSubType);
	setTimeout(function() {
		if (params.target != null && params.target.length == 1) {
			$("#contents").attr("src", params.goto);
		} else {
			if (params.goto == "Home") {
				window.location.assign("../pb.html");
			} else if (params.goto == "Finish") {
				finish();
			} else if (params.goto == "startActionLibrary") {
				willStart(params.actSubType);
			} else if (params.goto == "endActionLibrary") {
				didFinish(params.actSubType);
			} else if (params.goto == "contentsClick") {
				contentsClick();
			} else {
				if (IsPbHTML()) {
					document.getElementById("contents").contentWindow.gotoPage(params);
				} else {
					var temp = window.location.toString().split("/");
					temp[temp.length - 1] = params.goto;
					if (params.goto == "Backward") {
						javascript: history.go(-1);
					} else {
						window.location = temp.join("/");
					}
				}
			}
		}
		distributeNextAction(params.nextAction);
	}, params.delay);
}

function IsPbHTML() {
	if (window.hasOwnProperty("IsPBHTML")) return true;
	else return false;
}

function getPageInfo() {
	var json = {
		currentPage: currentPage,
		totalPage: totalPage
	};
	return json;
}

function prevPage() {
	if (IsPbHTML()) {
		document.getElementById("contents").contentWindow.prevPage();
	} else {
		var path = prevPageName;
		if (path != undefined) {
			var temp = window.location.toString().split("/");
			temp[temp.length - 1] = path;
			window.location = temp.join("/");
		}
	}
}

function nextPage() {
	if (IsPbHTML()) {
		document.getElementById("contents").contentWindow.nextPage();
	} else {
		var path = nextPageName;
		if (path != undefined) {
			var temp = window.location.toString().split("/");
			temp[temp.length - 1] = path;
			window.location = temp.join("/");
		}
	}
}

function startScaleMove(params) {
	console.log("startScaleMove");
	var startScaleMoveTimer;
	for (var i = 0; i < params.target.length; i++) {
		var tg = params.target[i];
		var absX = $(tg)
			.css("left")
			.replace("px", "");
		absX = Number(absX);
		var absY = $(tg)
			.css("top")
			.replace("px", "");
		absY = Number(absY);
		var originWidth = $(params.target).width();
		var originHeight = $(params.target).height();
		var easingVar = "";
		var groupCheck = IsGroup(tg);

		switch (params.aniTiming) {
			case 0:
				easingVar = "linear";
				break;
			case 1:
				easingVar = "easeInCubic";
				break;
			case 2:
				easingVar = "easeOutCubic";
				break;
			case 3:
				easingVar = "easeInOutCubic";
				break;
		}

		var targetx = params.toX,
			targety = params.toY;

		if (groupCheck == 2) {
			var groupRect = GroupResizing(tg);
		} else if (groupCheck == 1) {
			var groupTg = tg.parentElement.parentElement;
			var groupRect = GroupResizing(groupTg);
			var st = window.getComputedStyle(tg, null);
			var tr = st.getPropertyValue("transform-origin").split("px");
			var width = parseFloat(st.getPropertyValue("width").split("px")[0]);
			var height = parseFloat(st.getPropertyValue("height").split("px")[0]);
			var left = parseFloat(st.getPropertyValue("left").split("px")[0]);
			var top = parseFloat(st.getPropertyValue("top").split("px")[0]);

			var gSt = window.getComputedStyle(groupTg, null);
			var gLeft = parseFloat(gSt.getPropertyValue("left").split("px")[0]);
			var gTop = parseFloat(gSt.getPropertyValue("top").split("px")[0]);
			var gWidth = parseFloat(gSt.getPropertyValue("width").split("px")[0]);
			var gHeight = parseFloat(gSt.getPropertyValue("height").split("px")[0]);
			var gNowAngle = GetAngle(groupTg);

			// test용
			var gTr = st.getPropertyValue("transform-origin").split("px");
			// test용

			var xy = RotatePoint(
				groupTg,
				null,
				null,
				targetx + width / 2,
				targety + height / 2,
				-1
			);
			xy[0] -= gLeft;
			xy[1] -= gTop;

			targetx = xy[0] - width / 2;
			targety = xy[1] - height / 2;

			var scaleWidth = parseFloat(params.scaleWidth.split("px")[0]);
			var scaleHeight = parseFloat(params.scaleHeight.split("px")[0]);

			if (gNowAngle != 0) {
				// 그룹이 회전한 각도에 따라 scale 방향이 바뀐다.
				var scaleRotateXY = RotatePointByPoint(
					targetx + (scaleWidth * parseFloat(tr[0])) / width,
					targety + (scaleHeight * parseFloat(tr[1])) / height,
					xy[0],
					xy[1],
					gNowAngle,
					-1
				);
				targetx = scaleRotateXY[0] - (scaleWidth * parseFloat(tr[0])) / width;
				targety = scaleRotateXY[1] - (scaleHeight * parseFloat(tr[1])) / height;
			}

			var leftTopCenter = RotatePoint(
				tg,
				null,
				null,
				left + width / 2,
				top + height / 2,
				1
			);
			$(tg).css("left", leftTopCenter[0] - width / 2); //nx, width
			$(tg).css("top", leftTopCenter[1] - height / 2); // ny, height
			$(tg).css("transform-origin", "50% " + "50%");
		}

		if (params.reverse == "Y") {
			startScaleMoveTimer = setTimeout(function() {
				$(tg).animate(
					{
						width: params.scaleWidth,
						height: params.scaleHeight,
						left: targetx,
						top: targety
					},
					{
						queue: false,
						duration: params.duration,
						easing: easingVar,
						step: function() {
							var child = document.getElementById($(tg).attr("id") + "_child1");
							if (groupCheck == 2) {
								child = document.getElementById(
									$(tg).attr("id") + "_container"
								);
							}
							if (child != undefined) {
								// overflow를 visible로 넣어줘야한다.
								$(child).css("overflow", "visible");
								$(tg).css("overflow", "visible");
								var scaleWidth = 1;
								var scaleHeight = 1;
								if (groupCheck != 2) {
									scaleWidth = $(tg).width() / $(child)[0].getBBox().width;
									scaleHeight = $(tg).height() / $(child)[0].getBBox().height;
								} else {
									var gSt = window.getComputedStyle(tg, null);
									//var g1St = window.getComputedStyle(child, null);
									var width = $(tg).width();
									var height = $(tg).height();
									var gWidth = $(child).width();
									var gHeight = $(child).height();
									var gcSt = window.getComputedStyle(child, null);
									var gcLeft = parseFloat(
										gcSt.getPropertyValue("left").split("px")[0]
									);

									var groupTrans = gSt.getPropertyValue("transform");
									var groupCTrans = gcSt.getPropertyValue("transform");
									var transInfo = gcSt.getPropertyValue("transform");
									if (groupCTrans != "none")
										transInfo = gcSt
											.getPropertyValue("transform")
											.split("(")[1]
											.split(",");
									else transInfo = ["1", "0", "0", "1"];
									var gTransformX = parseFloat(groupTrans[0]);
									var gTransformY = parseFloat(groupTrans[3]);

									scaleWidth = width / gWidth;
									scaleHeight = height / gHeight;
									for (i = 0; i < tg.children[0].children.length; i++) {
										var groupChild = tg.children[0].children[i];
										var child1 = document.getElementById(
											$(groupChild).attr("id") + "_child1"
										);
										var cSt = window.getComputedStyle(groupChild, null);
										var c1St = window.getComputedStyle(child1, null);

										// 스텝 중의 이전 transform
										var childTrans = c1St.getPropertyValue("transform");
										if (childTrans != "none")
											childTrans = c1St
												.getPropertyValue("transform")
												.split("(")[1]
												.split(",");
										else childTrans = ["1", "0", "0", "1"];
										var transformX = parseFloat(childTrans[0]);
										var transformY = parseFloat(childTrans[3]);

										// 이전 액션의 transform
										var childAttr = groupChild.attributes["transform"];
										if (childAttr != null && childAttr != "none") {
											childAttr = childAttr.value
												.split("(")[1]
												.split(")")[0]
												.split(" ");
										} else {
											childAttr = ["1", " ", "1"];
										}
										var childScaleWidth = parseFloat(childAttr[0]);
										var childScaleHeight = parseFloat(
											childAttr[childAttr.length - 1]
										);

										var child1LeftRate =
											(parseFloat(cSt.getPropertyValue("left").split("px")[0]) /
												transformX) *
											childScaleWidth *
											scaleWidth;
										var child1TopRate =
											(parseFloat(cSt.getPropertyValue("top").split("px")[0]) /
												transformY) *
											childScaleHeight *
											scaleHeight;

										var childWidth = $(groupChild).width();
										var childHeight = $(groupChild).height();

										// ellipse와 같은 경우에 child1 width가 아니므로 직접 계산해야한다.

										$(groupChild).css("left", child1LeftRate);
										$(groupChild).css("top", child1TopRate);
										$(groupChild).css(
											"width",
											(childWidth / transformX) * childScaleWidth * scaleWidth +
												"px"
										);
										$(groupChild).css(
											"height",
											(childHeight / transformY) *
												childScaleHeight *
												scaleHeight +
												"px"
										);

										$(child1).attr(
											"transform",
											"scale(" +
												childScaleWidth * scaleWidth +
												" " +
												childScaleHeight * scaleHeight +
												")"
										);
									}
								}
								$(child).attr(
									"transform",
									"scale(" + scaleWidth + " " + scaleHeight + ")"
								);
							}
						},
						complete: function() {
							setTimeout(function() {
								$(tg).animate(
									{
										width: originWidth,
										height: originHeight,
										left: absX,
										top: absY
									},
									{
										duration: params.revDuration,
										easing: easingVar,
										queue: false,
										step: function() {
											var child = document.getElementById(
												$(tg).attr("id") + "_child1"
											);
											if (groupCheck == 2) {
												child = document.getElementById(
													$(tg).attr("id") + "_container"
												);
											}

											if (child != undefined) {
												// overflow를 visible로 넣어줘야한다.
												$(child).css("overflow", "visible");
												$(tg).css("overflow", "visible");
												var scaleWidth = 1;
												var scaleHeight = 1;
												if (groupCheck != 2) {
													scaleWidth =
														$(tg).width() / $(child)[0].getBBox().width;
													scaleHeight =
														$(tg).height() / $(child)[0].getBBox().height;
												} else {
													var gSt = window.getComputedStyle(tg, null);
													//var g1St = window.getComputedStyle(child, null);
													var width = $(tg).width();
													var height = $(tg).height();
													var gWidth = $(child).width();
													var gHeight = $(child).height();
													var gcSt = window.getComputedStyle(child, null);
													var gcLeft = parseFloat(
														gcSt.getPropertyValue("left").split("px")[0]
													);

													var groupTrans = gSt.getPropertyValue("transform");
													var groupCTrans = gcSt.getPropertyValue("transform");
													var transInfo = gcSt.getPropertyValue("transform");
													if (groupCTrans != "none")
														transInfo = gcSt
															.getPropertyValue("transform")
															.split("(")[1]
															.split(",");
													else transInfo = ["1", "0", "0", "1"];
													var gTransformX = parseFloat(groupTrans[0]);
													var gTransformY = parseFloat(groupTrans[3]);

													scaleWidth = width / gWidth;
													scaleHeight = height / gHeight;
													for (i = 0; i < tg.children[0].children.length; i++) {
														var groupChild = tg.children[0].children[i];
														var child1 = document.getElementById(
															$(groupChild).attr("id") + "_child1"
														);
														var cSt = window.getComputedStyle(groupChild, null);
														var c1St = window.getComputedStyle(child1, null);

														// 스텝 중의 이전 transform
														var childTrans = c1St.getPropertyValue("transform");
														if (childTrans != "none")
															childTrans = c1St
																.getPropertyValue("transform")
																.split("(")[1]
																.split(",");
														else childTrans = ["1", "0", "0", "1"];
														var transformX = parseFloat(childTrans[0]);
														var transformY = parseFloat(childTrans[3]);

														// 이전 액션의 transform
														var childAttr = groupChild.attributes["transform"];
														if (childAttr != null && childAttr != "none") {
															childAttr = childAttr.value
																.split("(")[1]
																.split(")")[0]
																.split(" ");
														} else {
															childAttr = ["1", " ", "1"];
														}
														var childScaleWidth = parseFloat(childAttr[0]);
														var childScaleHeight = parseFloat(
															childAttr[childAttr.length - 1]
														);

														var child1LeftRate =
															(parseFloat(
																cSt.getPropertyValue("left").split("px")[0]
															) /
																transformX) *
															childScaleWidth *
															scaleWidth;
														var child1TopRate =
															(parseFloat(
																cSt.getPropertyValue("top").split("px")[0]
															) /
																transformY) *
															childScaleHeight *
															scaleHeight;

														var childWidth = $(groupChild).width();
														var childHeight = $(groupChild).height();

														// ellipse와 같은 경우에 child1 width가 아니므로 직접 계산해야한다.

														$(groupChild).css("left", child1LeftRate);
														$(groupChild).css("top", child1TopRate);
														$(groupChild).css(
															"width",
															(childWidth / transformX) *
																childScaleWidth *
																scaleWidth +
																"px"
														);
														$(groupChild).css(
															"height",
															(childHeight / transformY) *
																childScaleHeight *
																scaleHeight +
																"px"
														);

														$(child1).attr(
															"transform",
															"scale(" +
																childScaleWidth * scaleWidth +
																" " +
																childScaleHeight * scaleHeight +
																")"
														);
													}
												}
												$(child).attr(
													"transform",
													"scale(" + scaleWidth + " " + scaleHeight + ")"
												);
											}
										},
										complete: function() {
											if (
												params.repeatForever != null &&
												params.repeatForever == "Y"
											) {
												params.delay = params.delay - params.startTime;
												params.startTime = 0;
												startScaleMove(params);
											} else if (params.repeatCount > 0) {
												params.delay = params.delay - params.startTime;
												params.startTime = 0;
												startScaleMove(params);
												params.repeatCount -= 1;
											} else {
												var child = document.getElementById(
													$(tg).attr("id") + "_child1"
												);
												if (groupCheck == 2) {
													child = document.getElementById(
														$(tg).attr("id") + "_container"
													);
												}

												if (child != undefined) {
													var c1St = window.getComputedStyle(child, null);
													var child1Trans = ["1", "0", "0", "1"];

													if (groupCheck != 2)
														child1Trans = c1St
															.getPropertyValue("transform")
															.split("(")[1]
															.split(",");
													else {
														for (
															i = 0;
															i < tg.children[0].children.length;
															i++
														) {
															var groupChild = tg.children[0].children[i];
															var child1 = document.getElementById(
																$(groupChild).attr("id") + "_child1"
															);
															var cSt = window.getComputedStyle(
																groupChild,
																null
															);
															var c1St = window.getComputedStyle(child1, null);

															var childTrans = c1St.getPropertyValue(
																"transform"
															);
															if (childTrans != "none")
																childTrans = c1St
																	.getPropertyValue("transform")
																	.split("(")[1]
																	.split(",");
															else childTrans = ["1", "0", "0", "1"];
															var transformX = parseFloat(childTrans[0]);
															var transformY = parseFloat(childTrans[3]);

															$(groupChild).attr(
																"transform",
																"scale(" + transformX + " " + transformY + ")"
															);
														}
													}

													var scaleWidth = child1Trans[0];
													var scaleHeight = child1Trans[3];
													$(tg).attr(
														"transform",
														"(" + scaleWidth + " " + scaleHeight + ")"
													);
												}
												distributeNextAction(params.nextAction);
											}
										}
									}
								);
							}, params.waitingTime);
						}
					}
				);
			}, params.delay);
		} else {
			startScaleMoveTimer = setTimeout(function() {
				// scaleInterval(tg, params.context, params.image, params.scaleWidth, params.scaleHeight);
				$(tg).animate(
					{
						width: params.scaleWidth,
						height: params.scaleHeight,
						left: targetx,
						top: targety
					},
					{
						duration: params.duration,
						easing: easingVar,
						queue: false,
						step: function() {
							var child = document.getElementById($(tg).attr("id") + "_child1");
							if (groupCheck == 2) {
								child = document.getElementById(
									$(tg).attr("id") + "_container"
								);
							}
							if (child != undefined) {
								// overflow를 visible로 넣어줘야한다.
								$(child).css("overflow", "visible");
								$(tg).css("overflow", "visible");
								var scaleWidth = 1;
								var scaleHeight = 1;
								if (groupCheck != 2) {
									scaleWidth = $(tg).width() / $(child)[0].getBBox().width;
									scaleHeight = $(tg).height() / $(child)[0].getBBox().height;
								} else {
									var gSt = window.getComputedStyle(tg, null);
									//var g1St = window.getComputedStyle(child, null);
									var width = $(tg).width();
									var height = $(tg).height();
									var gWidth = $(child).width();
									var gHeight = $(child).height();
									var gcSt = window.getComputedStyle(child, null);
									var gcLeft = parseFloat(
										gcSt.getPropertyValue("left").split("px")[0]
									);

									var groupTrans = gSt.getPropertyValue("transform");
									var groupCTrans = gcSt.getPropertyValue("transform");
									var transInfo = gcSt.getPropertyValue("transform");
									if (groupCTrans != "none")
										transInfo = gcSt
											.getPropertyValue("transform")
											.split("(")[1]
											.split(",");
									else transInfo = ["1", "0", "0", "1"];
									var gTransformX = parseFloat(groupTrans[0]);
									var gTransformY = parseFloat(groupTrans[3]);

									scaleWidth = width / gWidth;
									scaleHeight = height / gHeight;
									for (i = 0; i < tg.children[0].children.length; i++) {
										var groupChild = tg.children[0].children[i];
										var child1 = document.getElementById(
											$(groupChild).attr("id") + "_child1"
										);
										var cSt = window.getComputedStyle(groupChild, null);
										var c1St = window.getComputedStyle(child1, null);

										// 스텝 중의 이전 transform
										var childTrans = c1St.getPropertyValue("transform");
										if (childTrans != "none")
											childTrans = c1St
												.getPropertyValue("transform")
												.split("(")[1]
												.split(",");
										else childTrans = ["1", "0", "0", "1"];
										var transformX = parseFloat(childTrans[0]);
										var transformY = parseFloat(childTrans[3]);

										// 이전 액션의 transform
										var childAttr = groupChild.attributes["transform"];
										if (childAttr != null && childAttr != "none") {
											childAttr = childAttr.value
												.split("(")[1]
												.split(")")[0]
												.split(" ");
										} else {
											childAttr = ["1", " ", "1"];
										}
										var childScaleWidth = parseFloat(childAttr[0]);
										var childScaleHeight = parseFloat(
											childAttr[childAttr.length - 1]
										);

										var child1LeftRate =
											(parseFloat(cSt.getPropertyValue("left").split("px")[0]) /
												transformX) *
											childScaleWidth *
											scaleWidth;
										var child1TopRate =
											(parseFloat(cSt.getPropertyValue("top").split("px")[0]) /
												transformY) *
											childScaleHeight *
											scaleHeight;

										var childWidth = $(groupChild).width();
										var childHeight = $(groupChild).height();

										// ellipse와 같은 경우에 child1 width가 아니므로 직접 계산해야한다.

										$(groupChild).css("left", child1LeftRate);
										$(groupChild).css("top", child1TopRate);
										$(groupChild).css(
											"width",
											(childWidth / transformX) * childScaleWidth * scaleWidth +
												"px"
										);
										$(groupChild).css(
											"height",
											(childHeight / transformY) *
												childScaleHeight *
												scaleHeight +
												"px"
										);

										$(child1).attr(
											"transform",
											"scale(" +
												childScaleWidth * scaleWidth +
												" " +
												childScaleHeight * scaleHeight +
												")"
										);
									}
								}
								$(child).attr(
									"transform",
									"scale(" + scaleWidth + " " + scaleHeight + ")"
								);
							}
						},
						complete: function() {
							if (params.repeatForever != null && params.repeatForever == "Y") {
								params.delay = params.delay - params.startTime;
								params.startTime = 0;
								startScaleMove(params);
							} else {
								var child = document.getElementById(
									$(tg).attr("id") + "_child1"
								);
								if (groupCheck == 2) {
									child = document.getElementById(
										$(tg).attr("id") + "_container"
									);
								}

								if (child != undefined) {
									var c1St = window.getComputedStyle(child, null);
									var child1Trans = ["1", "0", "0", "1"];

									if (groupCheck != 2)
										child1Trans = c1St
											.getPropertyValue("transform")
											.split("(")[1]
											.split(",");
									else {
										for (i = 0; i < tg.children[0].children.length; i++) {
											var groupChild = tg.children[0].children[i];
											var child1 = document.getElementById(
												$(groupChild).attr("id") + "_child1"
											);
											var cSt = window.getComputedStyle(groupChild, null);
											var c1St = window.getComputedStyle(child1, null);

											var childTrans = c1St.getPropertyValue("transform");
											if (childTrans != "none")
												childTrans = c1St
													.getPropertyValue("transform")
													.split("(")[1]
													.split(",");
											else childTrans = ["1", "0", "0", "1"];
											var transformX = parseFloat(childTrans[0]);
											var transformY = parseFloat(childTrans[3]);

											$(groupChild).attr(
												"transform",
												"scale(" + transformX + " " + transformY + ")"
											);
										}
									}

									var scaleWidth = child1Trans[0];
									var scaleHeight = child1Trans[3];
									$(tg).attr(
										"transform",
										"(" + scaleWidth + " " + scaleHeight + ")"
									);
								}

								distributeNextAction(params.nextAction);
							}
						}
					}
				);
			}, params.delay);
		}
		jQuery.data(tg, "startScaleMove", startScaleMoveTimer);
	}
}

function startRotate(params) {
	//console.log("startRotate");
	var startRotateTimer;
	var easingVar = "";
	switch (params.aniTiming) {
		case 0:
			easingVar = "linear";
			break;
		case 1:
			easingVar = "easeInCubic";
			break;
		case 2:
			easingVar = "easeOutCubic";
			break;
		case 3:
			easingVar = "easeInOutCubic";
			break;
	}

	for (var i = 0; i < params.target.length; i++) {
		var tg = params.target[i];
		var groupCheck = IsGroup(tg);
		var anchorPoint = "'" + params.anchorX + "% " + params.anchorY + "%'";

		if (groupCheck == 2) {
			var groupRect = GroupResizing(tg);
		}

		var st = window.getComputedStyle(tg, null);
		var tr =
			st.getPropertyValue("-webkit-transform") ||
			st.getPropertyValue("-moz-transform") ||
			st.getPropertyValue("-ms-transform") ||
			st.getPropertyValue("-o-transform") ||
			st.getPropertyValue("transform");

		if (tr != null && tr != "none") {
			var values =
				tr == null
					? null
					: tr
							.split("(")[1]
							.split(")")[0]
							.split(",");

			var a = values[0];
			var b = values[1];
			var c = values[2];
			var d = values[3];

			var scale = Math.sqrt(a * a + b * b);
			sin = b / scale;
			nowAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI) * 10) / 10;
			if (nowAngle < 0) nowAngle = (nowAngle + 360) % 360;
		}

		var tr = st.getPropertyValue("transform-origin");

		var xy = RotatePoint(tg, params.anchorX, params.anchorY, null, null, 1);
		//if (!(params.anchorX == 50 && params.anchorY == 50)) {
		$(tg).css("left", xy[0] - xy[2] * (params.anchorX / 100)); //nx, width
		$(tg).css("top", xy[1] - xy[3] * (params.anchorY / 100)); // ny, height
		//}

		$(tg).css("transform-origin", params.anchorX + "% " + params.anchorY + "%");

		if (params.reverse == "Y") {
			startRotateTimer = setTimeout(function() {
				var revAngle = GetAngle(tg);
				var aniAngle = params.angle;

				if (params.actSubType == "Rotate By") {
					aniAngle = aniAngle + nowAngle;
					revAngle = nowAngle;
				}

				if (groupCheck == 1)
					aniAngle -= GetAngle(tg.parentElement.parentElement);
				var graphicSpacing;
				if (!tg.nodeName == "X-TEXTBOX") graphicSpacing = "borderSpacing";

				$(tg).animate(
					{
						graphicSpacing: aniAngle
						//rotate: aniAngle
					},
					{
						duration: params.duration,
						easing: easingVar,
						step: function(now, fx) {
							$(this).css(
								"-webkit-transform",
								"rotate(" + (parseInt(nowAngle) + parseInt(now)) + "deg)"
							);
							$(this).css(
								"-moz-transform",
								"rotate(" + (parseInt(nowAngle) + parseInt(now)) + "deg)"
							);
							$(this).css(
								"transform",
								"rotate(" + (parseInt(nowAngle) + parseInt(now)) + "deg)"
							);
						},
						complete: function() {
							setTimeout(function() {
								$(tg).animate(
									{
										graphicSpacing: revAngle
									},
									{
										duration: params.revDuration,
										easing: easingVar,
										step: function(now, fx) {
											$(this).css(
												"-webkit-transform",
												"rotate(" +
													(parseInt(nowAngle) + parseInt(now)) +
													"deg)"
											);
											$(this).css(
												"-moz-transform",
												"rotate(" +
													(parseInt(nowAngle) + parseInt(now)) +
													"deg)"
											);
											$(this).css(
												"transform",
												"rotate(" +
													(parseInt(nowAngle) + parseInt(now)) +
													"deg)"
											);
										},
										complete: function() {
											if (
												params.repeatForever != null &&
												params.repeatForever == "Y"
											) {
												$(tg).css("borderSpacing", 0);
												params.delay = params.delay - params.startTime;
												params.startTime = 0;
												startRotate(params);
											} else if (params.repeatCount > 0) {
												$(tg).css("borderSpacing", 0);
												params.delay = params.delay - params.startTime;
												params.startTime = 0;
												startRotate(params);
												params.repeatCount -= 1;
											} else {
												$(tg).css("borderSpacing", 0);
												if (params.nextAction != null) {
													distributeNextAction(params.nextAction);
												}
											}
										}
									}
								);
							}, params.waitingTime);
						}
					}
				);
			}, params.delay);
		} else {
			var initialRotate = $(tg).css("rotate");
			if (typeof initialRotate == "string" || initialRotate instanceof String)
				initialRotate = initialRotate.replace("deg", "");
			startRotateTimer = null;
			startRotateTimer = setTimeout(function() {
				//initialRotate = nowAngle;
				var aniAngle = params.angle;

				if (params.actSubType != "Rotate By") {
					//aniAngle = aniAngle - nowAngle;
					if (aniAngle == nowAngle) return;
				} else {
					aniAngle += parseFloat(initialRotate);
				}
				nowAngle = 0;

				if (groupCheck == 1)
					aniAngle -= GetAngle(tg.parentElement.parentElement);
				var graphicSpacing;
				if (!(tg.nodeName == "X-TEXTBOX")) graphicSpacing = "borderSpacing";

				$(tg).animate(
					{
						graphicSpacing: aniAngle
					},
					{
						duration: params.duration,
						easing: easingVar,
						step: function(now, fx) {
							$(this).css(
								"-webkit-transform",
								"rotate(" + (parseFloat(nowAngle) + parseFloat(now)) + "deg)"
							);
							$(this).css(
								"-moz-transform",
								"rotate(" + (parseFloat(nowAngle) + parseFloat(now)) + "deg)"
							);
							$(this).css(
								"transform",
								"rotate(" + (parseFloat(nowAngle) + parseFloat(now)) + "deg)"
							);
						},
						complete: function() {
							if (params.repeatForever != null && params.repeatForever == "Y") {
								$(tg).css("borderSpacing", 0);
								$(tg).css("transform", "rotate(" + initialRotate + ")");
								startRotate(params);
							} else if (params.repeatCount > 0) {
								$(tg).css("borderSpacing", 0);
								$(tg).css("transform", "rotate(" + initialRotate + ")");
								params.delay = params.delay - params.startTime;
								params.startTime = 0;
								startRotate(params);
								params.repeatCount -= 1;
							} else {
								$(tg).css("borderSpacing", 0);
								distributeNextAction(params.nextAction);
							}
						}
					}
				);
			}, params.delay);
		}
		jQuery.data(tg, "startRotate", startRotateTimer);
	}
}

function startFlip(params) {
	// 20160628 - hyukin
	// 사파리 flipX, flipY 버그 수정
	var startFlipTimer;
	for (var i = 0; i < params.target.length; i++) {
		var tg = params.target[i];
		startFlipTimer = setTimeout(function() {
			if (params.actSubType == "Flip X") {
				$(tg).css(
					"-webkit-transform",
					"translateZ(" + $(tg).height() / 2 + ")"
				);
				flipY(params, tg);
			} else {
				$(tg).css("-webkit-transform", "translateZ(" + $(tg).width() / 2 + ")");
				flipX(params, tg);
			}
		}, params.delay);
		jQuery.data(tg, "startFlip", startFlipTimer);
	}
}

function flipX(params, tg) {
	var oriAngle = $(tg)[0].style.transform;
	var xAngle = parseFloat(
		oriAngle.indexOf("rotateX") > -1
			? oriAngle
					.split("rotateX(")[1]
					.split(")")[0]
					.split("d")[0]
			: "0"
	);
	var yAngle = parseFloat(
		oriAngle.indexOf("rotateY") > -1
			? oriAngle
					.split("rotateY(")[1]
					.split(")")[0]
					.split("d")[0]
			: "0"
	);

	if (xAngle != undefined) $(tg).css("rotateX", xAngle);
	if (yAngle != undefined) $(tg).css("rotateY", yAngle);

	var easingVar = "";

	switch (params.aniTiming) {
		case 0:
			easingVar = "linear";
			break;
		case 1:
			easingVar = "easeInCubic";
			break;
		case 2:
			easingVar = "easeOutCubic";
			break;
		case 3:
			easingVar = "easeInOutCubic";
			break;
	}

	var aniAngle = -180;

	if (xAngle != 0) {
		aniAngle = 0;
	} else {
		aniAngle = -180;
	}

	if (params.reverse == "Y") {
		$(tg).animate(
			{
				rotateX: aniAngle,
				rotateY: yAngle
			},
			{
				duration: params.duration,
				easing: easingVar,
				complete: function() {
					setTimeout(function() {
						$(tg).animate(
							{
								rotateX: xAngle,
								rotateY: yAngle
							},
							{
								duration: params.revDuration,
								easing: easingVar,
								complete: function() {
									if (
										params.repeatForever != null &&
										params.repeatForever == "Y"
									) {
										params.delay = params.delay - params.startTime;
										params.startTime = 0;
										startFlip(params);
									} else if (params.repeatCount > 0) {
										params.delay = params.delay - params.startTime;
										params.startTime = 0;
										startFlip(params);
										params.repeatCount -= 1;
									} else {
										if (params.nextAction != null) {
											distributeNextAction(params.nextAction);
										}
									}
								}
							}
						);
					}, params.waitingTime);
				}
			}
		);
	} else {
		$(tg).animate(
			{
				rotateX: aniAngle,
				rotateY: yAngle
			},
			{
				duration: params.duration,
				easing: easingVar,
				complete: function() {
					if (params.repeatForever != null && params.repeatForever == "Y") {
						startFlip(params);
					} else if (params.repeatCount > 0) {
						params.delay = params.delay - params.startTime;
						params.startTime = 0;
						startFlip(params);
						params.repeatCount -= 1;
					} else {
						distributeNextAction(params.nextAction);
					}
				}
			}
		);
	}
}

function flipY(params, tg) {
	var oriAngle = $(tg)[0].style.transform;
	var xAngle = parseFloat(
		oriAngle.indexOf("rotateX") > -1
			? oriAngle
					.split("rotateX(")[1]
					.split(")")[0]
					.split("d")[0]
			: "0"
	);
	var yAngle = parseFloat(
		oriAngle.indexOf("rotateY") > -1
			? oriAngle
					.split("rotateY(")[1]
					.split(")")[0]
					.split("d")[0]
			: "0"
	);

	if (xAngle != undefined) $(tg).css("rotateX", xAngle);
	if (yAngle != undefined) $(tg).css("rotateY", yAngle);

	if (yAngle != 0) {
		aniAngle = 0;
	} else {
		aniAngle = -180;
	}

	var easingVar = "";

	switch (params.aniTiming) {
		case 0:
			easingVar = "linear";
			break;
		case 1:
			easingVar = "easeInCubic";
			break;
		case 2:
			easingVar = "easeOutCubic";
			break;
		case 3:
			easingVar = "easeInOutCubic";
			break;
	}

	if (params.reverse == "Y") {
		$(tg).animate(
			{
				rotateY: aniAngle,
				rotateX: xAngle
			},
			{
				duration: params.duration,
				easing: easingVar,
				complete: function() {
					setTimeout(function() {
						$(tg).animate(
							{
								rotateX: xAngle,
								rotateY: yAngle
							},
							{
								duration: params.revDuration,
								easing: easingVar,
								complete: function() {
									if (
										params.repeatForever != null &&
										params.repeatForever == "Y"
									) {
										params.delay = params.delay - params.startTime;
										params.startTime = 0;
										startFlip(params);
									} else if (params.repeatCount > 0) {
										params.delay = params.delay - params.startTime;
										params.startTime = 0;
										startFlip(params);
										params.repeatCount -= 1;
									} else {
										if (params.nextAction != null) {
											distributeNextAction(params.nextAction);
										}
									}
								}
							}
						);
					}, params.waitingTime);
				}
			}
		);
	} else {
		$(tg).animate(
			{
				rotateY: aniAngle,
				rotateX: xAngle
			},
			{
				duration: params.duration,
				easing: easingVar,
				complete: function() {
					if (params.repeatForever != null && params.repeatForever == "Y") {
						startFlip(params);
					} else if (params.repeatCount > 0) {
						params.delay = params.delay - params.startTime;
						params.startTime = 0;
						startFlip(params);
						params.repeatCount -= 1;
					} else {
						distributeNextAction(params.nextAction);
					}
				}
			}
		);
	}
}

function startAnimation(params) {
	//console.log("startAnimation");
	var cvs = new Object();
	cvs.aniImages = params.aniImages;
	params.obj = cvs;
	for (var i = 0; i < params.target.length; i++) {
		//console.log(params.obj.aniImages.length);
		var interval = params.duration / params.obj.aniImages.length;
		var tg = params.target[i];
		var aniImages = params.obj.aniImages;
		var revImages = tg.src;
		var length = params.obj.aniImages.length;

		var aniIndex = 0;
		if (
			jQuery.data($(tg).get(0), "stopAction") == null ||
			jQuery.data($(tg).get(0), "stopAction") == "N"
		) {
			if (params.autoReverse == "Y") {
				setTimeout(function() {
					for (var i = 1; i < length + 1; i++) {
						var res = aniImages[length - i];
						revImages.push(res);
					}

					aniImages = aniImages.concat(revImages);
					var aniTimer = setInterval(function() {
						changeImage();
					}, interval);
					jQuery.data($(tg).get(0), "animation_Timer", aniTimer);

					function changeImage() {
						$(tg).attr("src", aniImages[aniIndex]);
						aniIndex = aniIndex + 1;
						if (aniIndex == aniImages.length) {
							//console.log("aniIndex equal");
							aniImages = null;
							window.clearInterval(aniTimer);
							if (params.repeatForever != null && params.repeatForever == "Y") {
								startAnimation(params);
							} else if (params.repeatCount > 0) {
								startAnimation(params);
								params.repeatCount -= 1;
							} else {
								distributeNextAction(params.nextAction);
							}
							return;
						}
					}
				}, params.delay);
			} else {
				setTimeout(function() {
					for (var i = 0; i < params.target.length; i++) {
						var tg = params.target[i];
						var interval = params.duration / aniImages.length;
						var aniTimer = setInterval(function() {
							changeImage();
						}, interval);
						jQuery.data($(tg).get(0), "animation_Timer", aniTimer);

						function changeImage() {
							$(tg).attr("src", aniImages[aniIndex]);
							aniIndex = aniIndex + 1;

							if (aniIndex == aniImages.length) {
								//console.log("aniIndex equal");
								window.clearInterval(aniTimer);
								if (
									params.repeatForever != null &&
									params.repeatForever == "Y"
								) {
									startAnimation(params);
								} else if (params.repeatCount > 0) {
									startAnimation(params);
									params.repeatCount -= 1;
								} else {
									if (params.restoreOrigin == "Y") $(tg).attr("src", revImages);
									distributeNextAction(params.nextAction);
								}
								return;
							}
						}
					}
				}, params.delay);
			}
		}
	}
}

function startToggle(params) {
    for (var i = 0; i < params.target.length; i++) {
        var tg = params.target[i];

        var subType = params.actSubType;
        var imageRes = null;


        if (params.actSubType == "Show") {
            if (params.obj.hidden == true) {
                $(params.obj).removeClass("collapse");
            } else {
                $(params.obj).addClass("collapse");
            }
            return;
        } else if (params.actSubType == "Toggle") {

            params.obj.changeToggleState();
            var curState = params.obj.state;
            if (curState) {
                imageRes = params.obj.altImage;
            } else {
                imageRes = params.obj.originImage;
            }

        } else {

            var curState = params.obj.state;

            var nextState = params.actSubType == "Off" ? false : true;

            if (curState == nextState) {
                distributeNextAction(params.nextAction);
                return;
            }

            if (nextState) {
                params.obj.state = true;
                imageRes = params.obj.altImage;
            } else {
                params.obj.state = false;
                imageRes = params.obj.originImage;
            }


        }
        if (imageRes != "") {
            if ($(tg).attr('xlink:href') != undefined) $(tg).attr("xlink:href", imageRes);
            else if ($(tg).attr('src') != undefined) $(tg).attr("src", imageRes);
            $(tg).show();

        } else {
            $(tg).hide();
        }

        distributeNextAction(params.nextAction);

    }
}

function changeToggleState(obj) {
	if (obj.state == true) {
		obj.state = false;
	} else {
		obj.state = true;
	}
}

function playEffectSound(effectSound, delay) {
	if (effectSound != null) {
		var effect = new Audio();

		effect.src = effectSound;
		setTimeout(function() {
			effect.play();
		}, delay);
	}
}

//////////占쎈툕�쀯옙��쨨�븐눊猿�좑옙 占쎌쥙��옙占쎌삕�좑옙 �좎럡�∽옙�뀀쐻�좑옙///////////////

function startConditionalAction(params) {
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];
			var conditionalName = params.actType;
			var actionConditinalNode = jQuery.data(ConditionalTable, conditionalName);
			var cloneActionConditinalNode = new Object();
			//console.log("tag:conditional/" + "conditionalName => " + conditionalName);
			$.extend(true, cloneActionConditinalNode, actionConditinalNode);
			var targetA = cloneActionConditinalNode.conditionTargetA;
			var targetB = cloneActionConditinalNode.conditionTargetB;

			var targetA_attribute = cloneActionConditinalNode.conditionAttrA;
			var targetB_attribute = cloneActionConditinalNode.conditionAttrB;
			var compareType = cloneActionConditinalNode.conditionCompare;

			var isIgnoreCase =
				cloneActionConditinalNode.caseSensitive == "Y" ? "N" : "Y";

			//console.log("tag:conditional/" + targetA_attribute);
			//console.log("tag:conditional/" + targetB_attribute);
			//console.log("tag:conditional/" + compareType);

			//console.log("tag:conditional/" + isIgnoreCase);

			var compareValueA = getCompareValue(targetA, targetA_attribute);

			if (compareValueA == undefined || compareValueA == null) {
				compareValueA = "sdafadsfsadfsdfasfasfsa";
			}
			//console.log("tag:conditional/" + "compareValueA->" + compareValueA);
			var compareValueB = getCompareValue(targetB, targetB_attribute);
			if (compareValueB == undefined || compareValueB == null) {
				compareValueB = "sadfasdfasdfasdfsadfasdfs";
			}
			//console.log("tag:conditional/" + "compareValueB->" + compareValueB);

			if (conditionalName == "�뺣떟泥댄겕") {
				//alert(compareValueA + "//" + compareValueB +"//" + targetA_attribute + "//" + targetA);
			}
			var result = false;
			if (targetA_attribute == "Area" || targetA_attribute == "Area") {
				result = getCompareResultByRect(targetA, targetB, compareType);
				//console.log("tag:conditional/" + "compare getCompareResultByRect=>" + result);
			} else if (
				compareType == "==" ||
				compareType == "!=" ||
				compareType == "ContainsAll" ||
				compareType == "Contains" ||
				compareType == "StartsWith" ||
				compareType == "EndsWith"
			) {
				result = getCompareResultByString(
					compareValueA,
					compareValueB,
					compareType,
					isIgnoreCase
				);
				//console.log("tag:conditional/" + "compare ResultByString=>" + result);
			} else {
				result = getCompareResultByNumber(
					compareValueA,
					compareValueB,
					compareType,
					isIgnoreCase
				);
				//console.log("tag:conditional/" + "compare ResultByNumber=>" + result);
			}

			var action = null;
			if (result == true) {
				action = cloneActionConditinalNode.trueAction;
				//console.log("tag:conditional/" + "start True Action");
			} else {
				action = cloneActionConditinalNode.falseAction;
				//console.log("tag:conditional/" + "start False Action");
			}

			if (action != null) {
				distributeAction(cloneActionConditinalNode, "Conditional", "N", action);
			}
			distributeNextAction(params.nextAction);
		}
	}, params.delay);
}

function getCompareResultByRect(rectA, rectB, compareType) {
	var result = false;
	// �좎룞�숋옙�⑥삕�좑옙 占쎌쥙�⑵짆�쏆삕�좑옙.
	if (compareType == "==") {
	} else if (compareType == "!=") {
	} else if (compareType == "ContainsAll") {
		if (
			rectB.x >= rectA.x &&
			rectB.x + rectB.w <= rectA.x + rectA.w &&
			rectB.y >= rectA.y &&
			rectB.y + rectB.h <= rectA.y + rectA.h
		) {
			result = true;
			//console.log("占쎌쥙�ワ옙�㏃젂疫뀀９苡몌옙釉먮폇�됵옙~~~");
		} else {
			result = false;
		}
	} else if (compareType == "Intersect") {
		var bounds = [
			{ x: rectB.x, y: rectB.y },
			{ x: rectB.x + rectB.width, y: rectB.y },
			{ x: rectB.x, y: rectB.y + rectB.height },
			{ x: rectB.x + rectB.width, y: rectB.y + rectB.height }
		];
		for (var i = 0; i < bounds.length; i++) {
			var value = bounds[i];
			if (
				rectA.x <= value.x &&
				rectA.x + rectA.width >= value.x &&
				rectA.y <= value.y &&
				rectA.y + rectA.height >= value.y
			) {
				result = true;
				break;
			}
		}
	}

	return result;
}

function getCompareResultByString(
	compareValueA,
	compareValueB,
	compareType,
	isIgnoreCase
) {
	var result = false;
	var a = [];
	var b = [];

	//蒻븍슢�꾤땟��꾬옙�� 占쎈씈猷녶뜝�숈삕�좑옙 Array占싸뀀뙔占쏙옙 占쎄퀗�좑옙占쎌쥙猷욑옙占�.
	if (compareValueA instanceof Array && compareValueB instanceof Array) {
		a = compareValueA;
		b = compareValueB;
		//console.log(a + "//" + b);
	} else if (
		compareValueA instanceof Array &&
		typeof compareValueB === "string"
	) {
		a = compareValueA;
		var arrB = compareValueB.split(",");
		for (var i = 0; i < arrB.length; i++) {
			b.push(arrB[i].trim());
		}
		for (var i = 0; i < b.length; i++) {
			//console.log(b[i]);
		}
	} else if (
		compareValueB instanceof Array &&
		typeof compareValueA === "string"
	) {
		var arrA = compareValueA.split(",");
		for (var i = 0; i < arrA.length; i++) {
			a.push(arrA[i].trim());
		}
		for (var i = 0; i < a.length; i++) {
			//console.log(a[i]);
		}
		b = compareValueB;
	} else if (
		typeof compareValueA === "string" &&
		typeof compareValueB === "string"
	) {
		var arrA = compareValueA.split(",");
		var arrB = compareValueB.split(",");
		for (var i = 0; i < arrA.length; i++) {
			a.push(arrA[i].trim());
		}
		for (var i = 0; i < arrB.length; i++) {
			b.push(arrB[i].trim());
		}
		for (var i = 0; i < a.length; i++) {
			//console.log(a[i]);
		}
		for (var i = 0; i < b.length; i++) {
			//console.log(b[i]);
		}
	}

	//�좎룞�숋옙�⑥삕�좑옙 占쎌쥙�⑵짆�쏆삕�좑옙.
	if (compareType == "==") {
		if (a.length == b.length) {
			var matchCount = 0;
			for (var i = 0; i < a.length; i++) {
				if (isIgnoreCase == "Y") {
					var lowerA = a[i].toLocaleLowerCase();
					var lowerB = b[i].toLocaleLowerCase();
					if (lowerA == lowerB) {
						matchCount++;
					}
				} else {
					if (a[i] == b[i]) {
						matchCount++;
					}
				}
			}
			if (matchCount == a.length) {
				result = true;
			}
		}
	} else if (compareType == "!=") {
		if (a.length != b.length) {
			result = true;
		} else {
			var matchCount = 0;
			for (var i = 0; i < a.length; i++) {
				if (isIgnoreCase == "Y") {
					var lowerA = a[i].toLocaleLowerCase();
					var lowerB = b[i].toLocaleLowerCase();
					if (lowerA == lowerB) {
						matchCount++;
					}
				} else {
					if (a[i] == b[i]) {
						matchCount++;
					}
				}
			}
			if (!(matchCount == a.length)) {
				result = true;
			}
		}
	} else if (compareType == "ContainsAll") {
		if (a.length == b.length) {
			var matchCount = 0;
			var tempA = a.slice(0);
			var tempB = b.slice(0);
			for (var i = 0; i < a.length; i++) {
				for (var j = 0; j < b.length; j++) {
					if (isIgnoreCase == "Y") {
						var lowerA = tempA[i].toLocaleLowerCase();
						var lowerB = tempB[j].toLocaleLowerCase();

						if ((lowerA = lowerB)) {
							matchCount++;
							tempA[i] = "!#$!@$!#$!@" + i;
							tempB[j] = "!#$!$!$!" + j;
						}
					} else {
						if (tempA[i] == tempB[j]) {
							matchCount++;
							tempA[i] = "!#$!@$!#$!@" + i;
							tempB[j] = "!#$!$!$!" + j;
						}
					}
				}
			}
			if (matchCount == a.length) {
				result = true;
			}
		}
	} else if (compareType == "Contains") {
		if (a.length == b.length) {
			var matchCount = 0;
			var tempA = a.slice(0);
			var tempB = b.slice(0);
			for (var i = 0; i < a.length; i++) {
				for (var j = 0; j < b.length; j++) {
					if (isIgnoreCase == "Y") {
						var lowerA = tempA[i].toLocaleLowerCase();
						var lowerB = tempB[j].toLocaleLowerCase();

						if ((lowerA = lowerB)) {
							matchCount++;
							tempA[i] = "!#$!@$!#$!@" + i;
							tempB[j] = "!#$!$!$!" + j;
						}
					} else {
						if (tempA[i] == tempB[j]) {
							matchCount++;
							tempA[i] = "!#$!@$!#$!@" + i;
							tempB[j] = "!#$!$!$!" + j;
						}
					}
				}
			}
			if (matchCount == b.length) {
				result = true;
			}
		}
	} else if (compareType == "StartsWith") {
	} else if (compareType == "EndsWith") {
	}

	return result;
}

function getCompareResultByNumber(
	compareValueA,
	compareValueB,
	compareType,
	isIgnoreCase
) {
	var result = false;
	var a;
	var b;
	if (compareValueA instanceof Array && compareValueB instanceof Array) {
		a = compareValueA[0];
		b = compareValueB[0];
	} else if (
		compareValueA instanceof Array &&
		typeof compareValueB === "string"
	) {
		a = compareValueA[0];
		b = compareValueB;
	} else if (
		compareValueB instanceof Array &&
		typeof compareValueA === "string"
	) {
		a = compareValueA;
		b = compareValueB[0];
	} else if (
		typeof compareValueA === "string" &&
		typeof compareValueB === "string"
	) {
		a = compareValueA;
		b = compareValueB;
	}

	a = parseInt(a);
	b = parseInt(b);
	if (compareType == ">") {
		result = a > b;
	} else if (compareType == ">=") {
		result = a >= b;
	} else if (compareType == "<") {
		result = a < b;
	} else if (compareType == "<=") {
		result = a <= b;
	}

	return result;
}

function getCompareValue(target, attribute) {
	var compareValue = null;
	if (target == "^UserInput") {
		compareValue = attribute;
	} else if (attribute == "Tag") {
		compareValue = jQuery.data($(target).get(0), "tag");
	} else if (attribute == "Tag Count") {
		var textCount = 1;
		try {
			var str = jQuery.data($(target).get(0), "tag");
			var arrSplit = str.split(",");
			textCount = arrSplit.length;
		} catch (err) {}
		compareValue = textCount + "";
	} else if (attribute == "Text") {
		compareValue = jQuery.data($(target).get(0), "text");
		//$(target).val(compareValue);
		changeDisplayedText(target, compareValue);
	} else if (attribute == "Text Count") {
		compareValue = jQuery.data($(target).get(0), "text").length;
	} else if (attribute == "Alpha") {
		// compareValue =
		// String.valueOf(target.getmTargetView().getAlpha());
		var targetRect = {
			x: $(target).css("left"),
			y: $(target).css("top"),
			w: $(target).width(),
			h: $(target).height()
		};
		//console.log(targetRect);
		compareValue = targetRect;
	}
	return compareValue;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function cloneObject(obj) {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}

	var temp = obj.constructor(); // give temp the original obj's constructor
	for (var key in obj) {
		temp[key] = cloneObject(obj[key]);
	}

	return temp;
}

//占쎌쥙�⑼옙�볦삕�ル뜄��좎룞�숋옙濡녹삕繹먮씮�� 占쎌쥙��옙占쎌삕�좑옙 �좎럡�∽옙�뀀쐻�좑옙
function startLibraryAction(params) {
	//console.debug("[startLibraryAction] params.actType = " + params.actType);
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];
			var actionLibraryName = params.actType;
			var actionLibraryNode = jQuery.data(
				ActionLibraryTable,
				actionLibraryName
			);
			if (actionLibraryNode == null) {
				// jaeho - 20151125
				// onFinish보다 늦게 호출되는 경우 발생으로인한 오류 방지하기 위해, 찾지 못한 target을 돌려준다
				var count = 0;
				var found = false;
				for (var key in ActionLibraryTable) {
					if (ActionLibraryTable.hasOwnProperty(key)) {
						var data = ActionLibraryTable[key];
						for (var dkey in data) {
							if (dkey == "data") {
								count = Object.keys(data).length;
								found = true;
								break;
							}
						}
						if (found == true) break;
					}
				}
				targetNotFound(actionLibraryName, count);
			}

			var cloneActionLibraryNode = new Object();
			$.extend(true, cloneActionLibraryNode, actionLibraryNode);

			if (cloneActionLibraryNode.rand == "Y")
				distributeAction(
					actionLibraryNode,
					"ActionLibrary",
					"Y",
					cloneActionLibraryNode.action
				);
			else
				distributeAction(
					actionLibraryNode,
					"ActionLibrary",
					"N",
					cloneActionLibraryNode.action
				);
			// distributeAction(actionLibraryNode, 'ActionLibrary', 'N', cloneActionstartResetBeginSequenceLibraryNode.action);
			distributeNextAction(params.nextAction);
		}
	}, params.delay);
}

// jaeho - 20151125
// onFinish보다 늦게 호출되는 경우 발생으로인한 오류 방지하기 위해, 찾지 못한 target을 돌려준다
function targetNotFound(target, count) {
	onTargetNotFound(target, count);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//占쎌쥙�⑵짆�듭삕�좎뜴�앾옙�덉굲 �좎떥�녹맃占쎄퉫�占쎌눨�앭뜝占� 占쎌쥙��옙占쎌삕占쎌럩�뺧옙醫묒삕.

function startResetBeginSequence(params) {
	//console.log("startResetBeginSequence");
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];
			var ResetIndex = params.ResetIndex;
			jQuery.data($(tg).get(0), "actionDownIndex", ResetIndex - 1);
			//console.log("BeginSeq is " + jQuery.data($(tg).get(0), "actionDownIndex"));
		}
	}, params.delay);
}

function startResetEndSequence(params) {
	//console.log("startResetEndSequence");
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];
			var ResetIndex = params.ResetIndex;
			jQuery.data($(tg).get(0), "actionUpIndex", ResetIndex - 1);

			//console.log("EndSeq is " + jQuery.data($(tg).get(0), "actionUpIndex"));
		}
	}, params.delay);
}

function startResetInRectSequence(params) {
	//console.log("startResetInRectSequence");
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];
			var actionLibraryName = params.actType;
			var actionLibraryNode = jQuery.data(
				ActionLibraryTable,
				actionLibraryName
			);

			distributeAction(
				actionLibraryNode,
				"ActionLibrary",
				"N",
				actionLibraryNode.action
			);
			/*                distributeNextAction(params.nextAction); */
		}
	}, params.delay);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function startStopAll(params) {
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];

			//console.log("startStopAll is loaded!!");
			var startHideShow = jQuery.data(tg, "startHideShow");
			var startMove = jQuery.data(tg, "startMove");
			var startScaleMove = jQuery.data(tg, "startScaleMove");
			var startRotate = jQuery.data(tg, "startRotate");
			//console.log(startRotate)
			var startFlip = jQuery.data(tg, "startFlip");
			var startCurve = jQuery.data(tg, "startCurve");
			var startFade = jQuery.data(tg, "startFade");
			var blinkTimer = jQuery.data(tg, "blink_timer");
			var blinkSetTimer = jQuery.data(tg, "blink_setTimer");

			clearTimeout(startHideShow);
			clearTimeout(startMove);
			clearTimeout(startScaleMove);
			clearTimeout(startRotate);
			clearTimeout(startFlip);
			clearTimeout(startCurve);
			clearTimeout(startFade);

			clearTimeout(blinkSetTimer);

			clearInterval(blinkTimer);

			$(tg).dequeue();
			$(tg).clearQueue();
			$(tg).stop();

			try {
				var curveTimer = jQuery.data($(params.target[0]).get(0), "curveTimer");

				if (typeof curveTimer == "undefined") {
					curveTimer = jQuery.data(tg, "curveTimer");
					//console.log(tg);
					//console.log(curveTimer);
				}
				clearInterval(curveTimer);
			} catch (err) {
				console.log("curveTimerErr : " + err);
			}

			try {
				var aniTimer = jQuery.data($(tg).get(0), "animation_Timer");
				if (typeof curveTimer == "undefined") {
					aniTimer = jQuery.data(tg, "animation_Timer");
				}
				clearInterval(aniTimer);
			} catch (err) {
				console.log("animationTimerErr : " + err);
			}

			jQuery.data($(tg).get(0), "stopAction", "Y");
		}
		distributeNextAction(params.nextAction);
	}, params.delay);
}

function stopActionFlagInit(tg) {
	jQuery.data($(tg).get(0), "stopAction", "N");
}

var isAnimated = false;
var mousex = 0;
var mousey = 0;
var grabx = 0;
var graby = 0;
var orix = 0;
var oriy = 0;
var elex = 0;
var eley = 0;
var algor = 0;
var randForDrag = "N";

var dragAreaLeftLimit = 0;
var dragAreaTopLimit = 0;
var dragAreaRightLimit = 0;
var dragAreaBottomLimit = 0;

var actStartRect;
var dragobj = null;
// 20160528 - 혁인
// drag 오류 수정
var paramsobj = null;
var inRectAction;

var firstX;
var firstY;
var deltaX;
var deltaY;
var canvasX = 0;
var canvasY = 0;
var isActed = false;
var isMousedown = false;
var clickedEnter = false;

// 스크롤 animate중 중간에 멈춰서 잡을 수 있도록 하는 기능
var isScrollAnimate = false;

// 20160701 - 혁인
// dragOffset
var scrollOffsetX = 0;
var scrollOffsetY = 0;

// 20160528 - 혁인
// drag 오류 수정
function Point(x, y) {
	this.x = x;
	this.y = y;
}

// 20160528 - 혁인
// drag 오류 수정
function Size(width, height) {
	this.width = width;
	this.height = height;
}

function falsefunc(e) {
	isMousedown = true;
	firstX = e.offsetX || e.touches[0].clientX;
	firstY = e.offsetY || e.touches[0].clientY;
	//console.log("falsefunc : " + firstX)
	if (paramsobj.objectType == "scrollBox") {
		if (paramsobj.pagingScroll == "Y") {
			switch (paramsobj.paramValue[0].Direction) {
				case "Horiz":
					$(dragobj).stop();
					scrollOffsetX = $(dragobj).scrollLeft();
					console.log("@@@@@@@@@@@@ : " + $(dragobj).scrollLeft());
					console.log("[falseFunc] scrollOffsetValueX : " + scrollOffsetX);
					break;

				case "Vert":
					$(dragobj).stop();
					scrollOffsetY = $(dragobj).scrollTop();
					console.log("@@@@@@@@@@@@ : " + $(dragobj).scrollTop());
					console.log("[falseFunc] scrollOffsetValueX : " + scrollOffsetY);
					break;
			}
		}
	}
	return false;
} // used to block cascading events

function getMouseXY(e) {
	// works on IE6,FF,Moz,Opera7
	if (!e) e = window.event; // works on IE, but not NS (we rely on NS passing us the event)

	if (e) {
		if (e.pageX || e.pageY || e.targetTouches[0].pageX) {
			// this doesn't work on IE6!! (works on FF,Moz,Opera7)
			mousex =
				(e.pageX || e.targetTouches[0].pageX) -
				$("#div_main")
					.get(0)
					.getBoundingClientRect().left;
			mousey =
				(e.pageY || e.targetTouches[0].pageY) -
				$("#div_main")
					.get(0)
					.getBoundingClientRect().top;
			algor = "[e.pageX]";
			if (e.clientX || e.clientY) algor += " [e.clientX] ";
		} else if (e.clientX || e.clientY || e.targetTouches[0].clientY) {
			// works on IE6,FF,Moz,Opera7
			mousex =
				(e.clientX || e.targetTouches[0].clientX) +
				document.body.scrollLeft -
				$("#div_main")
					.get(0)
					.getBoundingClientRect().left;
			mousey =
				(e.clientY || e.targetTouches[0].clientY) +
				document.body.scrollTop -
				$("#div_main")
					.get(0)
					.getBoundingClientRect().top;
			algor = "[e.clientX]";
			if (e.pageX || e.pageY) algor += " [e.pageX] ";
		}
	}
}

function update(e) {
	getMouseXY(e); // NS is passing (event), while IE is passing (null)
}

function grab(context, rand, params) {
	try {
		event.preventDefault();
	} catch (err) {}
	document.onmousedown = falsefunc; // in NS this prevents cascading of events, thus disabling text selection
	document.ontouchstart = falsefunc; // in NS this prevents cascading of events, thus disabling text selection

	randForDrag = rand;
	dragobj = context;
	// 20160528 - 혁인
	// drag 오류 수정
	paramsobj = params;
	grabx = mousex;
	graby = mousey;

	elex = orix = $(dragobj).css("left");
	eley = oriy = $(dragobj).css("top");

	if (paramsobj.isSwipe == "N") {
		document.onmousemove = drag;
		document.onmouseup = drop;

		document.ontouchmove = drag;
		document.ontouchend = drop;

		var dragArea = params.dragArea;
		actStartRect = params.actStartRect;
		inRectAction = params.inRectAction;
		dragAreaLeftLimit = dragArea[0];
		dragAreaTopLimit = dragArea[1];
		dragAreaRightLimit = dragArea[0] + dragArea[2] - $(dragobj).width();
		dragAreaBottomLimit = dragArea[1] + dragArea[3] - $(dragobj).height();
		update();
	} else {
		dragobj.onmousemove = drag;
		dragobj.onmouseup = drop;

		dragobj.ontouchmove = drag;
		dragobj.ontouchend = drop;

		dragobj.onmouseenter = enter;
		dragobj.onmouseout = out;
	}
}

function enter(e) {
	console.log("enter");
	if (clickedEnter) return;
	firstX = e.offsetX || e.touches[0].clientX;
	firstY = e.offsetY || e.touches[0].clientY;

	activeButton = typeof e.buttons === "number" ? e.buttons : e.which;

	var is_touched = e.touches || e.targetTouches;
	if (is_touched) {
		activeButton = is_touched;
	}
	if (!activeButton) {
		return;
	}
}

function out(e) {
	e.preventDefault();
	console.log("out  : ");
	if (isAnimated) return;
	if (!isMousedown) return;
	isMousedown = false;
	clickedEnter = false;
	isActed = false;

	firstX = e.offsetX || e.touches[0].clientX;
	firstY = e.offsetY || e.touches[0].clientY;

	console.log("[OUT] isMouseDown : " + isMousedown);
	var localOffsetX = scrollOffsetX;
	var localOffsetY = scrollOffsetY;
	if (paramsobj.objectType == "scrollBox") {
		if (paramsobj.pagingScroll == "Y") {
			isScrollAnimate = true;
			switch (paramsobj.paramValue[0].Direction) {
				case "Horiz":
					if (deltaX > 0) {
						localOffsetX +=
							paramsobj.cropValue - (scrollOffsetX % paramsobj.cropValue);
						console.log("[DROP] localOffsetX : " + localOffsetX);
						$(dragobj).animate(
							{
								scrollLeft: localOffsetX
							},
							{
								duration: 400,
								complete: function() {
									console.log("complete");
									firstX =
										parseInt(e.offsetX || e.touches[0].clientX) +
										(paramsobj.cropValue -
											(localOffsetX % paramsobj.cropValue));
									//console.log("[DROP] complete : " + firstX);
									deltaX = 0;
									isScrollAnimate = false;
								}
							}
						);
					} else {
						localOffsetX -= scrollOffsetX % paramsobj.cropValue;
						console.log("[DROP] localOffsetX : " + localOffsetX);
						$(dragobj).animate(
							{
								scrollLeft: localOffsetX
							},
							{
								duration: 400,
								complete: function() {
									firstX =
										parseInt(e.offsetX || e.touches[0].clientX) -
										(paramsobj.cropValue -
											(localOffsetX % paramsobj.cropValue));
									//console.log("[DROP] complete : " + firstX);
									deltaX = 0;
									//console.log("animateComplete : " + firstX);
									isScrollAnimate = false;
								}
							}
						);
					}
					break;
				case "Vert":
					if (deltaY > 0) {
						localOffsetY +=
							paramsobj.cropValue - (scrollOffsetY % paramsobj.cropValue);
						console.log("[OUT] localOffsetY : " + localOffsetY);
						$(dragobj).animate(
							{
								scrollTop: localOffsetY
							},
							{
								duration: 400,
								complete: function() {
									console.log("complete");
									firstY =
										parseInt(e.offsetY || e.touches[0].clientY) +
										(paramsobj.cropValue -
											(localOffsetY % paramsobj.cropValue));
									//console.log("[DROP] complete : " + firstX);
									deltaY = 0;
									isScrollAnimate = false;
								}
							}
						);
					} else {
						localOffsetY -= scrollOffsetY % paramsobj.cropValue;
						console.log("[OUT] localOffsetY : " + localOffsetY);
						$(dragobj).animate(
							{
								scrollTop: localOffsetY
							},
							{
								duration: 400,
								complete: function() {
									firstY =
										parseInt(e.offsetY || e.touches[0].clientY) -
										(paramsobj.cropValue -
											(localOffsetY % paramsobj.cropValue));
									//console.log("[DROP] complete : " + firstX);
									deltaY = 0;
									//console.log("animateComplete : " + firstX);
									isScrollAnimate = false;
								}
							}
						);
					}
					break;
			}
		}
	}

	/*if(isMousedown){
     //console.log("triggerAction")
     isMousedown = false;
     if(paramsobj.paramValue[0].Direction == 'Vert'){
     if(deltaY > 0){
     firstY = canvasY;
     distributeAction(this, 'down', 'N', [[{actType:13, actSubType: 'Go Next', effect : paramsobj.effect, useAnimation : paramsobj.useAnimation, target:[dragobj], Direction : paramsobj.paramValue[0].Direction, startTime:0, delay:0, duration: paramsobj.duration }]])
     isActed = true;
     return;
     }
     if(deltaY < 0){
     firstY = canvasY;
     distributeAction(this, 'down', 'N', [[{actType:13, actSubType: 'Go Prev', effect : paramsobj.effect, useAnimation : paramsobj.useAnimation, target:[dragobj], Direction : paramsobj.paramValue[0].Direction, startTime:0, delay:0, duration: paramsobj.duration }]])
     return;
     }
     }else{
     if(deltaX > 0){
     firstX = canvasX;
     distributeAction(this, 'down', 'N', [[{actType:13, actSubType: 'Go Next', effect : paramsobj.effect, useAnimation : paramsobj.useAnimation, target:[dragobj], Direction : paramsobj.paramValue[0].Direction, startTime:0, delay:0, duration: paramsobj.duration }]])
     isActed = true;
     return;
     }
     if(deltaX < 0){
     firstX = canvasX;
     distributeAction(this, 'down', 'N', [[{actType:13, actSubType: 'Go Prev', effect : paramsobj.effect, useAnimation : paramsobj.useAnimation, target:[dragobj], Direction : paramsobj.paramValue[0].Direction,startTime:0, delay:0, duration: paramsobj.duration }]])
     isActed = true;
     return;
     }
     }
     }*/
}

function drop(e) {
	console.log("마우스 업sdfsdfads이라고???");
	e.preventDefault();
	if (paramsobj.isSwipe == "Y") {
		isMousedown = false;
		isActed = false;
		clickedEnter = false;
		try {
			firstX = e.offsetX || e.touches[0].clientX;
			firstY = e.offsetY || e.touches[0].clientY;
		} catch (err) {
			console.log("err :: " + err);
		}

		var localOffsetX = scrollOffsetX;
		var localOffsetY = scrollOffsetY;

		if (paramsobj.objectType == "scrollBox") {
			if (paramsobj.pagingScroll == "Y") {
				isScrollAnimate = true;
				switch (paramsobj.paramValue[0].Direction) {
					case "Horiz":
						if (deltaX > 0) {
							localOffsetX +=
								paramsobj.cropValue - (scrollOffsetX % paramsobj.cropValue);
							//console.log("[DROP] localOffsetX : " + localOffsetX)
							$(dragobj).animate(
								{
									scrollLeft: localOffsetX
								},
								{
									duration: 400,
									complete: function() {
										//console.log("complete")
										firstX =
											parseInt(e.offsetX || e.touches[0].clientX) +
											(paramsobj.cropValue -
												(localOffsetX % paramsobj.cropValue));
										//console.log("[DROP] complete : " + firstX);
										deltaX = 0;
										isScrollAnimate = false;
									}
								}
							);
						} else {
							localOffsetX -= scrollOffsetX % paramsobj.cropValue;
							//console.log("[DROP] localOffsetX : " + localOffsetX)
							$(dragobj).animate(
								{
									scrollLeft: localOffsetX
								},
								{
									duration: 400,
									complete: function() {
										firstX =
											parseInt(e.offsetX || e.touches[0].clientX) -
											(paramsobj.cropValue -
												(localOffsetX % paramsobj.cropValue));
										//console.log("[DROP] complete : " + firstX);
										deltaX = 0;
										//console.log("animateComplete : " + firstX);
										isScrollAnimate = false;
									}
								}
							);
						}
						break;
					case "Vert":
						if (deltaY > 0) {
							localOffsetY +=
								paramsobj.cropValue - (scrollOffsetY % paramsobj.cropValue);
							//console.log("[DROP] localOffsetY : " + localOffsetY)
							$(dragobj).animate(
								{
									scrollTop: localOffsetY
								},
								{
									duration: 400,
									complete: function() {
										//console.log("complete")
										firstY =
											parseInt(e.offsetY || e.targetTouches[0].clientY) +
											(paramsobj.cropValue -
												(localOffsetY % paramsobj.cropValue));
										//console.log("[DROP] complete : " + firstX);
										deltaY = 0;
										isScrollAnimate = false;
									}
								}
							);
						} else {
							localOffsetY -= scrollOffsetY % paramsobj.cropValue;
							//console.log("[DROP] localOffsetY : " + localOffsetY)
							$(dragobj).animate(
								{
									scrollTop: localOffsetY
								},
								{
									duration: 400,
									complete: function() {
										firstY =
											parseInt(e.offsetY || e.targetTouches[0].clientY) -
											(paramsobj.cropValue -
												(localOffsetY % paramsobj.cropValue));
										//console.log("[DROP] complete : " + firstX);
										deltaY = 0;
										//console.log("animateComplete : " + firstX);
										isScrollAnimate = false;
									}
								}
							);
						}
						break;
				}
			}
		}
	} else {
		//console.log("drop");
		if (dragobj) {
			/*         dragobj.style.zIndex = 0; */
			dragobj = null;
		}
		update(e);
		document.onmousemove = update;
		document.onmouseup = null;
		document.onmousedown = null; // re-enables text selection on NS
	}
}

// 20160528 - 혁인
// drag 오류 수정
function drag(e) {
	// parameter passing is important for NS family
	e.preventDefault();
	try {
		if (jQuery.data($(dragobj).get(0), "startedInRect") == "Y") {
			console.log("return 01");
			return;
		}
	} catch (err) {}

	var percentRate;

	if (dragobj) {
		elex = orix + (mousex - grabx);
		eley = oriy + (mousey - graby);
		dragobj.style.position = "absolute";

		var afterDragX = mousex / scale - $(dragobj).width() / 2;
		var afterDragY = mousey / scale - $(dragobj).width() / 2;
		console.log("paramsobj.isSwipe :: " + paramsobj.isSwipe);

		console.log(afterDragX + "//" + dragAreaRightLimit);
		if (afterDragX < dragAreaLeftLimit) {
			afterDragX = dragAreaLeftLimit;
		}
		if (afterDragX > dragAreaRightLimit) {
			afterDragX = dragAreaRightLimit;
		}

		if (afterDragY < dragAreaTopLimit) {
			afterDragY = dragAreaTopLimit;
		}
		if (afterDragY > dragAreaBottomLimit) {
			afterDragY = dragAreaBottomLimit;
		}
		activeButton = typeof e.buttons === "number" ? e.buttons : e.which;
		var is_touched = e.touches || e.targetTouches;

		if (is_touched) {
			activeButton = is_touched;
		}
		if (!activeButton || clickedEnter || (isActed && isMousedown)) {
			console.log("is_return");
			return;
		} else {
			isMousedown = true;
		}

		canvasX = e.offsetX || e.touches[0].clientX;
		canvasY = e.offsetY || e.touches[0].clientY;
		deltaX = firstX - canvasX;
		deltaY = firstY - canvasY;
		//console.log("[DRAG] firstX : " + firstX + " e.offsetX : " + e.offsetX + " canvasX : " + canvasX);
		if (paramsobj.isSwipe == "Y") {
			if (paramsobj.objectType == "scrollBox") {
				if (paramsobj.pagingScroll == "Y") {
					switch (paramsobj.paramValue[0].Direction) {
						case "Horiz":
							if (scrollOffsetX > 0) {
								scrollOffsetX += deltaX;
							} else {
								if (deltaX < 0) return;
								else scrollOffsetX += deltaX;
							}

							if (scrollOffsetX < 0) scrollOffsetX = 0;

							$(dragobj).stop();
							//console.log("[Activated] scrollOffsetX : " + scrollOffsetX + ", deltaX : " + deltaX);
							$(dragobj).scrollLeft(Math.abs(scrollOffsetX));
							break;

						case "Vert":
							if (scrollOffsetY > 0) {
								scrollOffsetY += deltaY;
							} else {
								if (deltaY < 0) return;
								else scrollOffsetY += deltaY;
							}

							if (scrollOffsetY < 0) scrollOffsetY = 0;

							$(dragobj).stop();
							//console.log("[Activated] scrollOffsetY : " + scrollOffsetY + ", deltaY : " + deltaY);
							$(dragobj).scrollTop(Math.abs(scrollOffsetY));
							break;
					}

					//$(dragobj).scrollLeft(Math.abs(scrollOffsetX));
				} else {
					$(dragobj).scrollLeft(Math.abs(deltaX));
				}
			} else {
				if (paramsobj.paramValue[0].Direction == "Vert") {
					if (deltaY > $(dragobj).height() / 3) {
						firstY = canvasY;
						console.log("drag1  : " + firstY);
						deltaY = 0;
						//pagingViewControl(params);
						distributeAction(null, null, "N", [
							[
								{
									actType: 13,
									actSubType: "Go Next",
									effect: paramsobj.effect,
									useAnimation: paramsobj.useAnimation,
									target: [dragobj],
									Direction: paramsobj.paramValue[0].Direction,
									startTime: 0,
									delay: 0,
									duration: paramsobj.duration
								}
							]
						]);
						isActed = true;
						return;
					}
					if (deltaY < -($(dragobj).height() / 3)) {
						firstY = canvasY;
						deltaY = 0;
						console.log("drag2  : " + firstY);
						//pagingViewControl(params);
						distributeAction(null, null, "N", [
							[
								{
									actType: 13,
									actSubType: "Go Prev",
									effect: paramsobj.effect,
									useAnimation: paramsobj.useAnimation,
									target: [dragobj],
									Direction: paramsobj.paramValue[0].Direction,
									startTime: 0,
									delay: 0,
									duration: paramsobj.duration
								}
							]
						]);
						return;
					}
				} else {
					if (deltaX > $(dragobj).width() / 3) {
						firstX = canvasX;
						console.log("drag3  : " + firstX);
						console.log("effecty : " + paramsobj.effect);
						deltaX = 0;
						//pagingViewControl(params);
						distributeAction(null, null, "N", [
							[
								{
									actType: 13,
									actSubType: "Go Next",
									effect: paramsobj.effect,
									useAnimation: paramsobj.useAnimation,
									target: [dragobj],
									Direction: paramsobj.paramValue[0].Direction,
									startTime: 0,
									delay: 0,
									duration: paramsobj.duration
								}
							]
						]);
						isActed = true;
						return;
					}
					if (deltaX < -($(dragobj).width() / 3)) {
						firstX = canvasX;
						deltaX = 0;
						console.log("drag4  : " + firstX);
						//pagingViewControl(params);
						distributeAction(null, null, "N", [
							[
								{
									actType: 13,
									actSubType: "Go Prev",
									effect: paramsobj.effect,
									useAnimation: paramsobj.useAnimation,
									target: [dragobj],
									Direction: paramsobj.paramValue[0].Direction,
									startTime: 0,
									delay: 0,
									duration: paramsobj.duration
								}
							]
						]);
						isActed = true;
						return;
					}
				}
			}
		} else {
			// if(dragobj.tagName = "SVG") {
			//
			// }else{
			//
			// }

			dragobj.style.left = afterDragX + "px";
			dragobj.style.top = afterDragY + "px";

			if (paramsobj.isRect == "Y") {
				console.log("recdddt check :: " + mousex / scale);
				if (
					mousex / scale >= actStartRect[0] &&
					mousex / scale <= actStartRect[0] + actStartRect[2] &&
					mousey / scale >= actStartRect[1] &&
					mousey / scale <= actStartRect[1] + actStartRect[3]
				) {
					console.log("In Rect~~~~~~~");
					if (
						jQuery.data($(dragobj).get(0), "startedInRect") == null ||
						jQuery.data($(dragobj).get(0), "startedInRect") == "N"
					) {
						jQuery.data($(dragobj).get(0), "startedInRect", "Y");
						//$(dragobj).css("pointerEvents", "none");
						if (randForDrag == "Y")
							distributeAction(dragobj, "inRect", "Y", inRectAction);
						else distributeAction(dragobj, "inRect", "N", inRectAction);
						dragobj = null;
					}
				}
			} else {
				//console.log("dragAreaLeftLimit : " + dragAreaLeftLimit + ", dragobj.style.left : " + dragobj.style.left +", dragAreaRightLimit : " + dragAreaRightLimit)
				for (var j = 0; j < paramsobj.paramValue.length; j++) {
					if (paramsobj.paramValue[j].Direction == "Vert") {
						percentRate =
							(parseFloat(dragobj.style.top) - parseInt(dragAreaTopLimit)) /
							(parseInt(dragAreaBottomLimit) - parseInt(dragAreaTopLimit));
					} else {
						percentRate =
							(parseFloat(dragobj.style.left) - parseInt(dragAreaLeftLimit)) /
							(parseInt(dragAreaRightLimit) - parseInt(dragAreaLeftLimit));
					}
					switch (paramsobj.paramValue[j].actType) {
						case "Fade":
							var minValue = paramsobj.paramValue[j].MIN;
							var maxValue = paramsobj.paramValue[j].MAX;
							var diffValue = Math.abs(minValue - maxValue);

							var curValue = minValue;

							if (minValue > maxValue) {
								curValue = curValue - percentRate * diffValue;
							} else {
								curValue = curValue + percentRate * diffValue;
							}
							curValue /= 100;
							for (var i = 0; i < paramsobj.paramValue[j].target.length; i++) {
								paramsobj.paramValue[j].target[i].style.opacity = curValue;
							}

							break;
						case "Move":
							var minPoint = new Point(
								paramsobj.paramValue[j].MIN[0],
								paramsobj.paramValue[j].MIN[1]
							);
							var maxPoint = new Point(
								paramsobj.paramValue[j].MAX[0],
								paramsobj.paramValue[j].MAX[1]
							);
							var diffPoint = new Point(
								Math.abs(minPoint.x - maxPoint.x),
								Math.abs(minPoint.y - maxPoint.y)
							);

							var curPoint = minPoint;
							console.log(percentRate);
							if (minPoint.x > maxPoint.x) {
								console.log("minus1");
								curPoint.x = curPoint.x - percentRate * diffPoint.x;
							} else {
								//console.log("plus1")
								console.log("value : " + percentRate * diffPoint.x);
								curPoint.x = curPoint.x + percentRate * diffPoint.x;
							}

							if (minPoint.y > maxPoint.y) {
								console.log("minus2");
								curPoint.y = curPoint.y - percentRate * diffPoint.y;
							} else {
								//console.log("plus2")
								curPoint.y = curPoint.y + percentRate * diffPoint.y;
							}

							for (var i = 0; i < paramsobj.paramValue[j].target.length; i++) {
								paramsobj.paramValue[j].target[i].style.left =
									curPoint.x + "px"; // Horiz
								paramsobj.paramValue[j].target[i].style.top = curPoint.y + "px"; // Vert
							}

							break;
						case "Rotate":
							var minValue = paramsobj.paramValue[j].MIN;
							var maxValue = paramsobj.paramValue[j].MAX;
							var diffValue = Math.abs(minValue - maxValue);

							var curValue = minValue;

							if (minValue > maxValue) {
								curValue = curValue - percentRate * diffValue;
							} else {
								curValue = curValue + percentRate * diffValue;
							}

							for (var i = 0; i < paramsobj.paramValue[j].target.length; i++) {
								$(paramsobj.paramValue[j].target[i]).css(
									"-moz-transform",
									"rotate(" + curValue + "deg)"
								);
								$(paramsobj.paramValue[j].target[i]).css(
									"transform",
									"rotate(" + curValue + "deg)"
								);
							}
							break;
						case "Scale":
							var minSize = new Size(
								paramsobj.paramValue[j].MIN[0],
								paramsobj.paramValue[j].MIN[1]
							);
							var maxSize = new Size(
								paramsobj.paramValue[j].MAX[0],
								paramsobj.paramValue[j].MAX[1]
							);
							var diffSize = new Size(
								maxSize.width - minSize.width,
								maxSize.height - minSize.height
							);

							var curSize = minSize;

							maxSize.width = minSize.width + percentRate * diffSize.width;
							maxSize.height = minSize.height + percentRate * diffSize.height;

							var widthScale = maxSize.width / minSize.width;
							var heightScale = maxSize.height / minSize.height;

							//$(paramsobj.controlObj).css({'transform-origin': 'scale('+widthScale+', ' +heightScale+')'});

							for (var i = 0; i < paramsobj.paramValue[j].target.length; i++) {
								console.log(
									$(paramsobj.paramValue[j].target[i]).css("transform")
								);
								$(paramsobj.paramValue[j].target[i]).css(
									"-moz-transform",
									"scale(" + widthScale + ", " + heightScale + ")"
								);
								$(paramsobj.paramValue[j].target[i]).css(
									"transform",
									"scale(" + widthScale + ", " + heightScale + ")"
								);
							}

							//$(paramsobj.controlObj).css({'transform': 'scale('+widthScale+', ' +heightScale+')'});                 }

							/*ctx.save();
                             ctx.translate(x + w / 2, y + h / 2);
                             ctx.rotate(r * Math.PI / 180);
                             ctx.drawImage(image, -w / 2, -h / 2, w, h);
                             ctx.restore();*/
							break;
					}
				}
			}
		}
		console.log("drsdfsdfasdag :: " + afterDragX);

		/*             console.log("drag =>" + afterDragX + "//" + afterDragY); */
	}
	update(e);
	return false; // in IE this prevents cascading of events, thus text selection is disabled
}

function startScroll(params) {
	for (var i = 0; i < params.target.length; i++) {
		var tg = params.target[i];

		var nowScrollX = $(tg).scrollLeft();
		var nowScrollY = $(tg).scrollTop();

		//console.log("scrollX => " + nowScrollX + "scrollY => " + nowScrollY);
		if (params.reverse == "Y") {
			setTimeout(function() {
				$(tg).animate(
					{
						scrollTop: params.scrollY,
						scrollLeft: params.scrollX
					},
					{
						duration: params.duration,
						queue: false,
						complete: function() {
							setTimeout(function() {
								$(tg).animate(
									{
										scrollTop: nowScrollY,
										scrollLeft: nowScrollX
									},
									{
										duration: params.revDuration,
										queue: false,
										complete: function() {
											if (
												params.repeatForever != null &&
												params.repeatForever == "Y"
											) {
												params.delay = params.delay - params.startTime;
												params.startTime = 0;
												params.startTime = 0;
												startScroll(params);
											} else if (params.repeatCount > 0) {
												params.delay = params.delay - params.startTime;
												params.startTime = 0;
												params.startTime = 0;
												startScroll(params);
												params.repeatCount -= 1;
											} else {
												if (params.nextAction != null) {
													distributeNextAction(params.nextAction);
												}
											}
										}
									}
								);
							}, params.waitingTime);
						}
					}
				);
			}, params.delay);
		} else {
			setTimeout(function() {
				$(tg).animate(
					{
						scrollTop: params.scrollY,
						scrollLeft: params.scrollX
					},
					{
						duration: params.duration,
						queue: false,
						complete: function() {
							if (params.repeatForever != null && params.repeatForever == "Y") {
								params.delay = params.delay - params.startTime;
								params.startTime = 0;
								startScroll(params);
							} else if (params.repeatCount > 0) {
								params.delay = params.delay - params.startTime;
								params.startTime = 0;
								startScroll(params);
								params.repeatCount -= 1;
							} else {
								distributeNextAction(params.nextAction);
							}
						}
					}
				);
			}, params.delay);
		}
	}
}

function CurveAnimator(from) {
	this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	this.path.setAttribute("d", from);
	this.updatePath();
	CurveAnimator.lastCreated = this;
}
CurveAnimator.prototype.animate = function(params, duration, callback, delay) {
	var curveAnim = this;
	// TODO: Use requestAnimationFrame if a delay isn't passed
	if (!delay) delay = 1 / 40;
	clearInterval(curveAnim.animTimer);

	var startTime = new Date();
	curveAnim.animTimer = setInterval(function() {
		var now = new Date();
		var elapsed = (now - startTime) / 1000;
		var percent = elapsed / duration;
		if (percent >= 1) {
			percent = 1;
			clearInterval(curveAnim.animTimer);

			if (params.reverse == "Y") {
				if (jQuery.data($(params.target[0]).get(0), "reverse") == "Y") {
					jQuery.data($(params.target[0]).get(0), "reverse", "N");
					if (params.repeatForever != null && params.repeatForever == "Y") {
						params.delay = params.delay - params.startTime;
						params.startTime = 0;
						makeCurve(params);
					} else if (params.repeatCount > 0) {
						params.delay = params.delay - params.startTime;
						params.startTime = 0;
						makeCurve(params);
						params.repeatCount -= 1;
					} else {
						distributeNextAction(params.nextAction);
					}
				} else {
					jQuery.data($(params.target[0]).get(0), "reverse", "Y");
					makeCurve(params);
				}
			} else {
				if (params.repeatForever != null && params.repeatForever == "Y") {
					params.delay = params.delay - params.startTime;
					params.startTime = 0;
					makeCurve(params);
				} else if (params.repeatCount > 0) {
					params.delay = params.delay - params.startTime;
					params.startTime = 0;
					makeCurve(params);
					params.repeatCount -= 1;
				} else {
					distributeNextAction(params.nextAction);
				}
			}
		}

		jQuery.data($(params.target[0]).get(0), "curveTimer", curveAnim.animTimer);

		var p1 = curveAnim.pointAt(percent - 0.01),
			p2 = curveAnim.pointAt(percent + 0.01);
		callback(
			curveAnim.pointAt(percent),
			(Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI
		);
	}, delay * 1000);
};
CurveAnimator.prototype.stop = function() {
	clearInterval(this.animTimer);
};
CurveAnimator.prototype.pointAt = function(percent) {
	return this.path.getPointAtLength(this.len * percent);
};
CurveAnimator.prototype.updatePath = function() {
	this.len = this.path.getTotalLength();
};
CurveAnimator.prototype.setStart = function(x, y) {
	var M = this.path.pathSegList.getItem(0);
	M.x = x;
	M.y = y;
	this.updatePath();
	return this;
};
CurveAnimator.prototype.setEnd = function(x, y) {
	var C = this.path.pathSegList.getItem(1);
	C.x = x;
	C.y = y;
	this.updatePath();

	return this;
};
CurveAnimator.prototype.setStartDirection = function(x, y) {
	var C = this.path.pathSegList.getItem(1);
	C.x1 = x;
	C.y1 = y;
	this.updatePath();
	return this;
};
CurveAnimator.prototype.setEndDirection = function(x, y) {
	var C = this.path.pathSegList.getItem(1);
	C.x2 = x;
	C.y2 = y;
	this.updatePath();

	return this;
};

function goBack(params) {
	window.history.back();
}

function goForward(params) {
	window.history.forward();
}

function reload(params) {
	document.getElementById(params.strTarget).src = params.originURL;
}

function shuffleRandom(beforeNo, n) {
	var randNo;
	/* t(randNo); */
	while (true) {
		randNo = Math.floor(Math.random() * n);
		//console.log(beforeNo + "//" + randNo);
		if (beforeNo != randNo) {
			//console.log("�좎럩伊숋옙罐由곤옙�뚯굲�좎럥肉�옙類앸쐻占쎈뜄荑뗰옙�먯삕." + randNo);
			break;
		}
	}
	return randNo;
}

function checkBrowser(params) {
	var b = "";
	var ua = window.navigator.userAgent;
	if (!(ua.indexOf("Chrome") != -1 && ua.indexOf("Safari") != -1)) {
		//console.log("Sfari�좎럩伊숋옙館�쇿뜝�덉탮占썬굩�숋옙�⑹맶占쎌쥜�� Flip�좎럩伊숋옙�논렭癰귘뫗�뺡쪛�껉뺨占썬굩�숅뇡癒�뮡占쎌뼚짹占쎌빢�숋옙占쎄퐷占쎌쥙猷욑옙占� 占쎌쥙�εㅇ紐뚯삕�좎럩伊숋옙琯�앾옙�덈�占쎌쥙�ο옙蹂잙쐻�좑옙 �좎럩伊숋옙菅嫄∽옙紐꾩굲�좎럥梨뤄옙類앸쐻占쎈뜄�욑옙�듭삕. �좎럩伊숋옙��숋옙占쎌돪占쎌쥙�η븰�놁삕�좎럩�뺝뜝�덉챺占쎈벨�숋옙��占썹쳥��쐻占쎈슢痢먨뜝�숈삕 �좎럩伊숋옙��숋옙�⑹툤�좎럩伊숋옙�대き�룐뫖鍮앾옙醫롫윪占쎈벨�숅넫臾믪굲.");
		return "safari";
	}
	return "normal";
}

function reDraw(target, context, image, scaleW, scaleH, timer) {
	/* console.log(scaleW + "//" +$(target).width()); */
	$(target).get(0).width = $(target).width();
	$(target).get(0).height = $(target).height();
	context.drawImage(image, 0, 0, $(target).width(), $(target).height());
	if ($(target).width() == scaleW.replace("px", "")) {
		clearInterval(timer);
	}
}

function scaleInterval(target, context, image, scaleW, scaleH) {
	var timer = setInterval(function() {
		reDraw(target, context, image, scaleW, scaleH, timer);
	}, 80);
}

function startLoadData(params) {
	var url = params.content;

	//console.log("loaddata~~" + url);
	var qIndex = url.indexOf("?");
	var preUrl = url.substring(0, qIndex);
	var strParams = url.substring(qIndex + 1, url.length);

	var arrParams = strParams.split("&");
	var postParmas = {};
	var strParam = "";
	for (var i = 0; i < arrParams.length; i++) {
		var property = arrParams[i];
		var arrProperty = property.split("=");
		var propertyName = arrProperty[0];
		var propertyValue = arrProperty[1];
		if (propertyValue != null && propertyValue.startsWith("#")) {
			propertyValue = replaceAll(propertyValue, "#", "");
			var target = jQuery.data(TargetTable, propertyValue);
			//propertyValue = $(target).val();
			propertyValue = jQuery.data(target, "text");
		}
		if (propertyValue != null) {
			postParmas[propertyName] = propertyValue;
		}

		strParam += propertyName + "/" + propertyValue + "**";
	}
	//console.log("loaddata~~" + strParam);
	$.post(preUrl, postParmas, function(data, status) {
		var tempData = data.split("<body>")[1];
		//console.log(tempData);
		tempData = tempData.split("</body>")[0];
		//console.log(tempData);
		try {
			var jsonData = JSON.parse(tempData);
			//console.log(jsonData);

			if (preUrl == "http://m.englisheye.co.kr/game/login.asp") {
				parseLoginData(jsonData);
			} else if (jsonData[0] == undefined) {
				parseData(jsonData);
				distributeNextAction(params.nextAction);
			} else {
				//var jsonObj = mArrJsonData[0];
				mArrJsonData = jsonData;
			}
			//var soundPath = jsonObj.sound;
		} catch (err) {}
		distributeNextAction(params.nextAction);

		//console.log("arrJsonDta init OK");
	});
}

function parseLoginData(data) {
	$.each(data, function(k, v) {
		if (k == "error") {
			alert(v);
			return;
		}
		//console.log(k + ' is ' + v);
		var text = v;
		var target = jQuery.data(TargetTable, k);
		//$(target).val(text);
		changeDisplayedText(target, text);
		try {
			jQuery.data(jQuery.data(TargetTable, k), "text", text);
		} catch (err) {}
	});
}

function parseData(data) {
	$.each(data, function(k, v) {
		//console.log(k + ' is ' + v);
		var text = v.text;
		var tag = v.tag;
		var imgPath = v.path;
		var soundPath = v.sound;

		var target = jQuery.data(TargetTable, k);
		//$(target).val(text);
		changeDisplayedText(target, text);
		try {
			jQuery.data(jQuery.data(TargetTable, k), "text", text);
		} catch (err) {}

		if (imgPath != null) {
			var img = jQuery.data(target, "img");
			if (img != null) img.src = imgPath;
		}

		if (k == "sound") {
			soundPath = v.path;
		} else {
			soundPath = v.sound;
		}
		//sound1.src = soundPath;
	});
}

function startChangeData(params) {
	//console.log("startChangeData");
	setTimeout(function() {
		try {
			if (mDataIndex >= mArrJsonData.length) {
				mDataIndex = 0;
			}
			if (mArrJsonData != null && mDataIndex < mArrJsonData.length) {
				var data = mArrJsonData[mDataIndex];
				$.each(data, function(k, v) {
					//console.log(k + ' is ' + v);
					var text = v.text;
					var tag = v.tag;
					var imgPath = null;
					var soundPath = null;

					var target = jQuery.data(TargetTable, k);
					//$(target).val(text);
					changeDisplayedText(target, text);
					try {
						jQuery.data(jQuery.data(TargetTable, k), "text", text);
					} catch (err) {}

					try {
						jQuery.data(jQuery.data(TargetTable, k), "tag", tag);
					} catch (err) {}
					if (imgPath != null) {
						var img = jQuery.data(target, "img");
						if (img != null) img.src = imgPath;
					}

					if (k == "sound") {
						if (v.path != null && v.path != undefined) {
							soundPath = v.path;
						}
					} else {
						if (v.sound != null && v.sound != undefined) {
							soundPath = v.sound;
							jQuery.data(
								jQuery.data(TargetTable, k),
								"VariablePath",
								soundPath
							);
						}
					}
					//console.log("soundPath //  " + soundPath);
					if (soundPath != null) {
						sound1.src = soundPath;
						//console.log("sound1.src = soundPath : " + sound1.src);
					}
				});
			}
			mDataIndex++;
		} catch (err) {}

		distributeNextAction(params.nextAction);
	}, params.delay);
}

function startTimer(params) {
	//console.log("startTimer");
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];
			var timerStartAction = params.TimerStartAction;
			var timerEndAction = params.TimerEndAction;
			var timerScheduleAction = params.TimerScheduleAction;
			var timerScheduleRepeat = params.TimerScheduleRepeat; //1占쎈��� �귐뗫를.
			var timerScheduleTime = params.TimerScheduleTime;

			var startActionNode = null;
			var endActionNode = null;
			var scheduleActionNode = null;

			var startActionNodeType = "Conditional";
			var endActionNodeType = "Conditional";
			var scheduleActionNodeType = "Conditional";

			if (timerStartAction != null) {
				startActionNode = jQuery.data(ConditionalTable, timerStartAction);
				if (startActionNode == null) {
					startActionNode = jQuery.data(ActionLibraryTable, timerStartAction);
					startActionNodeType = "ActionLibrary";
				}
			}

			if (timerEndAction != null) {
				endActionNode = jQuery.data(ConditionalTable, timerEndAction);
				if (endActionNode == null) {
					endActionNode = jQuery.data(ActionLibraryTable, timerEndAction);
					endActionNodeType = "ActionLibrary";
				}
			}

			if (timerScheduleAction != null) {
				scheduleActionNode = jQuery.data(ConditionalTable, timerScheduleAction);

				if (scheduleActionNode == null) {
					scheduleActionNode = jQuery.data(
						ActionLibraryTable,
						timerScheduleAction
					);

					scheduleActionNodeType = "ActionLibrary";
				}
			}

			if (startActionNode != null) {
				if (startActionNodeType == "Conditional") {
					startConditionalAction({
						actType: timerStartAction,
						target: ["Conditional"],
						startTime: 0,
						delay: 0,
						duration: 0
					});
				} else {
					var cloneStartActionNode = new Object();
					$.extend(true, cloneStartActionNode, startActionNode);
					distributeAction(
						startActionNode,
						"ActionLibrary",
						"N",
						cloneStartActionNode.action
					);
				}
			}

			var timer = jQuery.data(tg, "timer");
			if (timer != null) {
				changeDisplayedText(tg, getDurationString(jQuery.data(tg, "secTime")));
				clearInterval(timer);
			}

			jQuery.data(tg, "currentTime", jQuery.data(tg, "secTime"));
			jQuery.data(
				tg,
				"NextScheduleTime",
				jQuery.data(tg, "secTime") - timerScheduleTime
			);

			var timer = setInterval(function() {
				var strTime = jQuery.data(tg, "currentTime");
				var secTime = jQuery.data(tg, "secTime");
				// $(tg).val(getDurationString(Number(strTime) - 1, secTime ));

				changeDisplayedText(
					tg,
					getDurationString(Number(strTime) - 1, secTime)
				);

				jQuery.data(tg, "currentTime", Number(strTime) - 1);
				if (Number(strTime) - 1 == 0) {
					if (endActionNode != null) {
						if (endActionNodeType == "Conditional") {
							startConditionalAction({
								actType: timerEndAction,
								target: ["Conditional"],
								startTime: 0,
								delay: 0,
								duration: 0
							});
						} else {
							var cloneEndActionNode = new Object();
							$.extend(true, cloneEndActionNode, endActionNode);
							distributeAction(
								endActionNode,
								"ActionLibrary",
								"N",
								cloneEndActionNode.action
							);
						}
					}
					clearInterval(timer);
				}
				if (scheduleActionNode != null) {
					if (timerScheduleRepeat != null && timerScheduleRepeat == "1") {
						if (Number(strTime) - 1 == jQuery.data(tg, "NextScheduleTime")) {
							jQuery.data(
								tg,
								"NextScheduleTime",
								jQuery.data(tg, "NextScheduleTime") - timerScheduleTime
							);
							if (scheduleActionNodeType == "Conditional") {
								startConditionalAction({
									actType: timerScheduleAction,
									target: ["Conditional"],
									startTime: 0,
									delay: 0,
									duration: 0
								});
							} else {
								var cloneScheduleActionNode = new Object();
								$.extend(true, cloneScheduleActionNode, scheduleActionNode);
								distributeAction(
									scheduleActionNode,
									"ActionLibrary",
									"N",
									cloneScheduleActionNode.action
								);
							}
						}
					} else {
						if (Number(strTime) - 1 == timerScheduleTime) {
							if (scheduleActionNodeType == "Conditional") {
								startConditionalAction({
									actType: timerScheduleAction,
									target: ["Conditional"],
									startTime: 0,
									delay: 0,
									duration: 0
								});
							} else {
								var cloneScheduleActionNode = new Object();
								$.extend(true, cloneScheduleActionNode, scheduleActionNode);
								distributeAction(
									scheduleActionNode,
									"ActionLibrary",
									"N",
									cloneScheduleActionNode.action
								);
							}
						}
					}
				}
			}, 1000);

			jQuery.data(tg, "timer", timer);
		}
		distributeNextAction(params.nextAction);
	}, params.delay);
}

function stopTimer(params) {
	//console.log("startTimer");
	setTimeout(function() {
		for (var i = 0; i < params.target.length; i++) {
			var tg = params.target[i];
			var timer = jQuery.data(tg, "timer");
			clearInterval(timer);
			var timerStartAction = params.TimerStartAction;
			var startActionNode = null;
			var startActionNodeType = "Conditional";
			if (timerStartAction != null) {
				startActionNode = jQuery.data(ConditionalTable, timerStartAction);
				if (startActionNode == null) {
					startActionNode = jQuery.data(ActionLibraryTable, timerStartAction);
					startActionNodeType = "ActionLibrary";
				}
			}

			if (startActionNode != null) {
				if (startActionNodeType == "Conditional") {
					startConditionalAction({
						actType: timerStartAction,
						target: ["Conditional"],
						startTime: 0,
						delay: 0,
						duration: 0
					});
				} else {
					var cloneStartActionNode = new Object();
					$.extend(true, cloneStartActionNode, startActionNode);
					distributeAction(
						startActionNode,
						"ActionLibrary",
						"N",
						cloneStartActionNode.action
					);
				}
			}
		}
		distributeNextAction(params.nextAction);
	}, params.delay);
}

// 20160601 - hyukin
// timer에서 초기 포멧 유지하기
function getDurationString(seconds, initCount) {
	console.log("0 : " + initCount);
	var hours = parseInt(seconds / 3600);
	var minutes = parseInt(parseInt(seconds % 3600) / 60);
	seconds = parseInt(seconds % 60);

	var initHours = parseInt(initCount / 3600.0);
	var initMinutes = parseInt((initCount % 3600.0) / 60.0);
	var initSeconds = parseInt(initCount % 60.0);

	var sb = "";
	if (initHours == 0) {
		if (initMinutes == 0) {
			sb += twoDigitString(seconds);
			console.log("1 : " + sb);
		} else {
			sb += twoDigitString(minutes);
			sb += twoDigitString(":");
			sb += twoDigitString(seconds);
		}
	} else {
		sb += twoDigitString(hours);
		sb += twoDigitString(":");
		sb += twoDigitString(minutes);
		sb += twoDigitString(":");
		sb += twoDigitString(seconds);
	}
	//console.log(sb);
	return sb;
}

function twoDigitString(number) {
	if (number == 0) {
		return "00";
	}

	if (parseInt(number / 10) == 0) {
		return "0" + number;
	}

	return number;
}

Array.prototype.remove = function(value) {
	var idx = this.indexOf(value);
	if (idx != -1) {
		return this.splice(idx, 1); // The second parameter is the number of elements to remove.
	}
	return false;
};

function stopBlink(tg, originImage, ShowAtFinish) {
	var blink_timer = jQuery.data(tg, "blink_timer");
	clearInterval(blink_timer);
	if (ShowAtFinish == "Y") {
		$(tg).show();
	} else {
		$(tg).hide();
	}
}

function replaceAll(str, orgStr, repStr) {
	return str.split(orgStr).join(repStr);
}

function convertToMyLevel(course, level, month) {
	level = replaceAll(level, " ", "");
	level = replaceAll(level, "Level", "");
	level = replaceAll(level, "0", "");

	month = replaceAll(month, " ", "");
	month = replaceAll(month, "Month", "");
	month = replaceAll(month, "0", "");

	if (month == "1") {
		month = "A";
	}
	if (month == "2") {
		month = "B";
	}
	if (month == "3") {
		month = "C";
	}

	return course + " " + level + month;
}

$.urlParam = function(name) {
	var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
		window.location.href
	);
	if (results == null) {
		return null;
	} else {
		return results[1] || 0;
	}
};

function changeTextByParam(k, text) {
	var target = jQuery.data(TargetTable, k);
	//$(target).val(text);
	changeDisplayedText(target, text);
	try {
		jQuery.data(jQuery.data(TargetTable, k), "text", text);
	} catch (err) {}
}

function saveLoginInfo() {
	var myid = $(jQuery.data(TargetTable, "userid")).val();
	var mycourse = $(jQuery.data(TargetTable, "course")).val();
	var mylevel = $(jQuery.data(TargetTable, "level")).val();
	var mymonth = $(jQuery.data(TargetTable, "month")).val();
	var username = $(jQuery.data(TargetTable, "user_name")).val();
	setCookie("userid", myid, 1);
	setCookie("course", mycourse, 1);
	setCookie("level", mylevel, 1);
	setCookie("month", mymonth, 1);
	setCookie("username", username, 1);
}

function deleteLoginInfo() {
	setCookie("userid", "no log", 1);
	setCookie("course", "mycourse", 1);
	setCookie("level", "mylevel", 1);
	setCookie("month", "mymonth", 1);
	setCookie("username", "", 1);
}

function loadLoginInfo() {
	var myid = getCookie("userid") == "" ? "no log" : getCookie("userid");
	var mycourse = getCookie("course") == "" ? "mycourse" : getCookie("course");
	var mylevel = getCookie("level") == "" ? "mylevel" : getCookie("level");
	var mymonth = getCookie("month") == "" ? "mymonth" : getCookie("month");
	var username = getCookie("username") == "" ? "" : getCookie("username");

	$(jQuery.data(TargetTable, "userid")).val(myid);
	$(jQuery.data(TargetTable, "course")).val(mycourse);
	$(jQuery.data(TargetTable, "level")).val(mylevel);
	$(jQuery.data(TargetTable, "month")).val(mymonth);
	$(jQuery.data(TargetTable, "user_name")).val(username);

	jQuery.data($(jQuery.data(TargetTable, "userid")).get(0), "text", myid);
	jQuery.data($(jQuery.data(TargetTable, "course")).get(0), "text", mycourse);
	jQuery.data($(jQuery.data(TargetTable, "level")).get(0), "text", mylevel);
	jQuery.data($(jQuery.data(TargetTable, "month")).get(0), "text", mymonth);
	jQuery.data(
		$(jQuery.data(TargetTable, "user_name")).get(0),
		"text",
		username
	);
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1);
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function changeDisplayedText(tg, text) {
	var tagName = $(tg).get(0).tagName.toLowerCase();
	if (tagName == "x-textbox") {
		$(tg).find(".contentsbox p > span").html(text);
	} else if (tgaName == "textarea") {
		$(tg).html(text);
	}
}

function IsGroup(tg) {
	// groupCheck = 0 : non Group, 1 : GroupChild, 2 : Group
	var groupCheck = 0;
	if (tg != null) {
		var idSplit = tg.id.split("_");
		if (idSplit[2] == "Group") {
			groupCheck = 2;
		} else if (idSplit[2] == "GroupChild") {
			groupCheck = 1;
		}
	}
	return groupCheck;
}
function GetAngle(tg) {
	var st = window.getComputedStyle(tg, null);
	var tr =
		st.getPropertyValue("-webkit-transform") ||
		st.getPropertyValue("-moz-transform") ||
		st.getPropertyValue("-ms-transform") ||
		st.getPropertyValue("-o-transform") ||
		st.getPropertyValue("transform");

	var nowAngle = 0;
	if (tr != "none" && tr != undefined) {
		var values = tr
			.split("(")[1]
			.split(")")[0]
			.split(",");
		var a = values[0];
		var b = values[1];
		var c = values[2];
		var d = values[3];

		var scale = Math.sqrt(a * a + b * b);
		var sin = b / scale;

		nowAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
		if (nowAngle < 0) nowAngle = (nowAngle + 360) % 360;
	}
	return nowAngle;
}

// 돌릴 기준이 될 개체 tg, 회전하길 원하는 백분율 점 anchorXY (100%), 회전하길 원하는 고정 점 pointCenterXY, 정방향 역방향 reverse
function RotatePoint(
	tg,
	anchorX,
	anchorY,
	pointCenterX,
	pointCenterY,
	reverse
) {
	var st = window.getComputedStyle(tg, null);
	var tr =
		st.getPropertyValue("-webkit-transform") ||
		st.getPropertyValue("-moz-transform") ||
		st.getPropertyValue("-ms-transform") ||
		st.getPropertyValue("-o-transform") ||
		st.getPropertyValue("transform");

	var sin = 0;
	var nowAngle = 0;

	if (tr != null && tr != "none") {
		var values =
			tr == null
				? null
				: tr
						.split("(")[1]
						.split(")")[0]
						.split(",");

		var a = values[0];
		var b = values[1];
		var c = values[2];
		var d = values[3];

		var scale = Math.sqrt(a * a + b * b);
		sin = b / scale;
		nowAngle = Math.atan2(b, a) * (180 / Math.PI);
		if (nowAngle < 0) nowAngle = (nowAngle + 360) % 360;
	}

	var tr = st.getPropertyValue("transform-origin");

	var left = parseFloat(st.getPropertyValue("left").split("px")[0]);
	var top = parseFloat(st.getPropertyValue("top").split("px")[0]);
	var width = parseFloat(st.getPropertyValue("width").split("px")[0]);
	var height = parseFloat(st.getPropertyValue("height").split("px")[0]);
	var borderThickness = parseFloat(
		st.getPropertyValue("border").split("px")[0]
	);
	if (!tg.localName.startsWith("x-textbox")) {
		width += borderThickness * 2;
		height += borderThickness * 2;
	}
	var xy = tr.split("px");
	var x = 0;
	var y = 0;
	var cx = left + parseFloat(xy[0]);
	var cy = top + parseFloat(xy[1]);

	if (pointCenterX != null) {
		x = pointCenterX;
		y = pointCenterY;
		//cx = left;
		//cy = top;
	} else {
		x = left + width * (anchorX / 100);
		y = top + height * (anchorY / 100);
	}

	var radians = (Math.PI / 180) * nowAngle * reverse;
	var cos = Math.cos(-radians);
	var sin = Math.sin(-radians);
	var nx = cos * (x - cx) + sin * (y - cy) + cx;
	var ny = cos * (y - cy) - sin * (x - cx) + cy;

	return [nx, ny, width, height, left, top, cx, cy, x, y, nowAngle];
}

function RotatePointByPoint(x, y, cx, cy, nowAngle, reverse) {
	var radians = (Math.PI / 180) * nowAngle * reverse;
	var cos = Math.cos(-radians);
	var sin = Math.sin(-radians);
	var nx = cos * (x - cx) + sin * (y - cy) + cx;
	var ny = cos * (y - cy) - sin * (x - cx) + cy;

	return [nx, ny, cx, cy, x, y, nowAngle];
}

function GroupResizing(group) {
	var unionRectPoints = null;
	for (i = 0; i < group.children[0].children.length; i++) {
		var child = group.children[0].children[i];
		var st = window.getComputedStyle(child, null);
		var nowAngle = GetAngle(child);
		var left = parseFloat(st.getPropertyValue("left").split("px")[0]);
		var top = parseFloat(st.getPropertyValue("top").split("px")[0]);
		var width = parseFloat(st.getPropertyValue("width").split("px")[0]);
		var height = parseFloat(st.getPropertyValue("height").split("px")[0]);

		// 개체가 회전했다면 회전한 곳의 position을 계산해야한다. 기존의 position은 회전하기 전의 position
		if (nowAngle != 0) {
			var xy = RotatePoint(
				child,
				null,
				null,
				left + width / 2,
				top + height / 2,
				1
			);
			left = xy[0] - width / 2;
			top = xy[1] - height / 2;
		}

		if (unionRectPoints == null)
			unionRectPoints = [left, left + width, top, top + height];
		else {
			unionRectPoints = UnionPointsByRect(unionRectPoints, [
				left,
				left + width,
				top,
				top + height
			]);
		}
	}

	var gSt = window.getComputedStyle(group, null);
	var tr = gSt.getPropertyValue("transform-origin").split("px");
	var gLeft = parseFloat(gSt.getPropertyValue("left").split("px")[0]);
	var gTop = parseFloat(gSt.getPropertyValue("top").split("px")[0]);

	var anchorPoint = [parseFloat(tr[0]) + gLeft, parseFloat(tr[1]) + gTop];
	var unionRect = [
		unionRectPoints[0],
		unionRectPoints[2],
		unionRectPoints[1] - unionRectPoints[0],
		unionRectPoints[3] - unionRectPoints[2]
	];

	//unionRect의 x,y는 group 기준 좌표이므로 group의 좌표가 0,0이 될수 있게 변경해야한다.
	$(group).css("width", unionRect[2]);
	$(group).css("height", unionRect[3]);
	$(group).css("left", gLeft + unionRect[0]);
	$(group).css("top", gTop + unionRect[1]);

	//group의 child1인 container도 변경해줘야한다.
	var container = document.getElementById($(group).attr("id") + "_container");
	$(container).css("width", unionRect[2]);
	$(container).css("height", unionRect[3]);
	//$(container).css("left", gLeft + unionRect[0]);
	//$(container).css("top", gTop + unionRect[1]);

	for (i = 0; i < group.children[0].children.length; i++) {
		var child = group.children[0].children[i];
		var st = window.getComputedStyle(child, null);
		var left = parseFloat(st.getPropertyValue("left").split("px")[0]);
		var top = parseFloat(st.getPropertyValue("top").split("px")[0]);

		$(child).css("left", left - unionRect[0]);
		$(child).css("top", top - unionRect[1]);
	}

	ChangeAnchorPoint(group, anchorPoint);
	ChangeAnchorRate(group, [50, 50]);
	return unionRect;
}

function UnionPointsByRect(point1, point2) {
	var points = [point1[0], point1[0], point2[0], point2[0]]; // xMin, xMax, yMin, yMax,

	if (point1[0] > point2[0]) points[0] = point2[0];
	else points[0] = point1[0];

	if (point1[1] < point2[1]) points[1] = point2[1];
	else points[1] = point1[1];

	if (point1[2] > point2[2]) points[2] = point2[2];
	else points[2] = point1[2];

	if (point1[3] < point2[3]) points[3] = point2[3];
	else points[3] = point1[3];

	return points;
}

// 개체의 이전 anchorPoint로 돌리기 위해 anchorRate를 다시 계산하는 함수
// tg = 변경할 타겟, wantPoint = array[이전 anchorPoint pointX, pointY]
function ChangeAnchorPoint(tg, wantPoint) {
	var st = window.getComputedStyle(tg, null);
	var left = parseFloat(st.getPropertyValue("left").split("px")[0]);
	var top = parseFloat(st.getPropertyValue("top").split("px")[0]);
	var width = parseFloat(st.getPropertyValue("width").split("px")[0]);
	var height = parseFloat(st.getPropertyValue("height").split("px")[0]);

	var anchorRateX = ((wantPoint[0] - left) / width) * 100;
	var anchorRateY = ((wantPoint[1] - top) / height) * 100;

	$(tg).css("transform-origin", anchorRateX + "% " + anchorRateY + "%");
}

// 회전한 개체의 AnchorRate를 변경하기 위해 개체의 position을 같이 바꿔주는 함수
// tg = 변경할 타겟, wantRate = array[원하는 백분율% rateX, rateY]
function ChangeAnchorRate(tg, wantRate) {
	var xy = RotatePoint(tg, wantRate[0], wantRate[1], null, null, 1);

	// xy = [nx, ny, width, height, left, top cx, cy, x, y];
	$(tg).css("left", xy[0] - (xy[2] * wantRate[0]) / 100);
	$(tg).css("top", xy[1] - (xy[3] * wantRate[1]) / 100);
	$(tg).css("transform-origin", wantRate[0] + "% " + wantRate[1] + "%");
}