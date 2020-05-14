var http=require('http');
var dt = require('./myDate');
var url = require('url');

http.createServer(function(req,res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	var txt = "abc";
	res.write(txt);
	res.end();
}).listen(8080);
