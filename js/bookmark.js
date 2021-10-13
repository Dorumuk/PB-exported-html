/**

 *

 */

// 북마크 추가
BK_DB.UiAdd = function(data){
  $("x-bookmarklist[data-bookmark=true]").each(function(index){
    console.log("add");
    var obj = $(this);
    var element = $(this).find("li[data-isfirst]").clone(); // Sample을 가져온 다음 html만 변경
    var pagenum = data.pagenum.toString();
    if(pagenum.length == 1){
      pagenum = '0'+pagenum;
    }
    if(pagenum.length == 2){
      pagenum = '0'+pagenum;
    }
    element.removeAttr("data-isfirst");
    element.pagenum = data.pagenum;
    element.has(" h3 > a > img").length ? element.find(" h3 > a > img").attr("src",data.thumbnail) : '';
    element.has(" h3 > a > .date").length ? element.find(" h3 > a > .date").html(data.date) : '';
    element.has(" h3 > a > .pagenum").length ? element.find(" h3 > a > .pagenum").html(data.pagenum) : '';
    element.find(" h3 > a ").attr("href",data.link);
    obj.find(" > ul").prepend(element); // 리스트에 추가
    element.show();
    $(this).find("li[data-isfirst]").hide();
    BK_DB.UiEventFire(element); // 이벤트 바인딩
  });
  //추가한 날자별로 정렬.
  $("x-bookmarklist[data-bookmark=true]").each(function(m_idx){
    var obj = $(this);
    obj.find(" > ul li").each(function(index){
      var item = $(this);
      var item_date = parseInt(item.find(".date").html().replace(/\./gi,'').replace(/\:|\s/gi,''));
      for(var i = 0; i < $("x-bookmarklist[data-bookmark=true]").eq(m_idx).find(" > ul li").length; i++){
        (function(i,item){
          var target_date = parseInt($("x-bookmarklist[data-bookmark=true]").eq(m_idx).find(" > ul li").eq(i).find(".date").html().replace(/\./gi,'').replace(/\:|\s/gi,''));
          if(item_date < target_date){
            item.insertAfter($("x-bookmarklist[data-bookmark=true]").eq(m_idx).find(" > ul li").eq(i));
          }
        })(i,item);
      }
    });
  });

  // 북마크 여부 체크.
  var is_marked = false;
  $("x-bookmarklist[data-bookmark=true] > ul > li").each(function(idx){
    if($(this).find(" h3 > a > .pagenum").text() == BK_DB.PageNow.pagenum){
      is_marked = true;
    }
  });

  if(is_marked){
    $(".bookmarker_on[data-bookmark=true]").css("display", "none");
    $(".bookmarker_off[data-bookmark=true]").css("display", "block");
  }else{
    $(".bookmarker_off[data-bookmark=true]").css("display", "none");
    $(".bookmarker_on[data-bookmark=true]").css("display", "block");
  }

}

// 북마크 삭제
BK_DB.UiRemove = function(pageNum){
  $("x-bookmarklist[data-bookmark=true] > ul > li").each(function(idx){
    if($(this).find(" h3 > a > .pagenum").text() == pageNum){
      $(this).remove();
      if(pageNum == BK_DB.PageNow.pagenum){
        $(".bookmarker_off[data-bookmark=true]").css("display", "none");
        $(".bookmarker_on[data-bookmark=true]").css("display", "block");
      }
    }
  });
}

// 북마크 페이지 이동.
BK_DB.BK_DBPageMove = function(target){
  // iframe 주소 변경 및 현재 페이지 재 지정.
  for(var key in BK_DB.PageList){
    if(BK_DB.PageList[key].pagenum == target.find(".pagenum").text()){
      BK_DB.PageNow = BK_DB.PageList[key];
      $("iframe#contents").attr("src",BK_DB.PageNow.link);
    }
  }
  // 북마크 여부 체크.
  var is_marked = false;
  $("x-bookmarklist[data-bookmark=true] > ul > li").each(function(idx){
    if($(this).find(" h3 > a > .pagenum").text() == BK_DB.PageNow.pagenum){
      is_marked = true;
    }
  });

  if(is_marked){
    $(".bookmarker_on[data-bookmark=true]").css("display", "none");
    $(".bookmarker_off[data-bookmark=true]").css("display", "block");
  }else{
    $(".bookmarker_off[data-bookmark=true]").css("display", "none");
    $(".bookmarker_on[data-bookmark=true]").css("display", "block");
  }
  return false;
}

// 북마크 추가 후 각종 이벤트 Fire
BK_DB.UiEventFire = function(element){
  element.find(".page_delete").on("click", function(){ // 삭제버튼 눌렀을 때
    BK_DB.BK_DBRemove(BK_DB.DBName,element.pagenum,BK_DB.UiRemove);
  });

  element.find("a.link").on("click", function(event){ // 링크버튼 눌렀을 때 iframe 변경.
    event.preventDefault();
    BK_DB.BK_DBPageMove($(event.target).closest("a"));
  });
}

var BK_DBSuccess = function(agr1, agr2){
  BK_DB.BK_DBGetList(BK_DB.DBName, BK_DB.UiAdd);
};
var BK_DBSuccess_agrs = [];
var BK_DBREADY = '';

$(document).ready(function(){
  $(".bookmarker[data-bookmark=true]").on("click",function(event){ // 북마크 클릭 시
    console.log("click :: "+BK_DB.PageNow.pagenum);
    if($(this).hasClass("bookmarker_on")){
      BK_DB.BK_DBInsert(BK_DB.DBName,BK_DB.UiAdd); // DB에 저장
      BK_DB.BK_DBGetList(BK_DB.DBName,''); // 리스트 재구성...
    }else{
      BK_DB.BK_DBRemove(BK_DB.DBName,BK_DB.PageNow.pagenum,BK_DB.UiRemove); // DB에서 삭제
    }
  });
  BK_DBREADY = BK_DB.BK_DBInit(BK_DBSuccess,BK_DBSuccess_agrs);
});
