var fs = require('fs'),
    Path = require('path'),
    q = require('q')

/**
 * File Loader
 * @method fileLookup
 * @param {String} path
 * @param {String} filter
 * @param {Boolean} recursive
 * @return files
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


/**
 * Description
 * @method loadCredentials
 * @return 
 */
exports.loadCredentials = function(){

    if(Credentials == null){
        return q({});
    }
    else if(!Credentials._file){
        return q(Credentials);
    }
    else{
        //we have to load the credentials from the filesystem.

        return q.nfcall(fs.readFile, Path.resolve(Credentials._file,'live.json'), "utf-8")
            .fail(function(err){
                return q.nfcall(fs.readFile, Path.resolve(Credentials._file,'example.json'), "utf-8")
            })
            .then(function(data){
                return JSON.parse(data)
            })
    }
}


/**
 * Description
 * @method saveCredentials
 * @param {} credentials
 * @return 
 */
exports.saveCredentials = function(credentials){
    if(Credentials == null){
        return q(null);
    }
    else if(!Credentials._file){
        return q(Credentials);
    }
    else{
        return q.nfcall(fs.writeFile, Path.resolve(Credentials._file,'live.json'), JSON.stringify(credentials))
    }
}
