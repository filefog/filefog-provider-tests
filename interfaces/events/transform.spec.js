var should = require('should');
var util = require('util');
describe('Transforms for Client Events Interface', function() {

    describe('With valid configuration', function() {
        var transform;
        before(function(){
            transform = Definition.transform;
        })

        it('should have a transform #events() method', function() {
            transform.events.should.be.a.Function;
        });

        it('should have a transform #eventUpsert() method', function() {
            transform.eventUpsert.should.be.a.Function;
        });

        it('should have a transform #eventDelete() method', function() {
            transform.eventDelete.should.be.a.Function;
        });
    })

});
