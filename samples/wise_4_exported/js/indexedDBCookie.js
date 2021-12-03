/**

 *

 */
function CookieDB(){
  var that = this;
}


window.msCookieDB = new CookieDB();

CookieDB.prototype.DB = {};
CookieDB.prototype.DB.result = [];
CookieDB.prototype.DBKeypath = "pagenum";
CookieDB.prototype.open = function(cname){
  // 만약 해당하는 쿠키가 없다면..
  var cookies;
  if(document.cookie.indexOf(cname) == -1){
    var expire = new Date();
    expire.setDate(expire.getDate() + 1000);
    cookies = cname+"="+'endtable'+'; expires=' + expire.toGMTString() + ';'+' path=/'; // 한글 깨짐을 막기위해 encodeURIComponent(cValue)를 합니다.
    document.cookie = cookies;
  }else{
    cookies = document.cookie;
  }

  var cName = cname+'*.+?endtable'; // cname 기준으로 테이블을 나누는 정규식
  var re = new RegExp(cName,"g");
  var cookieData = cookies;
  var arr = re.exec(cookieData);
  CookieDB.prototype.DB.target = {};
  CookieDB.prototype.DB.result = {};
  CookieDB.prototype.DB.result.data = arr[0];
  CookieDB.prototype.DB.target.result = CookieDB.prototype.DB.result;
  CookieDB.prototype.DB.ResultSetting();
  setTimeout(function(){ // indexedDB 의 onsuccess 처리...
    CookieDB.prototype.DB.onsuccess();
  },100);
  return CookieDB.prototype.DB;
}

CookieDB.prototype.DB.objectStore = function(keyname){
  return CookieDB.prototype.DB.result;
}

CookieDB.prototype.DB.ResultSetting = function(){
  CookieDB.prototype.DB.result.transaction = function(){
    return CookieDB.prototype.DB;
  };

  CookieDB.prototype.DB.result.add = function(data){
    var str = '&';
    for(var key in data){
      str = (key+'='+data[key]+','+str);
    }
    var pattern = '([^\=]+[^(])';

    var temp;
    var re = new RegExp(pattern,"g");
    var cname = re.exec(CookieDB.prototype.DB.result.data)[0];
    var string_temp = str;
    temp = document.cookie.replace("; ","").replace(cname,string_temp);

    function setCookie(c_name, value, exdays) {
      var expire = new Date();
      expire.setDate(expire.getDate() + exdays);
      cookies = c_name +value+ '; path=/ '+';expires=' + expire.toGMTString() + ';';
      document.cookie = cookies;
    }

    setCookie(cname, temp, 100);
    setTimeout(function(){
      CookieDB.prototype.DB.onsuccess();
    },100);
    return CookieDB.prototype.DB;
  }

  CookieDB.prototype.DB.result.delete = function(key){
    var pattern = '([^\=]+)'; // 바꿔야할 table(?)
    var re = new RegExp(pattern,"g");
    var cname = re.exec(CookieDB.prototype.DB.result.data)[0];
    var temp = '';
    var pattern = CookieDB.prototype.DBKeypath+'='+key; // 바꿔야할 table(?)
    var cookie = document.cookie;
    for(var i = 0; i < CookieDB.prototype.DB.CursorList.data.length; i++){
      if(encodeURIComponent(CookieDB.prototype.DB.CursorList.data[i].full_path).indexOf(encodeURIComponent(pattern)) != -1){
        var replace_string = CookieDB.prototype.DB.CursorList.data[i].full_path+('&');
        var replace_string2 = CookieDB.prototype.DB.CursorList.data[i].full_path;
        temp = cookie.replace(replace_string,'') || cookie.replace(replace_string2,'') ; // 첫번째일 경우(& 없음)랑 그게 아닐경우를 따로 구분하도록..
        cookie = temp;
      }
    }

    function setCookie(c_name, value) {
      var expire = new Date();
      expire.setDate(expire.getDate());
      cookies = c_name +value+'; path=/ '+'; expires=Thu, 01 Jan 4000 00:00:01 GMT;';
      document.cookie = cookies;
    }
    setCookie(cname, temp.replace(cname,''));
    setTimeout(function(){ // indexedDB 의 onsuccess 처리...
      CookieDB.prototype.DB.onsuccess();
    },100);

    return CookieDB.prototype.DB;
  }


  CookieDB.prototype.DB.result.index = function(name){ // indexDB의 index 따라하기. 지금 구성에선 mutiple table(?) 구성은 아님.
    var pattern = CookieDB.prototype.DBKeypath+'+[^&]+'; // 바꿔야할 table(?)
    var re = new RegExp(pattern,'igm');
    var cookieData = document.cookie;
    var arr = null;
    CookieDB.prototype.DB.CursorList = {};
    !Array.isArray(CookieDB.prototype.DB.CursorList.data) ? CookieDB.prototype.DB.CursorList.data = [] : '';
    CookieDB.prototype.DB.CursorSetting();
    var count = 0;
    while((arr = re.exec(cookieData)) != null) { // exec는 가장 처음 일치한 텍스트를 return 하고 다음 탐색시에 다음에 일치한 text를 return;
      if(arr != undefined){
        (function(count){
          try{
            var val = String.call(this,arr).split(",");
              for(var i = 0; i < val.length; i++){
                if(i == 0){
                  CookieDB.prototype.DB.CursorList.data[count] = [];
                  CookieDB.prototype.DB.CursorList.data[count].full_path = arr;
                }
                var temp = val[i].split("=");
                var arr_key = temp[0];
                var arr_val = temp[1];
                if(arr_key == 'remove' || arr_key == ''){
                  val = val.shift(val[i]);
                }else{
                  CookieDB.prototype.DB.CursorList.data[count][arr_key] = arr_val;
                }
              }
          }catch(err){
            // 반환하는 key 중에 input 와 length 도 있으므로..
            //console.log("key is not number");
          }
        })(count);
      }
      count++;
    }

    CookieDB.prototype.DB.CursorList.data.reverse();
    return CookieDB.prototype.DB.CursorList;
  }
}

CookieDB.prototype.DB.CursorSetting = function(){
  CookieDB.prototype.DB.CursorList.onsuccess = function(event, callback) { // 전체 리스트를 가져옴. ie 에서 getAll을 제공하지 않으므로 Cursor로 처리.
    var cursor = event.target.result.value;
    if(cursor != undefined){
      callback != '' ? callback(cursor) : '';
      event.target.result.continue();
    }
  };

  CookieDB.prototype.DB.CursorList.openCursor = function(index, callback){
    index == undefined ? index = 0 : '';
    var e = CookieDB.prototype.DB;
    e.target = CookieDB.prototype.DB.CursorList;
    e.target.result = {};
    e.target.result.value = CookieDB.prototype.DB.CursorList.data[index];
    e.target.result.continue = function(){
      if(index+1 > CookieDB.prototype.DB.CursorList.data.length-1){
        return false;
      }
      CookieDB.prototype.DB.CursorList.openCursor(index+1, callback);
    }
    CookieDB.prototype.DB.CursorList.onsuccess(e, callback);
  }
}
