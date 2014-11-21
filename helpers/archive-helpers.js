var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');
var os = require('os');
var url = require('url');
var http = require('http');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};


exports.readListOfUrls = function(){
  //open the file
  //read file
};

exports.isUrlInList = function(url){
  fs.readFile(archive.paths.list, function (err, data) {
    if (err) throw err;
    if(JSON.parse(JSON.stringify(data)).indexOf(url) < 0){
     return false;
    }
  });
  return true;
};

exports.addUrlToList = function(site){
  //open the file
  //add url to the list
  var path = site.split("=");
  var urlName = path[path.length - 1];

  fs.writeFile(archive.paths.list, urlName + os.EOL, {flag:'a'}, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
  });
};

exports.isURLArchived = function(filePath){
  //look if the site is archived
  // console.log(filePath);
 fs.readFile(filePath, function (err, data) {
  console.log('cannot read');
    if (err) return false;
  });
 console.log('can read');
  return true;
};

exports.downloadUrls = function(urlName){
    var file = fs.createWriteStream(archive.paths.archivedSites + '/' + urlName);
    http.get('http://'+ urlName, function(res) {
        res.on('data', function(data) {
                file.write(data);
            }).on('end', function() {
                file.end();
            });
    });
};


// exports.downloadUrls();

