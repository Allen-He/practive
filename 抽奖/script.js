var prize=["渡边麻友","前田敦子","长泽雅美","新垣结衣","石原里美"],
	timer=null,
	temp = 0;
	
window.onload=function(){
	var start=document.getElementById("start"),
		stop=document.getElementById("stop");
		
	start.onclick=fnPlay;
	stop.onclick=fnStop;
	
	document.onkeyup=function(event){
		event = event || window.event;
		if(event.keyCode == 13){
			if(temp==0){
				fnPlay();
				temp = 1;
			}else {
				fnStop();
				temp = 0;
			}
		}
		
	}
	
	
}

function fnPlay(){
	var title=document.getElementById("title"),
		start=document.getElementById("start");
		clearInterval(timer);
		timer=setInterval(function(){
			random = Math.floor(Math.random()*prize.length);
			title.innerHTML = prize[random];
		},50);
		start.style.background = "#999";
}

function fnStop(){
	clearInterval(timer);
	var start=document.getElementById("start");
	start.style.background="#036";
}