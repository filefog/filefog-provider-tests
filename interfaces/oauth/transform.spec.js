var should = require('should');
var util = require('util');
describe('Transforms for OAuth Interface', function() {

    describe('With valid configuration', function() {
        var transform;
        before(function(){
            transform = Definition.transform;
        })

        it('should have a transform #oAuthGetAccessToken() method', function() {
            transform.oAuthGetAccessToken.should.be.a.Function;
        });

        it('should have a transform #oAuthRefreshAccessToken() method', function() {
            transform.oAuthRefreshAccessToken.should.be.a.Function;
        });
    })

});
