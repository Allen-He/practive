// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    if(arr instanceof Array){
    	return true
    }else{
    	return false
    }
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    if(typeof fn){
    	return true
    }else{
    	return false
    }
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var clone;
    switch(Object.prototype.toString.call(src)){
    	case "[object Number]":
    		//new number使用构造函数的方法创建的是一个number对象，属于应用类型，若直接赋值则是复制指针地址，所以要重新new一个。
    		//若本身是一个基本类型的值，则可以直接赋值
    		clone = (typeof src == "object" ? new Number(src) : parseFloat(src.toString()));
    		break;
    	case "[object String]":
    		clone = (typeof src == "object" ? new String(src) : src.toString());
    		break;
    	case "[object Boolean]":
    		clone = (typeof src == "object" ? new Boolean(src) : src);
    		break;
    	case "[object Date]":
    		clone = new Date(src);
    		break;
    	case "[object Array]":
    		var temp = new Array();
    		for(var i =0;i<src.length;i++){
    			var a = src[i];
    			//将src数组的元素用cloneObject递归，克隆每个元素，然后放入temp这个临时数组
    			temp[i] = cloneObject(a);
    		}
    		clone = temp;
    		break;
    	case "[object Object]":
    		var temp = new Object();
    		var index = Object.keys(src);//Object.keys获取src对象的所有属性名，返回一个数组如：["aa"."bb"]
    		for(var i = 0;i<index.length;i++){
    			var a = index[i];//遍历属性名，赋值给a
    			temp[a] = cloneObject(src[a]);//temp[a],src[a]表示对象的某个属性，如src.aa,用自身递归
    		}
    		clone = temp;
    		break;
    	default :
    		break;
    }
    return clone
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"