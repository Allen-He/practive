$(document).ready(function(){
	waterWall();
	var data = [{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},
				 {"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"}];
	$(window).scroll(function(){
		if(loadMove()){
			$.each(data,function(index,value){
				var oBox = $("<div>").addClass("box");
				oBox.appendTo($("#main"));
				var oPic = $("<div>").addClass("pic");
				oPic.appendTo(oBox);
				var img = $("<img>").attr("src","img/" + value.src).appendTo(oPic);
				//console.log(img.attr(""));
			});
			setTimeout(waterWall,0);
		}
	})
})

function waterWall(){
	var $boxs = $("#main > .box");
	var boxW = $boxs.eq(0).outerWidth();
	var cols = Math.floor($(window).width() / boxW);
	$("#main").width(cols*boxW);
	var lineH = [];
	$boxs.each(function(index,value){
		var h = $boxs.eq(index).outerHeight();
		if(index<cols){
			lineH[index] = h;
		}else{
			var min = Math.min.apply(null,lineH);
			var minIndex = $.inArray(min,lineH);
			$boxs.eq(index).css({
				"position" : "absolute",
				"top" : min + "px",
				"left" : boxW*minIndex + "px"
			})
			lineH[minIndex] += $boxs.eq(index).outerHeight();
		}
	});
}

function loadMove(){
	var lastbox = $("#main > .box").last();
	//console.log(lastbox);
	var lastboxH = lastbox.offset().top + Math.floor(lastbox.outerHeight() / 2);

	var height = $(window).height();
	var top = $(window).scrollTop();
	return (lastboxH < height+top) ? true : false;
}