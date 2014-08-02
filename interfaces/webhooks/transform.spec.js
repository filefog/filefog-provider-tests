var should = require('should');
var util = require('util');
describe('Transforms for Webhooks Interface', function() {

    describe('With valid configuration', function() {
        var transform;
        before(function(){
            transform = Definition.transform;
        })

        it('should have a transform #subscribe() method', function() {
            transform.subscribe.should.be.a.Function;
        });

        it('should have a transform #unsubscribe() method', function() {
            transform.unsubscribe.should.be.a.Function;
        });

        it('should have a transform #events_webhook() method', function() {
            transform.events_webhook.should.be.a.Function;
        });
    })

});