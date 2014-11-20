var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');
var os = require('os');
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

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){
  //open the file
  //read file
};

exports.isUrlInList = function(sites, urlName){
  //it has the url or not
  //return true or false
  return sites.indexOf(urlName) < 0;
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
  fs.exists(filePath, function(exist) {
    return exist;
  });
};

exports.downloadUrls = function(newWebSite){
  //download the content
  // fs.writeFile(archive.paths.list, newWebSite, {flag:'a'}, function(err) {
  //   if(err) {
  //       console.log(err);
  //   } else {
  //       console.log("The file was saved!");
  //   }
  // });
};
