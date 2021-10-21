// animation parameters

// 1) css properties
// https://animejs.com/documentation/#unitlessValue

// 1) direction
var updates = 0;
const progressLogEl = document.querySelector('.update-demo .progressLogEl');
const updateLogEl = document.querySelector('.update-demo .progressLogEl');

anime({
    targets: '.update-demo .el',
    translateX: 270,
    delay: 1000,
    direction: 'alternate',
    loop: 3,
    easing: 'easeInOutCirc',
    update: function(anim) {
    updates++;
    progressLogEl.value = 'progress : '+Math.round(anim.progress)+'%';
    updateLogEl.value = 'updates : '+updates;
  }
});
