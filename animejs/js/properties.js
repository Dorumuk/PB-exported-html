// 1) css properties
// https://animejs.com/documentation/#unitlessValue
// anime({
//     targets: '.css-demo .prop',
//     left: '240px',
//     backgroundColor: '#555',
//     borderRadius: ['0%', '50%'],
//     easing: 'easeInOutQuad'
// })

// 2) css tarnsforms
// anime({
//     targets: '.css-demo .transforms',
//     translateX: 250,
//     skew: 120,
//     scale: 2,
//     rotate: '1turn'
// });

// 3) object properties
// const objPropLogEl = document.querySelector('.js-object-log');
// const myObject = {
//   prop1: 0,
//   prop2: '0%'
// }
// anime({
//   targets: myObject,
//   prop1: 50,
//   prop2: '100%',
//   easing: 'linear',
//   round: 1,
//   update: function() {
//     objPropLogEl.innerHTML = JSON.stringify(myObject);
//   }
// });

// 4) svg attributes
anime({
    targets: ['.css-demo polygon', 'feTurbulence', 'feDisplacementMap'],
    points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
    baseFrequency: 0,
    scale: 1,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutExpo'
  });