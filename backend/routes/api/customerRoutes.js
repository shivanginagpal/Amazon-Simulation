'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
var kafka = require('../../kafka/client');
const passportAuth = passport.authenticate('jwt', { session: false });
const test = require('./testcase3');
const redisClient = require("../../../kafka-backend/utils/redisConfig");
var { ProductCategory } = require('../../models/ProductCategory');
var User = require('../../models/User');
const { prepareSuccess, prepareInternalServerError } = require('../../../kafka-backend/services/responses');

//testcase4
// router.get("/productSearch",passportAuth, async function (req, res) {
//     kafka.make_request("customer_topic", { "path": "productSearchResults", "user": req.user, "body": req.body }, function (err, results) {
//       if (err) {
//         console.log("Inside err REDIS test");
//         console.log(err);
//         return res.status(err.status).send(err.message);
//       } else {
//         if (results.status === 200) {
//           return res.status(results.status).send(results.data);
//         } else {
//           return res.status(results.status).send(results.errors);
//         }
//       }
//     });
//   });

//Testcase 1&2
// router.get("/productSearch", passportAuth, async function (req, res) {
//   var resObj ={};
//   let sellerId=null;
//   let productName='';
//       let result = await ProductCategory.aggregate(prepareQuery(req.body, sellerId, productName))
//         .skip(req.body.pageLimit * (req.body.currentPage - 1)).limit(req.body.pageLimit)
//       .catch(error => {
//           res.status(400).json({ responseMessage: 'jobs not found' });
//         })         
//       res.writeHead(200, { 'content-type': 'application/json' });
//       res.end(JSON.stringify(result));
//       return res;
// });
//testcase3
router.get("/productSearch", passportAuth, async function (req, res) {
  var resObj = {};
  let sellerId=null;
  let productName='';

  redisClient.get(req.body.productCategoryName, async (err, products) => {
    if (products) {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(products);
      return res;
    } else {
      let result = await ProductCategory.aggregate(prepareQuery(req.body, sellerId, productName))
        .skip(req.body.pageLimit * (req.body.currentPage - 1)).limit(req.body.pageLimit)
        .catch(error => {
          res.status(400).json({ responseMessage: 'jobs not found' });
        })
      redisClient.setex(req.body.productCategoryName, 36000, JSON.stringify(result), function (error, reply) {
        if (error) {
          console.log(error);
        }
      });
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(result));
      return res;
    }
  });
});

function prepareQuery(request, sellerId, product) {
  let query = [];
  if (request.productCategoryName && sellerId) {
    query.push(
      {
        $match: {
          $and: [{ "productCategoryName": { $regex: request.productCategoryName, $options: "i" } },
          { "seller": sellerId }]
        }
      },
      {
        $unwind: "$products"
      }
    );
  }
  else if (sellerId) {
    query.push(
      {
        $match: {
          "seller": sellerId
        }
      },
      {
        $unwind: "$products"
      }
    )
  }
  else {
    if (request.productCategoryName) {
      query.push(
        {
          $match: {
            "productCategoryName": { $regex: request.productCategoryName, $options: "i" }
          }
        },
        {
          $unwind: "$products"
        },
      )
    }
    if (product) {
      query.push(
        {
          $unwind: "$products"
        },
        {
          $match: {
            "products.productName": {
              $regex: request.search, $options: "i"
            }
          }
        }
      )
    }

  }
  return query;
}



  router.post('/addProductRating', passportAuth, async (req,res)=>{
    console.log("In add Product Rating");
    console.log(req.body);
      kafka.make_request("customer_topic",{"path":"addProductReview", "body": req.body}, function (err, results) {
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