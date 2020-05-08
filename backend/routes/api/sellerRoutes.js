'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
var kafka = require('../../kafka/client');
const passportAuth = passport.authenticate('jwt', { session: false });
const helper = require('./helperFunctions');
const validate = require('../../validation/validationProduct');
const uploadFileToS3 = require('../../config/awsImageUpload');

// @route   POST api/addProduct
// @desc    Post new product
// @access  Private

router.post("/addProduct/:type", helper.upload.array('productImage', 5), passportAuth, async function (req, res) {

  console.log(req.files);
  const { errors, isValid } = validate.validateAddProduct(req.body);
  if (!isValid) {

    return res.status(400).json(errors);
  }
  const reqFiles = [];
  // const url = req.protocol + '://' + req.get('host')
  // for (var i = 0; i < req.files.length; i++) {
  //   reqFiles.push(req.files[i].filename)
  // }

  for (var i = 0; i < req.files.length; i++) {
    if (req.files[i]) {
      uploadFileToS3(req.files[i].filename , 'products', req.body.productName + '-'+ req.user._id);
    }

    let imageUrl = "";
    if (req.files[i]) {
      try {
        imageUrl = await uploadFileToS3(req.files[i], 'products', req.body.productName + '-' + req.user._id);
        reqFiles.push(imageUrl.Location);

      } catch (error) {
        console.log(error);
      }
    }
    

  }


  var images = {
    "productImage": reqFiles,
  }
  

  // let filenamearray = [];
  // req.files.forEach(file => { filenamearray.push(file.filename); });
  // console.log(filenamearray);

  // var stringObj = JSON.stringify(filenamearray);
  // console.log(stringObj);

  console.log("in add product route");
  console.log(req.body);
  kafka.make_request("seller_topic", { "path": "addProduct", "user": req.user, "body": req.body, images }, function (err, results) {
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

router.post("/sellerProductSearch", passportAuth, async function (req, res) {

  console.log("in product search  seller route");
  console.log(req.body);
  kafka.make_request("seller_topic", { "path": "sellerProductSearch", "user": req.user, "body": req.body }, function (err, results) {


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

router.post("/updateProduct", passportAuth, async function (req, res) {

  console.log("in update product route");
  console.log(req.body);

  const { errors, isValid } = validate.validateProduct(req.body);

  if (!isValid) {

    return res.status(400).json(errors);
  }

  kafka.make_request("seller_topic", { "path": "productUpdate", "user": req.user, "body": req.body }, function (err, results) {
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

router.post("/updateProductImage/:type", helper.upload.array('productImage', 5), passportAuth, async function (req, res) {

  console.log(req.files);

  // const reqFiles = [];
  // const url = req.protocol + '://' + req.get('host')
  // for (var i = 0; i < req.files.length; i++) {
  //   reqFiles.push(req.files[i].filename)
  // }

  // console.log(reqFiles);

  const reqFiles = [];
  
  for (var i = 0; i < req.files.length; i++) {
    if (req.files[i]) {
      uploadFileToS3(req.files[i].filename, 'products', req.body.productName +  '-' +req.user._id);
    }

    let imageUrl = "";
    if (req.files[i]) {
      try {
        imageUrl = await uploadFileToS3(req.files[i], 'products', req.body.productName  + '-' +req.user._id);
        reqFiles.push(imageUrl.Location);

      } catch (error) {
        console.log(error);
      }
    }
 
  }

  //console.log(reqFiles);

  var images = {
    "productImage": reqFiles,
  }
 // console.log(images);


  console.log("in update product route");
  console.log(req.body);
  kafka.make_request("seller_topic", { "path": "productImageUpdate", "user": req.user, "body": req.body, images }, function (err, results) {
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

router.post("/removeProduct", passportAuth, async function (req, res) {

  console.log("in remove product route");
  console.log(req.body);
  kafka.make_request("seller_topic", { "path": "removeProduct", "user": req.user, "body": req.body }, function (err, results) {
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