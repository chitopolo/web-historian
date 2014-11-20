var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, filePath, contentType){
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)

  fs.exists(filePath, function(exists) {
      if (exists) {
          fs.readFile(filePath, function(error, content) {
              if (error) {
                  res.writeHead(500);
                  res.end();
              }
              else {
                  res.writeHead(200, { 'Content-Type': contentType });
                  res.write(content);
                  res.end();
              }
          });
      }
  });
}



  // fs.readFile('public/index.html', function (err, html) {
  //   if (err) throw err;
  //    res.writeHeader(200, {"Content-Type": "text/html"});
  //    res.write(html);
  //    res.end();

  // });
