var FORCE_THRESHOLD = 300;
var TIME_THRESHOLD = 100;
var SHAKE_TIMEOUT = 500;
var SHAKE_DURATION = 1000;
var SHAKE_COUNT = 2;

var mSensorMgr;
var mLastX=-1.0, mLastY=-1.0, mLastZ=-1.0;
var mLastTime = 0.0;
var mShakeCount = 0;
var mLastShake = 0.0;
var mLastForce = 0.0;
var meter = null;
var mediaStreamSource = null;
var audio_context = null;

var shakeCount = 0;
function addSensorListenr(hasString)
{
	var hasArray = hasString.split(',');

	if(hasArray[0] =="ShakeAction"){
		if (window.DeviceOrientationEvent) {

			window.addEventListener("deviceorientation", function(event)
			{

				var now = new Date().getTime();

				if ((now - mLastForce) > SHAKE_TIMEOUT) {
					 mShakeCount = 0;
				}


				if ((now - mLastTime) > TIME_THRESHOLD) {

					 var diff = now - mLastTime;
					 var speed = Math.abs(event.gamma + event.beta + event.alpha - mLastX - mLastY - mLastZ) / diff * 10000;

					 if (speed > FORCE_THRESHOLD) {

						 if ((mShakeCount++ >= SHAKE_COUNT) && (now - mLastShake > SHAKE_DURATION)) {
							 mLastShake = now;
							 mShakeCount = 0;
							 shakeCount++;
							 shakeAction();
						 }
						 mLastForce = now;
					 }
					 mLastTime = now;
					 mLastX = event.gamma;
					 mLastY = event.beta;
					 mLastZ = event.alpha;
				}
			}, true);
		} else {
  		alert("Sorry, your browser doesn't support Device shake!!");
		}
	}

	if(hasArray[hasArray.length - 1] == "MicBlow"){
		if (navigator.getUserMedia || navigator.mediaDevices.getUserMedia) { // ie 같이 userMedia가 없는 브라우저는 이렇게 처리
			try {
				window.AudioContext = window.AudioContext || window.webkitAudioContext;
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices.getUserMedia || navigator.mozGetUserMedia;
				window.URL = window.URL || window.webkitURL;

				audio_context = new AudioContext;
			} catch (e) {
				alert('No web audio support in this browser!');
			}
			
			if (navigator.userAgent.indexOf('iP') != -1) {
				console.log("iPad");
				navigator.mediaDevices.getUserMedia(
				{ 
					"audio": {
						"mandatory": {
							"googEchoCancellation": "false",
							"googAutoGainControl": "false",
							"googNoiseSuppression": "false",
							"googHighpassFilter": "false"
						},
					"optional": []
					},
				}).then(startUserMediaMicBlow).catch(function (e) {
				__log('No live audio input: ' + e);
				});

			} else {  
				navigator.getUserMedia(
				{ 
					"audio": {
						"mandatory": {
							"googEchoCancellation": "false",
							"googAutoGainControl": "false",
							"googNoiseSuppression": "false",
							"googHighpassFilter": "false"
						},
						"optional": []
					},
				}, startUserMediaMicBlow, 
				function (e) 
				{
					__log('No live audio input: ' + e);
				});
			}
		}
	}else{
	//window.alert("audio Failed!!!!!");
	}
}

function startUserMediaMicBlow(stream){
	mediaStreamSource = audio_context.createMediaStreamSource(stream);
	meter = createAudioMeter(audio_context);
	mediaStreamSource.connect(meter);
	onLevelChange();
}

function onLevelChange(time) {
	if (meter.checkClipping()) {
		//window.alert("recode.onLevelChange Clipping !!!!!!");
		micblowAction();
	} else {
		//if(meter.lastClip != lastClip) window.alert("lastClip = " + meter.lastClip + ", volume = " + meter.volume);
	}
	window.requestAnimationFrame(onLevelChange);
}

function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
	var processor = audioContext.createScriptProcessor(512);
	processor.onaudioprocess = volumeAudioProcess;
	processor.clipping = false;
	processor.lastClip = 0;
	processor.volume = 0;
	processor.clipLevel = clipLevel || 0.70;
	processor.averaging = averaging || 0.95;
	processor.clipLag = clipLag || 750;

	// this will have no effect, since we don't copy the input to the output,
	// but works around a current Chrome bug.
	processor.connect(audioContext.destination);

	processor.checkClipping =
		function(){
			if (!this.clipping)
				return false;
			if ((this.lastClip + this.clipLag) < window.performance.now())
				this.clipping = false;
			return this.clipping;
		};

	processor.shutdown =
		function(){
			this.disconnect();
			this.onaudioprocess = null;
		};

	return processor;
}

function volumeAudioProcess( event ) {
	var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
	var sum = 0;
    var x;

    for (var i=0; i<bufLength; i++) {
    	x = buf[i];
    	if (Math.abs(x)>=this.clipLevel) {
    		this.clipping = true;
    		this.lastClip = window.performance.now();
    	}
    	sum += x * x;
		//if(Math.abs(x) != 0) window.alert("recod.volumeAudioProcess(): this.clipLevel ="+this.clipLevel+", bufLength="+bufLength+", Math.abs(x)="+Math.abs(x));
    }

    var rms =  Math.sqrt(sum / bufLength);

    this.volume = Math.max(rms, this.volume*this.averaging);
}
