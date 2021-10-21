// keyframes
// 1) animation keyframe
anime({
  targets: '.css-demo .el1',
  keyframes: [
    {translateY: -40},
    {translateX: 250},
    {translateY: 40},
    {translateX: 0},
    {translateY: 0}
  ],
  duration: 3000,
  easing: 'easeOutElastic(1, .8)',
  loop: true
});

// 2) property keyframes
anime({
  targets: '.property-keyframes-demo .el',
  translateX: [
    { value: 250, duration: 1000, delay: 500 },
    { value: 0, duration: 1000, delay: 500 }
  ],
  translateY: [
    { value: -40, duration: 500 },
    { value: 40, duration: 500, delay: 1000 },
    { value: 0, duration: 500, delay: 1000 }
  ],
  scaleX: [
    { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
    { value: 1, duration: 900 },
    { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
    { value: 1, duration: 900 }
  ],
  scaleY: [
    { value: [1.75, 1], duration: 500 },
    { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
    { value: 1, duration: 450 },
    { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
    { value: 1, duration: 450 }
  ],
  easing: 'easeOutElastic(1, .8)',
  loop: true
});