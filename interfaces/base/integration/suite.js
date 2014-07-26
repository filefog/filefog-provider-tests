var should = require('should');
var utils = require('../../../utils');
var FileFog = require('filefog');

describe('During Integration testing', function () {
    describe('after creating auth client', function() {
        var is_oauth = false;
        var authClient;
        before(function (done) {
            FileFog.use(Name, Definition, Configuration);
            provider = FileFog.provider(Name);
            is_oauth = provider.getConfig().interfaces.indexOf("oauth") != -1;
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

        describe('file methods', function () {
            var testFileName = null;
            var testFileContent = "this is test content";
            var testFileIdentifier = null;
            before(function () {
                testFileName = 'file_'+utils.guid() + '_test.txt'
            })

            it('should successfully Create file in root directory, and return basic file properties.', function (done) {
                authClient.createFile(testFileName, null, new Buffer(testFileContent))
                    .then(function (response) {
                        response.name.should.be.a.String
                        response.identifier.should.be.a.String
                        testFileIdentifier = response.identifier;
                    })
                    .then(done, done)
            })

            it('should successfully Read file metadata', function (done) {
                authClient.getFileInformation(testFileIdentifier)
                    .then(function (response) {
                        response.name.should.be.eql(testFileName)
                        response.is_file.should.be.true;
                        response.identifier.should.be.a.String
                    })
                    .then(done, done)
            })

            it('should successfully Read file contents', function (done) {
                authClient.downloadFile(testFileIdentifier).then(function (response) {
                    response.data.toString().should.eql(testFileContent);
                    response.headers.should.be.Object
                })
                    .then(done,done)
            })

            it('should successfully Delete file', function () {
                return authClient.deleteFile(testFileIdentifier).then(function (response) {
                    response.success.should.be.true;
                })
            })
        })

        describe('folder methods', function () {
            var testFolderName = null;
            var testFolderIdentifier;
            before(function () {
                testFolderName = 'folder_'+utils.guid() + '_test'
            })
            describe('when no identifiers provided', function(done){
                it('should successfully get root folder information', function () {
                    authClient.getFolderInformation()
                        .then(function (response) {
                            response.is_folder.should.be.true;
                        })
                        .then(done,done)
                })

                it('should successfully Read root folder metadata', function (done) {
                    authClient.retrieveFolderItems()
                        .then(function (response) {
                            //response.total_items.should.be.a.Number;
                            response.content.should.be.a.Array
                        })
                        .then(done,done)
                })
            })

            it('should successfully Create folder in root directory', function (done) {
                authClient.createFolder(testFolderName).then(function (response) {
                    response.name.should.be.eql(testFolderName);
                    response.identifier.should.be.a.String;
                    testFolderIdentifier = response.identifier;
                })
                    .then(done,done)
            })

            it('should successfully Read folder metadata', function (done) {
                authClient.getFolderInformation(testFolderIdentifier).then(function (response) {
                    response.is_folder.should.be.true;
                    response.name.should.be.eql(testFolderName);
                })
                    .then(done,done)
            });

            it('should successfully Read folder contents', function (done) {
                authClient.retrieveFolderItems(testFolderIdentifier).then(function (response) {
                    response.content.should.be.an.Array
                })
                    .then(done,done)
            })

            it('should successfully Delete folder', function (done) {
                authClient.deleteFolder(testFolderIdentifier).then(function (response) {
                    response.success.should.be.true;
                })
                    .then(done,done)
            })

        })

        describe('account methods', function (done) {

            it('should access account info', function () {
                authClient.accountInfo().then(function (response) {
                    response.should.be.an.Object;

                })
                    .then(done,done)
            })

            it('should access quota info', function (done) {
                authClient.checkQuota().then(function (response) {
                    response.should.be.a.object
                    response.total_bytes.should.be.a.Number;
                    response.used_bytes.should.be.a.Number;
                    response.limits.should.be.a.Object
                })
                    .then(done,done)
            })
        })

    });

});
