// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var comments = require('./comments.json');

// Create server
http.createServer(function (req, res) {
  if (req.url === '/comments' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(comments));
  } else if (req.url === '/comments' && req.method === 'POST') {
    var body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });

    req.on('end', function () {
      var newComment = JSON.parse(body);
      comments.push(newComment);
      fs.writeFile('comments.json', JSON.stringify(comments, null, 2), function (err) {
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newComment));
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}).listen(3000, function () {
  console.log('Server is running on http://localhost:3000');
});