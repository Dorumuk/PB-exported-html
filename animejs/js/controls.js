// time line
// 1) basic
// Create a timeline with default parameters
var controlsProgressEl = document.querySelector('.play-pause-demo .progress');
var animation = anime({
  targets: '.play-pause-demo .el',
  translateX: 270,
  delay: function(el, i) { return i * 100; },
  direction: 'alternate',
  loop: true,
  autoplay: false,
  easing: 'easeInOutSine',
  update: function () {
    controlsProgressEl.value = animation.progress;
  }
});

document.querySelector('.play-pause-demo .play').onclick = animation.play;
document.querySelector('.play-pause-demo .pause').onclick = animation.pause;
document.querySelector('.play-pause-demo .restart').onclick = animation.restart;
document.querySelector('.play-pause-demo .reverse').onclick = animation.reverse;

controlsProgressEl.addEventListener('input', function() {
  animation.seek(animation.duration * (controlsProgressEl.value / 100));
});