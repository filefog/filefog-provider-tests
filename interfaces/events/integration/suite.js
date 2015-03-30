var should = require('should');
var utils = require('../../../utils');
var FileFog = require('filefog');

describe('During Integration testing', function () {
    describe('after creating auth client', function() {
        var is_oauth = false;
        var authClient;
        before(function (done) {
            //FileFog.use(Name, Definition, Configuration); //this should already have been registered in the base call
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
                .then(done, done);
        })

        describe('events (changes/delta/polling api)', function () {
            var cursor = null;

            it('should return recent events (or folder structure) if null cursor specified', function (done) {
                authClient.events(null)
                    .then(function (response) {
                        response.next_cursor.should.be.a.string;
                        cursor = response.next_cursor;
                        response.events.should.be.an.Array;

                        if(response.events.length){
                            //TODO, find a better way of testing this, instead of assuming that some events have occured already
                            response.events[0].event_type.should.be.a.String //upsert or delete
                            response.events[0].identifier.should.be.a.String
                        }

//                        console.log(response)
//                        response.name.should.be.a.String
//                        response.identifier.should.be.a.String
//                        testFileIdentifier = response.identifier;
                    })
                    .then(done, done)
            })

            it('should return subsequent events when provided a cursor', function (done) {
                authClient.events(cursor)
                    .then(function (response) {
                        //(cursor == response.next_cursor).should.be.false;
                        response.events.should.be.an.Array;
                        response.events.length.should.be.empty;
                    })
                    .then(done, done)
            })
//
//            it('should successfully Read file contents', function (done) {
//                authClient.downloadFile(testFileIdentifier).then(function (response) {
//                    response.data.toString().should.eql(testFileContent);
//                    response.headers.should.be.Object
//                })
//                    .then(done,done)
//            })
//
//            it('should successfully Delete file', function () {
//                return authClient.deleteFile(testFileIdentifier).then(function (response) {
//                    response.success.should.be.true;
//                })
//            })
        })

    });

});
