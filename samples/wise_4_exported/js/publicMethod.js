var BrowserCheck = function() {

    /*** 1. IE 버전 체크 ***/
    // IE old version ( IE 10 or Lower )
    var agent = navigator.userAgent.toLowerCase();
    var browser;
    if (agent.indexOf('msie') > -1) {
        browser = 'ie' + agent.match(/msie (\d+)/)[1]
    }
    else if (agent.indexOf('trident') > -1) { browser = 'ie11' }
    else if (agent.indexOf('edge') > -1) { browser = 'edge' }
    else if (agent.indexOf('firefox') > -1) { browser = 'firefox' }
    else if (agent.indexOf('opr') > -1) { browser = 'opera' }
    else if (agent.indexOf('chrome') > -1) { browser = 'chrome' }
    else if (agent.indexOf('safari') > -1) { browser = 'safari' }

    return browser;
};

var Shape_PushAction = function(e) {
    if (e.type == 'mousedown' && isTouchDevice == true) return;
    e.preventDefault();
    e.stopPropagation();
    $('body').css({ userSelect: 'none' });
    var target = this;
    var img1 = jQuery.data(target, "img1");
    var img2 = jQuery.data(target, "img2");
    var isImageElement = img1 != undefined && img2 != undefined;
    if (isImageElement) {
        var actioninfo = makeObj(img1, img2);
        actioninfo.state = $(this).attr('data-toggle-checked') != undefined & $(this).attr('data-toggle-checked') == 'true';
        var container = this.querySelector('.contents > img');
        startToggle({ actType: 15, obj: actioninfo, actSubType: 'Toggle', target: [container], startTime: 0, delay: 0, duration: 0 });
        $(this).attr('data-toggle-checked', actioninfo.state);
    }
    else startFade({ actType: 2, actSubType: 'Fade To', target: [target], opacity: 0.50, startTime: 0, delay: 0, duration: 0 });
    $(document).one('mouseup touchend', function (e) {
        $('body').css({ userSelect: 'auto' });
        if (e.type == 'mouseup' && isTouchDevice == true) return;
        e.preventDefault();
        e.stopPropagation();
        if (isImageElement) {
            var actioninfo = makeObj(img1, img2);
            actioninfo.state = $(this).attr('data-toggle-checked') != undefined & $(this).attr('data-toggle-checked') == 'true';
            var container = this.querySelector('.contents > img');
            startToggle({ actType: 15, obj: actioninfo, actSubType: 'Toggle', target: [container], startTime: 0, delay: 0, duration: 0 });
            $(this).attr('data-toggle-checked', actioninfo.state);
        }
        else
            startFade({ actType: 2, actSubType: 'Fade To', target: [target], opacity: 1.00, startTime: 0, delay: 0, duration: 0 });
    });
};


var Shape_ToggleAction = function (e) {
    if (e.type == 'mouseup' && isTouchDevice == true) return;
    e.stopPropagation();
    var img1 = jQuery.data(this, "img1");
    var img2 = jQuery.data(this, "img2");
    var actioninfo = makeObj(img1, img2);
    actioninfo.state = $(this).attr('data-toggle-checked') != undefined & $(this).attr('data-toggle-checked') == 'true';
    var container = this.querySelector('.contents > img');
    startToggle({ actType: 15, obj: actioninfo, actSubType: 'Toggle', target: [container], startTime: 0, delay: 0, duration: 0 });
    $(this).attr('data-toggle-checked', actioninfo.state);
};

var Shape_StartBlink = function (index, shape) {
    if ($(shape).css('display') == 'none') {
        return;
    }
    var imgArr = [jQuery.data(shape, "img1"), jQuery.data(shape, "img2")];
    var duration = jQuery.data(shape, "duration");
    var interval = jQuery.data(shape, "interval");
    if (isNaN(Number(duration)) || isNaN(Number(interval))) return;

    var blinkStart = setInterval(function () {
        if (imgArr[0] != undefined && imgArr[1] != undefined) {
            var actioninfo = makeObj(img1, img2);
            actioninfo.state = $(this).attr('data-toggle-checked') != undefined & $(this).attr('data-toggle-checked') == 'true';
            var container = this.querySelector('.contents > img');
            startToggle({ actType: 15, obj: actioninfo, actSubType: 'Toggle', target: [container], startTime: 0, delay: 0, duration: 0 });
            $(this).attr('data-toggle-checked', actioninfo.state);
        }
        else shapeBlink(shape);
    }, interval);

    var blinkStop = function () {
        setTimeout(function () {
            stopShapeBlink(shape, 'Y');
            clearInterval(blinkStart);
            clearTimeout(blinkStop);
            RemovedClass(shape, 'blinkStyle');
        }, duration);
    };

    var isHidden = jQuery.data(shape, "hidden");
    if (!shape.hidden) blinkStop();
};

function AppendClass(elt, className) {
    if (elt == undefined) return;
    var isChecked = ($(elt).attr('class') == undefined ? false : $(elt).attr('class').indexOf(className) != -1) | $(elt).hasClass(className);
    if (!isChecked) {
        $(elt).addClass(className);
        if (!$(elt).hasClass(className))
        {
            var oriClass = $(elt).attr('class');
            if (oriClass != undefined) className = oriClass + className;
            $(elt).attr('class', className);
        }
    }
}

function RemovedClass(elt, className) {
    if (elt == undefined) return -1;
    if ($(elt).attr('class') == undefined || $(elt).attr('class').indexOf(className) == -1 || !$(elt).hasClass(className)) return;
    else {
        var rep = $(elt).attr('class').replace(className, "");
    }
}

function TextBox_Initialize() {
    //if (!String.prototype.startsWith) {
    //    String.prototype.startsWith = function (searchString, position) {
    //        return this.substr(position || 0, searchString.length) === searchString;
    //    };
    //}
    //var isIE = BrowserCheck().startsWith("ie");
    var res = /[^0-9.]/g;
    $('x-textbox p:first-child').each(function (i, p) {
        var parent = $(p).parent();
        if (parent.children().first()[0] === p) {
            $(p).css("margin-top", '0rem');
        } else if (parent.children().last()[0] === p) {
            $(p).css("margin-bottom", '0rem');
        }
        var maxfontsize = 0;
        $(p).children().each(function (i, span) {
            maxfontsize = Math.max(maxfontsize, parseFloat($(span).css('font-size').replace(res, "")));

            //var fsize = 16;
            //var ptag = $(span).closest('p');
            //var res = /[^0-9.]/g;

            //var pfs = parseFloat($(ptag).css('font-size').replace(res, ""));
            //var plh = parseFloat($(ptag).css('line-height').replace(res, ""));
            //var sfs = parseFloat($(span).css('font-size').replace(res, ""));
            //if (!$(ptag).hasClass('fsize') || sfs < pfs) {
            //    $(ptag).addClass('fsize');
            //    $(ptag).css('font-size', (sfs / fsize) + 'rem');
            //    pfs = sfs;
            //    if (!isIE) {
            //        var heights = ptag.map(function(i, e) {
            //            return e.offsetHeight;
            //        }).get();
            //        var per = 0;
            //        if (1 >= (heights[0] / plh)) {
            //            per = Math.floor((heights[0] - span.offsetHeight) * 0.4 / (heights[0] + sfs) * 100);
            //        } else {
            //            per = Math.floor(((heights[0] / plh) - (span.offsetHeight / plh)) * 0.5 / 100);
            //            $(ptag).css('letter-spacing', '0rem');
            //        }
            //        $(ptag).css('transform', 'translateY(' + per + '%)');
            //    }
            //}
        });
        //if (maxfontsize != 0) {
        //    $(p).css('font-size', (maxfontsize / 16.0) + 'rem');
        //    $(p).css('line-height', '150%');
        //}
    });
}

$(document).ready(function () {
    $('.blinkStyle').each(Shape_StartBlink);
    $('.pushStyle').on('mousedown touchstart', Shape_PushAction);
    $('.toggleStyle').on('mouseup touchend', Shape_ToggleAction);
    //TextBox_Initialize();
});

