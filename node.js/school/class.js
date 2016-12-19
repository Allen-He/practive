var student = require('./student');
var teacher = require('./teacher')

function add(teacherNmae,students){
	teacher.add(teacherNmae)
	students.forEach(function(item,index){
		student.add(item)
	})
}

exports.add = add