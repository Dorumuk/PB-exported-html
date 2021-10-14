// start stop all
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
/** start hide show */
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
/** start fade */
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
/**start Move */
function startMove(params) {
	console.log(params);
	if (params.actSubType === "Curve To") {
		makeCurve(params);
		return;
	}
	var startMoveTimer;
	var easingVar = "";

	switch (params.aniTiming) {
		case 0: easingVar = "linear"; break;
		case 1: easingVar = "easeInCubic"; break;
		case 2: easingVar = "easeOutCubic"; break;
		case 3: easingVar = "easeInOutCubic"; break;
	}

	for (var i = 0; i < params.target.length; i++) {
		var tg = params.target[i];
		var groupCheck = IsGroup(tg);

		const absX = Number($(tg).css("left").replace("px", ""));
		const absY = Number($(tg).css("top").replace("px", ""));
		const relX = tg.clientLeft;
		const relY = tg.clientTop;
		let absToX = params.toX;
		let absToY = params.toY;

		if (groupCheck === "Group") {
			var groupRect = GroupResizing(tg);
		} else if (groupCheck === "GroupChild") {
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
				absToX + width / 2,
				absToY + height / 2,
				-1
			);
			xy[0] -= gLeft;
			xy[1] -= gTop;
			absToX = xy[0] - width / 2;
			absToY = xy[1] - height / 2;

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
			absToX = params.toX + absX;
			absToY = params.toY + absY;
		}

		if (params.reverse == "Y") {
			startMoveTimer = setTimeout(function() {
				$(tg).animate(
					{
						left: absToX,
						top: absToY
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
						left: absToX,
						top: absToY
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
/** ❗👇Will change the function name to 
 * @returns "NonGroup" or "GroupChild" or "Group"
 */
function IsGroup(target) {
	if (target == null) return "NonGroup";
	return target.id.split("_")[2] || "NonGroup";
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
/**start scale move */
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

		var absToX = params.toX,
			absToY = params.toY;

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
				absToX + width / 2,
				absToY + height / 2,
				-1
			);
			xy[0] -= gLeft;
			xy[1] -= gTop;

			absToX = xy[0] - width / 2;
			absToY = xy[1] - height / 2;

			var scaleWidth = parseFloat(params.scaleWidth.split("px")[0]);
			var scaleHeight = parseFloat(params.scaleHeight.split("px")[0]);

			if (gNowAngle != 0) {
				// 그룹이 회전한 각도에 따라 scale 방향이 바뀐다.
				var scaleRotateXY = RotatePointByPoint(
					absToX + (scaleWidth * parseFloat(tr[0])) / width,
					absToY + (scaleHeight * parseFloat(tr[1])) / height,
					xy[0],
					xy[1],
					gNowAngle,
					-1
				);
				absToX = scaleRotateXY[0] - (scaleWidth * parseFloat(tr[0])) / width;
				absToY = scaleRotateXY[1] - (scaleHeight * parseFloat(tr[1])) / height;
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
						left: absToX,
						top: absToY
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
						left: absToX,
						top: absToY
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
/**start rotate */
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
/**start flip */
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