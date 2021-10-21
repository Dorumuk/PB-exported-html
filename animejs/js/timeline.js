// time line
// 1) basic
// Create a timeline with default parameters
var tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl
.add({
  targets: '.basic-timeline-demo .el1',
  translateX: 250,
})
.add({
  targets: '.basic-timeline-demo .el2',
  translateX: 250,
})
.add({
  targets: '.basic-timeline-demo .el3',
  translateX: 250,
});

// 2) time offsets
var tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

tl
.add({
  targets: '.offsets-demo .el1',
  translateX: 250,
})
.add({
  targets: '.offsets-demo .el2',
  translateX: 250,
  // relative offset : 위의 anim이 끝나는 시점을 기준으로 -500 더 빨리 시작한다
}, '-=500')
.add({
  targets: '.offsets-demo .el3',
  translateX: 250,
}, 500); // absolute offset : 위의 anim 상관없이 절대적인 시간에서 시작한다.

// 3) parameters inheritance
// var tl = anime.timeline({
//   targets: '.params-inheritance-demo .el',
//   delay: function(el, i) { return i * 200 },
//   duration: 500, // Can be inherited
//   easing: 'easeOutExpo', // Can be inherited
//   direction: 'alternate', // Is not inherited
//   loop: true // Is not inherited
// });

// tl
// .add({
//   translateX: 250,
//   // override the easing parameter
//   easing: 'spring',
// })
// .add({
//   opacity: .5,
//   scale: 2
// })
// .add({
//   // override the targets parameter
//   targets: '.params-inheritance-demo .el.triangle',
//   rotate: 180
// })
// .add({
//   translateX: 0,
//   scale: 1
// });