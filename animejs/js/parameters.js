// Property parameters

// 1) css properties
// https://animejs.com/documentation/#unitlessValue

// 1) duration
anime({
    targets: '.css-demo .el1',
    translateX: 250,
    duration: 3000
})
// duration: 3000
// 2) delay: 1000
// 3) end delay
anime({
    targets: '.css-demo .el2',
    translateX: 250,
    endDelay: 1000,
    direction: 'alternate' // ??
})
// endDelay: 1000
// 4) easing: 'easeInOutExpo' // easing function graph 를 생각하자 : ease, linear, ease-in, ease-out, ease-in-out

// 5) round
var roundLogEl = document.querySelector('.round-log');
anime({
  targets: roundLogEl,
  innerHTML: [0, 10000],
  easing: 'linear',
  round: 10 // Will round the animated value to 1 decimal (소수점 자리 결정)
});

// 6) sepcific property parameters
anime({
    targets: '.css-demo .el3',
    translateX: {
      value: 250,
      duration: 800
    },
    rotate: {
      value: 360,
      duration: 1800,
      easing: 'easeInOutSine'
    },
    scale: {
      value: 2,
      duration: 1600,
      delay: 800,
      easing: 'easeInOutQuart'
    },
    delay: 250 // All properties except 'scale' inherit 250ms delay
  });

  anime({
    targets: '.function-based-params-demo .el',
    translateX: 270,
    direction: 'alternate',
    loop: true,
    delay: function(el, i, l) {
      return i * 100;
    },
    endDelay: function(el, i, l) {
      return (l - i) * 100;
    }
  });