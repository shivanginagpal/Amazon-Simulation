'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
var kafka = require('../../kafka/client');
const passportAuth = passport.authenticate('jwt', { session: false });
const helper = require('./helperFunctions');

// @route   POST api/addProduct
// @desc    Post new product
// @access  Private

router.post("/addProduct/:type", helper.upload.array('productImage',5),passportAuth, async function (req, res) {
 
  console.log(req.files);
 
  const reqFiles = [];
  const url = req.protocol + '://' + req.get('host')
  for (var i = 0; i < req.files.length; i++) {
      reqFiles.push( req.files[i].filename)
  }

  console.log(reqFiles);

  var images = {
    "productImage" : reqFiles,
  }
  console.log(images);

  // let filenamearray = [];
  // req.files.forEach(file => { filenamearray.push(file.filename); });
  // console.log(filenamearray);

  // var stringObj = JSON.stringify(filenamearray);
  // console.log(stringObj);


  console.log("in add product route");
  console.log(req.body);
  kafka.make_request("seller_topic", { "path": "addProduct", "user": req.user, "body": req.body , images}, function (err, results) {
    console.log("in make request call back seller_topic");
    console.log(results);
    console.log(err);
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