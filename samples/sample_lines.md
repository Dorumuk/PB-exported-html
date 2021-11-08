# fade out
`distributeAction(cvs_0002, 'down', 'N', [[{actType:2, actSubType:'Fade Out', aniTiming:0, target:[cvs_0004], opacity:0.00, startTime:0, delay:0, duration:1000 }]]);`

# move
## default
`distributeAction(cvs_0002, 'down', 'N', [[{actType:3, actSubType:'Move To', aniTiming:0, target:[cvs_0004], toX:650, toY:130, startTime:0, delay:0, duration:2000 }]]);`

## across
`distributeAction(cvs_0002, 'down', 'N', [[{actType:3, actSubType:'Move To', aniTiming:0, target:[cvs_0004], toX:338, toY:397, startTime:0, delay:0, duration:2000,repeatCount:3, reverse:'Y', aniTiming:0, revDuration:2000, waitingTime:0, repeatForever:'N' }]]);`

## with scaleup
`distributeAction(cvs_0002, 'down', 'N', [[{actType:4, actSubType:'', aniTiming:0, target:[cvs_0004], toX:500, toY:130, scaleWidth: '200px', scaleHeight: '200px', originWidth: '0px', originHeight: '0px', startTime:0, delay:0, duration:1000 }]]);`

# rotate
## default
`distributeAction(cvs_0002, 'down', 'N', [[{actType:6, actSubType:'Rotate To', aniTiming:0, target:[cvs_0004], angle:1080.00, anchorX:50.0, anchorY:50.0, revAngle:.00, poX:15, poY:130, startTime:0, delay:0, duration:2000}]]);`

## case1
`distributeAction(cvs_0002, 'down', 'N', [[{actType:6, actSubType:'Rotate To', aniTiming:2, target:[cvs_0004], angle:-1080.00, anchorX:50.0, anchorY:50.0, revAngle:.00, poX:15, poY:130, startTime:0, delay:0, duration:2000,repeatCount:3, reverse:'Y', aniTiming:2, revDuration:2000, waitingTime:0, repeatForever:'N' }]]);`


# flip
## default
`distributeAction(cvs_0002, 'down', 'N', [[{actType:8, actSubType:'Flip X', aniTiming:-1, target:[cvs_0004], toX:0, toY:0, scaleWidth: '0px', scaleHeight: '0px', originWidth: '0px', originHeight: '0px', startTime:0, delay:0, duration:2000 }]]);`

## case1
`distributeAction(cvs_0002, 'down', 'N', [[{actType:8, actSubType:'Flip Y', aniTiming:-1, target:[cvs_0004], toX:0, toY:0, scaleWidth: '0px', scaleHeight: '0px', originWidth: '0px', originHeight: '0px', startTime:0, delay:2000, duration:1000,repeatCount:3, reverse:'Y', aniTiming:-1, revDuration:1000, waitingTime:0, repeatForever:'N' }]]);`