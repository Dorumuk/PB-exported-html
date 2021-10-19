// 1) css properties
// https://animejs.com/documentation/#unitlessValue

anime({
    targets: '.css-demo .el1',
    translateX: 250,
    duration: 3000
})
// duration: 3000
// delay: 1000
anime({
    targets: '.css-demo .el2',
    translateX: 250,
    endDelay: 1000,
    direction: 'alternate' // ??
})
// endDelay: 1000
// easing: 'easeInOutExpo' // easing function graph 를 생각하자 : ease, linear, ease-in, ease-out, ease-in-out
