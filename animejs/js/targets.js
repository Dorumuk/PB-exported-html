// 1) dom node / nodelist
// const cvs1 = document.querySelector('#cvs_0002_child1');
// console.log(cvs1);
// anime({
//     targets: cvs1,
//     translateX: 270
// })

// // 2) css selector
// anime({
//     targets: '#cvs_0004_child1',
//     translateX: 270
// })

// // 3) js Object
// const logEl = document.querySelector('.battery-log');
// const battery = {
//     charged: '0%',
//     cycles: 120
// }

// anime({
//     targets: battery,
//     charged: '100%',
//     cycles: 130,
//     round: 1,
//     easing: 'linear',
//     update: function() {
//         logEl.innerHTML = JSON.stringify(battery);
//     }
// })

// 4) Array
// const cvs1 = document.querySelector('#cvs_0002_child1');

// anime({
//   targets: [cvs1, '#cvs_0004_child1'],
//   translateX: 250
// });