var should = require('should')

describe('Provider OAuth Interface', function() {

    it('should raise an error with invalid configuration', function(){
        should(function(){Provider.provider()}).throw
    })

    describe('With valid configuration', function() {
        var providerInstance;
        before(function(){
            var ProviderConstructor = Provider.provider;
            providerInstance = new ProviderConstructor(Configuration);
        })

        it('should have a #oAuthGetAuthorizeUrl() method', function() {
            providerInstance.oAuthGetAuthorizeUrl.should.be.a.Function;
        });

        it('should have a #oAuthGetAccessToken() method', function() {
            providerInstance.oAuthGetAccessToken.should.be.a.Function;
        });

        it('should have a #oAuthRefreshAccessToken() method', function() {
            providerInstance.oAuthRefreshAccessToken.should.be.a.Function;
        });

        describe('#oAuthGetAuthorizeUrl()', function() {
            it('should return an authorization url', function(){
                providerInstance.oAuthGetAuthorizeUrl().should.be.a.String;
            })
        })
    })

});
