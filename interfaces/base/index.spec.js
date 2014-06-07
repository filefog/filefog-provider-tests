var should = require('should')

describe('Base Definition', function() {

    /////////////////////////////////////////////////////
    // TEST METHODS
    ////////////////////////////////////////////////////

    it('should export the required base functionality', function() {
        Definition.provider.should.be.a.Function;
        Definition.provider.prototype.interfaces.should.be.an.Array;
        Definition.client.should.be.a.Function;
        Definition.transform.should.be.a.Object;
    });

});
