'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
var kafka = require('../../kafka/client');
const path = require("path");
const fs = require("fs");
const util = require('util');
const readFile = util.promisify(fs.readFile);
const passportAuth = passport.authenticate('jwt', { session: false });

router.post("/productSearch", passportAuth, async function (req, res) {

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
 
  router.get("/getProduct", passportAuth, async function (req, res) {
    console.log(req.query);
    kafka.make_request("customer_topic", { "path": "getProduct", "user": req.user, "body": req.query.productId }, function (err, results) {
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

  
  router.post("/updateProductViews", passportAuth, async function (req, res) {
    console.log("In updateProductViews", req.body);
    
    kafka.make_request("customer_topic", { "path": "updateProductViews", "user": req.user, "body":req.body }, function (err, results) {
      console.log("in make request call back customer_topic");
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
  })

  router.get("/getCustomerReview",passportAuth, async function (req, res) {
    console.log("In getCustomerReview");
    kafka.make_request("customer_topic", { "path": "getCustomerReview", "user": req.user }, function (err, results) {
      console.log("in make request call back customer_topic");
      if (err) {
        console.log("Inside err");
        console.log(err);
        return res.status(err.status).send(err.message);
      } else {

        if (results.status === 200) {
          return res.status(results.status).send(results.data);
        } else {
          return res.status(results.status).send(results.errors);
        }
      }
    });
  })

  router.post('/addProductReview', passportAuth, async (req, res) => {
    console.log("In add Product Review");
    console.log(req.body);
    kafka.make_request("customer_topic", { "path": "addProductReview", "body": req.body, "user":req.user }, function (err, results) {
      console.log("In make request call back", results);
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
    }
    );
  });

  router.get("/downloadProductImg/:product_image", (req, res) => {

    var image = path.join(__dirname + "/../../uploads/productImage", req.params.product_image);
  
    if (fs.existsSync(image)) {
      res.sendFile(image);
    } else {
      res.end("image not found");
    }
  });
  
  router.get("/getCustomerName", passportAuth, async function (req, res) {
  
    kafka.make_request("customer_topic", { "path": "getCustomerName", "body": req.query.customerId }, function (err, results) {
     
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
  

  
  module.exports = router;