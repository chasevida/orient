// Load modules

var chai        = require('chai'),
    Lab         = require('lab'),
    rewire       = require('rewire'),
    sinon        = require('sinon');

var githubClient = rewire('../../../lib/cli/github/client'),
    lab          = exports.lab = Lab.script();


// BDD style shortcuts
var describe    = lab.describe,
    it          = lab.it,
    before      = lab.before,
    beforeEach  = lab.beforeEach,
    after       = lab.after,
    expect      = chai.expect;


// Tests
describe('Github Client', function() {


    var args;

    beforeEach(function(done) {

        args = {
            username: 'username',
            password: 'password'
        };

        done();
    });


    it('should exist', function(done) {
        
        expect( githubClient ).to.be.a('object');
        done();
    });


    it('should have a get client function', function(done) {
        
        expect( githubClient.getClient ).to.be.a('function');
        done();
    });


    it('should have a get client function', function(done) {
        
        var callbackSpy = sinon.spy();

        var githubStub = {
            client: function(args) {
                callbackSpy(args);
                return args;
            }
        };

        var github = githubClient.__set__('github', githubStub);

        expect(callbackSpy.callCount).to.equal(0);
        var result = githubClient.getClient(args);

        expect(callbackSpy.callCount).to.equal(1);
        expect(callbackSpy.calledWith(args)).to.be.true;
        expect(result).to.have.keys(['username', 'password']);

        github();
        
        done();
    });

});