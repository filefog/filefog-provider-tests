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

    if(!options.provider) throw new Error('Must supply an provider');

    this.provider = options.provider;
    this.config = options.config || {};
    this.credentials = options.credentials || {};

    // Globalize Adapter
    global.Provider = this.provider;
    global.Configuration = this.config;
    global.Credentials = this.credentials;

    // Build an array of files to test
    var filter = '\\.(' + ['js'].join('|') + ')$';

    var files = [];

    var interfacePath = Path.resolve(__dirname,'./interfaces/base');
    files = files.concat(utils.fileLookup(interfacePath, filter, true));

    // Build a Mocha Runner
    var test = new mocha({
        timeout: 6000
    });

    // Allow Provider to be a global without warning about a leak
    test.globals([Provider,Configuration,Credentials]);
    test.files = files;

    test.run(function(err) {
        process.exit(0);
    });
};
