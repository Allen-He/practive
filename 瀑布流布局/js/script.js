window.onload = function(){
	waterWall("main","box");
	var data = [{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},
				 {"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"}];
	window.onscroll = function(){
		if(loadMore()){
			var main = document.getElementById("main");
			for(var i = 0;i<data.length;i++){	
				var oBox = document.createElement("div");
				oBox.className = "box";
				main.appendChild(oBox);
				var oPic = document.createElement("div");
				oPic.className = "pic";
				oBox.appendChild(oPic);
				var oImg = document.createElement("img");
				oImg.src = "img/" + data[i].src;
				oPic.appendChild(oImg);
			    
			}
			//waterWall("main","box");
			setTimeout(function(){waterWall("main","box")},0);
		}
	}
}

function waterWall(parent,box){
	var main = document.getElementById(parent);
	var boxs = getClassName(main,box);
	var lineH = [];
	var boxW = boxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth / boxW);
	//console.log(cols);
	main.style.width = boxW * cols + "px";
	for(var i = 0;i<boxs.length;i++){
		if(i<cols){
			lineH.push(boxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,lineH);
			var index = getMin(lineH,minH);
			boxs[i].style.position = "absolute";
			boxs[i].style.top = minH + "px";
			boxs[i].style.left = boxW * index + "px";
			lineH[index] += boxs[i].offsetHeight;
		}
	}
	console.log(lineH);
}

function loadMore(){
	var oParent = document.getElementById("main");
	var boxs = getClassName(oParent,'box');
	var lastBox = boxs[boxs.length-1].offsetTop + Math.floor(boxs[boxs.length-1].offsetHeight / 2);
	var height = document.documentElement.clientHeight || document.body.clientHeight;
	var top = document.documentElement.scrollTop || document.body.scrollTop;
	
	//判断若最后一张图片距离文档顶部加自身一半高度的值大于文档高度加滚动高度的值的话，加载更多图片
	//console.log("height:"+height+"top:"+top+"lastBox:"+lastBox);
	if(lastBox <= height+top){
		console.log("true");
		return true;
		
	}
	//console.log("false");
	return false;
	

}


function getMin(arr,ele){
	for(var i = 0;i<arr.length;i++){
		var index = i;
		if(arr[i] == ele){
			return index;
		}
	}
}

function getClassName(obj,cls){
	var ele = obj.getElementsByTagName("*");
	var result = [];
	for(var i = 0;i<ele.length;i++){
		if(ele[i].className == cls){
			result.push(ele[i]);
		}
	}
	return result;
}