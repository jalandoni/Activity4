
var http = require('http');
var a = require('./enrollStudent.js')
var d = require('./classEnroll.js')
console.log("connect");

http.createServer(function (req, res) {
    a.enrollStudent(req,res);
    d.classEnroll(req,res);

}).listen(8080);