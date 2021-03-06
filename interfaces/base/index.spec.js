var should = require('should')

describe('Base Definition', function() {

    /////////////////////////////////////////////////////
    // TEST METHODS
    ////////////////////////////////////////////////////

    it('should export the required base functionality', function() {
        Definition.provider.should.be.a.Function;
        Definition.client.should.be.a.Function;
        Definition.transform.should.be.a.Object;
        Definition.config.should.be.a.Object;
        Definition.config.interfaces.should.be.an.Array;

    });

});
