/**
 * Dependencies
 */

var Path = require('path'),
    mocha = require('mocha'),
    utils = require('./utils.js');

/**
 * Test Runner
 *
 * @param {Object} options
 * @api public
 */

module.exports = function(options) {

    if(!options.definition) throw new Error('Must supply a provider definition');

    this.definition = options.definition;
    this.config = options.config || {};
    this.credentials = options.credentials || {};
    if(options.definition.provider && options.definition.provider.prototype.interfaces)
    {
        this.interfaces = options.definition.provider.prototype.interfaces
    }
    else{
        this.interfaces = [];
    }


    // Globalize Adapter
    global.Definition = this.definition;
    global.Configuration = this.config;
    global.Credentials = this.credentials;

    // Build an array of files to test
    var filter = '\\.(' + ['js'].join('|') + ')$';

    var files = [];

    var interfacePath = Path.resolve(__dirname,'./interfaces/base');
    files = files.concat(utils.fileLookup(interfacePath, filter, true));

    this.interfaces.forEach(function(interface) {
        var interfacePath = Path.resolve(__dirname,'./interfaces/' + interface);
        files = files.concat(utils.fileLookup(interfacePath, filter, true));
    });

    // Build a Mocha Runner
    var test = new mocha({
        timeout: 6000,
        reporter: 'dot'
    });

    //add files
    files.forEach(function(file_path){
        test.addFile(file_path);
    })
    // Allow Provider to be a global without warning about a leak
    test.globals([Definition,Configuration,Credentials]);

    test.run(function(failures){
        process.on('exit', function () {
            process.exit(failures);
        });
    });
};
