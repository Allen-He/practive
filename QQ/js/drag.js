function getByClassName(clasName,parent){
	var oparent = parent?document.getElementById(parent):document,
		eles=[],
		elents = oparent.getElementsByTagName("*");
		
	for(var i=0,l=elents.length;i<l;i++){
		if(elents[i].className == clasName){
			eles.push(elents[i]);
		}
	}
	return eles;
}

window.onload=drag;

function drag(){
	var oTitle = getByClassName("login_logo_webqq","loginPanel")[0];
	
	oTitle.onmousedown=fndown;
	
	var oClose = document.getElementById("ui_boxyClose");
	oClose.onclick=function(){
		document.getElementById("loginPanel").style.display="none";
	}
	
	var loginstate = document.getElementById("loginState"),
		stateList = document.getElementById("loginStatePanel"),
		liList = document.getElementsByTagName("li"),	
		stateShow = document.getElementById("loginStateShow"),
		stateText = document.getElementById("login2qq_state_txt");
		
		loginstate.onclick=function(e){
			e = e || window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
			stateList.style.display="block";
		}
		
		for (var i=0,l=liList.length;i<l;i++){
			liList[i].onmouseover=function(){
				this.style.background = '#567';
			}
			liList[i].onmouseout=function(){
				this.style.background = "#fff";
			}
			liList[i].onclick=function(e){
				e = e || window.event;
			if(e.stopPropagation){
				e.stopPropagation();
			}else{
				e.cancelBubble=true;
			}
			
			var id=this.id;
			stateList.style.display="none";
			stateShow.className = "login-state-show "+id;
			stateText.innerHTML = getByClassName("stateSelect_text",id)[0].innerHTML;
			}
			
		}
		
		document.onclick=function(){
			stateList.style.display="none";
		}
}

function fndown(event){
	event = event || window.event;
	var oDrag = document.getElementById("loginPanel"),
	disX = event.clientX-oDrag.offsetLeft,
	disY = event.clientY-oDrag.offsetTop;
	
	document.onmousemove = function(event){
		event=event || window.event;
		fnmove(event,disX,disY);
	}
	
	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseup= null;
	}
	
	
}

function fnmove(e,posX,posY){
	var oDrag = document.getElementById("loginPanel"),
		l=e.clientX-posX,
		t=e.clientY-posY,
		winX=document.documentElement.clientWidth || document.body.clientWidth,
		winY=document.documentElement.clientHeight || document.body.clientHeight,
		maxX=winX-oDrag.offsetWidth,
		maxY=winY-oDrag.offsetHeight;
		
		if(l<0){
			l=0;
		}else if(l>maxX){
			l=maxX;
		}
		
		if(t<0){
			t=0;
		}else if(t>maxY){
			t=maxY;
		}
		
		oDrag.style.left=l+"px";
		oDrag.style.top=t+"px";
	
}