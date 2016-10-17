Filefog Provider Tests
==========================

A set of integration tests that can be included in you FileFog Provider module and used to test
your provider against the current FileFog API.

## FileFog Interface Specification

+ [Reference](https://github.com/filefog/filefog-docs/blob/master/provider-specification.md)
+ [Philosophy & Motivations](https://github.com/filefog/filefog-docs/blob/master/intro-to-custom-provider.md)


## Usage

#### Write a test runner

> i.e. `runner.js`

```javascript
/**
 * Test runner dependencies
 */
var mocha = require('mocha');
var TestRunner = require('filefog-provider-tests');


/**
 * Integration Test Runner
 *
 * Uses the `filefog-provider-tests` module to
 * run mocha tests against the specified interfaces
 * of the currently-implemented Filefog API.
 */
new TestRunner({

	// Load the provider module.
	definition: require('./relative/path/to/your/provider'),

	// Each provider will have different requirements, OAuth providers will require client_key's and client_secret
	s, while the local provider only requires a base_directory. Check the [Reference](https://github.com/filefog/filefog-docs/blob/master/provider-specification.md) doc
	for additional interaces, or create your own.
	config: {
        client_key : '777041726477-a5o1tp6f3i9m1me3tj5vhpnrn1jge43c.apps.googleusercontent.com',
        client_secret : 'mWURYHmMKZxr6aeR7DTjRu-q',
        client_scope : "https://www.googleapis.com/auth/drive",
        redirect_url : 'http://localhost:3000/service/callback/google'
     },

	// The set of adapter interfaces to test against.
	interfaces: ["oauth", "events", "webhooks"]
});
```

#### Run the tests

```sh
$ node runner.js
```

## MIT License

See LICENSE.md.


## TODO:

- fix the test runner vcr filters so they come from the providers them selves.
- add ability to generate credentials.json file in provider on demand.
- DROPBOX SDK version should be changed to use the latest public, rather than my fork. 
- determine if there is a way to only generate VCR recording when a test needs it (using a tag or some sort)