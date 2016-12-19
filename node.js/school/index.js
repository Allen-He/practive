var klass = require('./class')

klass.add('Scorrt',['mayuyu','maeda'])

exportx.add = function(klasses){
	klasses.forEach(function(item,index){
		var _klass = item
		var teacherName = item.teacherName
		var students = item.students

		klass.add(teacherName,students)
	})
}