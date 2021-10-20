// values
// 1) untless
anime({
  targets: '.css-demo .el1',
  translateX: 250, // -> '250px'
  rotate: 540 // -> '540deg'
});
// 2) specific unit
anime({
  targets: '.css-demo .el2',
  width: '100%', // -> from '28px' to '100%',
  easing: 'easeInOutQuad',
  direction: 'alternate',
  loop: true
});

// 3) relative
// var relativeEl = document.querySelector('.el.relative-values');
// relativeEl.style.transform = 'translateX(100px)';

// anime({
//   targets: '.el.relative-values',
//   translateX: {
//     value: '*=2.5', // 100px * 2.5 = '250px'
//     duration: 1000
//   },
//   width: {
//     value: '-=20px', // 28 - 20 = '8px'
//     duration: 1800,
//     easing: 'easeInOutSine'
//   },
//   rotate: {
//     value: '+=2turn', // 0 + 2 = '2turn'
//     duration: 1800,
//     easing: 'easeInOutSine'
//   },
//   direction: 'alternate'
// });

// 4) colors
// var colorsExamples = anime.timeline({
//   endDelay: 1000,
//   easing: 'easeInOutQuad',
//   direction: 'alternate',
//   loop: true
// })
// .add({ targets: '.color-hex',  background: '#FFF' }, 0)
// .add({ targets: '.color-rgb',  background: 'rgb(255,255,255)' }, 0)
// .add({ targets: '.color-hsl',  background: 'hsl(0, 100%, 100%)' }, 0)
// .add({ targets: '.color-rgba', background: 'rgba(255,255,255, .2)' }, 0)
// .add({ targets: '.color-hsla', background: 'hsla(0, 100%, 100%, .2)' }, 0)
// .add({ targets: '.colors-demo .el', translateX: 270 }, 0);

// 5) from to
anime({
  targets: '.css-demo .el3',
  translateX: [100, 250], // from 100 to 250
  delay: 500,
  direction: 'alternate',
  loop: true
});

// 6) function based values
anime({
  targets: '.function-based-values-demo .el',
  translateX: function(el) {
    return el.getAttribute('data-x');
  },
  translateY: function(el, i) {
    return 50 + (-50 * i);
  },
  scale: function(el, i, l) {
    return (l - i) + .25;
  },
  rotate: function() { return anime.random(-360, 360); },
  borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
  duration: function() { return anime.random(1200, 1800); },
  delay: function() { return anime.random(0, 400); },
  direction: 'alternate',
  loop: true
});