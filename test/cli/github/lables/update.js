// Load modules

var chai        = require('chai'),
    Lab         = require('lab'),
    rewire      = require('rewire'),
    sinon       = require('sinon');

var ghupdate    = rewire('../../../../lib/cli/github/labels/update'),
    lab         = exports.lab = Lab.script();


// BDD style shortcuts
var describe    = lab.describe,
    it          = lab.it,
    before      = lab.before,
    beforeEach  = lab.beforeEach,
    after       = lab.after,
    expect      = chai.expect;


// Tests
describe('Github Labels Update', function() {


    var args,
        labels;

    before(function(done) {

        sinon.stub(console, 'log').returns();
        done();
    });

    beforeEach(function(done) {

        labels = [null, {
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
        
        expect( ghupdate ).to.be.a('object');
        done();
    });


    it('should invoke a callback', function(done) {

        var callbackSpy = sinon.spy();
        var postSpy     = sinon.stub(ghupdate, 'patchLabel').returns(true);

        var clientStub = {
            getClient: function(args) {
                callbackSpy(args);
                
                return {
                    label: function() {
                        return 'username/repo';
                    }
                }
            }
        };

        var ghclient = ghupdate.__set__('ghclient', clientStub);

        expect(callbackSpy.callCount).to.equal(0);
        expect(postSpy.callCount).to.equal(0);

        ghupdate.updateLabels(args, function() {

            expect(callbackSpy.callCount).to.equal(1);
            expect(postSpy.callCount).to.equal(2);

            ghupdate.patchLabel.restore();
            ghclient();

            done();
        });

    });


    it('should return a promise when posting to github', function(done) {

        var ghlabelMock = {
            update: function() {}
        };

        expect(ghupdate.patchLabel(ghlabelMock)).to.be.an('object');

        done();
    });


    // Whimsical.
    // The below needs a revist with some promise work baked in,
    // all I'm currently doing is passing through the function. 
    
    it('should resolve promise after post', function(done) {

        var ghlabelMock = {
            update: function(label, callback) {
                callback();
            },
            name: 'username/repo'
        };

        var result = ghupdate.patchLabel(ghlabelMock, labels[1]);
        expect(result).to.be.an('object');

        done();
    });

    it('should resolve promise after post with rejected label', function(done) {

        var ghlabelMock = {
            update: function(label, callback) {
                callback(true);
            },
            name: 'username/repo'
        };

        var result = ghupdate.patchLabel(ghlabelMock, labels[1]);
        expect(result).to.be.an('object');

        done();
    });

});


