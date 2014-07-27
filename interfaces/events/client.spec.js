var should = require('should')
var util = require('util')
describe('Client Events Interface', function() {

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


        it('should have a #events() method', function() {
            clientConstructor.prototype.events.should.be.a.Function;
        });
    })

});
