'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
var kafka = require('../../kafka/client');
const passportAuth = passport.authenticate('jwt', { session: false });

router.get("/productSearch",passportAuth, async function (req, res) {
 
    console.log("in product search route");
    console.log(req.body);
    kafka.make_request("customer_topic", { "path": "productSearchResults", "user": req.user, "body": req.body }, function (err, results) {
      console.log("in make request call back seller_topic");
      console.log(results);
      console.log(err);
      if (err) {
        console.log("Inside err REDIS test");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    });
  });

 
  router.get("/getProduct/:productId",passportAuth, async function (req, res) {
 
    
    kafka.make_request("customer_topic", { "path": "getProduct", "user": req.user, "body": req.params.productId }, function (err, results) {
      console.log("in make request call back seller_topic");
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {
        console.log("Inside else", results);
        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    });
  });

 

  router.post('/addProductReview', passportAuth, async (req,res)=>{
    console.log("In add Product Review");
    console.log(req.body);
      var productReview ={
        "customerId": req.body.customerId,
        "comment" : req.body.comment,
        "rating":req.body.rating
      }
      kafka.make_request("customer_topic",{"path":"addProductReview", "body": req.body, "productReview": productReview}, function (err, results) {
        console.log("In make request call back",results);
        if (err) {
          console.log("Inside err");
          console.log(err);
          return res.status(err.status).send(err.message);
        } else {
            console.log("Inside else",results);
            if (results.status === 200){
              return res.status(results.status).send(results.data);
            }else{
            return res.status(results.status).send(results.errors);
            }
        }
      }
    );
  });
  
  module.exports = router;