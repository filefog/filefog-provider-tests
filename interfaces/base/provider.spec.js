var should = require('should')

describe('Provider Interface', function() {

    describe('With valid configuration', function() {

        var providerInstance;
        before(function(){
            var ProviderConstructor = Provider.provider;
            providerInstance = new ProviderConstructor(Configuration,"test_registered_name");
        })

        /////////////////////////////////////////////////////
        // TEST METHODS
        ////////////////////////////////////////////////////

        it('should have a CreateClient method', function() {
            providerInstance.CreateClient.should.be.a.Function;
        });

        it('should have a #GetConfig() method', function() {
            providerInstance.GetConfig.should.be.a.Function;
        });

        it('should have a #SetConfig() method', function() {
            providerInstance.GetConfig.should.be.a.Function;
        });

        it('should return the alias that it was registered with', function() {
            providerInstance.alias.should.be.eql("test_registered_name");
        });

        describe('#GetConfig()', function() {
            it('should return a hash', function(){
                providerInstance.GetConfig().should.be.an.Object;
            })
        })

        describe('#SetConfig()', function() {
            it('should extend the existing configuration', function(){
                providerInstance.SetConfig({new_property:'value'});
                providerInstance.GetConfig().new_property.should.be.eql('value');
                providerInstance.SetConfig({});
                providerInstance.GetConfig().new_property.should.be.eql('value');
            });
        })
    })

});
