/**
 * Dependencies
 */

var Path = require('path'),
    mocha = require('mocha'),
    utils = require('./utils.js'),
    q = require('q')


function configure(options){
    if(!options.definition) throw new Error('Must supply a provider definition');
    this.name = options.name;
    this.definition = options.definition;
    this.config = options.config || {};
    this.credentials = options.credentials || {};
    this.filefog_options = options.filefog_options || {};
    this.fixtures_path = options.fixtures_path || '/tmp/fixtures';


    // Globalize Adapter
    global.Name = this.name;
    global.Definition = this.definition;
    global.Configuration = this.config;
    global.Credentials = this.credentials;
    global.FilefogOptions = this.filefog_options;
    global.FixturesPath = this.fixtures_path;

    if(options.definition.config && options.definition.config.interfaces)
    {
        global.Interfaces = options.definition.config.interfaces
    }
    else{
        global.Interfaces = [];
    }
}

/**
 * Test Runner
 * @api public
 * @method exports
 * @param {Object} options
 * @return 
 */
module.exports.TestRunner = function(options) {
    configure(options);

    // Build an array of files to test
    var filter = '\\.(' + ['js'].join('|') + ')$';

    var files = [Path.resolve(__dirname,'./helper.js')];

    var interfacePath = Path.resolve(__dirname,'./interfaces/base');
    files = files.concat(utils.fileLookup(interfacePath, filter, true));

    Interfaces.forEach(function(interface) {
        console.log("Adding interface tests: "+interface)
        var interfacePath = Path.resolve(__dirname,'./interfaces/' + interface);
        files = files.concat(utils.fileLookup(interfacePath, filter, true));
    });

    // Build a Mocha Runner
    var test = new mocha({
        timeout: 6000,
        reporter: 'spec'
    });

    //add files
    files.forEach(function(file_path){
        test.addFile(file_path);
    })
    // Allow Provider to be a global without warning about a leak
    test.globals([Definition,Configuration,Credentials,Name]);

    test.run(function(failures){
        process.on('exit', function () {
            process.exit(failures);
        });
    });

//    var promise = q({})
//    if(should_generate_credentials){
//        promise =  generate_credentials();
//    }
//    promise.then(run_tests)

};

/**
 * Use this method as a shortcut to generate oauth tokens on demand. To keep it simple, it takes the same options that
 * the TestRunner takes, so you can just replace the method call with this one.
 * @param options
 * @returns {*}
 * @constructor
 */
module.exports.GenerateCredentials = function(options){
    configure(options)
    var readline = require('readline');
    var filefog = require('filefog')

    filefog.use('cred_load', Definition, Configuration);
    var authProvider = filefog.provider("cred_load")

    var is_oauth = Interfaces.indexOf("oauth") != -1;
    if(!is_oauth){
        console.log("Provider is not an oauth provider, generating credentials is not necessary")
        return q({});
    }

    var authUrl = authProvider.oAuthGetAuthorizeUrl()
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Visit the following url in a browser, authenticate, then paste the code provided by the oauth service. \n\n" + authUrl+" \n\n", function(token) {
        rl.close();
        console.dir(token);
        console.log(authProvider);
        return authProvider.oAuthGetAccessToken(token)
            .then(function(new_cred){
                return utils.saveCredentials(new_cred)
            })
            .fail(function(err){
                console.log("An error occured while saving credentials", err, err.stack);
            })
            .done();

    });

}
