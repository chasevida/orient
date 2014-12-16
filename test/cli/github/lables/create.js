// Load modules

var chai        = require('chai'),
    Lab         = require('lab'),
    rewire      = require('rewire'),
    sinon       = require('sinon');

var ghcreate    = rewire('../../../../lib/cli/github/labels/create'),
    lab         = exports.lab = Lab.script();


// BDD style shortcuts
var describe    = lab.describe,
    it          = lab.it,
    before      = lab.before,
    beforeEach  = lab.beforeEach,
    after       = lab.after,
    expect      = chai.expect;


// Tests
describe('Github Labels Create', function() {


    var args,
        labels;

    before(function(done) {

        sinon.stub(console, 'log').returns();
        done();
    });

    beforeEach(function(done) {

        labels = [{
            name: 'Wontfix',
            color: '#efefef'
        }, {
            name: 'Bug',
            color: '#ff0000'
        }];

        args = {
            labels:     labels,
            repository: 'username/repo'
        };

        done();
    });

    after(function(done) {

        console.log.restore();
        done();
    });


    it('should exist', function(done) {
        
        expect( ghcreate ).to.be.a('object');
        done();
    });


    it('should invoke a callback', function(done) {

        var callbackSpy = sinon.spy();
        var postSpy     = sinon.stub(ghcreate, 'postLabel').returns(true);

        var clientStub = {
            getClient: function(args) {
                callbackSpy(args);
                
                return {
                    repo: function() {
                        return 'username/repo';
                    }
                }
            }
        };

        var ghclient = ghcreate.__set__('ghclient', clientStub);

        expect(callbackSpy.callCount).to.equal(0);
        expect(postSpy.callCount).to.equal(0);

        ghcreate.createLabels(args, function() {

            expect(callbackSpy.callCount).to.equal(1);
            expect(postSpy.callCount).to.equal(2);

            ghcreate.postLabel.restore();
            ghclient();

            done();
        });

    });


    it('should return a promise when posting to github', function(done) {

        var ghrepoMock = {
            label: function() {}
        };

        expect(ghcreate.postLabel(ghrepoMock)).to.be.an('object');

        done();
    });


    // Whimsical.
    // The below needs a revist with some promise work baked in,
    // all I'm currently doing is passing through the function. 
    
    it('should resolve promise after post', function(done) {

        var ghrepoMock = {
            label: function(label, callback) {
                callback();
            },
            name: 'username/repo'
        };

        var result = ghcreate.postLabel(ghrepoMock, labels[0]);
        expect(result).to.be.an('object');

        done();
    });

    it('should resolve promise after post with rejected label', function(done) {

        var ghrepoMock = {
            label: function(label, callback) {
                callback(true);
            },
            name: 'username/repo'
        };

        var result = ghcreate.postLabel(ghrepoMock, labels[0]);
        expect(result).to.be.an('object');

        done();
    });

});


