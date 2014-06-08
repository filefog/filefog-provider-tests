var should = require('should');
var utils = require('../../../utils');
var FileFog = require('filefog');

describe('Integration Testing', function () {
    describe('create Client', function() {
        var is_oauth = false;
        var authClient;
        before(function (done) {
            FileFog.use(Name, Definition, Configuration);
            provider = FileFog.provider(Name);
            is_oauth = provider.interfaces.indexOf("oauth") != -1;
            utils.loadCredentials()
                .then(function (cred) {
                    if (is_oauth) {
                        return provider.oAuthRefreshAccessToken(cred)
                            .then(function (new_cred) {
                                return utils.saveCredentials(new_cred)
                                    .then(function () {
                                        return FileFog.client(Name, cred)
                                    })
                            })
                    }
                    else {
                        return FileFog.client(Name, cred);
                    }
                })
                .then(function (client) {
                    authClient = client;
                })
                .then(done, done);
        })

        describe('File Methods', function () {
            var testFileName = null;
            var testFileContent = "this is test content";
            var testFileIdentifier = null;
            before(function () {
                testFileName = utils.guid() + '_test.txt'
            })

            it('should successfully Create file in root directory', function (done) {
                authClient.createFile(testFileName, null, new Buffer(testFileContent))
                    .then(function (response) {
                        console.log("CREATE",response);
                        response.success.should.be.true;
                        response.identifier.should.be.String
                        testFileIdentifier = response.identifier;
                    })
                    .then(done, done)
            })

            it('should successfully Read file metadata', function (done) {
                authClient.getFileInformation(testFileIdentifier)
                    .then(function (response) {
                        console.log("READ",response)
                        response.is_file.should.be.true;
                        response.identifier.should.be.ok
                    })
                    .then(done, done)
            })
//
//            it('should successfully Read file contents', function () {
//                return Client.DownloadFile('/' + testFileName).then(function (response) {
//                    assert.equal(response.toString(), testFileContent);
//                })
//            })
//
//            it('should successfully Delete file', function () {
//                return Client.DeleteFile('/' + testFileName).then(function (response) {
//                    assert.equal(response.path, '/' + testFileName);
//                    assert(response.isRemoved);
//                })
//            })
//        })
//
//        describe('Folder Methods', function () {
//            var Client = null;
//            var testFolderName = null;
//            before(function (done) {
//                testFolderName = require('../utility').guid() + '_test'
//                Provider.CreateClient(test_oauth_data).then(function (client) {
//                    Client = client;
//                    done();
//                })
//            })
//            describe('when no identifiers provided', function(){
//                it('should successfully get root folder information', function () {
//                    return Client.GetFolderInformation().then(function (response) {
//                        assert(response.isFolder);
//                        assert.equal(response.path, '');
//                    })
//                })
//
//                it('should successfully Read root folder metadata', function () {
//                    return Client.RetrieveFolderItems().then(function (response) {
//                    })
//                })
//            })
//
//            it('should successfully Create folder in root directory', function () {
//                return Client.CreateFolder(testFolderName).then(function (response) {
//                    assert(response.isFolder);
//                    assert.equal(response.path, '/' + testFolderName);
//                })
//            })
//
//            it('should successfully Read folder metadata', function () {
//                return Client.GetFolderInformation('/' + testFolderName).then(function (response) {
//                    assert(response.isFolder);
//                    assert.equal(response.path, '/' + testFolderName);
//                })
//            })
//
//            it('should successfully Read folder contents', function () {
//                return Client.RetrieveFolderItems('/' + testFolderName).then(function (response) {
//                    assert.deepEqual(response.content_array, []);
//                    assert.deepEqual(response.content_stat_array, []);
//                })
//            })
//
//            it('should successfully Delete folder', function () {
//                return Client.DeleteFolder('/' + testFolderName).then(function (response) {
//                    assert.equal(response.path, '/' + testFolderName);
//                    assert(response.isRemoved);
//                })
//            })
//        })
//
//        describe('Account Methods', function () {
//            var Client = null;
//            before(function (done) {
//                Provider.CreateClient(test_oauth_data).then(function (client) {
//                    Client = client;
//                    done();
//                })
//            })
//
//            it('should access account info', function () {
//                return Client.AccountInfo().then(function (response) {
//                    assert(response.name);
//                    assert(response.email);
//                })
//            })
//
//            it('should access quota info', function () {
//                return Client.CheckQuota().then(function (response) {
//                    assert(response.privateBytes);
//                    assert(response.quota);
//                })
//            })
//        })

        })
//
//        var Provider = null
//
//
//    describe('Standard Init Calls', function(){
//        //this is not necessarily a test, but needs to be done incase the token has expired.
//        it('should successfully refresh oauth_token', function () {
//            return Provider.oAuthRefreshAccessToken(test_oauth_data).then(function(new_oauth_data){
//                assert(new_oauth_data);
//                test_oauth_data = new_oauth_data;
//                require('../utility.js').saveAccessToken('dropbox', new_oauth_data);
//            })
//        })
//    })
//

    });
});
