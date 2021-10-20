// animation parameters

// 1) css properties
// https://animejs.com/documentation/#unitlessValue

// 1) direction
anime({
    targets: '.css-demo .el1',
    translateX: 250,
    direction: 'alternate',
    autoplay: true,
    easing: 'easeInOutSine'
})
// normal (생략 가능)
// reverse
// alternate

// 2) loop
// loop option
// loop: 3,
// loop: true

// 3) auto play
// autoplay: treu // 처음에 자동 시작
// autoplay: flase // 기본적으로 animation: false

