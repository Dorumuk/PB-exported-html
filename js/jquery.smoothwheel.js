/**
 * Created by IntelliJ IDEA.
 *
 * User: phil
 * Date: 15/11/12
 * Time: 11:04 AM
 *
 */
(function ($) {
    var self = this, container, running=false, currentX = 0, targetX = 0, oldX = 0, maxScrollLeft= 0, minScrollLeft, direction, onRenderCallback=null,
            fricton = 0.95, // higher value for slower deceleration
            vy = 0,
            stepAmt = 1,
            minMovement= 0.1,
            ts=0.1;

    var updateScrollTarget = function (amt) { //
        targetX += amt;
        vy += (targetX - oldX) * stepAmt;

        oldX = targetX;

    }
    var render = function () {
        if (vy < -(minMovement) || vy > minMovement) {

            currentX = (currentX + vy);
            if (currentX > maxScrollLeft) {
                currentX = vy = 0;
            } else if (currentX < minScrollLeft) {
                    vy = 0;
                    currentX = minScrollLeft;
                }
            container.oldScrollLeft = -currentX;
            console.log("render :: "+currentX);
            container.scrollLeft(-currentX);

            vy *= fricton;
         //   vy += ts * (currentX-targetX);
            // scrollLeftTweened += settings.tweenSpeed * (scrollLeft - scrollLeftTweened);
            // currentX += ts * (targetX - currentX);

            if(onRenderCallback){
                onRenderCallback();
            }
        }
    }
    var animateLoop = function () {
        if(! running)return;
        requestAnimFrame(animateLoop);
        render();
        //log("45","animateLoop","animateLoop", "",stop);
    }
    var onWheel = function (e) {
        e.preventDefault();
        var evt = e.originalEvent;

        var delta = evt.detail ? evt.detail * -1 : evt.wheelDelta / 40; //wheelDelta - 이동거리측정값.
        console.log("wheel :: "+delta);
        var dir = delta > 0 ? -1 : 1;
        if (dir != direction) {
            vy = 0;
            direction = dir;
        }

        //reset currentX in case non-wheel scroll has occurred (scrollbar drag, etc.)
        currentX = -container.scrollLeft();

        updateScrollTarget(delta);

        if(!running){
            running=true;
            animateLoop();
        }
    }

    var onDrag = function (e) {
        //e.preventDefault();
        var evt = e;
        var delta = 0-((container.width()*(container.drag_start_point - window.event.clientX)) / 120) / 40; //wheelDelta - 이동거리측정값.
        console.log("drag :: "+delta);
        var dir = delta > 0 ? 1 : 1;
        if (dir != direction) {
            vy = 0;
            direction = dir;
        }

        //reset currentX in case non-wheel scroll has occurred (scrollbar drag, etc.)
        currentX = -container.scrollLeft();

        updateScrollTarget(delta);

        if(!running){
            running=true;
            animateLoop();
        }
    }

    /*
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };


    })();

    /*
     * http://jsbin.com/iqafek/2/edit
     */
    var normalizeWheelDelta = function () {
        // Keep a distribution of observed values, and scale by the
        // 33rd percentile.
        var distribution = [], done = null, scale = 30;
        return function (n) {
            // Zeroes don't count.
            if (n == 0) return n;
            // After 500 samples, we stop sampling and keep current factor.
            if (done != null) return n * done;
            var abs = Math.abs(n);
            // Insert value (sorted in ascending order).
            outer: do { // Just used for break goto
                for (var i = 0; i < distribution.length; ++i) {
                    if (abs <= distribution[i]) {
                        distribution.splice(i, 0, abs);
                        break outer;
                    }
                }
                distribution.push(abs);
            } while (false);
            // Factor is scale divided by 33rd percentile.
            var factor = scale / distribution[Math.floor(distribution.length / 3)];
            if (distribution.length == 500) done = factor;
            return n * factor;
        };
    }();


    $.fn.smoothWheel_X = function () {
        //  var args = [].splice.call(arguments, 0);
        var options = jQuery.extend({}, arguments[0]);
        return this.each(function (index, elm) {
            if(!('ontouchstart' in window)){
                container = $(this);
                container.find("*").attr("draggable","true");
                container.bind("mousewheel", onWheel);
                container.bind("DOMMouseScroll", onWheel);
                $(".pagelist *").bind("dragstart", function(event){
                  event.stopPropagation();
                  container.drag_start_point = window.event.clientX;
                  event.dataTransfer = event.originalEvent.dataTransfer;
                  container.clone = $(event.currentTarget).clone();
                  container.clone.insertAfter($(event.currentTarget));
                  $(event.currentTarget).addClass("moving");
                  $(event.currentTarget).css({opacity: 0});

                  var crt = this.cloneNode(true);
                  crt.style.backgroundColor = "red";
                  crt.style.position = "absolute";
                  crt.style.top = "0px";
                  crt.style.right = "0px";
                  crt.style.opacity = 0;
                  document.body.appendChild(crt);
                  event.dataTransfer.setDragImage(crt, 0, 0);
                });
                $(".pagelist *").bind("dragend", function(event){
                  container.clone.remove();
                  $(event.currentTarget).css({opacity: 1});
                  $(event.currentTarget).removeClass("moving");
                });
                container.bind("dragover", onDrag);
                container.bind("mousedown",function(event){
                  running=false;
                });
                //set target/old/current X to match current scroll position to prevent jump to top of container
                targetX = oldX = container.get(0).scrollLeft;
                currentX = -targetX;

                minScrollLeft = container.get(0).clientWidth - container.get(0).scrollWidth;
                if(options.onRender){
                    onRenderCallback = options.onRender;
                }
                if(options.remove){
                    log("122","smoothWheel","remove", "");
                    running=false;
                    container.unbind("mousewheel", onWheel);
                    container.unbind("DOMMouseScroll", onWheel);
                }

            }
        });
    };


})(jQuery);









(function ($) {
    var self = this, container, running=false, currentY = 0, targetY = 0, oldY = 0, maxScrollTop, minScrollTop= 0, direction, onRenderCallback=null,
            fricton = 0.95, // higher value for slower deceleration
            vy = 0,
            stepAmt = 1,
            minMovement= 0.1,
            ts=0.1;

    var updateScrollTarget = function (amt) { //
        targetY += amt;
        vy += (targetY - oldY) * stepAmt;

        oldY = targetY;

    }
    var render = function () {
        if (vy < -(minMovement) || vy > minMovement) {

            currentY = (currentY + vy);
            if (currentY > maxScrollTop) {
                currentY = vy = 0;
            } else if (currentY < minScrollTop) {
                    vy = 0;
                    currentY = minScrollTop;
                }
            container.oldScrollTop = -currentY;
            console.log("render :: "+currentY);
            container.scrollTop(-currentY);

            vy *= fricton;
         //   vy += ts * (currentY-targetY);
            // scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);
            // currentY += ts * (targetY - currentY);

            if(onRenderCallback){
                onRenderCallback();
            }
        }
    }
    var animateLoop = function () {
        if(! running)return;
        requestAnimFrame(animateLoop);
        render();
        //log("45","animateLoop","animateLoop", "",stop);
    }
    var onWheel = function (e) {
        e.preventDefault();
        var evt = e.originalEvent;

        var delta = evt.detail ? evt.detail * -1 : evt.wheelDelta / 40; //wheelDelta - 이동거리측정값.
        console.log("wheel :: "+delta);
        var dir = delta > 0 ? -1 : 1;
        if (dir != direction) {
            vy = 0;
            direction = dir;
        }

        //reset currentY in case non-wheel scroll has occurred (scrollbar drag, etc.)
        currentY = -container.scrollTop();

        updateScrollTarget(delta);

        if(!running){
            running=true;
            animateLoop();
        }
    }

    var onDrag = function (e) {
        //e.preventDefault();
        var evt = e;
        var delta = 0-((container.height()*(container.drag_start_point - window.event.clientY)) / 120) / 40; //wheelDelta - 이동거리측정값.
        console.log("drag :: "+delta);
        var dir = delta > 0 ? -1 : 1;
        if (dir != direction) {
            vy = 0;
            direction = dir;
        }

        //reset currentY in case non-wheel scroll has occurred (scrollbar drag, etc.)
        currentY = -container.scrollTop();

        updateScrollTarget(delta);

        if(!running){
            running=true;
            animateLoop();
        }
    }

    /*
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };


    })();

    /*
     * http://jsbin.com/iqafek/2/edit
     */
    var normalizeWheelDelta = function () {
        // Keep a distribution of observed values, and scale by the
        // 33rd percentile.
        var distribution = [], done = null, scale = 30;
        return function (n) {
            // Zeroes don't count.
            if (n == 0) return n;
            // After 500 samples, we stop sampling and keep current factor.
            if (done != null) return n * done;
            var abs = Math.abs(n);
            // Insert value (sorted in ascending order).
            outer: do { // Just used for break goto
                for (var i = 0; i < distribution.length; ++i) {
                    if (abs <= distribution[i]) {
                        distribution.splice(i, 0, abs);
                        break outer;
                    }
                }
                distribution.push(abs);
            } while (false);
            // Factor is scale divided by 33rd percentile.
            var factor = scale / distribution[Math.floor(distribution.length / 3)];
            if (distribution.length == 500) done = factor;
            return n * factor;
        };
    }();


    $.fn.smoothWheel_Y = function () {
      console.log("yyyyyyyyyyyyyyyyy");
        //  var args = [].splice.call(arguments, 0);
        var options = jQuery.extend({}, arguments[0]);
        return this.each(function (index, elm) {
            if(!('ontouchstart' in window)){
                container = $(this);
                container.find("*").attr("draggable","true");
                container.bind("mousewheel", onWheel);
                container.bind("DOMMouseScroll", onWheel);
                $(".pagelist *").bind("dragstart", function(event){
                  event.stopPropagation();
                  container.drag_start_point = window.event.clientY;
                  event.dataTransfer = event.originalEvent.dataTransfer;
                  container.clone = $(event.currentTarget).clone();
                  container.clone.insertAfter($(event.currentTarget));
                  $(event.currentTarget).addClass("moving");
                  $(event.currentTarget).css({opacity: 0});

                  var crt = this.cloneNode(true);
                  crt.style.backgroundColor = "red";
                  crt.style.position = "absolute";
                  crt.style.top = "0px";
                  crt.style.right = "0px";
                  crt.style.opacity = 0;
                  document.body.appendChild(crt);
                  event.dataTransfer.setDragImage(crt, 0, 0);
                });
                $(".pagelist *").bind("dragend", function(event){
                  container.clone.remove();
                  $(event.currentTarget).css({opacity: 1});
                  $(event.currentTarget).removeClass("moving");
                });
                container.bind("dragover", onDrag);
                container.bind("mousedown",function(event){
                  running=false;
                });
                //set target/old/current Y to match current scroll position to prevent jump to top of container
                targetY = oldY = container.get(0).scrollTop;
                currentY = -targetY;

                minScrollTop = container.get(0).clientHeight - container.get(0).scrollHeight;
                if(options.onRender){
                    onRenderCallback = options.onRender;
                }
                if(options.remove){
                    log("122","smoothWheel","remove", "");
                    running=false;
                    container.unbind("mousewheel", onWheel);
                    container.unbind("DOMMouseScroll", onWheel);
                }

            }
        });
    };


})(jQuery);
