/**
 * 
 */



var DBName = "scratchDB";
var DBVersion = 4;

var saveArrays = [];
var scratchSave = {};
var db;
if (window.location.protocol.indexOf('http') != -1 ) { // http 로시작하는 로컬이 아닌 환경일때만 작동하도록    var scratchSave = indexedDB.open(DBName, DBVersion);
}scratchSave.onsuccess = function (evt) {	console.debug("scratchDB is connected")	db = scratchSave.result;		scratchSaveObject =  db.transaction("scratchSave", "readwrite").objectStore("scratchSave");}


var insertDB = function(insertData, key){	var selfCount = 0;
	try{		if(insertData.constructor === Array){			db.transaction("scratchSave", "readwrite").objectStore("scratchSave").delete(key[selfCount]).onsuccess = function(evt){				var parseData = JSON.parse(insertData[selfCount]);				// 일반 객체 insertData				insertDB(parseData, key);				selfEnteringMethodInsert(insertData, key, selfCount);			}					}else{			saveObject = db.transaction("scratchSave", "readwrite").objectStore("scratchSave");			saveObject.add(insertData)			}
	}
	catch(e){
		console.error(e);
	}
}var selfEnteringMethodInsert = function(insertData, key, selfCount){		var tempCount = selfCount + 1;	if(tempCount >= insertData.length ) return;	try{		db.transaction("scratchSave", "readwrite").objectStore("scratchSave").delete(key[tempCount]).onsuccess = function(evt){			var parseData = JSON.parse(insertData[tempCount]);			insertDB(parseData, key);			selfEnteringMethodInsert(insertData, key, tempCount);		};	}catch(e){		console.error(e);	}}var loadInitialDB = function(canvasArray, canvasSize, key){	var selfCount = 0;	try{		db.transaction("scratchSave").objectStore("scratchSave").get(key[selfCount]).onsuccess = function(event) {			var dataURL = event.target.result;            var image = new Image();            image.src = dataURL.BASE64    		//console.log("%%%%%%%%%%%%%%%%%%%%%%%%");        	//console.log(dataURL);        	            image.onload = function(){            	canvasArray[selfCount].getContext('2d').clearRect(0, 0, canvasSize[selfCount].width, canvasSize[selfCount].height);            	canvasArray[selfCount].getContext('2d').drawImage(image,0,0);            };            			selfEnteringMethodLoad(canvasArray, canvasSize, key, selfCount);		}	}catch(e){		console.error(e);	}}var selfEnteringMethodLoad = function(canvasArray, canvasSize, key, selfCount){	var tempCount = parseInt(selfCount) + 1;	if(tempCount >= canvasArray.length) return;	try{		db.transaction("scratchSave").objectStore("scratchSave").get(key[tempCount]).onsuccess = function(event) {			var dataURL = event.target.result;	        var image = new Image();	        image.src = dataURL.BASE64	    	//console.log(dataURL);	    		        image.onload = function(){	        	canvasArray[tempCount].getContext('2d').clearRect(0, 0, canvasSize[tempCount].width, canvasSize[tempCount].height);	        	canvasArray[tempCount].getContext('2d').drawImage(image,0,0);	        };	        	        selfEnteringMethodLoad(canvasArray, canvasSize, key, tempCount);		};	}catch(e){		console.error(e);	}}
////////////////////////////////////////////////////////////////////////////////////////////////scratchSave.onupgradeneeded = function (evt) {	console.debug("scratchDB is updated")	db = scratchSave.result;			db.createObjectStore("scratchSave",{ keyPath: "uniqueKey" })}
