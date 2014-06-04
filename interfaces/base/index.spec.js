var should = require('should')

describe('Base Interface', function() {

    /////////////////////////////////////////////////////
    // TEST METHODS
    ////////////////////////////////////////////////////

    it('should export the required base functionality', function() {
        Provider.provider.should.be.a.Function;
        Provider.provider.prototype.interfaces.should.be.an.Array;
        Provider.client.should.be.a.Object;
        Provider.transform.should.be.a.Object;
    });

});
