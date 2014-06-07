var should = require('should')
var util = require('util')
describe('Provider OAuth Interface', function() {

    describe('With valid configuration', function() {
        var providerConstructor;
        var providerInstance;
        before(function(){
            providerConstructor = Definition.provider;

            var Wrapper = function(){
                this.config = Configuration;
                providerConstructor.call(this);

            }
            util.inherits(Wrapper, providerConstructor);

            providerInstance = new Wrapper();
        })


        it('should have a #oAuthGetAuthorizeUrl() method', function() {
            providerConstructor.prototype.oAuthGetAuthorizeUrl.should.be.a.Function;
        });

        it('should have a #oAuthGetAccessToken() method', function() {
            providerConstructor.prototype.oAuthGetAccessToken.should.be.a.Function;
        });

        it('should have a #oAuthRefreshAccessToken() method', function() {
            providerConstructor.prototype.oAuthRefreshAccessToken.should.be.a.Function;
        });

        describe('#oAuthGetAuthorizeUrl()', function() {
            it('should return an authorization url', function(){
                providerConstructor.prototype.oAuthGetAuthorizeUrl.should.be.a.Function;
            })
        })
    })

});
