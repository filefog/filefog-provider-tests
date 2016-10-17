var should = require('should');
var utils = require('../../../utils');
var FileFog = require('filefog');

describe('During Integration testing', function () {
    describe('after creating auth client', function() {
        var is_oauth = false;
        var authClient;
        before(function (done) {
            FileFog.use(Name, Definition, Configuration);
            provider = FileFog.provider(Name,FilefogOptions);
            is_oauth = provider.getConfig().interfaces.indexOf("oauth") != -1;
            utils.loadCredentials()
                .then(function (cred) {
                    if (is_oauth) {
                        return provider.oAuthRefreshAccessToken(cred)
                            .then(function (new_cred) {
                                return utils.saveCredentials(new_cred)
                                    .then(function () {
                                        return FileFog.client(Name, new_cred,FilefogOptions)
                                    })
                            })
                    }
                    else {
                        return FileFog.client(Name, cred,FilefogOptions);
                    }
                })
                .then(function (client) {
                    authClient = client;
                })
                .fail(function(err){
                    console.log(err,err.trace);
                    throw err;
                })
                .then(done, done);
        })

        describe('file methods', function () {
            var testFileName = null;
            var testFileContent = "this is test content";
            var testFileIdentifier = null;
            before(function () {
                testFileName = 'file_c69b0f04-3826-465b-a491-527a1a4abc95_test.txt'
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

            var updatedFileContent = "this is updated test content";

            it('should successfully Update file contents', function(done){
                authClient.updateFile(testFileIdentifier, new Buffer(updatedFileContent)).then(function (response) {
                    response.name.should.be.a.String
                    response.identifier.should.be.a.String
                    testFileIdentifier.should.eql(response.identifier)
                })
                    .then(done,done)
            })

            it('should successfully Read updated file contents', function(done){
                authClient.downloadFile(testFileIdentifier).then(function (response) {
                    response.data.toString().should.eql(updatedFileContent);
                    response.headers.should.be.Object
                })
                    .then(done,done)
            })

            it('should successfully Delete file', function (done) {
                return authClient.deleteFile(testFileIdentifier).then(function (response) {
                    response.success.should.be.true;
                })
                    .then(done, done)
            })



            describe('when attempting to rename file', function () {
                var testFileName = null;
                var renamedTestFileName = null;
                var testFileContent = "this is test content";
                var testFileIdentifier = null;

                before(function () {
                    testFileName = 'file_f4200603-bd2d-4702-82e8-8714e679eaa5_test.txt';
                    renamedTestFileName = 'renamedfile_db93757d-9d77-4a26-83b4-408e23df0a13_test.txt'

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

                it('should successfully Update file title in metadata', function (done) {
                    authClient.updateFileInformation(testFileIdentifier, renamedTestFileName)
                        .then(function (response) {
                            response.name.should.be.eql(renamedTestFileName)
                            response.is_file.should.be.true;
                            response.identifier.should.be.a.String
                            testFileIdentifier = response.identifier;
                        })
                        .then(done, done)
                })

                it('should successfully Read file metadata', function (done) {
                    authClient.getFileInformation(testFileIdentifier)
                        .then(function (response) {
                            response.name.should.be.eql(renamedTestFileName)
                            response.is_file.should.be.true;
                            response.identifier.should.be.a.String
                        })
                        .then(done, done)
                })

                it('should successfully Delete file', function (done) {
                    return authClient.deleteFile(testFileIdentifier).then(function (response) {
                        response.success.should.be.true;
                    })
                        .then(done, done)
                })

            })

            describe('when attempting to move file (change parent)', function () {
                var testFileName = null;
                var testFileContent = "this is test content";
                var testFileIdentifier = null;

                var testParentFolderName = null;
                var testParentFolderIdentifier = null;


                before(function () {
                    testFileName = 'file_897d151f-056c-4dc7-844a-f77a17ea26cd_test.txt';
                    testParentFolderName = 'parent_folder_f527c704-b863-4cca-94db-d72967d973aa_test'
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

                it('should successfully Create lvl1 folder in root directory', function (done) {
                    authClient.createFolder(testParentFolderName).then(function (response) {
                        response.name.should.be.eql(testParentFolderName);
                        response.identifier.should.be.a.String;
                        testParentFolderIdentifier = response.identifier;
                    })
                        .then(done,done)
                })


                it('should successfully Update file parent in metadata', function (done) {
                    authClient.updateFileInformation(testFileIdentifier, null, testParentFolderIdentifier)
                        .then(function (response) {
                            response.name.should.be.eql(testFileName)
                            response.is_file.should.be.true;
                            response.identifier.should.be.a.String
                            response.parent_identifier.should.eql(testParentFolderIdentifier);
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
                            response.parent_identifier.should.eql(testParentFolderIdentifier);
                        })
                        .then(done, done)
                })

                it('should successfully Delete file', function (done) {
                    return authClient.deleteFile(testFileIdentifier).then(function (response) {
                        response.success.should.be.true;
                    })
                        .then(done, done)
                })
                it('should successfully Delete folder', function (done) {
                    authClient.deleteFolder(testParentFolderIdentifier).then(function (response) {
                        response.success.should.be.true;
                    })
                        .then(done,done)
                })
            })
        })



        describe('folder methods', function () {
            var testFolderName = null;
            var testFolderIdentifier;
            before(function () {
                testFolderName = 'folder_c85d6ef5-b49c-47e9-9bfe-7120f040de12_test'
            })
            describe('when no identifiers provided', function(){
                it('should successfully get root folder information', function (done) {
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

        describe('subfolder methods', function(){

            var testlvl1FolderName = null;
            var testlvl1FolderIdentifier;

            var testlvl2FolderName = null;
            var testlvl2FolderIdentifier;

            var testFileName = null;
            var testFileContent = "this is test content";
            var testFileIdentifier = null;

            before(function () {
                testFileName = 'file_85defe30-9a6a-42b0-9174-3ed877abf930_test.txt'
                testlvl1FolderName = 'lvl1_folder_25238ae6-977e-4d9e-a1f8-dc127e623331_test'
                testlvl2FolderName = 'lvl2_folder_6fa12765-b347-405d-bcf7-dbabb3bdaf21_test'
            })

            it('should successfully Create lvl1 folder in root directory', function (done) {
                authClient.createFolder(testlvl1FolderName).then(function (response) {
                    response.name.should.be.eql(testlvl1FolderName);
                    response.identifier.should.be.a.String;
                    testlvl1FolderIdentifier = response.identifier;
                })
                    .then(done,done)
            })

            it('should successfully Create file in lvl1 folder, and return basic file properties.', function (done) {
                authClient.createFile(testFileName, testlvl1FolderIdentifier, new Buffer(testFileContent))
                    .then(function (response) {
                        response.name.should.be.a.String
                        response.identifier.should.be.a.String
                        response.parent_identifier.should.eql(testlvl1FolderIdentifier);
                        testFileIdentifier = response.identifier;
                    })
                    .then(done, done)
            })

            it('should successfully Delete file in lvl1 folder', function (done) {
                return authClient.deleteFile(testFileIdentifier).then(function (response) {
                    response.success.should.be.true;
                })
                    .then(done, done)
            })

            it('should successfully Create lvl2 folder in lvl1 directory', function (done) {
                authClient.createFolder(testlvl2FolderName,testlvl1FolderIdentifier).then(function (response) {
                    response.name.should.be.eql(testlvl2FolderName);
                    response.identifier.should.be.a.String;
                    response.parent_identifier.should.eql(testlvl1FolderIdentifier);
                    testlvl2FolderIdentifier = response.identifier;
                })
                    .then(done,done)
            })

            it('should successfully Delete folder in lvl1 folder', function (done) {
                return authClient.deleteFolder(testlvl2FolderIdentifier).then(function (response) {
                    response.success.should.be.true;
                })
                    .then(done, done)
            })

            it('should successfully Delete lvl1 folder', function (done) {
                return authClient.deleteFolder(testlvl1FolderIdentifier).then(function (response) {
                    response.success.should.be.true;
                })
                    .then(done, done)
            })

        })


        describe('account methods', function () {

            it('should access account info', function (done) {
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
