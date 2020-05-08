/* test/test.js */
var app = require('../server');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var ROOT_URL = 'http://localhost:5001';
var should = require('chai').should();

describe('Amazon Mocha Tests', () => {

   // SignUp User
    it("Test Case 1 -  SignUp Post", (done) => { 

        const data = {
            "name": 'Honey Plum Inc. 1',
            "email": 'honey.plum@hplum1.com',
            "password" : '12345',
            "userType" : 'seller'
        }

        chai.request(ROOT_URL)
        .post('/signUpUser')
        .send(data)
        .end((err, res) => {
            console.log(res);
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })

  /*  // SignIn Seller
    it("Test Case 2 -  SignIn Post", (done) => { 

        const data = {
            "email": 'honey.plum@hplum.com',
            "password" : '12345',
            "userType" : 'seller'
        }

        chai.request(ROOT_URL)
        .post('/signIn')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(200);
        done();
        });
    })

    // Get Seller Profile
    it("Test Case 3 - Get Seller Profile", (done) => {

        chai.request(ROOT_URL)
        .get(`/sellerProfile/5e9be51c2467725df5daaceb`)
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })

    // Post an event: company
    it("Test Case 4 -  Get Product Page", (done) => { 
        chai.request(ROOT_URL)
        .get(`productPage/5eb4bb5579358b420050e276`)
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })*/
})
