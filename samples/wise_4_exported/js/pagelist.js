// 이전 및 다음 페이지 이동.
function PageMove(movecheck){
  for(var i = 0; i < BK_DB.PageList.length; i++){
    if(BK_DB.PageList[i].pagenum == BK_DB.PageNow.pagenum){
      if(movecheck == 'minus'){
        if(i-1 < 0){ //i+move < 0
          i = BK_DB.PageList.length;
        }
        BK_DB.PageNow = BK_DB.PageList[i-1]; //i-1
        return BK_DB.PageNow.link;
      }else{
        if(i == BK_DB.PageList.length-1){ //i+move < 0
          i = -1;
        }
        BK_DB.PageNow = BK_DB.PageList[i+1]; //i-1
        return BK_DB.PageNow.link;
      }
    }
  }
}
function PageMoveFire(){
  $("x-pagemove .prev").on("click", function(event){
    // iframe 주소 변경 및 현재 페이지 재 지정.
    var move_link = PageMove('minus');
    $(".pagelist_type li h3 a[href='"+BK_DB.PageNow.link+"']").click();
  });
  $("x-pagemove .next").on("click", function(event){
    // iframe 주소 변경 및 현재 페이지 재 지정.
    var move_link = PageMove('plus');
    $(".pagelist_type li h3 a[href='"+BK_DB.PageNow.link+"']").click();
  });
  // 페이지 리스트 클릭시 iframe 변경 - dragAreaTopLimit
  $(".pagelist_type li h3 a").on("click", function(event){
    for(var key in BK_DB.PageList) {
      if($(this).attr("href") == BK_DB.PageList[key].link){
        BK_DB.PageNow = BK_DB.PageList[key];
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
    $("iframe#contents").attr("src",$(this).attr("href"));
    return false;
  });
}
$(document).ready(function(event){
  PageMoveFire();
  if($(".pagelist").length != 0){
    $(".pagelist.vertical").length != 0 ? $(".pagelist.vertical").smoothWheel_Y() : $(".pagelist").smoothWheel_X();
    $(".pagelist").addClass("overflowcheck");
    if($(".pagelist").get(0).clientWidth < $(".pagelist").get(0).scrollWidth) {
      $(".pagelist").addClass("scroll_h");
      $(".pagelist").removeClass("overflowcheck");
      $(".pagelist").height($(".pagelist li").eq(0).height()+25);
    }
    if($(".pagelist").get(0).clientHeight < $(".pagelist").get(0).scrollHeight) {
      $(".pagelist").addClass("scroll_v");
      $(".pagelist").removeClass("overflowcheck");
    }
  }
});
