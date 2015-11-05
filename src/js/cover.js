var cover;
var doItOpen = false;


$(function() {
  $.getJSON("/json/cover.json",function() { console.log("loading cover ");})
   .done(function(data){
      cover = data;
      renderTemplate(data);
   });

  $("#bookTarget").on("click","button",function() {
    var id = $(this).attr("id").split("_");
    console.log("id "+id);
    if(id[0]==="rotate") {  
      if ($("#cover_"+id[1]).hasClass("coverFlipInX") || $("#cover_"+id[1]).hasClass("coverFlipOutX")) {
        $("#cover_"+id[1]).toggleClass("coverFlipInX coverFlipOutX");
      } else { 
        $("#cover_"+id[1]).toggleClass("coverFlipInX");
      }
    }
  });

  $("#bookTarget").on("mouseenter",".spine",function() {
      coverAnimOpen(this);
    });
  $("#bookTarget").on("mouseleave",".spine",function(){
      coverAnimClose(this);
    });

  $("#bookTarget").on("click",".boxart-side",function(){
    doItOpen = (doItOpen)? false : true;
    });

}) // end jQuery ready

function renderTemplate(data) {
  var handleSrc = $("#vhs-cover").html();
  var handleTem = Handlebars.compile(handleSrc);
  var html = handleTem(data);
  $("#bookTarget").html(html);
}

function coverAnimOpen(that) {
  if(doItOpen) return;
  var doAt = $(that).attr("id").split("_")[1];
    $("#book_"+doAt).addClass("bookUP");
    $("#spine_"+doAt).addClass("animScaleUp"); 
    $("#cover_"+doAt).addClass("animFlipInY");
}

function coverAnimClose(that) {
  if(doItOpen) return;
  var doAt = $(that).attr("id").split("_")[1];
    $("#book_"+doAt).removeClass("bookUP");
    $("#spine_"+doAt).removeClass("animScaleUp"); 
    $("#cover_"+doAt).removeClass("animFlipInY coverFlipInX coverFlipOutX");
}