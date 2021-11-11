// start stop all
function startStopAll(params) {
	setTimeout(function () {
		for (let tg of params.target) {

			const startHideShow = jQuery.data(tg, "startHideShow");
			const startMove = jQuery.data(tg, "startMove");
			const startScaleMove = jQuery.data(tg, "startScaleMove");
			const startRotate = jQuery.data(tg, "startRotate");
			const startFlip = jQuery.data(tg, "startFlip");
			const startCurve = jQuery.data(tg, "startCurve");
			const startFade = jQuery.data(tg, "startFade");
			const blinkSetTimer = jQuery.data(tg, "blink_setTimer");
			const blinkTimer = jQuery.data(tg, "blink_timer");

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
				let curveTimer = jQuery.data($(params.target[0]).get(0), "curveTimer");

				if (typeof curveTimer == "undefined") {
					curveTimer = jQuery.data(tg, "curveTimer");
				}
				clearInterval(curveTimer);
			} catch (err) {
				console.log("curveTimerErr : " + err);
			}

			try {
				let aniTimer = jQuery.data($(tg).get(0), "animation_Timer");
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
	let startHideShowTimer;
	for (const tg of params.target) {
		if (tg == null) alert("null box");
		try {
			const blink_timer =
				"clearInterval(" + replaceAll(tg.id, "cvs", "blink_timer") + ")";
			eval(blink_timer);
			const blink_setTimer =
				"clearInterval(" + replaceAll(tg.id, "cvs", "blink_setTimer") + ")";
			eval(blink_setTimer);
			eval(blink_setTimer);
		} catch (e) { }
		startHideShowTimer = setTimeout(function () {
			if (params.actSubType == "Hide") {
				$(tg).addClass("collapse");
				if (videobox == tg) {
					videobox.pause();
					videobox = null;
				}
			} else {
				$(tg).removeClass("collapse");

				if (params.callfunc) {
					const fnstring = params.callfunc;
					const fn = window[fnstring];
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
	for (const tg of params.target) {
		const originOpacity = $(tg).css("opacity");
		const test = $(tg).css("display");
		console.log(originOpacity, test);
		console.log(params);

		let easingVar = "";
		switch (params.aniTiming) {
			case 0: easingVar = "linear"; break;
			case 1: easingVar = "easeInCubic"; break;
			case 2: easingVar = "easeOutCubic"; break;
			case 3: easingVar = "easeInOutCubic"; break;
		}
		const animDelay = params.delay - params.startTime;
		const work = {
			duration: params.duration,
			opacity: params.opacity
		}
		$(tg).show();
		const startFadeTimerId = setTimeout(() => {
			const tl = anime.timeline({
				targets: tg,
				loop: params.repeatForever === "Y" || params.repeatCount + 1,
				easing: easingVar,
				complete: function (anim) {
					if (params.repeatForever === "Y" || params.repeatCount > 0) return;
					if (params.reverse === "Y") {
						setTimeout(() => distributeNextAction(params.nextAction), params.waitingTime);
					} else {
						distributeNextAction(params.nextAction);
					}
				}
			})
			if (params.reverse !== "Y") {
				tl.add ({...work, endDelay: animDelay})
			} else {
				tl
				.add (work)
				.add ({
					duration: params.revDuration,
					opacity: Math.abs(params.opacity - 1), // origin opacity
					delay: params.waitingTime,
					endDelay: animDelay
				})
			}
		}, params.startTime);
		jQuery.data(tg, "startFade", startFadeTimerId);
	}
}
/**start Move */
function startMove(params) {
	if (params.actSubType === "Curve To") {
		makeCurve(params);
		return;
	}
	let easingVar = "";
	switch (params.aniTiming) {
		case 0: easingVar = "linear"; break;
		case 1: easingVar = "easeInCubic"; break;
		case 2: easingVar = "easeOutCubic"; break;
		case 3: easingVar = "easeInOutCubic"; break;
	}

	for (const tg of params.target) {
		const groupCheck = IsGroup(tg);
		const absX = Number($(tg).css("left").replace("px", ""));
		const absY = Number($(tg).css("top").replace("px", ""));
		let absToX = params.toX; // absoulte destination X
		let absToY = params.toY;

		if (groupCheck === "GroupChild") {
			const groupTg = tg.parentElement.parentElement;
			const st = window.getComputedStyle(tg, null);
			const width = parseFloat(st.getPropertyValue("width").split("px")[0]);
			const height = parseFloat(st.getPropertyValue("height").split("px")[0]);
			const left = parseFloat(st.getPropertyValue("left").split("px")[0]);
			const top = parseFloat(st.getPropertyValue("top").split("px")[0]);

			const gSt = window.getComputedStyle(groupTg, null);
			const gLeft = parseFloat(gSt.getPropertyValue("left").split("px")[0]);
			const gTop = parseFloat(gSt.getPropertyValue("top").split("px")[0]);

			const xy = RotatePoint(
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

			const leftTopCenter = RotatePoint(
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

		if (params.actSubType === "Move By") {
			absToX = params.toX + absX;
			absToY = params.toY + absY;
		}
		let loopCount = params.repeatCount + 1;
		// reverse일 경우 loopCount를 2배 곱해줘야 terget이 왕복을 한다.
		if (params.reverse === "Y") {
			loopCount = loopCount * 2;
		}

		anime({
			targets: tg,
			left: absToX,
			top: absToY,
			loop: params.repeatForever === "Y" || loopCount,
			duration: params.duration,
			easing: easingVar,
			direction: params.reverse === "Y"? "alternate" : "normal",
			delay: params.delay, // delay도 loop에 적용되는지 확인필요
			complete: function (anim) {
				if (params.repeatForever === "Y" || params.repeatCount > 0) return;

				if (params.reverse === "Y") {
					setTimeout(() => distributeNextAction(params.nextAction), params.waitingTime);
				} else {
					distributeNextAction(params.nextAction);
				}
			}
		});
	}
}
/**
 * @returns "NonGroup" or "GroupChild" or "Group"
 */
function IsGroup(target) {
	if (target == null) return "NonGroup";
	return target.id.split("_")[2] || "NonGroup";
}

function makeCurve(params) {
	console.log(params);
	for (const tg of params.target) {
		let drawnAttr = params.elements; // d(drawn) attribute in path tag
		if (jQuery.data($(params.target[0]).get(0), "reverse") === "Y") {
			drawnAttr = params.reverselements;
		} else {
			drawnAttr = params.elements;
		}
		const curveObj = {
			path : document.createElementNS("http://www.w3.org/2000/svg", "path"),
			len : function () {
				return this.path.getTotalLength();
			}
		}
		const pathEl = document
			.createElementNS("http://www.w3.org/2000/svg", "path")
			.setAttribute("d", drawnAttr);
		const path = anime.path("path");
		const startCurveTimer = setTimeout(function () {
			(function updateFromCode(doNotUpdatePath) {
				tg.style.position = "absolute";
				anime({
					targets: tg,
					translateX: path('x'),
					translateY: path('y'),
					// rotate: path('angle'),
					easing: 'linear',
					duration: 2000,
					// loop: true
				});
				// curveObj.animate(params, params.duration / 1000, function (point, angle) {
				// 	tg.style.left = point.x - $(tg).width() / 2 + "px";
				// 	tg.style.top = point.y - $(tg).height() / 2 + "px";
				// });
				if (!doNotUpdatePath) {
					fireEvent(pathEl, "updated");
				}
			})();

			function fireEvent(el, name) {
				var e = document.createEvent("Event");
				console.log(e);
				e.initEvent(name, true, true);
				try {
					el.dispatchEvent(e);
				} catch (err) { }
			}
		}, params.delay);
		jQuery.data(tg, "startCurve", startCurveTimer);
	}
}
/**start scale move */
function startScaleMove(params) {
	for (const tg of params.target) {
		const absX = Number($(tg).css("left").replace("px", ""));
		const absY = Number($(tg).css("top").replace("px", ""));
		const originWidth = $(params.target).width();
		const originHeight = $(params.target).height();
		const groupCheck = IsGroup(tg);

		let easingVar = "";
		switch (params.aniTiming) {
			case 0: easingVar = "linear"; break;
			case 1: easingVar = "easeInCubic"; break;
			case 2: easingVar = "easeOutCubic"; break;
			case 3: easingVar = "easeInOutCubic"; break;
		}

		let absToX = params.toX;
		let absToY = params.toY;

		if (groupCheck === "Group") {
			// var groupRect = GroupResizing(tg);
		} else if (groupCheck === "GroupChild") {
			const groupTg = tg.parentElement.parentElement;
			const st = window.getComputedStyle(tg, null);
			const tr = st.getPropertyValue("transform-origin").split("px");
			const width = parseFloat(st.getPropertyValue("width").split("px")[0]);
			const height = parseFloat(st.getPropertyValue("height").split("px")[0]);
			const left = parseFloat(st.getPropertyValue("left").split("px")[0]);
			const top = parseFloat(st.getPropertyValue("top").split("px")[0]);

			const gSt = window.getComputedStyle(groupTg, null);
			const gLeft = parseFloat(gSt.getPropertyValue("left").split("px")[0]);
			const gTop = parseFloat(gSt.getPropertyValue("top").split("px")[0]);
			const gNowAngle = GetAngle(groupTg);
			const xy = RotatePoint(
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

			const scaleWidth = parseFloat(params.scaleWidth.split("px")[0]);
			const scaleHeight = parseFloat(params.scaleHeight.split("px")[0]);

			if (gNowAngle != 0) {
				// 그룹이 회전한 각도에 따라 scale 방향이 바뀐다.
				const scaleRotateXY = RotatePointByPoint(
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

			const leftTopCenter = RotatePoint(
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

		const animDelay = params.delay - params.startTime;
		const work = {
			duration: params.duration,
			left: absToX,
			top: absToY,
			scaleX: parseFloat(params.scaleWidth.split("px")[0]) / originWidth,
			scaleY: parseFloat(params.scaleHeight.split("px")[0]) / originHeight
		}
		const startScaleMoveTimerId = setTimeout(() => {
			const tl = anime.timeline({
				targets: tg,
				loop: params.repeatForever === "Y" || params.repeatCount + 1,
				easing: easingVar,
				complete: function (anim) {
					if (params.repeatForever === "Y" || params.repeatCount > 0) return;
					if (params.reverse === "Y") {
						setTimeout(() => distributeNextAction(params.nextAction), params.waitingTime);
					} else {
						distributeNextAction(params.nextAction);
					}
				}
			})
			if (params.reverse !== "Y") {
				tl.add ({...work, endDelay: animDelay})
			} else {
				tl
				.add (work)
				.add ({
					duration: params.revDuration,
					left: absX,
					top: absY,
					scaleX: 1,
					scaleY: 1,
					delay: params.waitingTime,
					endDelay: animDelay
				})
			}
		}, params.startTime);
		jQuery.data(tg, "startScaleMove", startScaleMoveTimerId);
	}
}
/**start rotate */
function startRotate(params) {
	// let startRotateTimer = null; // setTimeout의 ID
	let easingVar = "";
	switch (params.aniTiming) {
		case 0: easingVar = "linear"; break;
		case 1: easingVar = "easeInCubic"; break;
		case 2: easingVar = "easeOutCubic"; break;
		case 3: easingVar = "easeInOutCubic"; break;
	}

	for (var i = 0; i < params.target.length; i++) {
		var tg = params.target[i];
		var groupCheck = IsGroup(tg);

		var st = window.getComputedStyle(tg, null);
		var tr =
			st.getPropertyValue("transform") ||
			st.getPropertyValue("-webkit-transform") ||
			st.getPropertyValue("-moz-transform") ||
			st.getPropertyValue("-ms-transform") ||
			st.getPropertyValue("-o-transform");

		if (tr != null && tr != "none") {
			var values =
				tr.split("(")[1]
					.split(")")[0]
					.split(",");

			var a = values[0];
			var b = values[1];

			var scale = Math.sqrt(a * a + b * b);
			sin = b / scale;
			nowAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI) * 10) / 10;
			if (nowAngle < 0) nowAngle = (nowAngle + 360) % 360;
		}

		var tr = st.getPropertyValue("transform-origin");
		console.log(tr);

		var xy = RotatePoint(tg, params.anchorX, params.anchorY, null, null, 1);
		$(tg).css("left", xy[0] - xy[2] * (params.anchorX / 100)); //nx, width
		$(tg).css("top", xy[1] - xy[3] * (params.anchorY / 100)); // ny, height
		$(tg).css("transform-origin", params.anchorX + "% " + params.anchorY + "%");

		let loopCount = params.repeatCount + 1;
		let initialRotate = $(tg).css("rotate");
		let aniAngle = params.angle;
		if (params.reverse === "Y") {
			aniAngle = params.angle;
			revAngle = GetAngle(tg);

			if (groupCheck === "GroupChild"){
				aniAngle -= GetAngle(tg.parentElement.parentElement);
			}
		} else {
			if (typeof initialRotate === "string" || initialRotate instanceof String){
				initialRotate = initialRotate.replace("deg", "");
			}
			if (params.actSubType !== "Rotate By") {
				if (aniAngle == nowAngle) return;
			} else {
				aniAngle += parseFloat(initialRotate);
			}
		}

		const tl = anime.timeline({
			targets : tg,
			loop: params.repeatForever === "Y" || loopCount,
			duration: params.duration,
			easing : easingVar,
			delay : params.delay,
			complete: function (anim) {
				if (params.repeatForever === "Y" || params.repeatCount > 0) return;
				setTimeout(() => {
					if (params.nextAction != null) {
						distributeNextAction(params.nextAction);
					}
				}, params.waitingTime);
			},
		})
		if (params.reverse === "Y") {
			tl
			.add ({rotate : aniAngle})
			.add ({rotate : 0})
		} else {
			tl.add ({rotate : aniAngle})
		}
		// jQuery.data(tg, "startRotate", startRotateTimer);
	}
}
/**start flip */
function startFlip(params) {
	// var startFlipTimer;
	for (const tg of params.target) {
		// Flip에서는 aniTiming이 늘 -1로 적용되는 문제가 있어, 
		// easingVar를 아래와 같이 임시처리함. 2021.11.08
		const easingVar = "linear"; // ❗
		const aniAngle = -180;

		$(tg).css("-webkit-transform",
			`translateZ(${params.actSubType == "Flip X" ? $(tg).height() / 2 : $(tg).width() / 2})`);
		const tl = anime.timeline({
			targets : tg,
			loop: params.repeatForever === "Y" || params.repeatCount + 1,
			duration: params.duration,
			easing : easingVar,
			complete: function (anim) {
				if (params.repeatForever === "Y" || params.repeatCount > 0) return;
				setTimeout(() => {
					if (params.nextAction != null) {
						distributeNextAction(params.nextAction);
					}
				}, params.waitingTime);
			},
		})
		if (params.reverse === "Y") {
			tl
			.add ({delay : params.delay + 1})
			.add ({
				rotateY: params.actSubType === "Flip X" ? aniAngle : 0,
				rotateX: params.actSubType === "Flip Y" ? aniAngle : 0
			})
			.add ({
				rotateY: 0,
				rotateX: 0
			})
		} else {
			tl
			.add ({delay : params.delay + 1})
			.add ({
				rotateY: params.actSubType === "Flip X" ? aniAngle : 0,
				rotateX: params.actSubType === "Flip Y" ? aniAngle : 0
			})
		}
		// jQuery.data(tg, "startFlip", startFlipTimer);
	}
}