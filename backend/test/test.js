/* test/test.js */
var app = require('../server');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
var ROOT_URL = 'http://localhost:5001';
var should = require('chai').should();
var token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjRlZGZlY2Q1YTZmNTQ0YmQ1YzcwOSIsIm5hbWUiOiJTdXJ5YSBLYXRhcmkiLCJ1c2VyVHlwZSI6ImN1c3RvbWVyIiwiZW1haWwiOiJzdXJ5YUBnbWFpbC5jb20iLCJpYXQiOjE1ODg5MzQxMzcsImV4cCI6MTU4OTgzNDEzN30.AS3Iy20AUduuTRIpbJMu-7ZLPfaWY67lTFn5bSOAKEQ"

describe('Amazon Mocha Tests', () => {

   // SignUp User
    it("Test Case 1 -  SignUp Post", (done) => { 

        const data = {
            "name": 'Honey Plum Inc.',
            "email": 'honey.plum@hplum.com',
            "password" : '12345',
            "userType" : 'seller'
        }
        chai.request(ROOT_URL)
        .post('/signUpUser')
        .send(data)
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })

   //SignIn Seller
    it("Test Case 2 -  SignIn Post", (done) => { 

        const data = {
            "email": 'shiva@ayurved.com',
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
        .get(`/getSellerProfile`)
        .query({"sellerId" : '5e9be51c2467725df5daaceb'})
        .set("Authorization", token)
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })

    // Get Product Page
    it("Test Case 4 -  Get Product Page", (done) => { 
        chai.request(ROOT_URL)
        .get(`/getProduct`)
        .set("Authorization", token)
        .query({"productId" : '5eb4bb5579358b420050e276'})
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })

    //getCustomerReview
    it("Test Case 5 -  Get Customer Review", (done) => { 
        chai.request(ROOT_URL)
        .get(`/getCustomerReview`)
        .set("Authorization", token)
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })

    //getCart
    it("Test Case 6 -  Get Customer Cart", (done) => { 
        chai.request(ROOT_URL)
        .get(`/getCart/er.shivangin@gmail.com`)
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })

    //getCustomerOrdersById
    it("Test Case 7 -  Get Customer Order", (done) => { 
        chai.request(ROOT_URL)
        .get(`/getCustomerOrdersById/5e9c0e8b66861d61141b51a2`)
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })
    //getSellerOrders
    it("Test Case 8 -  Get Sellers Order", (done) => { 
        chai.request(ROOT_URL)
        .get(`/getSellerOrders/5e9ea3cf53358d11d8529fc3`)
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })
    //getCustomer Card details
    it("Test Case 9 -  Get Customer Card", (done) => { 
        chai.request(ROOT_URL)
        .get(`/getCardInfo`)
        .set("Authorization", token)
        .query({"card_id" : '5eb530cd422d1c9f4c4c0db4'})
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })
    //get Customer complete Profile
    it("Test Case 10 -  Get Customer Profile", (done) => { 
        chai.request(ROOT_URL)
        .get(`/getCustomerProfile`)
        .set("Authorization", token)
        .end((err, res) => {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
        done();
        });
    })
})
