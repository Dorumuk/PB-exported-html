// staggering
// 1) start value
// 3) from 4) direction 5) easing
anime({
  targets: '.css-demo .el',
  translateX: 250,
  delay: anime.stagger(1000, {from: 'center'}) // 각각의 시작점 설정
  // delay: anime.stagger(1000) // 각각의 시작점 설정
  // delay: anime.stagger(100, {start: 1000})  // * 전체 시작점 설정 가능
  // delay: function (el, i, l) {
  //   return i * 100;
  // }
});

// 2) range value
anime({
  targets: '.range-value-staggering-demo .el',
  translateX: 270,
  delay: 1000,
  rotate: anime.stagger([-360, 360]), // rotation will be distributed from -360deg to 360deg evenly between all elements
  // rotate: (el, i ,l) => -360 + ((360 -(-360)) / l) * i, // ===
  easing: 'easeInOutQuad'
});

// 6) grid
anime({
  targets: '.staggering-grid-demo .el',
  scale: [
    {value: .1, easing: 'easeOutSine', duration: 500},
    {value: 1, easing: 'easeInOutQuad', duration: 1200}
  ],
  delay: anime.stagger(200, {grid: [6, 3], from: 'center'})
});

// 7) axis
// anime({
//   targets: '.staggering-axis-grid-demo .el',
//   translateX: anime.stagger(10, {grid: [14, 5], from: 'center', axis: 'x'}),
//   translateY: anime.stagger(10, {grid: [14, 5], from: 'center', axis: 'y'}),
//   rotateZ: anime.stagger([0, 90], {grid: [14, 5], from: 'center', axis: 'x'}),
//   delay: anime.stagger(200, {grid: [14, 5], from: 'center'}),
//   easing: 'easeInOutQuad'
// });