// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) { //考虑到兼容性，应该是用Object.prototype.toString.call()
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


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var arrSort = [];
    var arrKey = {};
    for(var i =0;i<arr.length;i++){
    	var key = arr[i];
    	if(!arrKey[key]){
    		arrSort.push(key);
    		arrKey[key] = 1;
    	}
    }
    return arrSort
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var strs = str.split("");
    var len = strs.length;
    var i,j;
    var result = [];
    for(i=0;i<len;i++){
    	if(strs[i] != " "){
    		break;
    	}
    }
    for(j=len-1;j>0;j--){
    	if(strs[j] != " "){
    		break;
    	}
    }
    for(var k = i;k <= j;k++){
    	result.push(strs[k]);
    }
    return result.join("");
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g,"");
}

// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(var i=0;i<arr.length;i++){
    	var index = i;
    	var item = arr[i];
    	fn(item,index);//传入的是outputT时，index参数没有用到，不报错。js没有函数重载
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function outputT(item) {
    console.log(item)
}
each(arr, outputT);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	//return Object.keys(obj).length
	var i;
	var num = 0;
	for (i in obj){
		num++
	}
	return num

}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

// 判断是否为邮箱地址
function isEmail(emailStr) {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+(.[a-zA-Z0-9])+$/.test(emailStr) //^表示开头，$表示结尾,+表示至少有一个
}

// 判断是否为手机号
function isMobilePhone(phone) {
    return /^1[0-9]{10}$/.test(phone)
}