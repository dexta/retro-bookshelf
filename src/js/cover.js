var cover;
var doItOpen = false;

function setImgSize(data,str) {
  for(var c=0,cl=data.length;c<cl;c++) {
    console.log(data[c].uname);
    data[c].sideimg = "/img/snes/"+str+"/"+data[c].uname+"_spine.jpg";
    data[c].frontimg = "/img/snes/"+str+"/"+data[c].uname+"_front.jpg";
    data[c].backimg = "/img/snes/"+str+"/"+data[c].uname+"_back.jpg";
    data[c].size = str;
  }
  return data;
}

$(function() {
  Handlebars.registerHelper("isGray",function(bool){
    return (bool)? "" : " grayscale";
  });
  $.getJSON("/json/cover_v2.json",function() { console.log("loading cover ");})
   .done(function(data){
      cover = setImgSize(data,"sm");
      renderTemplate(cover);
   });

  $("#bookTarget").on("click","i",function() {
    var id = $(this).attr("id").split("_");
    console.log("id "+id);
    if(id[0]==="rotate") {  
      if ($("#cover_"+id[1]).hasClass("coverFlipInX") || $("#cover_"+id[1]).hasClass("coverFlipOutX")) {
        $("#cover_"+id[1]).toggleClass("coverFlipInX coverFlipOutX");
      } else { 
        $("#cover_"+id[1]).toggleClass("coverFlipInX");
      }
    } else if(id[0]==="color") {
      $("#cover_"+id[1]+" img").toggleClass("grayscale");
      $("#spine_"+id[1]+" img").toggleClass("grayscale");
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

}); // end jQuery ready

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