function myready(fn){

	//根据不同的浏览器，用不同的方法处理DOMContentLoaded事件的绑定
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded",fn,false);
	}else{
		IEContentLoaded(fn);
	}

	//IE模拟DOMContentLoad
	function IEContentLoaded(fn){
		var done = false;
		var d = window.document;

		//只执行一次调用的函数
		var init = function(){
			if(!done)
			{
				done=true;
				fn();
			}
		};

		(function (){
			try{
				//在DOM树未创建之前调用scroll会抛出错误
				d.documentElement.doScroll('left');
			}catch (e){
				//延迟再试一次
				setTimeout(arguments.callee);
				return;
			}
			//没有错误就表示DOM树创建完毕，然后执行用户回调
			init();
		})();

		//监听document的加载状态
		d.onreadystatechange = function(){
			//如果用户在domready之后绑定函数，马上执行
			if(d.readyState == "complete")
			{
				d.onreadystatechange = null;
				init();
			}
		}

	}
}