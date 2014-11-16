var should = require('should')
var util = require('util');
describe('Client Definition', function() {


    describe('With valid configuration', function() {

        var clientConstructor;
        var clientInstance;
        before(function(){
            clientConstructor = Definition.client;

            /**
             * Description
             * @method Wrapper
             * @return 
             */
            var Wrapper = function(){
                this.config = Configuration;
                clientConstructor.call(this);

            }
            util.inherits(Wrapper, clientConstructor);


            clientInstance = new Wrapper();
        })

        /////////////////////////////////////////////////////
        // TEST METHODS
        ////////////////////////////////////////////////////

        it('should have an accountInfo method', function() {
            clientConstructor.prototype.accountInfo.should.be.a.Function;
        });

        it('should have a checkQuota method', function() {
            clientConstructor.prototype.checkQuota.should.be.a.Function;
        });

        it('should have a createFile method', function() {
            clientConstructor.prototype.createFile.should.be.a.Function;
        });

        it('should have a updateFile method', function(){
            clientConstructor.prototype.updateFile.should.be.a.Function;
        })

        it('should have a deleteFile method', function() {
            clientConstructor.prototype.deleteFile.should.be.a.Function;
        });

        it('should have a downloadFile method', function() {
            clientConstructor.prototype.downloadFile.should.be.a.Function;
        });

        it('should have a getFileInformation method', function() {
            clientConstructor.prototype.getFileInformation.should.be.a.Function;
        });

        it('should have a updateFileInformation method', function(){
            clientConstructor.prototype.updateFileInformation.should.be.a.Function;
        })

        it('should have a createFolder method', function() {
            clientConstructor.prototype.createFolder.should.be.a.Function;
        });

        it('should have a deleteFolder method', function() {
            clientConstructor.prototype.deleteFolder.should.be.a.Function;
        });

        it('should have a getFolderInformation method', function() {
            clientConstructor.prototype.getFolderInformation.should.be.a.Function;
        });

        it('should have a retrieveFolderItems method', function() {
            clientConstructor.prototype.retrieveFolderItems.should.be.a.Function;
        });
    })

});
