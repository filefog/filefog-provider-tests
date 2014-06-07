var should = require('should')
var util = require('util');
describe('Transform Definition', function() {


    describe('With valid configuration', function() {

        var transform;
        before(function(){
            transform = Definition.transform;
        })

        /////////////////////////////////////////////////////
        // TEST METHODS
        ////////////////////////////////////////////////////

        it('should have an accountInfo method', function() {
            transform.accountInfo.should.be.a.Function;
        });

        it('should have a checkQuota method', function() {
            transform.checkQuota.should.be.a.Function;
        });

        it('should have a createFile method', function() {
            transform.createFile.should.be.a.Function;
        });

        it('should have a deleteFile method', function() {
            transform.deleteFile.should.be.a.Function;
        });

        it('should have a downloadFile method', function() {
            transform.downloadFile.should.be.a.Function;
        });

        it('should have a getFileInformation method', function() {
            transform.getFileInformation.should.be.a.Function;
        });

        it('should have a createFolder method', function() {
            transform.createFolder.should.be.a.Function;
        });

        it('should have a deleteFolder method', function() {
            transform.deleteFolder.should.be.a.Function;
        });

        it('should have a getFolderInformation method', function() {
            transform.getFolderInformation.should.be.a.Function;
        });

        it('should have a retrieveFolderItems method', function() {
            transform.retrieveFolderItems.should.be.a.Function;
        });
    })

});
