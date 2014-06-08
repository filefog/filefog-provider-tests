var fs = require('fs'),
    Path = require('path'),
    request = require('request'),
    q = require('q')

/**
 * File Loader
 *
 * @param {String} path
 * @param {String} filter
 * @param {Boolean} recursive
 * @return {Array}
 */

exports.fileLookup = function fileLookup(path, filter, recursive) {
  var files = [];

  if (!fs.existsSync(path)) path += '.js';

  // Check if path is a file or directory
  var stat = fs.statSync(path);
  if (stat.isFile()) return path;

  fs.readdirSync(path).forEach(function(file) {
    file = Path.join(path, file);

    // If file is a directory, recursivly call function again
    var stat = fs.statSync(file);
    if (stat.isDirectory()) {
      if (recursive) files = files.concat(fileLookup(file, filter, recursive));
      return;
    }

    var re = new RegExp(filter);

    if (!stat.isFile() || !re.test(file) || Path.basename(file)[0] == '.') return;
    files.push(file);
  });

  return files;
};

function generateOptions(){
    return {
        url: 'https://api.github.com/gists/' + Credentials._gist,
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'analogj',
            "Authorization" : "token " + process.env.GITHUB_ACCESS_TOKEN
        }
    };
}

exports.loadCredentials = function(){

    if(Credentials == null){
        return q(null);
    }
    else if(!Credentials._gist){
        return q(Credentials);
    }
    else{
        var deferred = q.defer();
        var options = generateOptions();
        request.get(options, function(err, req, body){
            if (err) return deferred.reject(err);
            data = JSON.parse(body);
            var cred = JSON.parse(data.files[Name].content);
            return deferred.resolve(cred);
        });
        return deferred.promise;
    }
}


exports.saveCredentials = function(credentials){

    if(Credentials == null){
        return q(null);
    }
    else if(!Credentials._gist){
        return q(Credentials);
    }
    else{
        var deferred = q.defer();
        var options = generateOptions();
        var body = {"files":{}};
        body.files[Name] = {"content" : JSON.stringify(credentials)};
        options.body = JSON.stringify(body);
        request.patch(options, function(err, req, body){
            if (err) return deferred.reject(err);
            return deferred.resolve();
        });
        return deferred.promise;
    }
}


function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

exports.guid = function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};