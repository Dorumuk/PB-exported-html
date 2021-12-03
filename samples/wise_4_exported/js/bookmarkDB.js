/**
 * 
 */

var BookMarkDB = function(){
  return this;
}

BookMarkDB.prototype.DBName = "BK_DB";
BookMarkDB.prototype.DBKeypath = "pagenum";
BookMarkDB.prototype.DBVersion = 1; // 무조건 정수로만...

BookMarkDB.prototype.BK_DBInit = function(success_callback,success_agr){
  var indexedDB = window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.msIndexedDB;
  var agent = navigator.userAgent.toLowerCase();
  if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1) || (agent.indexOf("edge") != -1) || (agent.indexOf("android") != -1)) {
    indexedDB = window.msCookieDB;
    window.userBrowser = "ie";
  }

  if (window.location.protocol.indexOf('http') != -1) { // http 로시작하는 로컬이 아닌 환경일때만 작동하도록    BookMarkDB.prototype.DB = indexedDB.open(BookMarkDB.prototype.DBName, BookMarkDB.prototype.DBVersion);
  }
  

  BookMarkDB.prototype.DB.onsuccess = function(event) {
    // 구버전 브라우저에서는 shegma를 업데이트하려면 onupgradeneeded 지원 없이 여기서 version check 해야 함
    BookMarkDB.prototype.DB_RESULT = BookMarkDB.prototype.DB.result;
    success_callback.apply(this, success_agr);
  }

  BookMarkDB.prototype.DB.onerror = function(event) {};
  BookMarkDB.prototype.DB.onblocked = function(event) {};

  BookMarkDB.prototype.DB.onupgradeneeded = function(event) {
    BookMarkDB.prototype.DB_RESULT = event.target.result;
    if(event.oldVersion < 1){ // 처음 생성한거라면...
      var store = BookMarkDB.prototype.DB_RESULT.createObjectStore(BookMarkDB.prototype.DBName,{"keyPath": BookMarkDB.prototype.DBKeypath, "autoIncrement": false});
      store.createIndex("pageIndex", BookMarkDB.prototype.DBKeypath); // DB의 index 기준을 pagenum 으로 하고 key를 pageIndex로 함.
    }
    BookMarkDB.prototype.DB_TRANSACTION = event.target.transaction;
  }

  BookMarkDB.prototype.DB.on_edit = function(store_name){
    var dbName = BookMarkDB.prototype.DBName;
    var temp = BookMarkDB.prototype.DB_RESULT.transaction([dbName], "readwrite").objectStore(dbName);
    return temp;
  };

  BookMarkDB.prototype.DB.off_edit = function(abort_store){
    abort_store.abort();
  };
};

BookMarkDB.prototype.BK_DBInsert = function(store_name,callback){
  var store = BookMarkDB.prototype.DB.on_edit(store_name);
  var count = 0;

  var Now = new Date();
  var NowTime = Now.getFullYear();
  var getMonth = (parseInt(Now.getMonth())+1);
  getMonth < 10 ? getMonth = '0'+getMonth : '';
  var getDate = Now.getDate();
  getDate < 10 ? getDate = '0'+getDate : '';
  var getHours = Now.getHours();
  getHours < 10 ? getHours = '0'+getHours : '';
  var getMinutes = Now.getMinutes();
  getMinutes < 10 ? getMinutes = '0'+getMinutes : '';
  var getSeconds = Now.getSeconds();
  getSeconds < 10 ? getSeconds = '0'+getSeconds : '';


  NowTime += '.' + getMonth;
  NowTime += '.' + getDate;
  NowTime += ' ' + getHours;
  NowTime += ':' + getMinutes;
  NowTime += ':' + getSeconds;


  var add_data = [{ // 현재 페이지의 정보를 기준으로 data 추가
    thumbnail: BK_DB.PageNow.thumbnail,
    date: NowTime,
    link: BK_DB.PageNow.link,
    pagenum: BK_DB.PageNow.pagenum
  }];
  var req = store.add(add_data[count]); // put는 덮어쓰기 add는 중복이 아니면 추가해넣기
  var AddUI = function(count, add_data, callback){
    callback != undefined ? callback(add_data[count]) : '';
    count++;
    return this;
  };

  req.onsuccess = function(event){
    if(count < add_data.length){
      AddUI(count, add_data, callback); // onsuccess가 비동기 방식 이므로 이렇게 처리.
    }
  }
};

BookMarkDB.prototype.BK_DBRemove = function(store_name, key, callback){
  var store = BookMarkDB.prototype.DB.on_edit(store_name);
  var req = store.delete(key);
  req.onsuccess = function(event){
    callback != undefined ? callback(key) : '';
  };
};

BookMarkDB.prototype.BK_DBGetList = function(store_name, callback){
  var store = BookMarkDB.prototype.DB.on_edit(store_name);
  var myIndex = store.index('pageIndex');
  if(!window.userBrowser){
    myIndex.openCursor().onsuccess = function(event) { // 전체 리스트를 가져옴. ie 에서 getAll을 제공하지 않으므로 Cursor로 처리.
      var cursor = event.target.result;
      if(cursor) {
        callback != '' ? callback(cursor.value) : '';
        cursor.continue();
      }
    };
  }else{
    myIndex.openCursor(0, callback);
  }
};
