var should = require('should')
var util = require('util')
describe('Provider Webhooks Interface', function() {

    describe('With valid configuration', function() {
        var providerConstructor;
        var providerInstance;
        before(function(){
            providerConstructor = Definition.provider;

            /**
             * Description
             * @method Wrapper
             * @return
             */
            var Wrapper = function(){
                this.config = Configuration;
                providerConstructor.call(this);

            }
            util.inherits(Wrapper, providerConstructor);

            providerInstance = new Wrapper();
        })

        it('should have a #events_webhook() method', function() {
            providerConstructor.prototype.events_webhook.should.be.a.Function;
        });
    })

});
