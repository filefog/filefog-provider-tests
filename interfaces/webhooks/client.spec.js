var should = require('should')
var util = require('util')
describe('Client Webhooks Interface', function() {

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



        it('should have a #subscribe() method', function() {
            clientConstructor.prototype.subscribe.should.be.a.Function;
        });

        it('should have a #unsubscribe() method', function() {
            clientConstructor.prototype.unsubscribe.should.be.a.Function;
        });

    })

});
